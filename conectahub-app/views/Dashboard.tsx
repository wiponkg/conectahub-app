import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { Award, CheckCircle, X, Calendar, Clock, MapPin } from 'lucide-react';
import { CALENDAR_EVENTS } from '../constants';

const Dashboard: React.FC = () => {
  const { currentUser, timeRecords, registerTime, ranking } = useApp();
  
  // Real-time Clock
  const [now, setNow] = useState(new Date());
  
  // Calendar State
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Determine current "Time Clock" state
  const lastRecord = timeRecords.length > 0 ? timeRecords[timeRecords.length - 1] : null;
  const isClockedIn = lastRecord?.type === 'entrada';

  // Determine user rank
  const allUsers = [...ranking, currentUser].sort((a, b) => b.points - a.points);
  const myRank = allUsers.findIndex(u => u.id === currentUser.id) + 1;

  // --- Dynamic Calendar Logic ---
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-11
  const currentDay = now.getDate();

  // Get number of days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Get which day of the week the month starts (0 = Sunday, 1 = Monday...)
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  // Create array for grid: empty slots for padding + days
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const paddingArray = Array.from({ length: firstDayOfWeek }, (_, i) => i);

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  // Format Month Name (e.g., "Outubro 2023")
  const monthLabel = now.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  const capitalizedMonthLabel = monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);

  // Determine "Next Event" dynamically based on today's date
  const upcomingEvents = Object.entries(CALENDAR_EVENTS)
    .filter(([day]) => Number(day) >= currentDay) // Filter days >= today
    .sort(([a], [b]) => Number(a) - Number(b)); // Sort ascending
  
  const nextEventDay = upcomingEvents.length > 0 ? Number(upcomingEvents[0][0]) : null;
  const nextEventList = nextEventDay ? CALENDAR_EVENTS[nextEventDay] : [];
  const nextEvent = nextEventList.length > 0 ? nextEventList[0] : null;

  const handleDayClick = (day: number) => {
    setSelectedDate(day);
    setIsModalOpen(true);
  };

  const selectedEvents = selectedDate ? CALENDAR_EVENTS[selectedDate] || [] : [];

  return (
    <div className="bg-blue-900 min-h-screen text-white pb-24 relative">
      {/* Header Profile */}
      <div className="pt-16 px-6 flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-blue-400 border-2 border-white overflow-hidden">
            <img src={currentUser.avatar} alt="User" className="w-full h-full object-cover" />
        </div>
        <div>
            <h2 className="text-xl font-bold">{currentUser.name}</h2>
            <p className="text-blue-200 text-sm">Bem-vindo de volta</p>
        </div>
      </div>

      {/* Calendar Card */}
      <div className="bg-white text-gray-800 rounded-3xl mx-4 p-5 shadow-lg mb-4">
        <div className="text-center mb-4">
            <h3 className="font-bold text-gray-700">{capitalizedMonthLabel}</h3>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
            {weekDays.map((d, i) => <span key={i} className="font-bold text-gray-400">{d}</span>)}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {/* Empty slots for padding start of month */}
            {paddingArray.map(i => <span key={`pad-${i}`}></span>)}

            {/* Real Days */}
            {daysArray.map(d => {
                const hasEvents = CALENDAR_EVENTS[d]?.length > 0;
                const isSelected = selectedDate === d;
                const isToday = d === currentDay;
                
                return (
                    <button 
                        key={d} 
                        className={`
                            h-8 w-8 flex flex-col items-center justify-center rounded-full hover:bg-gray-100 relative transition-all
                            ${isSelected ? 'bg-blue-900 text-white hover:bg-blue-800' : ''}
                            ${!isSelected && isToday ? 'bg-blue-100 text-blue-900 font-bold' : ''}
                        `}
                        onClick={() => handleDayClick(d)}
                    >
                        <span>{d}</span>
                        {/* Event Dot */}
                        {hasEvents && (
                            <span className={`w-1 h-1 rounded-full mt-0.5 ${isSelected ? 'bg-white' : 'bg-blue-500'}`}></span>
                        )}
                    </button>
                );
            })}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-xs">
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${nextEvent ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <span className="font-semibold text-gray-700">Próximo Evento</span>
            </div>
             {nextEvent ? (
                 <p className="text-gray-400 pl-4">
                     {nextEvent.title} - {nextEventDay} {now.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}, {nextEvent.time.split(' ')[0]}
                 </p>
             ) : (
                 <p className="text-gray-400 pl-4">Nenhum evento futuro neste mês.</p>
             )}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 mx-4 mb-4">
        <div className="bg-white text-gray-800 rounded-2xl p-4 shadow-lg flex flex-col items-center justify-center relative">
            <span className="text-xs font-bold text-gray-500 mb-2">Ranking Mensal</span>
            <div className="bg-blue-900 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <span className="font-bold">{myRank}º</span>
            </div>
        </div>
        <div className="bg-white text-gray-800 rounded-2xl p-4 shadow-lg">
             <span className="text-xs font-bold text-gray-500 block mb-2">Conquistas</span>
             <div className="space-y-1">
                 <div className="flex items-center gap-1 text-[10px]">
                    <Award size={12} className="text-yellow-500" />
                    <span>Pontualidade de Ouro</span>
                 </div>
                 <div className="flex items-center gap-1 text-[10px]">
                    <Award size={12} className="text-gray-400" />
                    <span>Participante Ativo</span>
                 </div>
             </div>
        </div>
      </div>

      {/* Missions & Ponto */}
      <div className="mx-4 grid grid-cols-1 gap-4">
        {/* Missions */}
        <div className="bg-white text-gray-800 rounded-2xl p-4 shadow-lg flex justify-between">
            <div className="flex-1">
                <h4 className="text-sm font-bold mb-2">Missões da Semana</h4>
                <ul className="text-[10px] space-y-1 text-gray-500">
                    <li className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${timeRecords.length >= 5 ? 'bg-green-500' : 'bg-blue-500'}`}></span> 
                        Marcar ponto 5 dias seguidos
                    </li>
                    <li className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> Enviar sugestões de projetos</li>
                    <li className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> Participar de eventos</li>
                </ul>
            </div>
             <div className="border-l pl-4 flex flex-col justify-center items-center">
                <h4 className="text-xs font-bold mb-1">Meus Pontos</h4>
                <div className="text-xl font-bold text-blue-900">
                    {currentUser.points}
                </div>
                <span className="text-[10px] text-gray-400">pts</span>
            </div>
        </div>

        {/* Ponto Digital */}
        <div className="bg-white text-gray-800 rounded-2xl p-5 shadow-lg flex justify-between items-center transition-all">
            <div className="flex items-center gap-3">
                <div className="text-left">
                    <h4 className="text-sm font-bold">Ponto Digital</h4>
                    <div className={`rounded-full p-1 mt-1 inline-block transition-colors ${isClockedIn ? 'bg-green-100' : 'bg-blue-100'}`}>
                         <CheckCircle size={24} className={isClockedIn ? 'text-green-600' : 'text-blue-600'} />
                    </div>
                </div>
            </div>
            <div className="text-right">
                <span className="text-3xl font-bold text-gray-800 block tabular-nums">
                    {now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </span>
                <button 
                    onClick={registerTime}
                    className={`${isClockedIn ? 'bg-red-500' : 'bg-blue-900'} text-white text-[10px] px-3 py-1 rounded-full mt-1 transition-colors`}
                >
                    {isClockedIn ? 'Registrar saída' : 'Registrar entrada'}
                </button>
            </div>
        </div>
      </div>

      {/* Events Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsModalOpen(false)}>
            <div 
                className="bg-white w-full max-w-sm mx-4 mb-4 sm:mb-0 rounded-3xl p-6 shadow-2xl animate-slide-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-xl text-blue-900">
                             <Calendar size={20} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">
                                {selectedDate} de {capitalizedMonthLabel.split(' ')[0]}
                            </h3>
                            <span className="text-xs text-gray-500">{currentYear}</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-4 max-h-[300px] overflow-y-auto">
                    {selectedEvents.length > 0 ? (
                        selectedEvents.map(event => (
                            <div key={event.id} className="flex gap-4 group">
                                <div className="flex flex-col items-center gap-1 min-w-[60px]">
                                    <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2 py-1 rounded-md w-full text-center">
                                        {event.time.split(' ')[0]}
                                    </span>
                                    <div className="h-full w-0.5 bg-gray-100 group-last:hidden"></div>
                                </div>
                                <div className="pb-4 flex-1">
                                    <div className="bg-gray-50 p-3 rounded-xl hover:bg-blue-50 transition border border-transparent hover:border-blue-100">
                                        <h4 className="font-bold text-gray-800 text-sm">{event.title}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Clock size={12} className="text-gray-400" />
                                            <span className="text-xs text-gray-500">{event.time}</span>
                                        </div>
                                        {event.description && (
                                            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                                                {event.description}
                                            </p>
                                        )}
                                        <div className="mt-2 flex gap-2">
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium
                                                ${event.type === 'meeting' ? 'bg-purple-100 text-purple-700' : ''}
                                                ${event.type === 'social' ? 'bg-orange-100 text-orange-700' : ''}
                                                ${event.type === 'deadline' ? 'bg-red-100 text-red-700' : ''}
                                                ${event.type === 'reminder' ? 'bg-green-100 text-green-700' : ''}
                                            `}>
                                                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Calendar size={24} className="text-gray-300" />
                            </div>
                            <p className="text-gray-600 text-sm font-medium">Nenhum evento neste dia.</p>
                            <p className="text-gray-500 text-xs mt-1">Aproveite para focar nas suas tarefas!</p>
                        </div>
                    )}
                </div>

                <button 
                    onClick={() => setIsModalOpen(false)}
                    className="w-full mt-6 bg-blue-900 text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition shadow-lg shadow-blue-900/20"
                >
                    Fechar
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
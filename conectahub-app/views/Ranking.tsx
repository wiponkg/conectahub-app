import React from 'react';
import { useApp } from '../AppContext';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Ranking: React.FC = () => {
  const navigate = useNavigate();
  const { ranking, currentUser } = useApp();

  // Combine static ranking with current user and sort
  const allUsers = [...ranking];
  // Only add currentUser if not already in the list (mock check)
  if (!allUsers.find(u => u.id === currentUser.id)) {
      allUsers.push(currentUser);
  }
  
  const sortedUsers = allUsers.sort((a, b) => b.points - a.points);
  
  const top1 = sortedUsers[0];
  const top2 = sortedUsers[1];
  const top3 = sortedUsers[2];

  return (
    <div className="bg-blue-900 min-h-screen text-white pb-20 overflow-hidden relative">
      <div className="pt-8 px-4 flex items-center mb-6 z-10 relative">
        <button onClick={() => navigate('/dashboard')}><ChevronLeft /></button>
      </div>
      
      <h1 className="text-3xl font-bold px-6 mb-8 z-10 relative">Ranking</h1>

      {/* Visual Tree */}
      <div className="relative h-[600px] w-full mt-10">
         {/* Lines */}
         <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
             <line x1="50%" y1="60" x2="20%" y2="180" stroke="white" strokeWidth="2" />
             <line x1="50%" y1="60" x2="80%" y2="180" stroke="white" strokeWidth="2" />
             <line x1="20%" y1="180" x2="20%" y2="400" stroke="white" strokeWidth="2" />
             <line x1="80%" y1="180" x2="80%" y2="350" stroke="white" strokeWidth="2" />
         </svg>

         {/* Top Leader */}
         {top1 && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-slight">
                <div className="w-20 h-20 rounded-full border-4 border-yellow-400 overflow-hidden bg-gray-300 z-10 relative shadow-lg shadow-yellow-400/50">
                    <img src={top1.avatar} alt="1" className="w-full h-full object-cover" />
                    <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-blue-900 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">1</div>
                </div>
                <p className="mt-2 font-bold">{top1.name}</p>
                <p className="text-xs text-blue-300">{top1.points} pts</p>
            </div>
         )}

         {/* Second Place */}
         {top2 && (
             <div className="absolute top-32 left-[15%] flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-4 border-gray-400 overflow-hidden bg-gray-300 z-10 relative">
                    <img src={top2.avatar} alt="2" className="w-full h-full object-cover" />
                    <div className="absolute -bottom-1 -right-1 bg-gray-400 text-blue-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">2</div>
                </div>
                <p className="mt-2 font-bold text-sm">{top2.name}</p>
                <p className="text-xs text-blue-300">{top2.points} pts</p>
            </div>
         )}

         {/* Third Place */}
         {top3 && (
             <div className="absolute top-32 right-[15%] flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-4 border-orange-400 overflow-hidden bg-gray-300 z-10 relative">
                    <img src={top3.avatar} alt="3" className="w-full h-full object-cover" />
                    <div className="absolute -bottom-1 -right-1 bg-orange-400 text-blue-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">3</div>
                </div>
                <p className="mt-2 font-bold text-sm">{top3.name}</p>
                <p className="text-xs text-blue-300">{top3.points} pts</p>
            </div>
         )}

         {/* Other Users */}
         {sortedUsers.slice(3).map((user, index) => (
             <div 
                key={user.id}
                className="absolute flex items-center justify-center w-10 h-10 rounded-full bg-blue-800 border border-blue-400"
                style={{
                    top: `${250 + (index * 60)}px`,
                    left: index % 2 === 0 ? '15%' : 'auto',
                    right: index % 2 !== 0 ? '15%' : 'auto'
                }}
             >
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover opacity-80" />
             </div>
         ))}
      </div>
    </div>
  );
};

export default Ranking;

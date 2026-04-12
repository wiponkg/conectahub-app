import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Search, Filter, Edit, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChatList: React.FC = () => {
  const navigate = useNavigate();
  const { chats, currentUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = chats.filter(chat => 
    chat.user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen pb-20 flex flex-col">
      {/* Teams-like Header */}
      <div className="bg-white px-4 pt-12 pb-2 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-3">
             <div className="relative">
                <img 
                    src={currentUser.avatar} 
                    alt="Me" 
                    className="w-10 h-10 rounded-full object-cover border border-gray-200" 
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
             </div>
             <h1 className="text-2xl font-bold text-gray-900">Chat</h1>
        </div>
        <div className="flex gap-2">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <Filter size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <Edit size={20} />
            </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-white">
        <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
            <input 
                type="text" 
                placeholder="Pesquisar" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 rounded-md py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-2 pb-4 space-y-1">
            <h2 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Recentes</h2>
            {filteredChats.map(chat => {
                const lastMsg = chat.messages[chat.messages.length - 1];
                const time = lastMsg ? lastMsg.timestamp : '';
                
                return (
                    <div 
                        key={chat.id} 
                        onClick={() => navigate(`/chat/${chat.id}`)}
                        className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors border-b border-transparent hover:bg-gray-50 ${chat.unread ? 'bg-indigo-50/50' : ''}`}
                    >
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <img src={chat.user.avatar} alt={chat.user.name} className="w-12 h-12 rounded-full bg-gray-200 object-cover" />
                            {/* Status Indicator Mock */}
                            <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full ${
                                chat.user.id === 'ceo' ? 'bg-green-500' : 
                                chat.user.id === 'hr' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}></div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-0.5">
                                <h3 className={`text-sm truncate ${chat.unread ? 'font-bold text-gray-900' : 'font-semibold text-gray-800'}`}>
                                    {chat.user.name}
                                </h3>
                                <span className={`text-xs whitespace-nowrap ${chat.unread ? 'text-indigo-600 font-bold' : 'text-gray-500'}`}>
                                    {time}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className={`text-sm truncate w-full ${chat.unread ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                                    {chat.lastMessage}
                                </p>
                                {chat.unread && (
                                    <span className="ml-2 bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                        1
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
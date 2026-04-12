import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';
import { ArrowLeft, Send, Video, Phone, MoreHorizontal, Paperclip, Image, Smile, Mic, Type } from 'lucide-react';

const ChatDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { chats, sendMessage } = useApp();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatInfo = chats.find(c => c.id === id);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatInfo?.messages]);

  const handleSend = () => {
    if (inputText.trim() && id) {
        sendMessage(id, inputText);
        setInputText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') handleSend();
  }

  if (!chatInfo) return <div>Chat not found</div>;

  return (
    <div className="bg-gray-50 h-full flex flex-col relative">
      {/* Header */}
      <div className="bg-white px-4 py-3 pt-10 flex items-center justify-between border-b border-gray-200 shadow-sm z-20">
        <div className="flex items-center gap-3">
             <button onClick={() => navigate('/chat')} className="text-gray-500 hover:text-gray-700 p-1 -ml-1">
                <ArrowLeft size={24} />
            </button>
            <div className="relative">
                 <img src={chatInfo.user.avatar} alt="User" className="w-9 h-9 rounded-full bg-gray-200 object-cover" />
                 <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
                 <h2 className="text-gray-900 font-bold text-sm leading-tight">{chatInfo.user.name}</h2>
                 <p className="text-xs text-gray-500">Disponível</p>
            </div>
        </div>
        <div className="flex items-center gap-4 text-indigo-600">
            <button><Video size={22} /></button>
            <button><Phone size={20} /></button>
            <button className="text-gray-500"><MoreHorizontal size={20} /></button>
        </div>
      </div>

      {/* Messages Area - Flex 1 to take remaining space */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
        {/* Date Divider Mock */}
        <div className="flex justify-center my-4">
            <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">Hoje</span>
        </div>

        {chatInfo.messages.map((msg, index) => {
            const showAvatar = !msg.isMe && (index === 0 || chatInfo.messages[index - 1].isMe);
            
            return (
                <div key={msg.id} className={`flex w-full ${msg.isMe ? 'justify-end' : 'justify-start items-end gap-2'}`}>
                    
                    {!msg.isMe && (
                        <div className={`w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mb-1 ${showAvatar ? 'opacity-100' : 'opacity-0'}`}>
                            <img src={chatInfo.user.avatar} className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div className={`max-w-[75%] px-4 py-2.5 rounded-xl text-sm shadow-sm relative group ${
                        msg.isMe 
                        ? 'bg-indigo-100/80 text-gray-900 rounded-br-sm border border-indigo-200' 
                        : 'bg-white text-gray-900 rounded-bl-sm border border-gray-200'
                    }`}>
                        {!msg.isMe && showAvatar && (
                             <p className="text-[10px] font-bold text-gray-500 mb-0.5">{chatInfo.user.name}</p>
                        )}
                        <p className="leading-relaxed">{msg.text}</p>
                        <div className={`text-[10px] text-right mt-1 opacity-60 font-medium`}>
                            {msg.timestamp}
                            {msg.isMe && <span className="ml-1">✓</span>}
                        </div>
                    </div>
                </div>
            );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Sits at bottom of flex column */}
      <div className="bg-white border-t border-gray-200 p-3 z-20 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
         <div className="max-w-md mx-auto">
            <div className="bg-gray-50 border border-gray-300 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-400 transition-all shadow-inner">
                <input 
                    type="text" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Digite uma nova mensagem" 
                    className="w-full bg-transparent text-gray-900 placeholder-gray-500 px-2 py-2 focus:outline-none text-sm font-medium"
                 />
                 
                 {/* Toolbar */}
                 <div className="flex justify-between items-center mt-2 px-1 border-t border-gray-200 pt-2">
                    <div className="flex gap-4 text-gray-400">
                        <button className="hover:text-indigo-600 transition hover:bg-indigo-50 p-1 rounded"><Type size={18} /></button>
                        <button className="hover:text-indigo-600 transition hover:bg-indigo-50 p-1 rounded"><Paperclip size={18} /></button>
                        <button className="hover:text-indigo-600 transition hover:bg-indigo-50 p-1 rounded"><Image size={18} /></button>
                        <button className="hover:text-indigo-600 transition hover:bg-indigo-50 p-1 rounded"><Smile size={18} /></button>
                    </div>
                    <div className="flex gap-3 items-center">
                         {!inputText.trim() && (
                            <button className="text-gray-500 hover:text-indigo-600 transition p-1"><Mic size={20} /></button>
                         )}
                         <button 
                            onClick={handleSend}
                            disabled={!inputText.trim()}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all font-bold text-xs ${
                                inputText.trim() 
                                ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transform active:scale-95' 
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                         >
                            <span>Enviar</span>
                            <Send size={14} className={inputText.trim() ? "ml-0.5" : ""} />
                        </button>
                    </div>
                 </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ChatDetail;
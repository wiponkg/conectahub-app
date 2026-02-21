import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Chat, Message, TimeRecord } from './types';
import { CURRENT_USER_INITIAL, INITIAL_CHATS, RANKING_INITIAL_DATA } from './constants';

interface AppContextType {
  currentUser: User;
  isAuthenticated: boolean;
  login: (name: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  chats: Chat[];
  sendMessage: (chatId: string, text: string) => void;
  ranking: User[];
  addPoints: (amount: number) => void;
  timeRecords: TimeRecord[];
  registerTime: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or constants
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : CURRENT_USER_INITIAL;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const [chats, setChats] = useState<Chat[]>(() => {
    const saved = localStorage.getItem('chats');
    return saved ? JSON.parse(saved) : INITIAL_CHATS;
  });

  const [ranking, setRanking] = useState<User[]>(() => {
    const saved = localStorage.getItem('ranking');
    return saved ? JSON.parse(saved) : RANKING_INITIAL_DATA;
  });

  const [timeRecords, setTimeRecords] = useState<TimeRecord[]>(() => {
    const saved = localStorage.getItem('timeRecords');
    return saved ? JSON.parse(saved) : [];
  });

  // Effects to persist state
  useEffect(() => localStorage.setItem('currentUser', JSON.stringify(currentUser)), [currentUser]);
  useEffect(() => localStorage.setItem('isAuthenticated', String(isAuthenticated)), [isAuthenticated]);
  useEffect(() => localStorage.setItem('chats', JSON.stringify(chats)), [chats]);
  useEffect(() => localStorage.setItem('ranking', JSON.stringify(ranking)), [ranking]);
  useEffect(() => localStorage.setItem('timeRecords', JSON.stringify(timeRecords)), [timeRecords]);

  // Auth Actions
  const login = (name: string) => {
    setCurrentUser(prev => ({ ...prev, name: name || prev.name }));
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    // Optional: clear data
    // localStorage.clear();
  };

  const updateProfile = (data: Partial<User>) => {
    setCurrentUser(prev => ({ ...prev, ...data }));
  };

  // Chat Actions
  const sendMessage = (chatId: string, text: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === chatId) {
        const newMessage: Message = {
          id: Date.now().toString(),
          senderId: 'me',
          text,
          timestamp,
          isMe: true
        };
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: text,
          unread: false
        };
      }
      return chat;
    }));

    // Simulate Auto Reply after 1.5s
    setTimeout(() => {
        setChats(prevChats => prevChats.map(chat => {
            if (chat.id === chatId) {
                const replyText = "Recebido! Obrigado.";
                const replyMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    senderId: chat.user.id,
                    text: replyText,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isMe: false
                };
                 return {
                    ...chat,
                    messages: [...chat.messages, replyMessage],
                    lastMessage: replyText,
                    unread: true
                };
            }
            return chat;
        }));
    }, 1500);
  };

  // Gamification Actions
  const addPoints = (amount: number) => {
    setCurrentUser(prev => ({ ...prev, points: prev.points + amount }));
  };

  // Time Clock Actions
  const registerTime = () => {
    const now = new Date();
    const isEntry = timeRecords.length === 0 || timeRecords[timeRecords.length - 1].type === 'saida';
    
    const newRecord: TimeRecord = {
        type: isEntry ? 'entrada' : 'saida',
        timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setTimeRecords([...timeRecords, newRecord]);
    
    // Add points for clocking in/out correctly (Gamification)
    addPoints(2);
  };
  
  return (
    <AppContext.Provider value={{
      currentUser,
      isAuthenticated,
      login,
      logout,
      updateProfile,
      chats,
      sendMessage,
      ranking,
      addPoints,
      timeRecords,
      registerTime
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
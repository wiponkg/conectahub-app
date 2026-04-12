import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Home, User, Users, Trophy, MessageCircle, Menu, Bell, Shield, LogOut, Plus, Edit2, Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import ChatList from './views/ChatList';
import ChatDetail from './views/ChatDetail';
import Ranking from './views/Ranking';
import Quiz from './views/Quiz';
import EditProfile from './views/EditProfile';
import { AppProvider, useApp } from './AppContext';

// Placeholder Component for pages in development
const PlaceholderPage = ({ title, icon: Icon }: { title: string, icon?: React.ElementType }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-blue-900 text-white p-6 pt-8 flex flex-col items-center relative overflow-hidden">
        <button onClick={() => navigate('/dashboard')} className="absolute top-8 left-4 text-white z-10 p-2">
            <ArrowLeft size={24} />
        </button>
        
        <div className="mt-20 flex flex-col items-center justify-center z-10 text-center animate-fade-in-up">
            <div className="bg-blue-800 p-6 rounded-full mb-6 shadow-xl border border-blue-700">
                {Icon ? <Icon size={48} className="text-blue-300" /> : <Trophy size={48} className="text-blue-300" />}
            </div>
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <p className="text-blue-200 mb-8 max-w-xs mx-auto leading-relaxed">
                Esta funcionalidade está sendo preparada para você. Em breve novidades!
            </p>
            <button 
                onClick={() => navigate('/dashboard')}
                className="bg-white text-blue-900 px-8 py-3.5 rounded-full font-bold shadow-lg hover:bg-gray-100 transition active:scale-95"
            >
                Voltar para o Início
            </button>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
        </div>
    </div>
  );
};

// Bottom Navigation Component
const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6 flex justify-between items-center z-50">
      <button onClick={() => navigate('/dashboard')} className={`flex flex-col items-center ${isActive('/dashboard') ? 'text-blue-900' : 'text-gray-400'}`}>
        <CalendarIcon size={24} />
      </button>
      <button onClick={() => navigate('/ranking')} className={`flex flex-col items-center ${isActive('/ranking') ? 'text-blue-900' : 'text-gray-400'}`}>
        <Users size={24} />
      </button>
      <button onClick={() => navigate('/dashboard')} className={`flex flex-col items-center ${isActive('/') ? 'text-blue-900' : 'text-gray-400'}`}>
        <div className="bg-blue-900 p-3 rounded-full -mt-8 shadow-lg border-4 border-white text-white">
           <Home size={24} />
        </div>
      </button>
      <button onClick={() => navigate('/chat')} className={`flex flex-col items-center ${isActive('/chat') ? 'text-blue-900' : 'text-gray-400'}`}>
        <MessageCircle size={24} />
      </button>
      <button onClick={() => navigate('/quiz')} className={`flex flex-col items-center ${isActive('/quiz') ? 'text-blue-900' : 'text-gray-400'}`}>
        <Trophy size={24} />
      </button>
    </div>
  );
};

// Side Menu Component
interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const SideMenu: React.FC<MenuProps> = ({ isOpen, onClose, onLogout }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-[60] flex overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-[80%] max-w-[300px] h-full shadow-xl p-6 flex flex-col animate-slide-in-left">
        <button onClick={onClose} className="absolute top-4 left-4 text-blue-900">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        
        <div className="mt-12 space-y-6">
           <button onClick={() => handleNavigation('/profile')} className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-900 w-full text-left transition-colors">
             <Edit2 size={20} />
             <span className="font-medium">Editar perfil</span>
           </button>
           <button onClick={() => handleNavigation('/create-post')} className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-900 w-full text-left transition-colors">
             <Plus size={20} />
             <span className="font-medium">Criar postagem</span>
           </button>
           <button onClick={() => handleNavigation('/notifications')} className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-900 w-full text-left transition-colors">
             <Bell size={20} />
             <span className="font-medium">Notificações</span>
           </button>
           <button onClick={() => handleNavigation('/security')} className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-900 w-full text-left transition-colors">
             <Shield size={20} />
             <span className="font-medium">Segurança</span>
           </button>
           <button onClick={() => handleNavigation('/ranking')} className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-900 w-full text-left transition-colors">
             <Trophy size={20} />
             <span className="font-medium">Pontos</span>
           </button>
           
           <div className="border-t pt-6 mt-6">
              <button onClick={onLogout} className="flex items-center gap-3 text-red-600 cursor-pointer hover:text-red-700 w-full text-left transition-colors">
                <LogOut size={20} />
                <span className="font-medium">Sair</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};


// Layout Wrapper
const AppLayout = ({ children }: { children?: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { logout } = useApp();

  // Check path to hide bottom nav in specific chat rooms
  const isChatDetail = location.pathname.startsWith('/chat/') && location.pathname !== '/chat';

  return (
    <div className="h-screen bg-gray-50 max-w-md mx-auto relative shadow-2xl overflow-hidden flex flex-col">
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onLogout={logout} />
      
      {location.pathname === '/dashboard' && (
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="absolute top-4 left-4 z-10 text-white p-2"
        >
          <Menu size={28} />
        </button>
      )}

      {/* Main Content Area: Takes full height minus bottom nav if visible */}
      <div className={`flex-1 overflow-y-auto no-scrollbar relative w-full ${!isChatDetail ? 'pb-20' : ''}`}>
        {children}
      </div>

      {!isChatDetail && <BottomNav />}
    </div>
  );
};

// Main App Structure inside Provider
const AppContent = () => {
    const { isAuthenticated } = useApp();
    
    return (
        <Router>
            <Routes>
                <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
                
                <Route path="/*" element={
                isAuthenticated ? (
                    <AppLayout>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/chat" element={<ChatList />} />
                        <Route path="/chat/:id" element={<ChatDetail />} />
                        <Route path="/ranking" element={<Ranking />} />
                        <Route path="/quiz" element={<Quiz />} />
                        
                        {/* New Routes for Menu Items */}
                        <Route path="/profile" element={<EditProfile />} />
                        <Route path="/create-post" element={<PlaceholderPage title="Criar Postagem" icon={Plus} />} />
                        <Route path="/notifications" element={<PlaceholderPage title="Notificações" icon={Bell} />} />
                        <Route path="/security" element={<PlaceholderPage title="Segurança" icon={Shield} />} />
                        
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                    </AppLayout>
                ) : (
                    <Navigate to="/login" />
                )
                } />
            </Routes>
        </Router>
    );
}

const App = () => {
  return (
    <AppProvider>
        <AppContent />
    </AppProvider>
  );
};

export default App;
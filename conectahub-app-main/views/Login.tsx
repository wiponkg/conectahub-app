import React, { useState } from 'react';
import { Mail, Facebook, Apple, ArrowLeft, User, Lock, FileText, Check } from 'lucide-react';
import { useApp } from '../AppContext';

// Shared Background Component for consistency
const BackgroundWrapper = ({ children }: { children?: React.ReactNode }) => (
  <div className="h-screen w-full bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#172554] flex flex-col relative overflow-hidden text-white">
    {/* Abstract Background Shapes */}
    <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none mix-blend-screen animate-pulse-slow" />
    <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none mix-blend-screen" />
    <div className="absolute top-[40%] right-[-5%] w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
    
    <div className="flex-1 flex flex-col relative z-10 p-8 max-w-md mx-auto w-full">
       {children}
    </div>
  </div>
);

// Logo Component
const BrandLogo = ({ size = 'large' }: { size?: 'small' | 'large' }) => (
  <div className={`flex flex-col items-center justify-center ${size === 'large' ? 'mb-12 mt-20' : 'mb-8'}`}>
      <div className={`relative flex items-center justify-center ${size === 'large' ? 'w-20 h-20' : 'w-14 h-14'} bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-2xl shadow-lg shadow-blue-500/30 mb-4 transform rotate-3`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white w-1/2 h-1/2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
      </div>
      <h1 className={`${size === 'large' ? 'text-4xl' : 'text-2xl'} font-bold tracking-tight text-white`}>
          conecta<span className="text-blue-400 font-light">hub</span>
      </h1>
  </div>
);

const Login: React.FC = () => {
  const { login } = useApp();
  const [step, setStep] = useState<'splash' | 'options' | 'login' | 'register'>('splash');
  
  // Login Form State
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = () => {
      if (!name || !password) {
          setError('Preencha todos os campos');
          return;
      }
      login(name);
  };

  // Splash Screen
  if (step === 'splash') {
    return (
      <BackgroundWrapper>
        <div className="flex-1 flex flex-col justify-center animate-fade-in-up">
            <BrandLogo />
            <p className="text-center text-blue-200/80 mb-12 text-sm max-w-[250px] mx-auto leading-relaxed">
                Conecte-se com sua equipe, acompanhe metas e evolua sua carreira.
            </p>
        </div>

        <div className="space-y-4 mb-8 animate-slide-in-up delay-100">
          <button 
            onClick={() => setStep('login')}
            className="w-full bg-white text-blue-900 font-bold py-4 rounded-2xl shadow-lg shadow-white/10 hover:bg-blue-50 transition-transform active:scale-95"
          >
            Acessar conta
          </button>
          
          <div className="flex items-center justify-center gap-3 py-2">
            <span className="h-px bg-white/20 w-12"></span>
            <span className="text-white/60 text-xs uppercase tracking-widest">ou</span>
            <span className="h-px bg-white/20 w-12"></span>
          </div>

          <button 
            onClick={() => setStep('options')}
            className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold py-4 rounded-2xl hover:bg-white/20 transition-transform active:scale-95"
          >
            Criar nova conta
          </button>
        </div>
      </BackgroundWrapper>
    );
  }

  // Options Screen
  if (step === 'options') {
    return (
      <BackgroundWrapper>
        <button onClick={() => setStep('splash')} className="self-start p-2 -ml-2 rounded-full hover:bg-white/10 transition mb-6">
            <ArrowLeft size={24} />
        </button>

        <h2 className="text-3xl font-bold mb-2">Criar conta</h2>
        <p className="text-blue-200 mb-10">Escolha como deseja iniciar sua jornada.</p>
        
        <div className="space-y-4 flex-1">
          <button className="group w-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm text-white py-4 rounded-2xl text-sm flex items-center px-6 transition-all relative overflow-hidden">
             <div className="absolute inset-0 w-1 bg-gradient-to-b from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <span className="font-bold text-lg mr-4">G</span>
             <span className="font-medium">Continuar com o Google</span>
          </button>
           <button className="group w-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm text-white py-4 rounded-2xl text-sm flex items-center px-6 transition-all relative overflow-hidden">
             <div className="absolute inset-0 w-1 bg-gradient-to-b from-gray-400 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <Apple className="mr-4" size={24} />
             <span className="font-medium">Continuar com a Apple</span>
          </button>
           <button className="group w-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm text-white py-4 rounded-2xl text-sm flex items-center px-6 transition-all relative overflow-hidden">
             <div className="absolute inset-0 w-1 bg-gradient-to-b from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <Facebook className="mr-4" size={24} />
             <span className="font-medium">Continuar com o Facebook</span>
          </button>
           <button 
             onClick={() => setStep('register')}
             className="group w-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm text-white py-4 rounded-2xl text-sm flex items-center px-6 transition-all relative overflow-hidden"
            >
             <div className="absolute inset-0 w-1 bg-gradient-to-b from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <Mail className="mr-4" size={24} />
             <span className="font-medium">Continuar com o Email</span>
          </button>
        </div>
        
        <p className="text-center text-white/40 text-xs mt-6">
            Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.
        </p>
      </BackgroundWrapper>
    );
  }

  // Login Form
  if (step === 'login') {
    return (
      <BackgroundWrapper>
        <button onClick={() => setStep('splash')} className="self-start p-2 -ml-2 rounded-full hover:bg-white/10 transition mb-4">
            <ArrowLeft size={24} />
        </button>

        <BrandLogo size="small" />

        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-2xl animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-6 text-center">Bem-vindo de volta</h2>

            <div className="space-y-4">
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-blue-200 ml-1 uppercase tracking-wider">Usuário</label>
                    <div className="flex items-center bg-black/20 rounded-xl px-4 border border-white/5 focus-within:bg-black/30 focus-within:border-white/20 transition-all">
                        <User size={20} className="text-blue-300 mr-3" />
                        <input 
                            type="text" 
                            placeholder="Digite seu nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-transparent py-4 text-white placeholder-white/30 outline-none"
                        />
                    </div>
                </div>
                
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-blue-200 ml-1 uppercase tracking-wider">Senha</label>
                    <div className="flex items-center bg-black/20 rounded-xl px-4 border border-white/5 focus-within:bg-black/30 focus-within:border-white/20 transition-all">
                        <Lock size={20} className="text-blue-300 mr-3" />
                        <input 
                            type="password" 
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent py-4 text-white placeholder-white/30 outline-none"
                        />
                    </div>
                </div>
                
                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-400"></span>
                        <p className="text-red-200 text-xs">{error}</p>
                    </div>
                )}

                <button 
                    onClick={handleLoginSubmit}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/25 mt-4 hover:shadow-blue-500/40 transition-all active:scale-95"
                >
                    Entrar na conta
                </button>
            </div>
        </div>
        
        <p className="text-center text-white/50 text-sm mt-8 cursor-pointer hover:text-white transition">
            Esqueceu sua senha?
        </p>
      </BackgroundWrapper>
    );
  }

  // Register Form
  if (step === 'register') {
    return (
      <BackgroundWrapper>
         <button onClick={() => setStep('options')} className="self-start p-2 -ml-2 rounded-full hover:bg-white/10 transition mb-2">
            <ArrowLeft size={24} />
         </button>
         
        <h2 className="text-3xl font-bold mb-2">Cadastro</h2>
        <p className="text-blue-200 mb-8">Preencha seus dados para começar.</p>

        <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar pb-4">
             <div className="flex items-center bg-white/5 rounded-xl px-4 border border-white/10">
                <User size={18} className="text-blue-300 mr-3" />
                <input type="text" placeholder="Nome completo" onChange={(e) => setName(e.target.value)} className="w-full bg-transparent py-3.5 text-white placeholder-white/30 outline-none" />
             </div>
             
             <div className="flex items-center bg-white/5 rounded-xl px-4 border border-white/10">
                <Mail size={18} className="text-blue-300 mr-3" />
                <input type="email" placeholder="Email corporativo" className="w-full bg-transparent py-3.5 text-white placeholder-white/30 outline-none" />
             </div>

             <div className="flex items-center bg-white/5 rounded-xl px-4 border border-white/10">
                <FileText size={18} className="text-blue-300 mr-3" />
                <input type="text" placeholder="CPF" className="w-full bg-transparent py-3.5 text-white placeholder-white/30 outline-none" />
             </div>
             
             <div className="flex items-center bg-white/5 rounded-xl px-4 border border-white/10">
                <Lock size={18} className="text-blue-300 mr-3" />
                <input type="password" placeholder="Criar senha" onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent py-3.5 text-white placeholder-white/30 outline-none" />
             </div>
             
             <div className="flex items-center bg-white/5 rounded-xl px-4 border border-white/10">
                <Check size={18} className="text-blue-300 mr-3" />
                <input type="password" placeholder="Confirmar senha" className="w-full bg-transparent py-3.5 text-white placeholder-white/30 outline-none" />
             </div>
        </div>

        <button 
            onClick={handleLoginSubmit}
            className="w-full bg-white text-blue-900 font-bold py-4 rounded-2xl shadow-lg mt-4 hover:bg-blue-50 transition active:scale-95"
        >
            Finalizar Cadastro
        </button>
      </BackgroundWrapper>
    );
  }

  return null;
};

export default Login;
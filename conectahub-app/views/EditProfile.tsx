import React, { useState, useRef } from 'react';
import { useApp } from '../AppContext';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera, User as UserIcon, Briefcase, Mail, Save } from 'lucide-react';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, updateProfile } = useApp();
  
  const [name, setName] = useState(currentUser.name);
  const [role, setRole] = useState(currentUser.role || '');
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API delay
    setTimeout(() => {
      updateProfile({ name, role, avatar });
      setIsSaving(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="bg-blue-900 min-h-screen text-white pb-20 relative flex flex-col">
      {/* Header */}
      <div className="pt-8 px-4 flex items-center justify-between mb-2">
        <button onClick={() => navigate('/dashboard')} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition">
           <ChevronLeft size={28} />
        </button>
        <h1 className="text-xl font-bold">Editar Perfil</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      <div className="flex-1 px-6 pt-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="w-32 h-32 rounded-full border-4 border-white/20 overflow-hidden bg-blue-800 shadow-xl">
              <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <Camera size={32} className="text-white" />
            </div>
            <div className="absolute bottom-0 right-0 bg-blue-500 p-2.5 rounded-full border-4 border-blue-900 shadow-lg">
              <Camera size={18} className="text-white" />
            </div>
          </div>
          <p className="mt-4 text-blue-200 text-sm">Toque para alterar a foto</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        {/* Form Fields */}
        <div className="space-y-6 bg-blue-800/30 p-6 rounded-3xl border border-blue-700/50">
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-blue-300 uppercase tracking-wider ml-1">Nome Completo</label>
            <div className="flex items-center bg-white/10 rounded-xl px-4 border border-white/10 focus-within:bg-white/20 focus-within:border-white/30 transition-all">
              <UserIcon size={20} className="text-blue-300 mr-3" />
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent py-4 outline-none placeholder-blue-300/50 font-medium"
                placeholder="Seu nome"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-blue-300 uppercase tracking-wider ml-1">Cargo / Função</label>
            <div className="flex items-center bg-white/10 rounded-xl px-4 border border-white/10 focus-within:bg-white/20 focus-within:border-white/30 transition-all">
              <Briefcase size={20} className="text-blue-300 mr-3" />
              <input 
                type="text" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-transparent py-4 outline-none placeholder-blue-300/50 font-medium"
                placeholder="Seu cargo"
              />
            </div>
          </div>

           <div className="space-y-2 opacity-60 pointer-events-none">
            <label className="text-xs font-bold text-blue-300 uppercase tracking-wider ml-1">Email (Corporativo)</label>
            <div className="flex items-center bg-white/5 rounded-xl px-4 border border-white/5">
              <Mail size={20} className="text-blue-400 mr-3" />
              <input 
                type="text" 
                value="usuario@conectahub.com.br"
                readOnly
                className="w-full bg-transparent py-4 outline-none text-blue-300"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Save Button */}
      <div className="p-6">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95
            ${isSaving ? 'bg-green-500 text-white' : 'bg-white text-blue-900 hover:bg-gray-100'}
          `}
        >
          {isSaving ? (
            <>Salvando...</>
          ) : (
            <>
              <Save size={20} />
              Salvar Alterações
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
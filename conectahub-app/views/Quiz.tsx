import React, { useState } from 'react';
import { QUIZ_DATA } from '../constants';
import { useApp } from '../AppContext';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const { addPoints } = useApp();
  const [step, setStep] = useState<'intro' | 'question' | 'success'>('intro');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const question = QUIZ_DATA[0];

  const handleAnswer = () => {
    if (selectedOption === question.correctIndex) {
        addPoints(5);
        setStep('success');
    } else {
        alert('Tente novamente!');
    }
  };

  if (step === 'intro') {
      return (
        <div className="bg-blue-900 min-h-screen text-white flex flex-col items-center justify-center p-8 pb-24 relative overflow-hidden">
            <button onClick={() => navigate('/dashboard')} className="absolute top-8 left-4 text-white z-10">
                <ChevronLeft />
            </button>
            
            {/* Background blobs */}
            <div className="absolute top-1/4 -right-10 w-40 h-40 bg-blue-800 rounded-full blur-2xl opacity-50"></div>
            <div className="absolute bottom-1/4 -left-10 w-40 h-40 bg-blue-800 rounded-full blur-2xl opacity-50"></div>

            <div className="bg-gradient-to-br from-blue-800 to-blue-900 p-8 rounded-3xl shadow-2xl border border-blue-700 w-full aspect-square flex flex-col items-center justify-center relative">
                <div className="absolute top-4 right-4 text-white/20">
                     <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
                </div>
                <h2 className="text-2xl font-bold text-center mb-4">Interaja conosco e acumule pontos</h2>
                <button 
                    onClick={() => setStep('question')}
                    className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-2 rounded-full font-bold shadow-lg transition"
                >
                    Inicie
                </button>
                
                {/* Dots */}
                <div className="flex gap-2 mt-8">
                     <div className="w-3 h-3 rounded-full bg-white"></div>
                     <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                     <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                </div>
            </div>
        </div>
      );
  }

  if (step === 'question') {
    return (
        <div className="bg-blue-900 min-h-screen text-white flex flex-col p-6 pb-24">
             <button onClick={() => setStep('intro')} className="mb-8 mt-4 text-white">
                <ChevronLeft />
            </button>

            <div className="bg-white rounded-2xl p-6 text-gray-800 shadow-xl mb-6">
                <p className="text-lg font-medium text-gray-600 mb-2">{question.question}</p>
            </div>

            <div className="space-y-3">
                {question.options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedOption(idx)}
                        className={`w-full text-left p-4 rounded-xl transition ${
                            selectedOption === idx ? 'bg-blue-500 text-white font-bold' : 'bg-white text-gray-600'
                        }`}
                    >
                        {String.fromCharCode(65 + idx)}) {opt}
                    </button>
                ))}
            </div>

            <div className="mt-auto">
                <button 
                    onClick={handleAnswer}
                    disabled={selectedOption === null}
                    className="w-full bg-blue-500 disabled:bg-gray-500 text-white font-bold py-4 rounded-xl shadow-lg"
                >
                    Próximo
                </button>
            </div>
        </div>
    );
  }

  if (step === 'success') {
      return (
        <div className="bg-blue-900 min-h-screen text-white flex flex-col items-center justify-center p-8 pb-24">
             <div className="bg-white rounded-2xl p-10 w-full aspect-square flex flex-col items-center justify-center shadow-2xl animate-fade-in-up">
                <div className="bg-blue-900 rounded-full p-2 mb-4">
                    <CheckCircle size={40} className="text-white" />
                </div>
                <h2 className="text-gray-800 text-xl font-bold mb-2">Resposta certa</h2>
                <h1 className="text-gray-800 text-4xl font-bold mb-2">+ 5 pontos</h1>
             </div>

             <div className="mt-8 w-full">
                <button 
                    onClick={() => {
                        setStep('intro');
                        setSelectedOption(null);
                        navigate('/dashboard');
                    }}
                    className="w-full bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg"
                >
                    Voltar ao Início
                </button>
            </div>
        </div>
      );
  }

  return null;
};

export default Quiz;

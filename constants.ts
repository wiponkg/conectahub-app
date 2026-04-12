import { User, Chat, QuizQuestion, CalendarEvent } from './types';

export const CURRENT_USER_INITIAL: User = {
  id: 'me',
  name: 'Você',
  avatar: 'https://picsum.photos/seed/me/200/200',
  role: 'Desenvolvedor',
  points: 670 // Starting points
};

export const INITIAL_CHATS: Chat[] = [
  {
    id: '1',
    user: { id: 'ceo', name: 'CEO', avatar: 'https://picsum.photos/seed/ceo/200/200', role: 'CEO', points: 0 },
    lastMessage: 'Tudo bem.',
    unread: false,
    messages: [
      { id: '1', senderId: 'ceo', text: 'Boa tarde, vi que o relatório não foi enviado. Aconteceu alguma coisa?', timestamp: '14:00', isMe: false },
      { id: '2', senderId: 'me', text: 'Sim, tive um problema no sistema', timestamp: '14:05', isMe: true },
      { id: '3', senderId: 'ceo', text: 'Você poderia adicionar a cláusula da última reunião?', timestamp: '14:10', isMe: false },
      { id: '4', senderId: 'me', text: 'Tudo bem.', timestamp: '14:12', isMe: true },
    ]
  },
  {
    id: '2',
    user: { id: 'admin', name: 'Grupo do Administrativo', avatar: 'https://picsum.photos/seed/admin/200/200', role: 'Admin', points: 0 },
    lastMessage: 'Sim, tive um problema no sistema',
    unread: true,
    messages: [
        { id: '1', senderId: 'admin', text: 'Pessoal, o sistema voltou?', timestamp: '09:00', isMe: false },
        { id: '2', senderId: 'admin', text: 'Sim, tive um problema no sistema', timestamp: '09:05', isMe: false }
    ]
  },
  {
    id: '3',
    user: { id: 'hr', name: 'Grupo do RH', avatar: 'https://picsum.photos/seed/hr/200/200', role: 'RH', points: 0 },
    lastMessage: 'A reunião foi remarcada.',
    unread: false,
    messages: [
        { id: '1', senderId: 'hr', text: 'A reunião foi remarcada.', timestamp: '11:00', isMe: false }
    ]
  },
  {
    id: '4',
    user: { id: 'dir', name: 'Diretores Executivos', avatar: 'https://picsum.photos/seed/dir/200/200', role: 'Diretoria', points: 0 },
    lastMessage: 'Relatório aprovado.',
    unread: false,
    messages: [
        { id: '1', senderId: 'dir', text: 'Relatório aprovado.', timestamp: '16:30', isMe: false }
    ]
  }
];

export const QUIZ_DATA: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Qual aba concentra o calendário com reuniões, treinamentos e aniversários da empresa?',
    options: ['Feed', 'Calendário', 'Chat', 'Ranking'],
    correctIndex: 1
  }
];

export const RANKING_INITIAL_DATA = [
  { id: '1', name: 'Ana Lima', points: 1340, avatar: 'https://picsum.photos/seed/ana/100', role: 'Design' },
  { id: '2', name: 'Bruno S.', points: 860, avatar: 'https://picsum.photos/seed/bruno/100', role: 'Dev' },
  { id: '3', name: 'Carlos M.', points: 500, avatar: 'https://picsum.photos/seed/carlos/100', role: 'PM' },
];

// Events mapped by day of the month (Dec 2025)
export const CALENDAR_EVENTS: Record<number, CalendarEvent[]> = {
  5: [
      { id: 'e1', title: 'Entrega de Projeto', time: '18:00', type: 'deadline', description: 'Prazo final para entrega do módulo financeiro.' }
  ],
  10: [
      { id: 'e2', title: 'Reunião Administrativa', time: '10:00 - 11:00', type: 'meeting', description: 'Alinhamento mensal de metas e resultados.' },
      { id: 'e3', title: 'Almoço de Equipe', time: '12:00 - 13:30', type: 'social', description: 'Restaurante do térreo.' }
  ],
  16: [
      { id: 'e4', title: 'Reunião RH', time: '10:30 - 11:00', type: 'meeting' }
  ],
  20: [
      { id: 'e5', title: 'Festa de Fim de Ano', time: '19:00', type: 'social', description: 'Confraternização da empresa.' }
  ],
  25: [
      { id: 'e6', title: 'Natal', time: 'Dia todo', type: 'social' }
  ]
};
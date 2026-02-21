export interface User {
  id: string;
  name: string;
  avatar: string;
  role?: string;
  status?: string;
  points: number;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface Chat {
  id: string;
  user: User;
  lastMessage: string;
  unread: boolean;
  messages: Message[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface TimeRecord {
  type: 'entrada' | 'saida';
  timestamp: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  type: 'meeting' | 'social' | 'deadline' | 'reminder';
  description?: string;
}
export interface User {
    id: string;
    name: string;
    avatar: string;
    about?: string;
    phone?: string;
    status?: 'online' | 'offline' | 'away';
    lastSeen?: Date;
  }
  
  export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: Date;
    status: 'sent' | 'delivered' | 'read';
  }
  
  export interface Chat {
    id: string;
    participants: string[]; 
    messages: Message[];
    unreadCount?: number;
    lastMessage?: Message;
  }
  
  export interface Group {
    id: string;
    name: string;
    avatar: string;
    participants: string[]; 
    createdBy: string; 
    createdAt: Date;
  }
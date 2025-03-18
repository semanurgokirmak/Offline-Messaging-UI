import { User, Chat, Message, Group } from '../types';
export const users: User[] = [
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      about: 'Hey there! I am using Offline Messaging.',
      phone: '+90 555 123 4567',
      status: 'online',
    },
    {
      id: '2',
      name: 'Ayşe Demir',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      about: 'Available',
      phone: '+90 555 234 5678',
      status: 'online',
      lastSeen: new Date(),
    },
    {
      id: '3',
      name: 'Mehmet Kaya',
      avatar: 'https://randomuser.me/api/portraits/men/59.jpg',
      phone: '+90 555 345 6789',
      status: 'offline',
      lastSeen: new Date(Date.now() - 3600000), // 1 saat önce
    },
    {
      id: '4',
      name: 'Zeynep Çelik',
      avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
      about: 'At work',
      phone: '+90 555 456 7890',
      status: 'away',
    },
  ];

// Current user - şu anda giriş yapmış kullanıcı
export const currentUser: User = users[0];

// Örnek mesajlar oluşturmak için yardımcı fonksiyon
const createMessage = (
  id: string, 
  senderId: string, 
  receiverId: string, 
  content: string, 
  timestamp: Date,
  status: 'sent' | 'delivered' | 'read' = 'read'
): Message => ({
  id,
  senderId,
  receiverId,
  content,
  timestamp,
  status,
});

// Her sohbet için mesajlar
export const messages: Record<string, Message[]> = {
  'chat1': [
    createMessage('msg1', '2', '1', 'Merhaba, nasılsın?', new Date(Date.now() - 3600000 * 5)),
    createMessage('msg2', '1', '2', 'İyiyim, teşekkür ederim. Sen nasılsın?', new Date(Date.now() - 3600000 * 4)),
    createMessage('msg3', '2', '1', 'Ben de iyiyim. Bugün hava çok güzel!', new Date(Date.now() - 3600000 * 3)),
    createMessage('msg4', '1', '2', 'Evet, gerçekten öyle. Dışarı çıkmayı düşünüyor musun?', new Date(Date.now() - 3600000 * 2)),
    createMessage('msg5', '2', '1', 'Evet, akşam üzeri bir yürüyüş yapabilirim.', new Date(Date.now() - 3600000)),
  ],
  'chat2': [
    createMessage('msg6', '3', '1', 'Proje ile ilgili toplantı yarın saat kaçta?', new Date(Date.now() - 7200000)),
    createMessage('msg7', '1', '3', 'Saat 14:00\'de. Zoom üzerinden yapacağız.', new Date(Date.now() - 3600000)),
    createMessage('msg8', '3', '1', 'Teşekkürler, not aldım.', new Date(Date.now() - 1800000)),
  ],
  'chat3': [
    createMessage('msg9', '1', '4', 'Hafta sonu planın var mı?', new Date(Date.now() - 86400000)),
    createMessage('msg10', '4', '1', 'Henüz kesin değil. Sen ne düşünüyorsun?', new Date(Date.now() - 82800000)),
    createMessage('msg11', '1', '4', 'Belki bir film izleyebiliriz?', new Date(Date.now() - 79200000)),
  ],
};

// Sohbetler
export const chats: Chat[] = [
  {
    id: 'chat1',
    participants: ['1', '2'],
    messages: messages['chat1'],
    lastMessage: messages['chat1'][messages['chat1'].length - 1],
    unreadCount: 0,
  },
  {
    id: 'chat2',
    participants: ['1', '3'],
    messages: messages['chat2'],
    lastMessage: messages['chat2'][messages['chat2'].length - 1],
    unreadCount: 1,
  },
  {
    id: 'chat3',
    participants: ['1', '4'],
    messages: messages['chat3'],
    lastMessage: messages['chat3'][messages['chat3'].length - 1],
    unreadCount: 0,
  },
];

// Sohbetteki diğer katılımcıyı bulmak için yardımcı fonksiyon
export const getOtherParticipant = (chat: Chat): User | undefined => {
  const otherUserId = chat.participants.find(id => id !== currentUser.id);
  return otherUserId ? users.find(user => user.id === otherUserId) : undefined;
};
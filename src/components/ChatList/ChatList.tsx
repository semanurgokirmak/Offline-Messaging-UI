import React from 'react';
import { Chat, User } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

interface ChatListProps {
  chats: Chat[];
  activeChat: string | null;
  setActiveChat: (chatId: string) => void;
  currentUser: User;
  getOtherParticipant: (chat: Chat) => User | undefined;
}

const ChatList: React.FC<ChatListProps> = ({ 
  chats, 
  activeChat, 
  setActiveChat, 
  currentUser,
  getOtherParticipant 
}) => {
  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h5>
          <FontAwesomeIcon icon={faComments} className="icon" />
          Sohbetler
        </h5>
      </div>
      
      <div className="chat-list-body">
        {chats.map(chat => {
          const otherUser = getOtherParticipant(chat);
          if (!otherUser) return null;
          
          return (
            <div 
              key={chat.id}
              className={`chat-list-item ${activeChat === chat.id ? 'active' : ''}`}
              onClick={() => setActiveChat(chat.id)}
            >
              <img 
                src={otherUser.avatar} 
                alt={otherUser.name}
                className="avatar"
              />
              <div className="content">
                <div className="header">
                  <h6 className="name">{otherUser.name}</h6>
                  {chat.lastMessage && (
                    <span className="time">
                      {new Date(chat.lastMessage.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  )}
                </div>
                <div className="message">
                  {chat.lastMessage && (
                    <p>
                      {chat.lastMessage.senderId === currentUser.id ? 'Sen: ' : ''}{chat.lastMessage.content}
                    </p>
                  )}
                  {chat.unreadCount !== undefined && chat.unreadCount > 0 && (
                    <span className="badge">{chat.unreadCount}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
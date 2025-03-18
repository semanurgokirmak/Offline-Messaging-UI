import React, { useState } from 'react';
import { Chat, User, Message } from '../types';
import { chats, currentUser, getOtherParticipant } from '../data/mockData';
import ChatList from '../components/ChatList/ChatList';
import ChatWindow from '../components/ChatWindow/ChatWindow';
import ProfileSidebar from '../components/ProfileSidebar/ProfileSidebar';

const MainLayout: React.FC = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  
  const [showProfile, setShowProfile] = useState<boolean>(false);
  
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [messageText, setMessageText] = useState<string>('');

  const [chatsList, setChatsList] = useState<Chat[]>(chats);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Message[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const activeChatObj = chatsList.find(chat => chat.id === activeChat) || null;

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setShowProfile(true);
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !activeChatObj) return;

    const newMessage: Message = {
      id: `msg${Date.now()}`, 
      senderId: currentUser.id,
      receiverId: getOtherParticipant(activeChatObj)!.id,
      content: messageText,
      timestamp: new Date(),
      status: 'sent' 
    };

    const updatedChats = [...chatsList];
    
    const chatIndex = updatedChats.findIndex(chat => chat.id === activeChat);
    
    if (chatIndex !== -1) {
      updatedChats[chatIndex] = {
        ...updatedChats[chatIndex],
        messages: [...updatedChats[chatIndex].messages, newMessage],
        lastMessage: newMessage
      };
      
      setChatsList(updatedChats);
      
      setMessageText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim() || !activeChatObj) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
  
    const query = searchQuery.toLowerCase();
    const results = activeChatObj.messages.filter(message => 
      message.content.toLowerCase().includes(query)
    );
    
    setSearchResults(results);
    setIsSearching(true);
  };
  
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  const highlightText = (text: string, query: string): React.ReactNode => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    
    return (
      <>
        {parts.map((part, index) => 
          part.toLowerCase() === query.toLowerCase() ? 
            <span key={index} className="bg-warning text-dark">{part}</span> : part
        )}
      </>
    );
  };

  return (
    <div className="container-fluid vh-100 d-flex p-0">
      <ChatList 
        chats={chatsList}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        currentUser={currentUser}
        getOtherParticipant={getOtherParticipant}
      />

      <ChatWindow 
        activeChatObj={activeChatObj}
        currentUser={currentUser}
        getOtherParticipant={getOtherParticipant}
        handleUserSelect={handleUserSelect}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        handleSearch={handleSearch}
        handleSearchKeyPress={handleSearchKeyPress}
        clearSearch={clearSearch}
        highlightText={highlightText}
        messageText={messageText}
        setMessageText={setMessageText}
        handleSendMessage={handleSendMessage}
        handleKeyPress={handleKeyPress}
      />

      {showProfile && selectedUser && (
        <ProfileSidebar 
          user={selectedUser}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;
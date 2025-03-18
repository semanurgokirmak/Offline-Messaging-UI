import React from 'react';
import { Chat, User, Message } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';import MessageInput from '..//MessageInput/MessageInput';

interface ChatWindowProps {
  activeChatObj: Chat | null;
  currentUser: User;
  getOtherParticipant: (chat: Chat) => User | undefined;
  handleUserSelect: (user: User) => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchResults: Message[];
  isSearching: boolean;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearch: () => void;
  handleSearchKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  clearSearch: () => void;
  highlightText: (text: string, query: string) => React.ReactNode;
  messageText: string;
  setMessageText: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  activeChatObj,
  currentUser,
  getOtherParticipant,
  handleUserSelect,
  searchQuery,
  setSearchQuery,
  searchResults,
  isSearching,
  setIsSearching,
  handleSearch,
  handleSearchKeyPress,
  clearSearch,
  highlightText,
  messageText,
  setMessageText,
  handleSendMessage,
  handleKeyPress
}) => {
  if (!activeChatObj) {
    return (
      <div className="col d-flex flex-column p-0">
        <div className="d-flex align-items-center justify-content-center h-100 bg-light">
          <p className="text-muted">Sohbet başlatmak için bir kişi seçin</p>
        </div>
      </div>
    );
  }

  const otherUser = getOtherParticipant(activeChatObj)!;

  return (
    <div className="col d-flex flex-column p-0">
      <div className="p-3 border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          {/* Sohbet başlığı - diğer kullanıcının adı */}
          <div 
            className="d-flex align-items-center" 
            style={{ cursor: 'pointer' }}
            onClick={() => handleUserSelect(otherUser)}
          >
            <img 
              src={otherUser.avatar} 
              alt={otherUser.name}
              className="rounded-circle me-2"
              width="40"
              height="40"
            />
            <h5 className="mb-0">{otherUser.name}</h5>
          </div>
          
          {/* Arama butonu ve input */}
          <div className="d-flex align-items-center">
            {isSearching ? (
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control form-control-sm" 
                  placeholder="Ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                />
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handleSearch}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
                <button 
                  className="btn btn-outline-danger btn-sm"
                  onClick={clearSearch}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ) : (
              <button 
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setIsSearching(true)}
              >
                <FontAwesomeIcon icon={faSearch} /> Ara
              </button>
            )}
          </div>
        </div>
        
        {/* Arama sonuçları sayısı */}
        {isSearching && searchResults.length > 0 && (
          <div className="mt-2 small text-muted">
            {searchResults.length} sonuç bulundu. <button className="btn btn-link btn-sm p-0" onClick={clearSearch}>Temizle</button>
          </div>
        )}
      </div>
      
      <div className="flex-grow-1 overflow-auto p-3" style={{ backgroundColor: '#f5f5f5' }}>
        {/* Eğer arama yapılıyorsa, arama sonuçlarını göster */}
        {isSearching ? (
          searchResults.length > 0 ? (
            searchResults.map(message => (
              <div 
                key={message.id}
                className={`mb-3 ${message.senderId === currentUser.id ? 'text-end' : 'text-start'}`}
              >
                <div 
                  className={`d-inline-block p-2 rounded-3 ${
                    message.senderId === currentUser.id 
                      ? 'bg-primary text-white' 
                      : 'bg-white'
                  }`}
                  style={{ maxWidth: '75%' }}
                >
                  {/* Aranan kelimeyi vurgulama */}
                  {highlightText(message.content, searchQuery)}
                </div>
                <div className="text-muted small mt-1">
                  {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center my-5">
              <p className="text-muted">"{searchQuery}" için sonuç bulunamadı.</p>
            </div>
          )
        ) : (
          // Arama yapılmıyorsa tüm mesajları göster
          activeChatObj.messages.map(message => (
            <div 
              key={message.id}
              className={`mb-3 ${message.senderId === currentUser.id ? 'text-end' : 'text-start'}`}
            >
              <div 
                className={`d-inline-block p-2 rounded-3 ${
                  message.senderId === currentUser.id 
                    ? 'bg-primary text-white' 
                    : 'bg-white'
                }`}
                style={{ maxWidth: '75%' }}
              >
                {message.content}
              </div>
              <div className="text-muted small mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          ))
        )}
      </div>
      
      <MessageInput 
        messageText={messageText}
        setMessageText={setMessageText}
        handleSendMessage={handleSendMessage}
        handleKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default ChatWindow;
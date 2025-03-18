import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface MessageInputProps {
  messageText: string;
  setMessageText: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  messageText,
  setMessageText,
  handleSendMessage,
  handleKeyPress
}) => {
  return (
    <div className="p-3 border-top">
      <div className="input-group">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Mesaj yazın..." 
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="btn btn-primary"
          onClick={handleSendMessage}
        >
          <FontAwesomeIcon icon={faPaperPlane} /> Gönder
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
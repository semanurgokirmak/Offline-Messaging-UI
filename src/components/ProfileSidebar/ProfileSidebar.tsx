import React from 'react';
import { User } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faPhone } from '@fortawesome/free-solid-svg-icons';

interface ProfileSidebarProps {
  user: User;
  onClose: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ user, onClose }) => {
  return (
    <div className="col-md-3 border-start bg-white">
      <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Profil Bilgileri</h5>
        <button 
          className="btn-close" 
          onClick={onClose}
          aria-label="Close"
        ></button>
      </div>
      <div className="p-4 text-center">
        <img 
          src={user.avatar} 
          alt={user.name}
          className="rounded-circle mb-3"
          width="100"
          height="100"
        />
        <h4>{user.name}</h4>
        <p className="text-muted">
          {user.status === 'online' ? 'Çevrimiçi' : 
           user.status === 'away' ? 'Uzakta' : 
           'Son görülme: ' + (user.lastSeen ? new Date(user.lastSeen).toLocaleTimeString() : 'Bilinmiyor')}
        </p>
      </div>
      <div className="p-3 border-top">
        <h6><FontAwesomeIcon icon={faInfoCircle} className="me-2" />Hakkında</h6>
        <p>{user.about || 'Hakkında bilgisi bulunmuyor'}</p>
      </div>
      <div className="p-3 border-top">
        <h6><FontAwesomeIcon icon={faPhone} className="me-2" />Telefon</h6>
        <p>{user.phone || 'Telefon bilgisi bulunmuyor'}</p>
      </div>
    </div>
  );
};

export default ProfileSidebar;
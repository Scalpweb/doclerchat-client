import React from 'react';
import IconButton from 'components/iconButton/IconButton';
import styles from './HeaderBar.module.scss';

interface Props {
  showSettingsButton: boolean;
  showChatButton: boolean;
  onClickSettings: () => void;
  onClickChat: () => void;
  unreadCount?: number;
}

const HeaderBar = (props: Props) => {
  return (
    <div className={styles.headerBar}>
      <div className={styles.title}>Docler Chat</div>
      {props.showChatButton && (
        <div className="pull-left">
          <IconButton onClick={props.onClickChat} icon="chat" counter={props.unreadCount || 0} />
        </div>
      )}
      {props.showSettingsButton && (
        <div className="pull-right">
          <IconButton onClick={props.onClickSettings} icon="settings" />
        </div>
      )}
    </div>
  );
};

export default HeaderBar;

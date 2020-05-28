import React, {useState, useRef, useContext} from 'react';
import Picker, {IEmojiData} from 'emoji-picker-react';
import {SocketContext} from 'components/socketContextGate/SocketContextGate';
import IconButton from '../iconButton/IconButton';
import {SettingsContext} from 'components/settingsContextGate/SettingsContextGate';

const MessageField = () => {
  const socket = useRef(useContext(SocketContext));
  const settings = useRef(useContext(SettingsContext));

  const [message, setMessage] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const sendMessage = () => {
    socket.current.send('write', message);
    setMessage('');
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.keyCode === 13 && settings.current.fetch().enableControlEnter === 'on') {
        sendMessage();
      }
    }
  };

  const pickEmoji = (_: Event, emoji: IEmojiData) => {
    setMessage((m) => m + emoji.emoji);
    setShowPicker(false);
  };

  return (
    <>
      {showPicker && <Picker onEmojiClick={pickEmoji} />}
      <textarea
        value={message}
        onKeyUp={handleKeyUp}
        onChange={(e) => setMessage(e.currentTarget.value)}
      />
      <div className="pull-left">
        <IconButton icon="insert_emoticon" onClick={() => setShowPicker((s) => !s)} />
      </div>
      <div className="pull-right">
        <IconButton icon="send" onClick={sendMessage} />
      </div>
    </>
  );
};

export default MessageField;

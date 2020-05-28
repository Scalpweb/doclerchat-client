import React, {useEffect, useState, useRef, useContext} from 'react';
import {SettingsContext} from 'components/settingsContextGate/SettingsContextGate';
import SocketManager, {Messages} from '../../utils/socket';
import Loader from 'components/loader/Loader';
import {makeTabBlink} from '../../utils/utils';

export interface SocketContextProps {
  send: (type: string, json: string) => void;
}

export const SocketContext = React.createContext<SocketContextProps>({
  send: () => {
    return;
  }
});

interface Props {
  children: (messages: Messages[], unread: number, resetUnreadCount: () => void) => React.ReactNode;
}

const SocketContextGate = ({children}: Props) => {
  const context = useRef(useContext(SettingsContext));

  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const update = () => {
    context.current.storeOne('username', SocketManager.getInstance().getUsername());
    setMessages([...SocketManager.getInstance().getMessages()]);
    setConnected(SocketManager.getInstance().isConnected());
    setUnreadCount((u) => u + 1);
    makeTabBlink();
  };

  const sendMessage = (type: string, data: string) => {
    SocketManager.getInstance().send(type, data);
  };

  useEffect(() => {
    SocketManager.getInstance().init(context.current.fetch().username);
    SocketManager.getInstance().addListener(update);
    update();
    return () => {
      SocketManager.getInstance().removeListener(update);
    };
  }, []);

  const resetUnreadCount = () => {
    setUnreadCount(0);
  };

  if (!connected) {
    return <Loader />;
  }

  return (
    <SocketContext.Provider value={{send: sendMessage}}>
      {children(messages, unreadCount, resetUnreadCount)}
    </SocketContext.Provider>
  );
};

export default SocketContextGate;

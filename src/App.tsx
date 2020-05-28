import React, {useState} from 'react';
import Message from 'components/message/Message';
import HeaderBar from 'components/headerBar/HeaderBar';
import MessageBoard from './components/messageBoard/MessageBoard';
import FooterBar from 'components/footerBar/FooterBar';
import SettingsBoard from './components/settingsBoard/SettingsBoard';
import SettingsContextGate, {Settings} from './components/settingsContextGate/SettingsContextGate';
import TranslationContextGate from './components/translationContextGate/TranslationContextGate';
import SocketContextGate from './components/socketContextGate/SocketContextGate';
import MessageField from './components/messageField/MessageField';
import {Messages} from './utils/socket';
import './App.scss';

const PAGES = {
  CHAT: 'chat',
  SETTINGS: 'settings'
};

const App = () => {
  const [page, setPage] = useState(PAGES.CHAT);

  const renderChatPage = (messages: Messages[], settings: Settings) => {
    return (
      <>
        <MessageBoard>
          {messages.map((msg, i) => (
            <Message
              key={i}
              me={msg.from === 'me'}
              info={msg.from === 'info'}
              postedAt={msg.date}
              author={msg.author}
              message={msg.message}
              hour12={settings.clockDisplay === '12'}
            />
          ))}
        </MessageBoard>
        <FooterBar>
          <MessageField />
        </FooterBar>
      </>
    );
  };

  const renderSettingPage = (settings: Settings) => {
    return (
      <>
        <SettingsBoard settings={settings} />
        <FooterBar>{}</FooterBar>
      </>
    );
  };

  return (
    <TranslationContextGate>
      {(_: string) => {
        return (
          <SettingsContextGate>
            {(settings: Settings) => {
              return (
                <SocketContextGate>
                  {(messages: Messages[], unread: number, resetUnreadCount: () => void) => {
                    return (
                      <div className={`full-height theme-${settings.interfaceColor}`}>
                        <HeaderBar
                          onClickChat={() => {
                            setPage(PAGES.CHAT);
                          }}
                          onClickSettings={() => {
                            setPage(PAGES.SETTINGS);
                            resetUnreadCount();
                          }}
                          showChatButton={page !== PAGES.CHAT}
                          showSettingsButton={page !== PAGES.SETTINGS}
                          unreadCount={unread}
                        />
                        {page === PAGES.CHAT && renderChatPage(messages, settings)}
                        {page === PAGES.SETTINGS && renderSettingPage(settings)}
                      </div>
                    );
                  }}
                </SocketContextGate>
              );
            }}
          </SettingsContextGate>
        );
      }}
    </TranslationContextGate>
  );
};

export default App;

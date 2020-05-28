import React from 'react';
import {t} from 'components/translationContextGate/TranslationContextGate';
import styles from './Message.module.scss';
import {parseUrls} from '../../utils/utils';

interface Props {
  me?: boolean;
  info?: boolean;
  author: string;
  message: string;
  postedAt: Date;
  hour12: boolean;
}

const Message = ({me, info, author, message, postedAt, hour12}: Props) => {
  const formatMessage = (msg: string) => {
    if (info) {
      msg = msg.replace(/\$t\[(.*)\]/gim, (_, c) => t(c));
    } else {
      return parseUrls(msg);
    }
    return msg;
  };

  return (
    <div className={me ? styles.me : info ? styles.info : undefined}>
      <div className={styles.meta}>
        {author},{' '}
        {postedAt.toLocaleTimeString(navigator.language, {
          hour: '2-digit',
          minute: '2-digit',
          hour12: hour12
        })}
      </div>
      <div className={styles.message}>
        {message.split('\n').map((line, i) => (
          <span key={`line-${i}`}>
            {formatMessage(line)}
            <br />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Message;

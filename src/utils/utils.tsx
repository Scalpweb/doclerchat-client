import React from 'react';
import Emoji from 'react-emoji-render';
import {t} from 'components/translationContextGate/TranslationContextGate';

const urlRegex = /(https?:\/\/[^\s]+)/g;
const youtubeRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
const imageRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;

export const decorateUrl = (url: string) => {
  if (!url.match(urlRegex)) {
    return <Emoji key={url} text={url} />;
  }

  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch && youtubeMatch[2].length === 11) {
    const code = youtubeMatch[2];
    return (
      <iframe
        key={url}
        width="560"
        height="315"
        src={'https://www.youtube.com/embed/' + code}
        frameBorder={0}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  if (imageRegex.test(url)) {
    return (
      <a key={url} href={url} target="_blank" rel="noopener noreferrer">
        <img src={url} style={{maxWidth: '50vw'}} />
      </a>
    );
  }

  return (
    <a key={url} href={url} target="_blank" rel="noopener noreferrer">
      {url}
    </a>
  );
};

export const parseUrls = (text: string): React.ReactElement => {
  return (
    <span>
      {text.split(urlRegex).reduce((prev, current, i) => {
        if (!i) {
          return [decorateUrl(current)];
        }
        return prev.concat(decorateUrl(current));
      }, [])}
    </span>
  );
};

export const makeTabBlink = (() => {
  const oldTitle = document.title;
  const msg = t('newMessage');
  let timeoutId: number;

  const blink = function () {
    document.title = document.title === msg ? ' ' : msg;
  };

  const clear = function () {
    clearInterval(timeoutId);
    document.title = oldTitle;
    window.onmousemove = null;
    timeoutId = null;
  };

  return function () {
    if (!timeoutId) {
      timeoutId = window.setInterval(blink, 750); // Using `window` prefix is important for type checking
      window.onmousemove = clear;
    }
  };
})();

import React, {useRef, useEffect, useLayoutEffect} from 'react';
import styles from './MessageBoard.module.scss';

interface Props {
  children: React.ReactNode;
}

const MessageBoard = ({children}: Props) => {
  const boardElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boardElement.current && boardElement.current.lastChild) {
      (boardElement.current.lastChild as HTMLDivElement).scrollIntoView({behavior: 'smooth'});
    }
  }, [children]);

  return (
    <div className={styles.container} ref={boardElement}>
      {children}
    </div>
  );
};

export default MessageBoard;

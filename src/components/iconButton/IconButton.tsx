import React from 'react';
import styles from './IconButton.module.scss';

interface Props {
  icon: string;
  counter?: number;
  onClick?: () => void;
}

const IconButton = ({icon, counter, onClick}: Props) => {
  const clickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };
  return (
    <a href="#" className={styles.iconButton} onClick={clickHandler}>
      <span className="material-icons">{icon}</span>
      {counter > 0 && (
        <div className={styles.counter}>
          <em>{counter}</em>
        </div>
      )}
    </a>
  );
};

export default IconButton;

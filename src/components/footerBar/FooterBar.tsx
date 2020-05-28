import React from 'react';
import IconButton from 'components/iconButton/IconButton';
import styles from './FooterBar.module.scss';

interface Props {
  children: React.ReactNode;
}

const FooterBar = ({children}: Props) => {
  return <div className={styles.footerBar}>{children}</div>;
};

export default FooterBar;

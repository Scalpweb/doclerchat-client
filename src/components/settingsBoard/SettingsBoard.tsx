import React, {useRef, useContext, useEffect} from 'react';
import {
  SettingsContext,
  Settings,
  defaultSettings
} from 'components/settingsContextGate/SettingsContextGate';
import styles from './SettingsBoard.module.scss';
import {SocketContext} from 'components/socketContextGate/SocketContextGate';
import {TranslationContext, t} from 'components/translationContextGate/TranslationContextGate';

interface Props {
  settings: Settings;
}

const SettingsBoard = ({settings}: Props) => {
  const translation = useRef(useContext(TranslationContext));
  const context = useRef(useContext(SettingsContext));
  const socket = useRef(useContext(SocketContext));

  const updateSettings = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const fieldName = e.currentTarget.name;
    const value = e.currentTarget.value;
    context.current.store({
      ...settings,
      [fieldName]: value
    });
    if (fieldName === 'language') {
      translation.current.setLanguage(value);
    }
  };

  const updateUsername = (e: React.FocusEvent<HTMLInputElement>) => {
    context.current.storeOne('username', e.currentTarget.value);
    socket.current.send('username', e.currentTarget.value);
  };

  const resetDefaults = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    context.current.store(defaultSettings);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.field}>
          <label>{t('username')}</label>
          <input
            name="username"
            onChange={updateSettings}
            onBlur={updateUsername}
            type="text"
            value={settings.username}
          />
        </div>
        <div className={styles.field}>
          <label>{t('interfaceColor')}</label>
          <div className={styles.radio}>
            <input
              name="interfaceColor"
              onChange={updateSettings}
              type="radio"
              value="light"
              checked={settings.interfaceColor === 'light'}
            />{' '}
            {t('light')}
          </div>
          <div className={styles.radio}>
            <input
              name="interfaceColor"
              onChange={updateSettings}
              type="radio"
              value="dark"
              checked={settings.interfaceColor === 'dark'}
            />{' '}
            {t('dark')}
          </div>
        </div>
        <div className={styles.field}>
          <label>{t('clockDisplay')}</label>
          <div className={styles.radio}>
            <input
              name="clockDisplay"
              onChange={updateSettings}
              type="radio"
              value="12"
              checked={settings.clockDisplay === '12'}
            />{' '}
            12
          </div>
          <div className={styles.radio}>
            <input
              name="clockDisplay"
              onChange={updateSettings}
              type="radio"
              value="24"
              checked={settings.clockDisplay === '24'}
            />{' '}
            24
          </div>
        </div>
        <div className={styles.field}>
          <label>{t('sendOnCtrl')}</label>
          <div className={styles.radio}>
            <input
              name="enableControlEnter"
              onChange={updateSettings}
              type="radio"
              value="on"
              checked={settings.enableControlEnter === 'on'}
            />{' '}
            {t('on')}
          </div>
          <div className={styles.radio}>
            <input
              name="enableControlEnter"
              onChange={updateSettings}
              type="radio"
              value="off"
              checked={settings.enableControlEnter === 'off'}
            />{' '}
            {t('off')}
          </div>
        </div>
        <div className={styles.field}>
          <label>{t('language')}</label>
          <select name="language" onChange={updateSettings} value={settings.language}>
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
        <div className={styles.field}>
          <button onClick={resetDefaults}>{t('resetDefault')}</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsBoard;

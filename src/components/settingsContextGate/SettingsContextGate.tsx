import React, {useState, useEffect, useRef, useContext} from 'react';
import {TranslationContext} from 'components/translationContextGate/TranslationContextGate';

export interface Settings {
  username: string;
  interfaceColor: 'light' | 'dark';
  clockDisplay: '12' | '24';
  enableControlEnter: 'on' | 'off';
  language: string;
}

export const defaultSettings: Settings = {
  username: 'John Doe',
  interfaceColor: 'light',
  clockDisplay: '12',
  enableControlEnter: 'off',
  language: 'en'
};

export interface SettingsContextProps {
  fetch: () => Settings;
  store: (settings: Settings) => void;
  storeOne: (key: string, value: string | boolean) => void;
}

export const SettingsContext = React.createContext<SettingsContextProps>({
  fetch: () => defaultSettings,
  store: () => {
    return;
  },
  storeOne: () => {
    return;
  }
});

const STORAGE_KEY = 'doclerChatSettings';

interface Props {
  children: (settings: Settings) => React.ReactNode;
}

const fetchSettings = () => {
  const savedSettings = window.localStorage.getItem(STORAGE_KEY);
  if (savedSettings) {
    return JSON.parse(savedSettings);
  }
  return defaultSettings;
};

const SettingsContextGate = ({children}: Props) => {
  const translation = useRef(useContext(TranslationContext));
  const [settings, setSettings] = useState<Settings>(fetchSettings());

  const storeSettings = (newSettings: Settings) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    setSettings({...newSettings});
  };

  const storeOneSettings = (key: string, value: string) => {
    storeSettings({...fetchSettings(), [key]: value});
  };

  useEffect(() => {
    translation.current.setLanguage(fetchSettings()['language']);
  }, []);

  return (
    <SettingsContext.Provider
      value={{fetch: fetchSettings, store: storeSettings, storeOne: storeOneSettings}}>
      {children(settings)}
    </SettingsContext.Provider>
  );
};

export default SettingsContextGate;

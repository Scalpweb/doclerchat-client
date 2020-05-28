import React, {useState} from 'react';

let currentLang = 'en';
const translations = {
  en: {
    resetDefault: 'Reset Defaults',
    username: 'Username',
    interfaceColor: 'Interface color',
    clockDisplay: 'Clock display',
    sendOnCtrl: 'Send message on Ctrl+Enter',
    language: 'Language',
    on: 'On',
    off: 'Off',
    light: 'Light',
    dark: 'Dark',
    justConnected: 'Just connected',
    hasLeft: 'Has just left',
    aka: 'Now known as',
    yaka: 'Your username is now',
    newMessage: 'New message'
  },
  fr: {
    resetDefault: 'Valeur par défaut',
    username: 'Pseudo',
    interfaceColor: "Couleur de l'interface",
    clockDisplay: "Affichage de l'heure",
    sendOnCtrl: 'Envoyer avec Ctrl+Enter',
    language: 'Langue',
    on: 'On',
    off: 'Off',
    light: 'Clair',
    dark: 'Sombre',
    justConnected: 'Vient de se connecter',
    hasLeft: 'Vient de se déconnecter',
    aka: "S'appelle maintenant",
    yaka: 'Votre pseudo est désormais',
    newMessage: 'Nouveau message'
  }
};

export const t = (key: string) => {
  if (!translations[currentLang][key]) {
    return key;
  }
  return translations[currentLang][key];
};

export interface TranslationContextProps {
  setLanguage: (lang: string) => void;
}

export const TranslationContext = React.createContext<TranslationContextProps>({
  setLanguage: () => {
    return;
  }
});

interface Props {
  children: (lg: string) => React.ReactNode;
}

const TranslationContextGate = ({children}: Props) => {
  const [lg, setLg] = useState('en');

  const changeLanguage = (lang: string) => {
    setLg(lang);
    currentLang = lang;
  };

  return (
    <TranslationContext.Provider value={{setLanguage: changeLanguage}}>
      {children(lg)}
    </TranslationContext.Provider>
  );
};

export default TranslationContextGate;

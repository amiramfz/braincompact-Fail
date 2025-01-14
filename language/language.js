import React, { createContext, useState } from 'react';

// ایجاد Context
export const LanguageContext = createContext();

// ایجاد LanguageProvider
export const LanguageProvider = ({ children }) => {
  const [lan, setLan] = useState(true); // false = فارسی، true = انگلیسی

  const toggleLanguage = () => {
    setLan(prevLan => !prevLan);
  };

  return (
    <LanguageContext.Provider value={{ lan, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

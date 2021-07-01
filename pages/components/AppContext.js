import React, { createContext, useContext, useState } from 'react';

export const AppContext = createContext({
});

export function AppWrapper({ children }) {
  const [uid, setUid] = useState(0);
  const [photoUrl, setPhotoUrl] = useState(0);

  return (
    <AppContext.Provider value={{
      uid, photoUrl, setPhotoUrl, setUid,
    }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);

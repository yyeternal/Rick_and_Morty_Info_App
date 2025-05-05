import React, { createContext, useContext, useState, ReactNode } from 'react';

type FavoritesContextType = {
    favorites: number[];
    toggleFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
  };

  const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

  export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<number[]>([]);
  
    const toggleFavorite = (id: number) => {
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
      );
    };
  
    const isFavorite = (id: number) => favorites.includes(id);
  
    return (
      <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
        {children}
      </FavoritesContext.Provider>
    );
  };
  
  export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
    return context;
  };
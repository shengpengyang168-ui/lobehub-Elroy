'use client';

import { type ReactNode } from 'react';
import { createContext, memo, use, useCallback, useMemo, useState } from 'react';

export type FaviconState = 'default' | 'done' | 'error' | 'progress';

interface FaviconStateContextValue {
  currentState: FaviconState;
  isDevMode: boolean;
}

interface FaviconSettersContextValue {
  setFavicon: (state: FaviconState) => void;
  setIsDevMode: (isDev: boolean) => void;
}

const FaviconStateContext = createContext<FaviconStateContextValue | null>(null);
const FaviconSettersContext = createContext<FaviconSettersContextValue | null>(null);

export const useFaviconState = () => {
  const context = use(FaviconStateContext);
  if (!context) {
    throw new Error('useFaviconState must be used within FaviconProvider');
  }
  return context;
};

export const useFaviconSetters = () => {
  const context = use(FaviconSettersContext);
  if (!context) {
    throw new Error('useFaviconSetters must be used within FaviconProvider');
  }
  return context;
};

const stateToFileName: Record<FaviconState, string> = {
  default: '',
  done: '-done',
  error: '-error',
  progress: '-progress',
};

const getFaviconPath = (_state: FaviconState, _isDev: boolean, _size?: '32x32'): string => {
  return '/favicon.svg';
};

const updateFaviconDOM = (state: FaviconState, isDev: boolean) => {
  if (typeof document === 'undefined') return;

  const head = document.head;
  const existingLinks = document.querySelectorAll<HTMLLinkElement>(
    'link[rel="icon"], link[rel="shortcut icon"]',
  );

  if (existingLinks.length === 0) {
    const iconLink = document.createElement('link');
    iconLink.rel = 'icon';
    iconLink.type = 'image/svg+xml';
    iconLink.href = `${getFaviconPath(state, isDev)}?v=${Date.now()}`;
    head.append(iconLink);

    const shortcutLink = document.createElement('link');
    shortcutLink.rel = 'shortcut icon';
    shortcutLink.type = 'image/svg+xml';
    shortcutLink.href = `${getFaviconPath(state, isDev)}?v=${Date.now()}`;
    head.append(shortcutLink);
    return;
  }

  existingLinks.forEach((link) => {
    const rel = link.rel;

    link.remove();

    const newLink = document.createElement('link');
    newLink.rel = rel;
    newLink.type = 'image/svg+xml';
    newLink.href = `${getFaviconPath(state, isDev)}?v=${Date.now()}`;
    head.append(newLink);
  });
};

const defaultIsDev = process.env.NODE_ENV === 'development';

export const FaviconProvider = memo<{ children: ReactNode }>(({ children }) => {
  const [currentState, setCurrentState] = useState<FaviconState>('default');
  const [isDevMode, setIsDevModeState] = useState<boolean>(defaultIsDev);

  const setFavicon = useCallback((state: FaviconState) => {
    setCurrentState(state);
    setIsDevModeState((isDev) => {
      updateFaviconDOM(state, isDev);
      return isDev;
    });
  }, []);

  const setIsDevMode = useCallback((isDev: boolean) => {
    setIsDevModeState(isDev);
    setCurrentState((state) => {
      updateFaviconDOM(state, isDev);
      return state;
    });
  }, []);

  const stateValue = useMemo(() => ({ currentState, isDevMode }), [currentState, isDevMode]);

  const settersValue = useMemo(() => ({ setFavicon, setIsDevMode }), [setFavicon, setIsDevMode]);

  return (
    <FaviconStateContext value={stateValue}>
      <FaviconSettersContext value={settersValue}>{children}</FaviconSettersContext>
    </FaviconStateContext>
  );
});

FaviconProvider.displayName = 'FaviconProvider';

import React from 'react';

export interface LayoutContextProps {
  sideShow: boolean;
  sideHook: {
    showSide: (bol: boolean) => void;
  };
}

export const LayoutContext = React.createContext<LayoutContextProps>({
  sideShow: false,
  sideHook: {
    showSide: () => null
  }
});

export enum TAG_NAME {
  HEADER = 'header',
  FOOTER = 'footer',
  MAIN = 'main',
  SECTION = 'section'
}
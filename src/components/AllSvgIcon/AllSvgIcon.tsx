import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const Eye = () => (
  <SvgXml
    xml={`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12C22 12 19 18 12 18C5 18 2 12 2 12C2 12 5 6 12 6C19 6 22 12 22 12Z" stroke="#6A1616" stroke-linecap="round"/>
    <circle cx="12" cy="12" r="3" stroke="#6A1616" stroke-linecap="round"/>
    </svg>
    `}
  />
);

export const EyeDisable = () => (
  <SvgXml
    xml={`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 12C22 12 19 18 12 18C5 18 2 12 2 12C2 12 5 6 12 6C19 6 22 12 22 12Z" stroke="#6A1616" stroke-linecap="round"/>
      <circle cx="12" cy="12" r="3" stroke="#6A1616" stroke-linecap="round"/>
      <path d="M3 21L20 4" stroke="#6A1616" stroke-linecap="round"/>
      </svg>      
      `}
  />
);

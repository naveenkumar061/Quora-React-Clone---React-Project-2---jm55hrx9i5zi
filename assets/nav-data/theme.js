import DarkThemeImg from '../themes/DarkThemeImg';
import LightThemeImg from '../themes/LightThemeImg';
import SytemThemeImg from '../themes/SystemThemeImg';

export const themes = [
  { name: 'Light', ThemeImage: LightThemeImg },
  { name: 'Dark', ThemeImage: DarkThemeImg },
  {
    name: 'Auto',
    ThemeImage: SytemThemeImg,
    description:
      'Select this theme to apply your system settings if supported.',
  },
];

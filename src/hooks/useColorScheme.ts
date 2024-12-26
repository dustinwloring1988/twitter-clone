import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ColorScheme = 'blue' | 'purple' | 'pink' | 'orange';

interface ColorSchemeState {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  getAccentColor: () => string;
}

export const useColorScheme = create<ColorSchemeState>()(
  persist(
    (set, get) => ({
      colorScheme: 'blue',
      setColorScheme: (scheme) => set({ colorScheme: scheme }),
      getAccentColor: () => {
        const scheme = get().colorScheme;
        switch (scheme) {
          case 'purple':
            return 'rgb(168, 85, 247)'; // Tailwind purple-500
          case 'pink':
            return 'rgb(236, 72, 153)'; // Tailwind pink-500
          case 'orange':
            return 'rgb(249, 115, 22)'; // Tailwind orange-500
          case 'blue':
          default:
            return 'rgb(59, 130, 246)'; // Tailwind blue-500
        }
      }
    }),
    {
      name: 'color-scheme-storage'
    }
  )
); 
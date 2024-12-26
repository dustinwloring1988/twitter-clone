import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FontSize = 'small' | 'medium' | 'large' | 'x-large';

interface AccessibilityState {
  fontSize: FontSize;
  reduceMotion: boolean;
  increaseContrast: boolean;
  coloredHashtags: boolean;
  inlineLinks: boolean;
  setFontSize: (size: FontSize) => void;
  setReduceMotion: (reduce: boolean) => void;
  setIncreaseContrast: (increase: boolean) => void;
  setColoredHashtags: (colored: boolean) => void;
  setInlineLinks: (enabled: boolean) => void;
  getFontSizeClass: () => string;
}

export const useAccessibility = create<AccessibilityState>()(
  persist(
    (set, get) => ({
      fontSize: 'medium',
      reduceMotion: false,
      increaseContrast: false,
      coloredHashtags: true,
      inlineLinks: true,
      setFontSize: (size) => set({ fontSize: size }),
      setReduceMotion: (reduce) => set({ reduceMotion: reduce }),
      setIncreaseContrast: (increase) => set({ increaseContrast: increase }),
      setColoredHashtags: (colored) => set({ coloredHashtags: colored }),
      setInlineLinks: (enabled) => set({ inlineLinks: enabled }),
      getFontSizeClass: () => {
        const size = get().fontSize;
        switch (size) {
          case 'small':
            return 'text-sm';
          case 'large':
            return 'text-lg';
          case 'x-large':
            return 'text-xl';
          case 'medium':
          default:
            return 'text-base';
        }
      }
    }),
    {
      name: 'accessibility-storage'
    }
  )
); 
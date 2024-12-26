import { useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

export function ThemeInitializer() {
  const { isDark } = useTheme();

  useEffect(() => {
    // Apply theme immediately on mount
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return null;
} 
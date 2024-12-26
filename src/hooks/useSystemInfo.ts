import { useState, useEffect } from 'react';

interface SystemInfo {
  operatingSystem: string;
  display: string;
  language: string;
  browser: string;
  isOnline: boolean;
  cpuCores: number;
}

export function useSystemInfo() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    operatingSystem: 'Unknown',
    display: 'Unknown',
    language: 'Unknown',
    browser: 'Unknown',
    isOnline: true,
    cpuCores: 1,
  });

  useEffect(() => {
    function getOperatingSystem() {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.includes('win')) return 'Windows';
      if (userAgent.includes('mac')) return 'macOS';
      if (userAgent.includes('linux')) return 'Linux';
      if (userAgent.includes('android')) return 'Android';
      if (userAgent.includes('ios')) return 'iOS';
      return 'Unknown';
    }

    function getBrowser() {
      const ua = navigator.userAgent;
      let browser = 'Unknown';
      let version = '';

      if (ua.includes('Firefox/')) {
        browser = 'Firefox';
        version = ua.split('Firefox/')[1];
      } else if (ua.includes('Chrome/')) {
        browser = 'Chrome';
        version = ua.split('Chrome/')[1].split(' ')[0];
      } else if (ua.includes('Safari/') && !ua.includes('Chrome/')) {
        browser = 'Safari';
        version = ua.split('Version/')[1].split(' ')[0];
      } else if (ua.includes('Edg/')) {
        browser = 'Edge';
        version = ua.split('Edg/')[1];
      }

      return `${browser} ${version.split('.')[0]}`;
    }

    function getDisplay() {
      const { width, height } = window.screen;
      const colorDepth = window.screen.colorDepth || 24;
      return `${width}x${height} (${colorDepth}-bit)`;
    }

    function updateSystemInfo() {
      setSystemInfo({
        operatingSystem: getOperatingSystem(),
        display: getDisplay(),
        language: navigator.language,
        browser: getBrowser(),
        isOnline: navigator.onLine,
        cpuCores: navigator.hardwareConcurrency || 1,
      });
    }

    // Initial update
    updateSystemInfo();

    // Listen for online/offline events
    window.addEventListener('online', updateSystemInfo);
    window.addEventListener('offline', updateSystemInfo);

    // Listen for language changes
    window.addEventListener('languagechange', updateSystemInfo);

    return () => {
      window.removeEventListener('online', updateSystemInfo);
      window.removeEventListener('offline', updateSystemInfo);
      window.removeEventListener('languagechange', updateSystemInfo);
    };
  }, []);

  return systemInfo;
} 
import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { useColorScheme } from '../hooks/useColorScheme';
import { useAccessibility } from '../hooks/useAccessibility';
import { useSystemInfo } from '../hooks/useSystemInfo';

interface SettingToggleProps {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}

interface SettingSelectProps {
  label: string;
  description: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

function SettingToggle({ label, description, enabled, onChange }: SettingToggleProps) {
  const { getAccentColor } = useColorScheme();
  const accentColor = getAccentColor();

  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <h3 className="font-medium">{label}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-current' : 'bg-gray-200 dark:bg-gray-700'
        }`}
        style={{ color: enabled ? accentColor : undefined }}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

function SettingSelect({ label, description, value, options, onChange }: SettingSelectProps) {
  const { getAccentColor } = useColorScheme();
  const accentColor = getAccentColor();

  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <h3 className="font-medium">{label}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1"
        style={{ color: accentColor }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

function SettingsSection({ title, children, defaultExpanded = true }: SettingsSectionProps) {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        className="w-full py-6 flex items-center justify-between text-left"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
            isExpanded ? 'transform rotate-180' : ''
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-200 ease-in-out"
        style={{
          maxHeight: isExpanded ? contentHeight : 0,
          opacity: isExpanded ? 1 : 0
        }}
      >
        <div className="pb-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const { colorScheme, setColorScheme, getAccentColor } = useColorScheme();
  const { 
    fontSize, 
    setFontSize,
    reduceMotion,
    setReduceMotion,
    increaseContrast,
    setIncreaseContrast,
    coloredHashtags,
    setColoredHashtags,
    inlineLinks,
    setInlineLinks
  } = useAccessibility();
  const systemInfo = useSystemInfo();

  const [settings, setSettings] = React.useState({
    notifications: {
      all: true,
      mentions: true,
      follows: true,
      directMessages: true,
    },
    privacy: {
      privateAccount: false,
      protectTweets: false,
      hideReadReceipts: true,
    },
    debug: {
      useDemoData: true
    }
  });

  const updateSetting = (category: keyof typeof settings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <SettingsSection title="Display" defaultExpanded={true}>
        <SettingToggle
          label="Dark Mode"
          description="Toggle between light and dark theme"
          enabled={isDark}
          onChange={toggleTheme}
        />
        <SettingSelect
          label="Color Scheme"
          description="Choose your preferred accent color"
          value={colorScheme}
          options={[
            { value: 'blue', label: 'Blue' },
            { value: 'purple', label: 'Purple' },
            { value: 'pink', label: 'Pink' },
            { value: 'orange', label: 'Orange' },
          ]}
          onChange={(value) => setColorScheme(value as any)}
        />
      </SettingsSection>

      <SettingsSection title="Features" defaultExpanded={true}>
        <SettingToggle
          label="Colored Hashtags"
          description="Display hashtags in your accent color"
          enabled={coloredHashtags}
          onChange={setColoredHashtags}
        />
        <SettingToggle
          label="Inline Links"
          description="Enable markdown-style links in tweets [text](url)"
          enabled={inlineLinks}
          onChange={setInlineLinks}
        />
      </SettingsSection>

      <SettingsSection title="Accessibility" defaultExpanded={true}>
        <SettingToggle
          label="Reduce Motion"
          description="Decrease the amount of movement in animations"
          enabled={reduceMotion}
          onChange={setReduceMotion}
        />
        <SettingToggle
          label="Increase Contrast"
          description="Make text and colors more distinct"
          enabled={increaseContrast}
          onChange={setIncreaseContrast}
        />
        <SettingSelect
          label="Font Size"
          description="Adjust the size of text throughout the app"
          value={fontSize}
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' },
            { value: 'x-large', label: 'Extra Large' },
          ]}
          onChange={(value) => setFontSize(value as 'small' | 'medium' | 'large' | 'x-large')}
        />
      </SettingsSection>

      <SettingsSection title="Notifications (WIP)" defaultExpanded={false}>
        <SettingToggle
          label="All Notifications"
          description="Enable or disable all notifications"
          enabled={settings.notifications.all}
          onChange={(value) => updateSetting('notifications', 'all', value)}
        />
        <SettingToggle
          label="Mentions"
          description="Get notified when someone mentions you"
          enabled={settings.notifications.mentions}
          onChange={(value) => updateSetting('notifications', 'mentions', value)}
        />
        <SettingToggle
          label="New Followers"
          description="Get notified when someone follows you"
          enabled={settings.notifications.follows}
          onChange={(value) => updateSetting('notifications', 'follows', value)}
        />
        <SettingToggle
          label="Direct Messages"
          description="Get notified for new direct messages"
          enabled={settings.notifications.directMessages}
          onChange={(value) => updateSetting('notifications', 'directMessages', value)}
        />
      </SettingsSection>

      <SettingsSection title="Privacy (WIP)" defaultExpanded={false}>
        <SettingToggle
          label="Private Account"
          description="Only approved followers can see your posts"
          enabled={settings.privacy.privateAccount}
          onChange={(value) => updateSetting('privacy', 'privateAccount', value)}
        />
        <SettingToggle
          label="Protect Your Chirps"
          description="Only followers can see and interact with your chirps"
          enabled={settings.privacy.protectTweets}
          onChange={(value) => updateSetting('privacy', 'protectTweets', value)}
        />
        <SettingToggle
          label="Hide Read Receipts"
          description="Don't show when you've read direct messages"
          enabled={settings.privacy.hideReadReceipts}
          onChange={(value) => updateSetting('privacy', 'hideReadReceipts', value)}
        />
      </SettingsSection>

      <SettingsSection title="Debug" defaultExpanded={false}>
        <div className="flex items-center justify-between py-4 opacity-75">
          <div>
            <h3 className="font-medium">Use Demo Data</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Use sample data for testing and development
              <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">(Cannot be disabled in this version)</span>
            </p>
          </div>
          <button
            disabled
            className={`relative inline-flex h-6 w-11 items-center rounded-full bg-current cursor-not-allowed`}
            style={{ color: settings.debug.useDemoData ? getAccentColor() : undefined }}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white translate-x-6`}
            />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">System Information</h3>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="space-y-2">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Operating System</span>
                <p className="text-gray-900 dark:text-gray-100">{systemInfo.operatingSystem}</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Display</span>
                <p className="text-gray-900 dark:text-gray-100">{systemInfo.display}</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Language</span>
                <p className="text-gray-900 dark:text-gray-100">{systemInfo.language}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Browser</span>
                <p className="text-gray-900 dark:text-gray-100">{systemInfo.browser}</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Connection</span>
                <p className="text-gray-900 dark:text-gray-100 flex items-center">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${systemInfo.isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  {systemInfo.isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">CPU Cores</span>
                <p className="text-gray-900 dark:text-gray-100">{systemInfo.cpuCores}</p>
              </div>
            </div>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}
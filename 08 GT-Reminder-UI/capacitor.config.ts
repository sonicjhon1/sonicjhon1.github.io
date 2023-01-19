import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sonicjhon1.gtreminderui',
  appName: 'GT-Reminder',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: "http://192.168.1.130:3000",
    cleartext: true
  },
};

export default config;

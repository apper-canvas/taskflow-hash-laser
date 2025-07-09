import settingsData from "@/services/mockData/settings.json";

class SettingsService {
  constructor() {
    this.settings = { ...settingsData };
  }

  // Simulate API delay
  delay(ms = 150) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getSettings() {
    await this.delay();
    return { ...this.settings };
  }

  async updateSettings(updateData) {
    await this.delay();
    this.settings = {
      ...this.settings,
      ...updateData
    };
    return { ...this.settings };
  }

  async resetSettings() {
    await this.delay();
    this.settings = { ...settingsData };
    return { ...this.settings };
  }

  async updateTheme(theme) {
    await this.delay();
    this.settings.theme = theme;
    return { ...this.settings };
  }

  async updateNotifications(notifications) {
    await this.delay();
    this.settings.notifications = {
      ...this.settings.notifications,
      ...notifications
    };
    return { ...this.settings };
  }

  async updatePreferences(preferences) {
    await this.delay();
    this.settings.preferences = {
      ...this.settings.preferences,
      ...preferences
    };
    return { ...this.settings };
  }
}

export default new SettingsService();
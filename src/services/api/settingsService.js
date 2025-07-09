class SettingsService {
  constructor() {
    this.apperClient = null;
    this.tableName = 'setting';
  }

  getApperClient() {
    if (!this.apperClient) {
      const { ApperClient } = window.ApperSDK;
      this.apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    }
    return this.apperClient;
  }

  async getSettings() {
    try {
      const apperClient = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "theme" } },
          { field: { Name: "default_view" } },
          { field: { Name: "show_completed" } },
          { field: { Name: "sound_enabled" } },
          { field: { Name: "due_date_reminders" } },
          { field: { Name: "completion_sounds" } },
          { field: { Name: "daily_digest" } },
          { field: { Name: "start_of_week" } },
          { field: { Name: "time_format" } },
          { field: { Name: "default_priority" } },
          { field: { Name: "auto_archive_completed" } }
        ]
      };
      
      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return this.getDefaultSettings();
      }
      
      // Return first settings record or default settings
      const settings = response.data?.[0];
      return settings || this.getDefaultSettings();
    } catch (error) {
      console.error("Error fetching settings:", error?.response?.data?.message || error.message);
      return this.getDefaultSettings();
    }
  }

  getDefaultSettings() {
    return {
      theme: "light",
      default_view: "all",
      show_completed: true,
      sound_enabled: true,
      due_date_reminders: true,
      completion_sounds: true,
      daily_digest: false,
      start_of_week: "monday",
      time_format: "12h",
      default_priority: "medium",
      auto_archive_completed: false
    };
  }

  async updateSettings(updateData) {
    try {
      const apperClient = this.getApperClient();
      
      // First try to get existing settings
      const existingSettings = await this.getSettings();
      
      if (existingSettings.Id) {
        // Update existing record
        const params = {
          records: [
            {
              Id: existingSettings.Id,
              Name: updateData.Name || existingSettings.Name || "User Settings",
              Tags: updateData.Tags || existingSettings.Tags || "",
              theme: updateData.theme || existingSettings.theme,
              default_view: updateData.default_view || existingSettings.default_view,
              show_completed: updateData.show_completed !== undefined ? updateData.show_completed : existingSettings.show_completed,
              sound_enabled: updateData.sound_enabled !== undefined ? updateData.sound_enabled : existingSettings.sound_enabled,
              due_date_reminders: updateData.due_date_reminders !== undefined ? updateData.due_date_reminders : existingSettings.due_date_reminders,
              completion_sounds: updateData.completion_sounds !== undefined ? updateData.completion_sounds : existingSettings.completion_sounds,
              daily_digest: updateData.daily_digest !== undefined ? updateData.daily_digest : existingSettings.daily_digest,
              start_of_week: updateData.start_of_week || existingSettings.start_of_week,
              time_format: updateData.time_format || existingSettings.time_format,
              default_priority: updateData.default_priority || existingSettings.default_priority,
              auto_archive_completed: updateData.auto_archive_completed !== undefined ? updateData.auto_archive_completed : existingSettings.auto_archive_completed
            }
          ]
        };
        
        const response = await apperClient.updateRecord(this.tableName, params);
        
        if (!response.success) {
          console.error(response.message);
          throw new Error(response.message);
        }
        
        if (response.results) {
          const successfulUpdates = response.results.filter(result => result.success);
          const failedUpdates = response.results.filter(result => !result.success);
          
          if (failedUpdates.length > 0) {
            console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
            throw new Error("Failed to update settings");
          }
          
          return successfulUpdates[0]?.data;
        }
      } else {
        // Create new settings record
        const params = {
          records: [
            {
              Name: updateData.Name || "User Settings",
              Tags: updateData.Tags || "",
              theme: updateData.theme || "light",
              default_view: updateData.default_view || "all",
              show_completed: updateData.show_completed !== undefined ? updateData.show_completed : true,
              sound_enabled: updateData.sound_enabled !== undefined ? updateData.sound_enabled : true,
              due_date_reminders: updateData.due_date_reminders !== undefined ? updateData.due_date_reminders : true,
              completion_sounds: updateData.completion_sounds !== undefined ? updateData.completion_sounds : true,
              daily_digest: updateData.daily_digest !== undefined ? updateData.daily_digest : false,
              start_of_week: updateData.start_of_week || "monday",
              time_format: updateData.time_format || "12h",
              default_priority: updateData.default_priority || "medium",
              auto_archive_completed: updateData.auto_archive_completed !== undefined ? updateData.auto_archive_completed : false
            }
          ]
        };
        
        const response = await apperClient.createRecord(this.tableName, params);
        
        if (!response.success) {
          console.error(response.message);
          throw new Error(response.message);
        }
        
        if (response.results) {
          const successfulRecords = response.results.filter(result => result.success);
          const failedRecords = response.results.filter(result => !result.success);
          
          if (failedRecords.length > 0) {
            console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
            throw new Error("Failed to create settings");
          }
          
          return successfulRecords[0]?.data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error updating settings:", error?.response?.data?.message || error.message);
      throw error;
    }
  }

  async resetSettings() {
    try {
      const defaultSettings = this.getDefaultSettings();
      return await this.updateSettings(defaultSettings);
    } catch (error) {
      console.error("Error resetting settings:", error?.response?.data?.message || error.message);
      throw error;
    }
  }

  async updateTheme(theme) {
    try {
      return await this.updateSettings({ theme });
    } catch (error) {
      console.error("Error updating theme:", error?.response?.data?.message || error.message);
      throw error;
    }
  }

  async updateNotifications(notifications) {
    try {
      return await this.updateSettings({
        due_date_reminders: notifications.dueDateReminders,
        completion_sounds: notifications.completionSounds,
        daily_digest: notifications.dailyDigest
      });
    } catch (error) {
      console.error("Error updating notifications:", error?.response?.data?.message || error.message);
      throw error;
    }
  }

  async updatePreferences(preferences) {
    try {
      return await this.updateSettings({
        start_of_week: preferences.startOfWeek,
        time_format: preferences.timeFormat,
        default_priority: preferences.defaultPriority,
        auto_archive_completed: preferences.autoArchiveCompleted
      });
    } catch (error) {
      console.error("Error updating preferences:", error?.response?.data?.message || error.message);
      throw error;
    }
  }
}

export default new SettingsService();
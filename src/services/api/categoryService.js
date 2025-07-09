class CategoryService {
  constructor() {
    this.apperClient = null;
    this.tableName = 'category';
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

  async getAll() {
    try {
      const apperClient = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "color" } },
          { field: { Name: "icon" } },
          { field: { Name: "order_index" } }
        ],
        orderBy: [
          { fieldName: "order_index", sorttype: "ASC" }
        ]
      };
      
      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching categories:", error?.response?.data?.message || error.message);
      return [];
    }
  }

  async getById(id) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "color" } },
          { field: { Name: "icon" } },
          { field: { Name: "order_index" } }
        ]
      };
      
      const response = await apperClient.getRecordById(this.tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching category with ID ${id}:`, error?.response?.data?.message || error.message);
      throw error;
    }
  }

  async create(categoryData) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        records: [
          {
            Name: categoryData.name,
            Tags: categoryData.tags || "",
            color: categoryData.color,
            icon: categoryData.icon,
            order_index: categoryData.order_index || 1
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
          throw new Error("Failed to create category");
        }
        
        return successfulRecords[0]?.data;
      }
      
      return null;
    } catch (error) {
      console.error("Error creating category:", error?.response?.data?.message || error.message);
      throw error;
    }
  }

  async update(id, updateData) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        records: [
          {
            Id: id,
            Name: updateData.name,
            Tags: updateData.tags || "",
            color: updateData.color,
            icon: updateData.icon,
            order_index: updateData.order_index
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
          throw new Error("Failed to update category");
        }
        
        return successfulUpdates[0]?.data;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating category:", error?.response?.data?.message || error.message);
      throw error;
    }
  }

  async delete(id) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        RecordIds: [id]
      };
      
      const response = await apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          throw new Error("Failed to delete category");
        }
      }
      
      return { success: true };
    } catch (error) {
      console.error("Error deleting category:", error?.response?.data?.message || error.message);
      throw error;
    }
  }
}

export default new CategoryService();
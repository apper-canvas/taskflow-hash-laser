class TaskService {
  constructor() {
    this.apperClient = null;
    this.tableName = 'task';
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
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "category_id" } }
        ],
        orderBy: [
          { fieldName: "created_at", sorttype: "DESC" }
        ]
      };
      
      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching tasks:", error?.response?.data?.message || error.message);
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
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "category_id" } }
        ]
      };
      
      const response = await apperClient.getRecordById(this.tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message || error.message);
      throw error;
    }
  }

  async create(taskData) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        records: [
          {
            Name: taskData.title,
            Tags: taskData.tags || "",
            title: taskData.title,
            description: taskData.description || "",
            priority: taskData.priority || "medium",
            due_date: taskData.dueDate ? taskData.dueDate.toISOString().split('T')[0] : null,
            completed: false,
            created_at: new Date().toISOString(),
            completed_at: null,
            category_id: parseInt(taskData.categoryId)
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
          throw new Error("Failed to create task");
        }
        
        return successfulRecords[0]?.data;
      }
      
      return null;
    } catch (error) {
      console.error("Error creating task:", error?.response?.data?.message || error.message);
      throw error;
    }
  }

  async update(id, updateData) {
    try {
      const apperClient = this.getApperClient();
      const updateRecord = {
        Id: id,
        Name: updateData.title,
        Tags: updateData.tags || "",
        title: updateData.title,
        description: updateData.description || "",
        priority: updateData.priority,
        due_date: updateData.dueDate ? updateData.dueDate.toISOString().split('T')[0] : null,
        completed: updateData.completed,
        category_id: parseInt(updateData.categoryId)
      };
      
      // Handle completion timestamp
      if (updateData.completed !== undefined) {
        updateRecord.completed_at = updateData.completed ? new Date().toISOString() : null;
      }
      
      const params = {
        records: [updateRecord]
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
          throw new Error("Failed to update task");
        }
        
        return successfulUpdates[0]?.data;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating task:", error?.response?.data?.message || error.message);
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
          throw new Error("Failed to delete task");
        }
      }
      
      return { success: true };
    } catch (error) {
      console.error("Error deleting task:", error?.response?.data?.message || error.message);
      throw error;
    }
  }

  async getByCategory(categoryId) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "category_id" } }
        ],
        where: [
          { FieldName: "category_id", Operator: "EqualTo", Values: [categoryId] }
        ]
      };
      
      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching tasks by category:", error?.response?.data?.message || error.message);
      return [];
    }
  }

  async getCompleted() {
    try {
      const apperClient = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "category_id" } }
        ],
        where: [
          { FieldName: "completed", Operator: "EqualTo", Values: [true] }
        ]
      };
      
      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching completed tasks:", error?.response?.data?.message || error.message);
      return [];
    }
  }

  async getPending() {
    try {
      const apperClient = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "category_id" } }
        ],
        where: [
          { FieldName: "completed", Operator: "EqualTo", Values: [false] }
        ]
      };
      
      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching pending tasks:", error?.response?.data?.message || error.message);
      return [];
    }
  }

  async getOverdue() {
    try {
      const apperClient = this.getApperClient();
      const now = new Date().toISOString().split('T')[0];
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "category_id" } }
        ],
        whereGroups: [
          {
            operator: "AND",
            subGroups: [
              {
                conditions: [
                  { fieldName: "completed", operator: "EqualTo", values: [false] }
                ]
              },
              {
                conditions: [
                  { fieldName: "due_date", operator: "LessThan", values: [now] }
                ]
              }
            ]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching overdue tasks:", error?.response?.data?.message || error.message);
      return [];
    }
  }

  async getToday() {
    try {
      const apperClient = this.getApperClient();
      const today = new Date().toISOString().split('T')[0];
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "category_id" } }
        ],
        where: [
          { FieldName: "due_date", Operator: "EqualTo", Values: [today] }
        ]
      };
      
      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching today's tasks:", error?.response?.data?.message || error.message);
      return [];
    }
  }

  async getThisWeek() {
    try {
      const apperClient = this.getApperClient();
      const now = new Date();
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "category_id" } }
        ],
        whereGroups: [
          {
            operator: "AND",
            subGroups: [
              {
                conditions: [
                  { fieldName: "due_date", operator: "GreaterThanOrEqualTo", values: [startOfWeek.toISOString().split('T')[0]] }
                ]
              },
              {
                conditions: [
                  { fieldName: "due_date", operator: "LessThanOrEqualTo", values: [endOfWeek.toISOString().split('T')[0]] }
                ]
              }
            ]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching this week's tasks:", error?.response?.data?.message || error.message);
      return [];
    }
  }

  async toggleComplete(id) {
    try {
      // First get the current task
      const currentTask = await this.getById(id);
      if (!currentTask) {
        throw new Error("Task not found");
      }
      
      const apperClient = this.getApperClient();
      const newCompletedStatus = !currentTask.completed;
      
      const params = {
        records: [
          {
            Id: id,
            completed: newCompletedStatus,
            completed_at: newCompletedStatus ? new Date().toISOString() : null
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
          throw new Error("Failed to toggle task completion");
        }
        
        return successfulUpdates[0]?.data;
      }
      
      return null;
    } catch (error) {
      console.error("Error toggling task completion:", error?.response?.data?.message || error.message);
      throw error;
    }
  }
}

export default new TaskService();
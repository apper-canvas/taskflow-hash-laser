import tasksData from "@/services/mockData/tasks.json";

class TaskService {
  constructor() {
    this.tasks = [...tasksData];
  }

  // Simulate API delay
  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.tasks];
  }

  async getById(id) {
    await this.delay();
    const task = this.tasks.find(task => task.Id === id);
    if (!task) {
      throw new Error("Task not found");
    }
    return { ...task };
  }

  async create(taskData) {
    await this.delay();
    const newTask = {
      Id: Math.max(...this.tasks.map(t => t.Id), 0) + 1,
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    this.tasks.push(newTask);
    return { ...newTask };
  }

  async update(id, updateData) {
    await this.delay();
    const index = this.tasks.findIndex(task => task.Id === id);
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    const updatedTask = {
      ...this.tasks[index],
      ...updateData
    };
    
    // Handle completion timestamp
    if (updateData.completed && !this.tasks[index].completed) {
      updatedTask.completedAt = new Date().toISOString();
    } else if (!updateData.completed && this.tasks[index].completed) {
      updatedTask.completedAt = null;
    }
    
    this.tasks[index] = updatedTask;
    return { ...updatedTask };
  }

  async delete(id) {
    await this.delay();
    const index = this.tasks.findIndex(task => task.Id === id);
    if (index === -1) {
      throw new Error("Task not found");
    }
    this.tasks.splice(index, 1);
    return { success: true };
  }

  async getByCategory(categoryId) {
    await this.delay();
    return this.tasks.filter(task => task.categoryId === categoryId);
  }

  async getCompleted() {
    await this.delay();
    return this.tasks.filter(task => task.completed);
  }

  async getPending() {
    await this.delay();
    return this.tasks.filter(task => !task.completed);
  }

  async getOverdue() {
    await this.delay();
    const now = new Date();
    return this.tasks.filter(task => 
      !task.completed && 
      task.dueDate && 
      new Date(task.dueDate) < now
    );
  }

  async getToday() {
    await this.delay();
    const today = new Date().toISOString().split('T')[0];
    return this.tasks.filter(task => 
      task.dueDate && 
      task.dueDate.split('T')[0] === today
    );
  }

  async getThisWeek() {
    await this.delay();
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
    
    return this.tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return taskDate >= startOfWeek && taskDate <= endOfWeek;
    });
  }

  async toggleComplete(id) {
    await this.delay();
    const task = this.tasks.find(task => task.Id === id);
    if (!task) {
      throw new Error("Task not found");
    }
    
    const updatedTask = {
      ...task,
      completed: !task.completed,
      completedAt: !task.completed ? new Date().toISOString() : null
    };
    
    const index = this.tasks.findIndex(t => t.Id === id);
    this.tasks[index] = updatedTask;
    return { ...updatedTask };
  }
}

export default new TaskService();
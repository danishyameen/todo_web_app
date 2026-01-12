// Mock API for tasks - in a real app, this would be replaced with actual API calls to the backend

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  category: string;
  userId: string;
}

let mockTasks: Task[] = [
  {
    id: 1,
    title: 'Complete project proposal',
    description: 'Finish the project proposal document for client review',
    status: 'completed',
    priority: 'high',
    dueDate: '2023-12-31',
    createdAt: '2023-11-01',
    updatedAt: '2023-11-10',
    completedAt: '2023-11-10',
    category: 'Work',
    userId: '1'
  },
  {
    id: 2,
    title: 'Schedule team meeting',
    description: 'Arrange a meeting to discuss project timeline',
    status: 'pending',
    priority: 'medium',
    dueDate: '2023-11-15',
    createdAt: '2023-11-02',
    updatedAt: '2023-11-02',
    category: 'Work',
    userId: '1'
  },
  {
    id: 3,
    title: 'Review quarterly reports',
    description: 'Analyze financial reports for Q3',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2023-11-20',
    createdAt: '2023-11-03',
    updatedAt: '2023-11-05',
    category: 'Finance',
    userId: '1'
  }
];

export const taskApi = {
  // Get all tasks for a user
  getTasks: (): Promise<Task[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockTasks]);
      }, 300);
    });
  },

  // Get a specific task by ID
  getTaskById: (id: number): Promise<Task | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const task = mockTasks.find(task => task.id === id);
        resolve(task);
      }, 300);
    });
  },

  // Create a new task
  createTask: (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTask: Task = {
          ...taskData,
          id: Math.max(...mockTasks.map(t => t.id), 0) + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        mockTasks.push(newTask);
        resolve({ ...newTask });
      }, 500);
    });
  },

  // Update an existing task
  updateTask: (id: number, taskData: Partial<Task>): Promise<Task | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const taskIndex = mockTasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
          const updatedTask = {
            ...mockTasks[taskIndex],
            ...taskData,
            updatedAt: new Date().toISOString()
          };

          mockTasks[taskIndex] = updatedTask;
          resolve(updatedTask);
        } else {
          resolve(undefined);
        }
      }, 500);
    });
  },

  // Delete a task
  deleteTask: (id: number): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const initialLength = mockTasks.length;
        mockTasks = mockTasks.filter(task => task.id !== id);
        resolve(mockTasks.length < initialLength);
      }, 500);
    });
  }
};
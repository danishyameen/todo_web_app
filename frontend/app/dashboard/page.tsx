'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../lib/auth-context';
import Header from '../../components/Header';
import { apiClient } from '../../lib/api-client';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { user, token, isAuthenticated } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0
  });
  const [recentTasks, setRecentTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      // Add a small delay to ensure all state updates are processed before redirect
      const timer = setTimeout(() => {
        router.push('/');
      }, 100);
      return () => clearTimeout(timer);
    }

    // Fetch dashboard data
    const fetchData = async () => {
      if (!isAuthenticated || !token) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch tasks from API
        const tasks = await apiClient.getTasks(token);

        // Calculate stats
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter((task: any) => task.status === 'completed').length;
        const pendingTasks = tasks.filter((task: any) => task.status === 'pending').length;
        const inProgressTasks = tasks.filter((task: any) => task.status === 'in-progress').length;

        setStats({
          totalTasks,
          completedTasks,
          pendingTasks,
          inProgressTasks
        });

        // Set recent tasks (latest 4)
        const sortedTasks = tasks.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setRecentTasks(sortedTasks.slice(0, 4));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Fallback to default values if API fails
        setStats({
          totalTasks: 0,
          completedTasks: 0,
          pendingTasks: 0,
          inProgressTasks: 0
        });
        setRecentTasks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, token, router]);

  // Always render the component structure to ensure consistent hooks
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not authenticated, show a redirecting message instead of returning null
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Redirecting to Home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg border border-blue-100"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-xl p-4 shadow-md">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-blue-600">Total Tasks</dt>
                    <dd className="flex items-baseline">
                      <div className="text-3xl font-bold text-blue-700">{stats.totalTasks}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-lg border border-green-100"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-xl p-4 shadow-md">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-green-600">Completed</dt>
                    <dd className="flex items-baseline">
                      <div className="text-3xl font-bold text-green-700">{stats.completedTasks}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl shadow-lg border border-yellow-100"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-xl p-4 shadow-md">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-yellow-600">Pending</dt>
                    <dd className="flex items-baseline">
                      <div className="text-3xl font-bold text-yellow-700">{stats.pendingTasks}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl shadow-lg border border-orange-100"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-orange-500 rounded-xl p-4 shadow-md">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-orange-600">In Progress</dt>
                    <dd className="flex items-baseline">
                      <div className="text-3xl font-bold text-orange-700">{stats.inProgressTasks}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recent Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white shadow-xl rounded-2xl overflow-hidden"
          >
            <div className="px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 sm:px-8">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src="/img/logo.png"
                    alt="Taskly Logo"
                    className="h-10 w-auto object-contain mr-4"
                    onError={(e) => {
                      // Fallback to text if image fails to load
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const textNode = document.createElement('h3');
                        textNode.className = 'text-xl leading-6 font-bold text-blue-600';
                        textNode.textContent = 'Taskly';
                        parent.appendChild(textNode);
                      }
                    }}
                  />
                  <h3 className="text-xl font-bold text-gray-900">Recent Tasks</h3>
                </div>
                <Link
                  href="/tasks"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  View All Tasks
                </Link>
              </div>
            </div>
            <ul className="divide-y divide-gray-200">
              {recentTasks.map((task, index) => (
                <motion.li
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <Link href={`/tasks/${task.id}`} className="block hover:bg-blue-50 transition-colors duration-200">
                    <div className="px-6 py-6 sm:px-8">
                      <div className="flex items-center justify-between">
                        <p className="text-base font-semibold text-blue-700 truncate">{task.title}</p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            task.status === 'completed' ? 'bg-green-100 text-green-800' :
                            task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {task.status.replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <div className="mr-6 flex items-center text-sm text-gray-600">
                            <svg className="flex-shrink-0 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-600 sm:mt-0">
                            <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                              task.priority === 'high' ? 'bg-red-500' :
                              task.priority === 'medium' ? 'bg-yellow-500' :
                              'bg-gray-500'
                            }`}></span>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} priority
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
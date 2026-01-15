'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// Vercel deployment fix - using relative paths
import { useAuth } from '../../lib/auth-context';
import Header from '../../components/Header';
import { apiClient } from '../../lib/api-client';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const router = useRouter();
  const { user, token, isAuthenticated, logout, updateUserProfile } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    avatar: '',
    review: '',
  });
  const [taskStats, setTaskStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      // Add a small delay to ensure all state updates are processed before redirect
      const timer = setTimeout(() => {
        router.push('/');
      }, 100);
      return () => clearTimeout(timer);
    }

    if (user) {
      // Initialize profile with user data
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
        review: user.review || '',
      });

      // Fetch task statistics
      if (token) {
        const fetchTaskStats = async () => {
          try {
            const tasks = await apiClient.getTasks(token);

            // Calculate stats
            const totalTasks = tasks.length;
            const completedTasks = tasks.filter((task: any) => task.status === 'completed').length;
            const pendingTasks = tasks.filter((task: any) => task.status === 'pending').length;
            const inProgressTasks = tasks.filter((task: any) => task.status === 'in-progress').length;

            setTaskStats({
              totalTasks,
              completedTasks,
              pendingTasks,
              inProgressTasks
            });
          } catch (error) {
            console.error('Error fetching task stats:', error);
            // Set default values if API fails
            setTaskStats({
              totalTasks: 0,
              completedTasks: 0,
              pendingTasks: 0,
              inProgressTasks: 0
            });
          } finally {
            setLoading(false);
          }
        };

        fetchTaskStats();
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user, token, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    if (!isAuthenticated || !token) {
      setError('You must be logged in to update your profile');
      setSaving(false);
      return;
    }

    try {
      // Update user profile using the auth context method
      const updatedProfile = {
        ...profile,
        id: user?.id
      };

      // Use the new updateUserProfile method from the auth context
      updateUserProfile(updatedProfile);

      // Update the auth context
      setSuccess('Profile updated successfully!');

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('An error occurred while updating your profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    if (!isAuthenticated || !token) {
      setError('You must be logged in to delete your account');
      return;
    }

    try {
      // In a real app, this would be an API call to delete the user account
      // For now, we'll just clear the local storage and logout

      // Clear all user data from localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('tasks'); // Also clear tasks

      // Logout the user
      logout();

      // Redirect to home page
      router.push('/');
    } catch (err) {
      console.error('Error deleting account:', err);
      setError('An error occurred while deleting your account. Please try again.');
    }
  };

  // Always render the component structure to ensure consistent hooks
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please log in to view your profile.</p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="px-6 py-6 sm:px-8 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50"
            >
              <div className="flex items-center">
                <img
                  src="/img/logo.png"
                  alt="Taskly Logo"
                  className="h-12 w-auto object-contain mr-4"
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
                <div>
                  <h3 className="text-xl font-bold text-gray-900">User Profile</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-600">Manage your personal information and account settings</p>
                </div>
              </div>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg mx-4 mt-4"
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg mx-4 mt-4"
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">{success}</p>
                  </div>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="px-6 py-6 sm:px-8 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
              >
                {/* Avatar Upload */}
                <div className="sm:col-span-6 flex flex-col items-center">
                  <div className="relative">
                    <img
                      src={profile.avatar || 'https://via.placeholder.com/150x150/cccccc/666666?text=Avatar'}
                      alt="User Avatar"
                      className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <label className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg cursor-pointer ring-2 ring-white hover:bg-gray-50 transition-colors">
                      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">Click on the camera icon to upload a new photo</p>
                </div>

                {/* Name */}
                <div className="sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={profile.name}
                      onChange={handleChange}
                      required
                      className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={profile.email}
                      onChange={handleChange}
                      required
                      className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="sm:col-span-3">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="sm:col-span-3">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={profile.address}
                      onChange={handleChange}
                      className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="sm:col-span-6">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      value={profile.bio}
                      onChange={handleChange}
                      className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200"
                    />
                  </div>
                </div>

                {/* Review */}
                <div className="sm:col-span-6">
                  <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Review
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="review"
                      name="review"
                      rows={3}
                      value={profile.review}
                      onChange={handleChange}
                      placeholder="Share your experience with our Todo App. What do you like about it? How has it helped you?"
                      className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Your review will be displayed on the home page for others to see.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="px-6 py-6 bg-gray-50 sm:px-8 flex justify-between border-t border-gray-200"
              >
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                >
                  Delete Account
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
                >
                  {saving ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </motion.div>
            </form>

            {/* Task Statistics Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 bg-white shadow-xl rounded-2xl overflow-hidden"
            >
              <div className="px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Task Statistics</h3>
                <p className="mt-1 text-sm text-gray-600">Overview of your task completion</p>
              </div>
              <div className="px-6 py-6 sm:px-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md border border-blue-100"
                  >
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-700">{taskStats.totalTasks}</div>
                      <div className="mt-2 text-sm font-semibold text-blue-600">Total Tasks</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                    className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-md border border-green-100"
                  >
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-700">{taskStats.completedTasks}</div>
                      <div className="mt-2 text-sm font-semibold text-green-600">Completed</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                    className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl shadow-md border border-yellow-100"
                  >
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-700">{taskStats.pendingTasks}</div>
                      <div className="mt-2 text-sm font-semibold text-yellow-600">Pending</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                    className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-md border border-orange-100"
                  >
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-700">{taskStats.inProgressTasks}</div>
                      <div className="mt-2 text-sm font-semibold text-orange-600">In Progress</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
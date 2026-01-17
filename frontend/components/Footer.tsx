import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white"
    >
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Taskly. All rights reserved.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Developed by Danish Yameen
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex justify-center space-x-6">
            <motion.a
              href="#"
              className="text-gray-400 hover:text-gray-500"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="sr-only">Privacy Policy</span>
              Privacy
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-gray-500"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="sr-only">Terms</span>
              Terms
            </motion.a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
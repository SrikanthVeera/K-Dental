import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Trash2, Plus, Upload, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface AdminControlsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onAdd?: () => void;
  onUploadImage?: () => void;
  type?: 'product' | 'category' | 'brand' | 'banner' | 'section';
  position?: 'top-right' | 'bottom' | 'inline';
  showLabel?: boolean;
}

export const AdminControls = ({
  onEdit,
  onDelete,
  onAdd,
  onUploadImage,
  type = 'product',
  position = 'top-right',
  showLabel = false
}: AdminControlsProps) => {
  const { user } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);

  // Only show for admin role
  if (user?.role !== 'admin') return null;

  const positionClasses = {
    'top-right': 'absolute top-2 right-2',
    'bottom': 'mt-4',
    'inline': 'inline-flex'
  };

  return (
    <div className={`${positionClasses[position]} z-10`}>
      <div className="relative">
        {/* Compact Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowMenu(!showMenu)}
          className="bg-blue-600 text-white p-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
          title="Admin Controls"
        >
          <Edit className="w-4 h-4" />
        </motion.button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
            >
              <div className="p-2 space-y-1">
                {onAdd && (
                  <button
                    onClick={() => {
                      onAdd();
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add {type}</span>
                  </button>
                )}
                
                {onEdit && (
                  <button
                    onClick={() => {
                      onEdit();
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit {type}</span>
                  </button>
                )}
                
                {onUploadImage && (
                  <button
                    onClick={() => {
                      onUploadImage();
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-md transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Image</span>
                  </button>
                )}
                
                {onDelete && (
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete this ${type}?`)) {
                        onDelete();
                        setShowMenu(false);
                      }
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete {type}</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Inline Admin Button Bar (for sections)
export const AdminButtonBar = ({
  onEdit,
  onAdd,
  label
}: {
  onEdit?: () => void;
  onAdd?: () => void;
  label?: string;
}) => {
  const { user } = useAuthStore();

  if (user?.role !== 'admin') return null;

  return (
    <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
      <span className="text-sm font-semibold text-blue-900">
        Admin Controls {label && `- ${label}`}
      </span>
      <div className="flex gap-2 ml-auto">
        {onAdd && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add
          </motion.button>
        )}
        {onEdit && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit
          </motion.button>
        )}
      </div>
    </div>
  );
};

// Admin Badge (shows admin is logged in)
export const AdminBadge = () => {
  const { user } = useAuthStore();

  if (user?.role !== 'admin') return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
      >
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-semibold">Admin Mode</span>
      </motion.div>
    </div>
  );
};

export default AdminControls;

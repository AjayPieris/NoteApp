import React, { useEffect } from "react";   
import { MdDeleteOutline } from "react-icons/md";  // Delete icon
import { LuCheck } from "react-icons/lu";          // Checkmark icon

const Toast = ({ isShown, message, type, onClose }) => {
  useEffect(() => {
    if (!isShown) return;                          // If toast is hidden, do nothing
    const timer = setTimeout(() => {               // Start 3s timer
      onClose();                                   // Auto-close after 3s
    }, 3000);
    return () => clearTimeout(timer);              // Clear timer when unmounted
  }, [isShown, onClose]);

  return (
    <div
      className={`absolute top-20 right-6 transition-all duration-500 ${
        isShown ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}                                          // Show/hide with fade animation
    >
      <div
        className={`min-w-52 bg-white border shadow-2xl rounded-md 
          after:content-[''] after:w-[5px] after:h-full 
          ${type === "delete" ? "after:bg-red-500" : "after:bg-green-500"} 
          after:absolute after:left-0 after:top-0 after:rounded-l-lg`}
      >                                            {/* Toast box + colored stripe */}
        <div className="flex items-center gap-3 py-2 px-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              type === "delete" ? "bg-red-50" : "bg-green-50"
            }`}                                    // Circle behind the icon
          >
            {type === "delete" ? (
              <MdDeleteOutline className="text-xl text-red-500" />  // Delete icon
            ) : (
              <LuCheck className="text-xl text-green-500" />        // Success icon
            )}
          </div>
          <p className="text-sm text-slate-800">{message}</p>       {/* Toast message */}
        </div>
      </div>
    </div>
  );
};

export default Toast;   // Make component reusable

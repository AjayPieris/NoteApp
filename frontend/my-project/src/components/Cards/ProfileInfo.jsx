function ProfileInfo({ onLogout }) {
  return (
    <div className="flex items-center space-x-4 bg-gray-100 p-2 rounded-lg shadow-sm">
      {/* Avatar Circle */}
      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
        AR
      </div>

      {/* Name and Logout */}
      <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-800">Ajay</p>
        <button
          onClick={onLogout}
          className="text-xs text-red-600 hover:underline focus:outline-none"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;


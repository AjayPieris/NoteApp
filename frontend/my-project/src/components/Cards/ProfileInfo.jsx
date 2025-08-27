import { getInitials } from "../../utils/helper";

function ProfileInfo({ userInfo, onLogout }) {
  return (
    <div className="flex items-center gap-3">
      {/* Avatar Circle */}
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-black bg-slate-100">
        {getInitials(userInfo?.fullName)}
      </div>

      {/* Name and Logout */}
      <div>
        <p className="text-sm font-medium text-gray-800">{userInfo?.fullName}</p>
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


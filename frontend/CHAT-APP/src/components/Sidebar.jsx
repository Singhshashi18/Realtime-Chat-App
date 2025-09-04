import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOnlineFilter = showOnlineOnly ? onlineUsers.includes(user._id) : true;
    return matchesSearch && matchesOnlineFilter;
  });
    
  if (isUserLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 bg-base-100">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6 text-primary" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        {/* Search */}
        <div className="mt-3 hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/40" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered input-sm w-full pl-10 pr-10"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/40 hover:text-base-content"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-base-content/50">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3 flex-1 scrollbar-thin">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-200 transition-all duration-200
              ${selectedUser?._id === user._id ? "bg-base-200 border-r-2 border-primary" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/logo.jpg"}
                alt={user.name}
                className="size-12 object-cover rounded-full border-2 border-base-300"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-success 
                  rounded-full ring-2 ring-base-100 animate-pulse"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-medium truncate text-base-content">{user.fullName}</div>
              <div className="text-sm text-base-content/60">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-base-content/50 py-8">
            <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">
              {searchTerm ? "No users found" : showOnlineOnly ? "No online users" : "No contacts"}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
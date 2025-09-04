

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-base-200 relative">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)] overflow-hidden">
          <div className="flex h-full relative">
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden absolute top-4 left-4 z-50 btn btn-ghost btn-sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Sidebar */}
            <div className={`
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              lg:translate-x-0 transition-transform duration-300 ease-in-out
              absolute lg:relative z-40 h-full
            `}>
              <Sidebar />
            </div>

            {/* Backdrop for mobile */}
            {isSidebarOpen && (
              <div 
                className="lg:hidden absolute inset-0 bg-black/50 z-30"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
              {!selectedUser ? (
                <NoChatSelected />
              ) : (
                <ChatContainer />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
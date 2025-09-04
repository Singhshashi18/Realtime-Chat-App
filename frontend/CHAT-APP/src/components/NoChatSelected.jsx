import { MessageSquare, Users, Zap } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-br from-base-100 to-base-200">
      <div className="max-w-md text-center space-y-8 animate-fade-in">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce shadow-lg border border-primary/20"
            >
              <MessageSquare className="w-10 h-10 text-primary" />
            </div>
            {/* Floating icons */}
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center animate-pulse">
              <Users className="w-4 h-4 text-secondary" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center animate-pulse delay-1000">
              <Zap className="w-4 h-4 text-accent" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome to Chatty!
          </h2>
          <p className="text-base-content/60 text-lg leading-relaxed">
            Select a conversation from the sidebar to start chatting and connect with your friends
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mx-auto">
              <MessageSquare className="w-6 h-6 text-success" />
            </div>
            <p className="text-sm text-base-content/70">Real-time messaging</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-lg bg-info/10 flex items-center justify-center mx-auto">
              <Users className="w-6 h-6 text-info" />
            </div>
            <p className="text-sm text-base-content/70">See who's online</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center mx-auto">
              <Zap className="w-6 h-6 text-warning" />
            </div>
            <p className="text-sm text-base-content/70">Fast & secure</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
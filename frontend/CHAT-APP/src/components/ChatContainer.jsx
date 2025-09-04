import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';
import { Check, CheckCheck } from 'lucide-react';

const ChatContainer = () => {
  const {messages,getMessages,selectedUser,isMessageLoading,
    subscribeToMessage,unsubscribeFromMessage
  }=useChatStore();
  const {authUser} =useAuthStore();
  const messageEndRef=useRef(null);

   useEffect(()=>{
    getMessages(selectedUser._id);

    subscribeToMessage();

    return ()=> unsubscribeFromMessage();
   },[selectedUser._id,getMessages,subscribeToMessage,unsubscribeFromMessage]);


   useEffect(()=>{
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({behavior:"smooth"});
    }
   },[messages]);

   if(isMessageLoading){ 
     return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>
      <MessageSkeleton/>
      <MessageInput/>
    </div>
   )
  };

  const renderMessageStatus = (message) => {
    if (message.senderId !== authUser._id) return null;
    
    return (
      <div className="flex items-center gap-1 mt-1">
        {message.status === 'sent' && <Check className="size-3 text-base-content/60" />}
        {message.status === 'delivered' && <CheckCheck className="size-3 text-base-content/60" />}
        {message.status === 'read' && <CheckCheck className="size-3 text-primary" />}
      </div>
    );
  };

  return (
    <div className='flex-1 flex flex-col overflow-hidden bg-base-50'>
      <ChatHeader/>

     <div className='flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-base-300'>
     {messages.map((message, index)=>{
       const isLastMessage = index === messages.length - 1;
       return (
      <div key={message._id}
      className={`chat ${message.senderId === authUser._id ?
       "chat-end":"chat-start"} animate-fade-in`}
       ref={isLastMessage ? messageEndRef : null}
       >
        
        <div className='chat-image avatar'>
          <div className='size-10 rounded-full border-2 border-base-300 overflow-hidden shadow-sm'>
            <img 
            src={
              message.senderId === authUser._id
              ? authUser.profilePic || "/logo.jpg"
              : selectedUser.profilePic || "/logo.jpg"
            }
            alt="Profile picture"
            className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className='chat-header mb-1 flex items-center gap-2' >
          <span className="text-sm font-medium">
            {message.senderId === authUser._id ? "You" : selectedUser.fullName}
          </span>
          <time className='text-xs opacity-50'>
            {formatMessageTime(message.createdAt)}
          </time>
        </div>
        
        <div className={`chat-bubble flex flex-col shadow-md transition-all duration-200 hover:shadow-lg ${
          message.senderId === authUser._id 
            ? 'chat-bubble-primary' 
            : 'chat-bubble-secondary'
        }`}>
          {message.image && (
            <img 
            src={message.image}
            alt='Attachment'
            className='max-w-[250px] rounded-md mb-2 cursor-pointer hover:opacity-90 transition-opacity'
            onClick={() => window.open(message.image, '_blank')}
            />
          )}
          {message.text && <p className="break-words">{message.text}</p>}
          {renderMessageStatus(message)}
        </div>
       </div>
     )})}

     {messages.length === 0 && (
       <div className="flex-1 flex items-center justify-center">
         <div className="text-center space-y-2">
           <p className="text-base-content/60">No messages yet</p>
           <p className="text-sm text-base-content/40">Send a message to start the conversation!</p>
         </div>
       </div>
     )}

     </div>
      <MessageInput/>
    </div>
  )
}

export default ChatContainer

import { create } from "zustand"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore=create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessageLoading:false,

    getUsers:async ()=>{
         
        set({isUserLoading:true});
        try {
            const res= await axiosInstance.get("/messages/users");
            console.log(res.data);
            set({users:res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isUserLoading:false})
        }
    },
    
    getMessages: async (userId)=>{
        set({isMessageLoading:true});
        try {
            const res= await axiosInstance.get(`/messages/${userId}`);
             set({messages:res.data});
        } catch (error) {
            toast.error(error.response.data.message);
            
        }finally{
            set({isMessageLoading:false})
        }
    },
    sendMessage: async (messageData)=>{
        const {selectedUser,messages}=get();
        try {
            const res=await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
            set({messages:[...messages,res.data]})
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    subscribeToMessage:()=>{
     const{selectedUser}=get();
     if(!selectedUser) return;

     const socket=useAuthStore.getState().socket;


     socket.on("newMessage",(newMessage)=>{
        if(newMessage.senderId !== selectedUser._id) return;
        set({
            messages:[...get().messages,newMessage],
        });
     });
    },
    unsubscribeFromMessage:()=>{
     const socket = useAuthStore.getState().socket;
     socket.off("newMessage");
    },
    setSelectedUser:(selectedUser)=>set({selectedUser}),
}))
import { useRef, useState } from "react";
import { Image, Send, X, Smile } from "lucide-react";
import toast from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";

const EMOJI_LIST = ['😀', '😂', '🥰', '😍', '🤔', '👍', '👎', '❤️', '🔥', '💯', '🎉', '🙌', '👏', '😎', '🤝', '💪'];

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleEmojiClick = (emoji) => {
    setText(prev => prev + emoji);
    setShowEmojiPicker(false);
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    // Send message with Ctrl/Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage(e);
    }
    // Close emoji picker with Escape
    if (e.key === 'Escape') {
      setShowEmojiPicker(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      // Auto-resize textarea
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (error) {
      console.error("Failed to send message:", error.message);
      toast.error("Failed to send message. Please try again.");
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  return (
    <div className="p-4 w-full border-t border-base-300 bg-base-100">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700 shadow-sm"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-error text-error-content
              flex items-center justify-center hover:bg-error/80 transition-colors shadow-lg"
              type="button"
              aria-label="Remove image"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-end gap-2">
        <div className="flex-1 relative">
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-full mb-2 left-0 bg-base-200 border border-base-300 rounded-lg p-3 shadow-lg z-10">
              <div className="grid grid-cols-8 gap-2">
                {EMOJI_LIST.map((emoji, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleEmojiClick(emoji)}
                    className="text-xl hover:bg-base-300 rounded p-1 transition-colors"
                    aria-label={`Insert ${emoji} emoji`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex gap-2">
            <textarea
              ref={textareaRef}
              className="flex-1 textarea textarea-bordered resize-none min-h-[2.5rem] max-h-[120px] 
              placeholder:text-base-content/50 focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Type a message... (Ctrl+Enter to send)"
              value={text}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              rows="1"
            />
            
            <div className="flex gap-1">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />

              <button
                type="button"
                className={`btn btn-ghost btn-sm transition-all duration-200 hover:scale-110
                         ${imagePreview ? "text-success" : "text-base-content/60"}`}
                onClick={() => fileInputRef.current?.click()}
                aria-label="Attach image"
              >
                <Image size={18} />
              </button>

              <button
                type="button"
                className={`btn btn-ghost btn-sm transition-all duration-200 hover:scale-110
                         ${showEmojiPicker ? "text-primary" : "text-base-content/60"}`}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                aria-label="Toggle emoji picker"
              >
                <Smile size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          className={`btn btn-primary btn-sm transition-all duration-200 hover:scale-110 ${
            (!text.trim() && !imagePreview) ? 'btn-disabled' : ''
          }`}
          disabled={!text.trim() && !imagePreview}
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </form>
      
      <div className="mt-2 text-xs text-base-content/50 text-center">
        Press Ctrl+Enter to send • Max image size: 5MB
      </div>
    </div>
  );
};
export default MessageInput;
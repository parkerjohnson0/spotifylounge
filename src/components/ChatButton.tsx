import React from 'react'
import '../styles/ChatButton.css'
interface ChatButtonProps{
  addChatMessage: ()=> void;
}
export default function ChatButton(props:ChatButtonProps) {
  return (
        <div className="chatbutton_container">
            <button className='chatbutton_button'
              onClick={() =>props.addChatMessage()}>
                Chat
            </button>
        </div>
  )
}

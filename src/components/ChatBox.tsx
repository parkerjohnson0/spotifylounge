import React, { useEffect, useState } from 'react'
import { ChatMessage } from '../models/ChatMessage'
import { getRecentChatMessages } from '../services/ApiService'
import '../styles/ChatBox.css'
import ChatButton from './ChatButton'
import ChatMessages from './ChatMessages'
import UsersButton from './UsersButton'
interface ChatBoxProps{
  chatMessages: Array<ChatMessage>
  addChatMessage: () => void;
}
export default function ChatBox(props:ChatBoxProps) {
  // const [chatMessages, setChatMessages] = useState<Array<ChatMessage>>(new Array<ChatMessage>())
  // useEffect(() => {
  //    const getChatMessages = async () =>{
  //       setChatMessages(await getRecentChatMessages(props.roomID))
  //    }
  //    getChatMessages();
  // }, [])
  return (
    <div className="chatbox_container">
      <div className="chatbox_inner_container">
        <ChatMessages chatMessages={props.chatMessages}/>
        <input id="chatbox" className="chatbox_input">
        </input>
        <div className="chatbox_users_chat_container">
          <UsersButton/>
          <ChatButton addChatMessage={props.addChatMessage}/>
        </div>
      </div>

    </div>
  )
}

import React from 'react'
import { ChatMessage } from '../models/ChatMessage'
import '../styles/ChatMessages.css'
interface ChatMessagesProps{
  chatMessages: Array<ChatMessage>
}
export default function ChatMessages(props: ChatMessagesProps) {
  // function formatDate(msgDate: string){
  //   let date = new Date(msgDate);
  function formatDate(date: Date){
    // let date = new Date(msgDate);
    let minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
    return `${date.getHours() % 12}:${minutes}`
  }
  return (
    <>
      <div className="chat_messages_container">
          {props.chatMessages.slice(0).reverse().map((msg, idx)=>{
            return(
            <div className='chat_messages_chatmessage' key={idx}>
               <span className='chat_messages_date'>
                {/* Intl.DateTimeFormat().resolvedOptions().timeZone */}
                {formatDate(new Date(msg.DatePosted))}
                </span>
                 {msg.DisplayName}: {msg.Message} 
              </div>
            )
          })}
      </div>
    </>
  )
}

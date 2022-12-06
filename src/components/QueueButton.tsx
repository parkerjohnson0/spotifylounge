import React, { useContext, useState } from 'react'
import { RoomQueueContext } from '../context/RoomQueueContext'

interface QueueButtonProps{
  queueSong: () => void
}
export default function QueueButton(props: QueueButtonProps) {
  return (
        <button className="search_results_queue_button"
          onClick={()=>{
              props.queueSong()
          }}>
            Queue
        </button>
  )
}
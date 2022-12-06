import React, {useEffect, useState, useContext} from 'react'
import { RoomQueueContext } from '../context/RoomQueueContext';
import { QueuedSong } from '../models/QueuedSong';
import { getRoomQueue } from '../services/ApiService';
import '../styles/SongQueue.css'
import SongQueueItem from './SongQueueItem';
interface SongQueueProps{
  roomID: string | undefined
}
export default function SongQueue(props: SongQueueProps) {
  // useEffect(()=>{
  //   const fetchData = async () =>{
  //     console.log(props.roomID);
  //     if (props.roomID){
  //       let songs: Array<QueuedSong> = await getRoomQueue(parseInt(props.roomID));
  //       setSongQueue(songs);
  //     }
  //   }
  //   fetchData();
  // },[])
  //  const [songQueue, setSongQueue] = useState<Array<QueuedSong>>()
   const {roomID,songQueue, setSongQueue} = useContext(RoomQueueContext)
  useEffect(()=>{
      const fetchData = async () =>{
        if (props.roomID){
            let songs: Array<QueuedSong> = await getRoomQueue(parseInt(props.roomID));
            setSongQueue(songs);
        }
      }
      fetchData();
  },[])
  return (

    <div className="song_queue_container">
      <div className="song_queue_inner_container">
        <div className="song_queue_songs_container">
          <h2 className='song_queue_heading'>
            Song Queue
          </h2>
          {songQueue?.map((song,idx)=>{
            return <SongQueueItem key={idx} item={song} />
          })}
        </div>
      </div>
    </div>
  )
}

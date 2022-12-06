import React from 'react'
import '../styles/SongQueueItem.css'
import { QueuedSong } from '../models/QueuedSong'
interface SongQueueItemProps{
    item: QueuedSong
}
export default function SongQueueItem(props: SongQueueItemProps) {
  return (
    <div className='song_queue_item_container'>
        <div className='song_queue_item_top'>
            <img className='song_queue_item_pic' src={props.item.AlbumPicture}/>
            <div className='song_queue_item_song_info'>
                <p className='song_queue_item_song_name'>
                    {props.item.SongName}
                </p>
                <p className='song_queue_item_artist_name'>
                    {props.item.SongArtist}
                </p>
            </div>
        </div>
    </div>
  )
}

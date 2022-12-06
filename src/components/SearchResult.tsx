import React, { useContext, useEffect, useState } from 'react'
import { RoomQueueContext } from '../context/RoomQueueContext';
import { QueuedSong } from '../models/QueuedSong';
import { Track } from '../models/Track'
import { insertQueuedSong } from '../services/ApiService';
import QueueButton from './QueueButton'
import SongQueue from './SongQueue';

interface SearchResultProps{
    result: Track,
    clearText: () => void
}
export default function SearchResult(props: SearchResultProps) {
    const [showQueueButton, setShowQueueButton] = useState<boolean>(false);
    const {roomID, songQueue, setSongQueue, fetchSongQueue, connection} = useContext(RoomQueueContext)
    async function queueSong(){
        //todo call apiservice to insert song to queue on the server
        //trigger event to group to refresh queue
    //    setSongQueue(new Array<QueuedSong>) 
        let request: QueuedSong = {
            AlbumContext: props.result.AlbumContext,
            AlbumPicture: props.result.AlbumPicture,
            AlbumURI: props.result.AlbumURI,
            Position: songQueue!.length + 1,
            RoomID: parseInt(roomID!),
            SongName: props.result.SongName,
            SongArtist: props.result.SongArtist,
            DurationMS: props.result.DurationMS
        }
        // console.log(request);
        await insertQueuedSong(request);
        let data: Array<QueuedSong> = await fetchSongQueue()!
        // console.log(data);
        props.clearText();
        setSongQueue(data);
        if (connection === undefined) {
            console.log("connection's fukt yo");
            return;
        }
        connection.send("RefreshQueue", parseInt(roomID!),connection.connectionId);
    }
    useEffect(()=>{
           console.log(roomID, songQueue, connection );
    },[])

  return (
                 <div  className="search_result_item" 
                    onMouseEnter={()=> setShowQueueButton(true)}
                    onMouseLeave={()=> setShowQueueButton(false)}>
                    <img className="search_result_pic" src={props.result.AlbumPicture}/>
                    <div className="search_result_song_info">
                        {props.result.SongName} <br/>
                        {props.result.SongArtist} 
                    </div>
                    <div className="search_results_length_queue">
                        <div className="search_results_song_length">
                        {getSongLength(props.result.DurationMS)}

                        </div>
                {/* <img src="/icons/option_dots.png"
                    className="option_dots"></img> */}
                    <div className={showQueueButton ? "search_results_queue_button_fade_in":"search_results_queue_button_fade_out"}> 
                        <QueueButton queueSong={queueSong}/>
                    </div>
                    </div>

                </div>
  )
function getSongLength(DurationMS: number): string {
    let seconds = DurationMS / 1000;
    let minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    if (seconds < 10){
        return `${minutes}:0${seconds}`
    }
    return `${minutes}:${seconds}`
}

}

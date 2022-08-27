import React, { useState } from 'react'
import { Track } from '../models/Track'
import QueueButton from './QueueButton'

interface SearchResultProps{
    result: Track
}
export default function SearchResult(props: SearchResultProps) {
    const [showQueueButton, setShowQueueButton] = useState<boolean>(false);
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
                        <QueueButton/>
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

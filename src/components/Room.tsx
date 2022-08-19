import React from 'react'
import { useParams } from 'react-router-dom';
import testData from "../test_data/room_data"
import '../styles/room.css';
export default function Room() {
    const {roomID}  = useParams();
    console.log(roomID);
    const roomData = testData();
  return (
    <>
        <div className="room_container">
            <div className="playback_container">
                <div className="album_info">
                </div>
                <div className="playback_container">
                </div>
            </div>
            <div className="queue_container">

            </div>
        </div>
    </>
  )
}

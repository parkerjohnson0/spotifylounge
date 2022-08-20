import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import testData from "../test_data/room_data"
import '../styles/room.css';
import PlayButton from './PlayButton';
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';
import PlaybackBar from './PlaybackBar';
// declare global{
//     interface Window{
//         onSpotifyWebPlaybackSDKReady: () => void;
//     }
// }
interface RouteProps{
    access_token: string;
} 
export default function Room() {
    const {roomID}  = useParams();
    const location = useLocation().state as RouteProps;
    const access_token = location.access_token;
    const roomData = testData();
    const webPlaybackScript = "https://sdk.scdn.co/spotify-player.js";
    let [spotifyPlayer, setSpotifyPlayer] = useState<Spotify.Player | null>(null);
    let [deviceID, setDeviceID] = useState<string>("");
    useEffect(()=>{
        const head = document.querySelector("head");
        const script = document.createElement("script");
        script.async = true;
        script.setAttribute("src", webPlaybackScript);
        head!.appendChild(script);
        window.onSpotifyWebPlaybackSDKReady =  () => {
            const player = new Spotify.Player({
                name: 'TEST PLAYER',
                getOAuthToken: cb =>{cb(access_token);},
                volume:0.5
            });
            player.addListener("ready", ({device_id}) =>{
                console.log(device_id);
                setDeviceID(device_id);
                setSpotifyPlayer(player);
            });
            player.addListener('initialization_error', ({ message }) => { 
                console.error(message);
            });
          
            player.addListener('authentication_error', ({ message }) => {
                console.error(message);
            });
          
            player.addListener('account_error', ({ message }) => {
                console.error(message);
            });
            player.connect();
        }
        return ()=>{
            head?.removeChild(script);
        }
    }, [])
  return (
    <>
        <div className="room_page">
            <h2 className="header">{roomData.Name}</h2>
            <div className="room_container">
                <div className="playback_container">
                    <div className="album_info">
                        <img className="album_room_pic" src={roomData.SongPicture}/>
                        <div className="playback_info">
                            <p className="album_name">{roomData.SongName}</p>
                            <p className="song_name">{roomData.SongArtist}</p>
                        </div>
                    </div>
                    <div className="playback_controls">
                        <PreviousButton/>
                        <PlayButton access_token={access_token} deviceID={deviceID} player={spotifyPlayer}/>
                        <NextButton/>
                    </div>
                    <PlaybackBar/>
                </div>
                <div className="queue_container">

                </div>
            </div>
        </div>
    </>
  )
}

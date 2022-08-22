import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import testData from "../test_data/room_data"
import '../styles/room.css';
import PlayButton from './PlayButton';
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';
import PlaybackBar from './PlaybackBar';
import {Types} from '../models/Types'
import {getRoom} from '../services/ApiService';
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
    const [room, setRoom] = useState<Types.Room | null>();
    const webPlaybackScript = "https://sdk.scdn.co/spotify-player.js";
    const [spotifyPlayer, setSpotifyPlayer] = useState<Spotify.Player | null>(null);
    let [deviceID, setDeviceID] = useState<string>("");
    const head = document.querySelector("head");
    const script = document.createElement("script");
    useEffect(()=>{
        const fetchRooms = async () =>{
            let room = await getRoom(roomID)
                .then(room => {
                   return room?.at(0);
                });
            setRoom(room);
        }
        fetchRooms();
    },[])
    useEffect(()=>{
       return ()  =>{
                //cleanup player and script node if exists upon dismount
                spotifyPlayer?.disconnect();
                if (head?.contains(script)){
                    head?.removeChild(script);
                }
       } 
    },[spotifyPlayer])
    function connectPlayer(): void {
            script.async = true;
            script.setAttribute("src", webPlaybackScript);
            head!.appendChild(script);
            window.onSpotifyWebPlaybackSDKReady =  () => {
                let player = new Spotify.Player({
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
                setSpotifyPlayer(player);
                // player.activateElement();
    }
    // useEffect(()=>{
        // const head = document.querySelector("head");
        // const script = document.createElement("script");
        // script.async = true;
        // script.setAttribute("src", webPlaybackScript);
        // head!.appendChild(script);
        // window.onSpotifyWebPlaybackSDKReady =  () => {
        //     const player = new Spotify.Player({
        //         name: 'TEST PLAYER',
        //         getOAuthToken: cb =>{cb(access_token);},
        //         volume:0.5
        //     });
        //     player.addListener("ready", ({device_id}) =>{
        //         console.log(device_id);
        //         setDeviceID(device_id);
        //         setSpotifyPlayer(player);
        //     });
        //     player.addListener('initialization_error', ({ message }) => { 
        //         console.error(message);
        //     });
          
        //     player.addListener('authentication_error', ({ message }) => {
        //         console.error(message);
        //     });
          
        //     player.addListener('account_error', ({ message }) => {
        //         console.error(message);
        //     });
        //     player.connect();
        // }
        // return ()=>{
        //     head?.removeChild(script);
        // }
    // }, [])
    }
  return (
    <>
        <div className="room_page">
            <h2 className="header">{room?.Name}</h2>
            <div className="room_container">
                <div className="playback_container">
                    <div className="album_info">
                        <img className="album_room_pic" src={room?.SongPicture}/>
                        <div className="playback_info">
                            <p className="album_name">{room?.SongName}</p>
                            <p className="song_name">{room?.SongArtist}</p>
                        </div>
                    </div>
                    <div className="playback_controls">
                        <PreviousButton/>
                        <PlayButton access_token={access_token} deviceID={deviceID} player={spotifyPlayer}/>
                        <NextButton/>
                    </div>
                    <PlaybackBar/>
                        <button onClick={() => connectPlayer()}>
                            click to listen along
                        </button>
                </div>
                <div className="queue_container">

                </div>
            </div>
        </div>
    </>
  )
}


import React, { Context,useEffect, useState, useContext, createContext, SetStateAction, Dispatch } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import testData from "../test_data/room_data"
import '../styles/room.css';
import PlayButton from './PlayButton';
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';
import PlaybackBar from './PlaybackBar';
import {Room} from '../models/Room'
import {getRoom, joinRoom, leaveRoom} from '../services/ApiService';
import SongQueue from './SongQueue';
import ChatBox from './ChatBox';
import SearchBar from './SearchBar';
let signalR = require('@microsoft/signalr')
// declare global{
//     interface Window{
//         onSpotifyWebPlaybackSDKReady: () => void;
//     }
// }
type RouteProps = {
    accessToken: string
    userID: string 
    roomID: string 
} 
interface RoomPageProps {
  setAuthorized: Dispatch<SetStateAction<boolean>>
  authorized: boolean
}
export default function RoomPage(props: RoomPageProps) {
    
  const [token, setToken] = useState<string | undefined>("");
  const {roomID} = useParams();
    const location = useLocation().state as RouteProps;
    const accessToken = location.accessToken;
    const userID:number = parseInt(location.userID);
    const [room, setRoom] = useState<Room | null>();
    const webPlaybackScript = "https://sdk.scdn.co/spotify-player.js";
    const [spotifyPlayer, setSpotifyPlayer] = useState<Spotify.Player | null>(null);
    let [deviceID, setDeviceID] = useState<string>("");
    // let DeviceContext: Context<string> | undefined = createContext(undefined) ;
    const head = document.querySelector("head");
    const script = document.createElement("script");
    
    useEffect(()=>{
        const hash: string = window.location.hash;
        let cookie: string | undefined = window.localStorage.getItem("token") || accessToken;
        if (!cookie && hash){
            cookie = hash.substring(1).split("&").find(x => x.startsWith("access_token"))?.split("=")[1]!;
            window.location.hash = "";
            window.localStorage.setItem("token", cookie);
        }
        setToken(cookie);
        if (cookie || props.authorized){
            props.setAuthorized(true);
            // window.history.pushState({}, "", `/room/${roomID}`);
        }
        else{
            props.setAuthorized(false);
        }
        console.log(cookie + " " + userID);
    },[])
    useEffect(()=>{
        const fetchRoom = async () =>{
            let room = await getRoom(roomID)
                .then(room => {
                   return room?.at(0);
                });
            setRoom(room);
            connectToServer();
        }
        const userJoin = async ()=>{
            if(userID && roomID){
                let result = await joinRoom(userID,parseInt(roomID));
                console.log(result);
            }
        }
        fetchRoom();
        userJoin();
        return () => {
            if (userID && roomID){
               leaveRoom(userID,parseInt(roomID));
            }
        }

        
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
                if (!accessToken) return;
                let player = new Spotify.Player({
                    name: 'TEST PLAYER',
                    getOAuthToken: cb =>{cb(accessToken);},
                    volume:0.5
                });
                player.addListener("ready", ({device_id}) =>{
                    console.log(device_id);
                    setDeviceID(device_id);
                    // DeviceContext = createContext<string>(device_id);
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
            <div className="header">{room?.Name}</div>
            <div className="room_container">
                <div className="playback_container">
                    <div className="album_info">
                        <img className="album_room_pic" src={room?.AlbumPicture}/>
                        <div className="playback_info">
                            <p className="album_name">{room?.SongName}</p>
                            <p className="song_name">{room?.SongArtist}</p>
                        </div>
                    </div>
                    <div className="playback_controls">
                        <PreviousButton/>
                        <PlayButton accessToken={accessToken} deviceID={deviceID} player={spotifyPlayer}/>
                        <NextButton/>
                    </div>
                    <PlaybackBar/>
                        <button className="listen_button" onClick={() => connectPlayer()}>
                            Start listening!
                        </button>
                </div>
                <div className="interaction_container">
                    <SearchBar deviceID={deviceID} accessToken={accessToken}/> 
                    <div className="queue_chat_container">
                        <SongQueue roomID={roomID!}/>
                        <ChatBox/>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

function connectToServer() {
    let connection = new signalR.HubConnectionBuilder()
        .withUrl("https:localhost:7088/chat")
        .build();
    connection.start()
        .then(()=> connection.send("newMessage", 23324, "test"));
    connection.on("messageReceived", (username: string, message:string)=>{
        console.log(username + ' ' + message)
    });
}


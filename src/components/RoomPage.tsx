import React, { Context,useEffect, useState, useContext, createContext, SetStateAction, Dispatch, useRef } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import testData from "../test_data/room_data"
import '../styles/room.css';
import PlayButton from './PlayButton';
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';
import PlaybackBar from './PlaybackBar';
import {Room} from '../models/Room'
import {addChatRoomMessage, getRecentChatMessages, getRoom, getRoomQueue, joinRoom, leaveRoom, updateRoom, updateRoomPlayback} from '../services/ApiService';
import SongQueue from './SongQueue';
import ChatBox from './ChatBox';
import SearchBar from './SearchBar';
import { HubConnection, LogLevel } from '@microsoft/signalr';
import { ChatMessage } from '../models/ChatMessage';
import { PlayerState } from '../models/PlayerState';
import ChatMessages from './ChatMessages';
import { getPlaybackState } from '../services/SpotifyService';
import { QueuedSong } from '../models/QueuedSong';
import { create } from 'domain';
import { RoomQueueContext, RoomQueueProvider } from '../context/RoomQueueContext';
import { RoomConnectionReturn } from '../models/RoomConnectionReturn';
import useAccessToken from '../hooks/useAccessToken';
import { AuthContext } from '../context/AuthContext';
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
//   setAuthorized: Dispatch<SetStateAction<boolean>>
//   authorized: boolean
}
export default function RoomPage(props: RoomPageProps) {
    
//   const [token, setToken] = useState<string | undefined>("");
  const {roomID} = useParams();
//   const [authorized, setAuthorized] = useState(false);
    const {authorized, setAuthorized} = useContext(AuthContext);
  const [chatMessages, setChatMessages] = useState<Array<ChatMessage>>(new Array<ChatMessage>())
    const location = useLocation().state as RouteProps;
const accessToken = useAccessToken(authorized, setAuthorized);
    // const accessToken = location.accessToken;
    const userID:number = parseInt(location.userID) || parseInt(window.localStorage.getItem("userID")!)
    useEffect(()=>{
       window.localStorage.setItem("userID",userID.toString()) 
    },[userID])
    const [room, setRoom] = useState<Room | null>();
    const webPlaybackScript = "https://sdk.scdn.co/spotify-player.js";
    const [spotifyPlayer, setSpotifyPlayer] = useState<Spotify.Player | null>(null);
    const [playerState, setPlayerState] = useState<PlayerState>(PlayerState.Paused);
    const [songProgress, setSongProgress] = useState<number | undefined>(undefined);
    // const [deviceID, setDeviceID] = useState<string>("");
    const deviceID = useRef("");
    // let DeviceContext: Context<string> | undefined = createContext(undefined) ;
    const head = document.querySelector("head");
    const script = document.createElement("script");
    // const [songQueue, setSongQueue] = useState<Array<QueuedSong>>();
    // const [songQueue, setSongQueue] = useContext(RoomQueueContext);
    const[volumeVisibility, setVolumeVisibility] = useState<boolean>(false);
    const [isLeader, setIsLeader] = useState<boolean>(false);
    const [willBeLeader, setWillBeLeader] = useState<boolean>(false);
    // const {setSongQueue, fetchSongQueue, connection} = useContext(RoomQueueContext)
    const {fetchSongQueue,setSongQueue, connection, songQueue} = useContext(RoomQueueContext)
    // let connection:HubConnection = new signalR.HubConnectionBuilder()
    //     .withUrl("https:localhost:7088/chat")
    //     .build();
    // let connection:HubConnection;
    // const [chatConnection, setChatConnection] = useState<HubConnection>(new signalR.HubConnectionBuilder()
    //     .withUrl("https:localhost:7088/room")
    //     .configureLogging(LogLevel.None)
    //     .build());
    // useEffect(()=>{
    //     props.setAuthorized(authorized)
    // },[authorized])
    useEffect(()=>{
        // const fetchData = async () =>{
        // if (roomID){
        //     let songs: Array<QueuedSong> = await getRoomQueue(parseInt(roomID));
            // setSongQueue(songs);
        // }
        // }
        // fetchData();
    },[])
    // useEffect(()=>{
        // let timer: NodeJS.Timer | undefined = undefined;
        // if (isLeader){
        //     timer = setInterval(()=>{
        //         console.log("updating song progress: ", songProgress);
        //         updateRoomPlayback(parseInt(roomID!), playerState, songProgress);
        //     }, 5000)
        //     // setPlaybackUpdateTimer(timer);
        // }
        // else if (!isLeader && timer){
        //     clearInterval(timer);
        // }
        // return () => clearInterval(timer);
    // }, [isLeader])
    useEffect(()=>{
        // async function updateQueue(){
        //     let data = await getRoomQueue(parseInt(roomID!));
        //     console.log(data);
        //     setSongQueue(data);
        // }
        if (songProgress !== undefined && isLeader){
            updateRoomPlayback(parseInt(roomID!), playerState, songProgress);
        }
        // if (songProgress === 0){
        //     console.log("song progress reset");
        //     updateQueue();
        // }
        
    },[songProgress])
    function addChatMessage(){
        let input = document.getElementById("chatbox") as HTMLInputElement
        let message = input.value;
        if (!message) return;
        console.log(message);
        // addChatRoomMessage(userID, roomID!, message! );
        // getChatMessages();
        // chatMessages.push({
        //     DatePosted = Date.now,
        //     DisplayName = name
        // } as ChatMessage)
        // setChatMessages(chatMessages)
        (document.getElementById("chatbox") as HTMLInputElement).value = "";
        // chatConnection.send("ChatMessage",message, userID,roomID);
        connection!.send("ChatMessage",message, userID,roomID);
    }
    useEffect(()=>{
        // const hash: string = window.location.hash;
        // let cookie: string | undefined = window.localStorage.getItem("token") || accessToken;
        // if (!cookie && hash){
        //     cookie = hash.substring(1).split("&").find(x => x.startsWith("access_token"))?.split("=")[1]!;
        //     window.location.hash = "";
        //     window.localStorage.setItem("token", cookie);
        // }
        // setToken(cookie);
        // if (cookie || props.authorized){
        //     props.setAuthorized(true);
        //     // window.history.pushState({}, "", `/room/${roomID}`);
        // }
        // else{
        //     props.setAuthorized(false);
        // }
        // console.log(cookie + " " + userID);
    },[])
    const getChatMessages = async () =>{
        setChatMessages(await getRecentChatMessages(roomID!))
    }
    useEffect(()=>{
        // const connect = async () => {
        //     if (!connection?.connectionId){
        //         console.log("connectionid is null, attempting to connect to server")
        //         await connectToServer(userID, parseInt(roomID!));
        //     }
        //     console.log("chatConnection object changed: " , connection)
        // }
        // connect();
            console.log("chatConnection object changed: " , connection?.state)
    // },[chatConnection])
    },[connection])
    useEffect(()=>{
        console.log("USEEFFECT: deviceID=" + deviceID)
    },[deviceID])
    useEffect(()=>{
        const fetchRoom = async () =>{
            let room = await getRoom(roomID)
                .then(room => {
                   return room?.at(0);
                });
            setRoom(room);
        }
        const userJoin = async ()=>{
            if(userID && roomID && connection){
                // let result = await joinRoom(userID,parseInt(roomID));
                // console.log(result);
                await connectToServer(userID, parseInt(roomID!));
                window.localStorage.setItem("connectionID", connection.connectionId!);
                // console.log(window.localStorage.getItem("connectionID"));
            }
        }
        fetchRoom();
        if (!window.localStorage.getItem("connectionID")){
            userJoin();
        }
        else{
            console.log('user already connected. window may have been refreshed');
        }
        getChatMessages();
        return () => {
            if (userID && roomID){

                window.localStorage.removeItem("connectionID");
               disconnectFromServer(userID,parseInt(roomID));
            }
        }
    },[])
    useEffect(()=>{
        console.log("USEEFFECT: spotifyPlayer")
        togglePlay();
       return ()  =>{
                //cleanup player and script node if exists upon dismount
                console.log("USEEFFECT: cleaning up spotifyPlayer")
                spotifyPlayer?.disconnect();
                if (head?.contains(script)){
                    head?.removeChild(script);
                }
       } 
    },[spotifyPlayer])
    function connectPlayer(): void {
            if ((!room || !room.AlbumContext || !room.AlbumURI) &&
                (!songQueue || !(songQueue!.length > 0))){
                    return;
            }
            script.async = true;
            script.setAttribute("src", webPlaybackScript);
            head!.appendChild(script);
            window.onSpotifyWebPlaybackSDKReady =  () => {
                if (!accessToken) return;
                let player = new Spotify.Player({
                    name: `${room?.Name}`,
                    getOAuthToken: cb =>{cb(accessToken);},
                    volume:0.5
                });
                player.addListener("ready", ({device_id}) =>{
                    console.log(device_id);
                    // setDeviceID(device_id);
                    deviceID.current = device_id;
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
                //if (songQueue && songQueue.length > 0){
                //    console.log("PLAYER NOT INITIALIZED BUT THERE IS SONG IN QUEUE")
                //    playNextSong();
                //}
                // setSpotifyPlayer(player);
                // player.activateElement();
    }
    }
    async function connectToServer(userID:number,roomID:number) {
        //use send to invoke methods on server. use invoke to invoke methods on server when return value is needed 
        if (connection === undefined) return;

        return await connection.start()
            // .then(()=> chatConnection.send("Connected",userID, roomID))
            .then(async () =>{
               let ret = await connection.invoke<RoomConnectionReturn>("Connected",userID, roomID);
               console.log("client has been elected room leader:" + ret.isLeader);
               setWillBeLeader(ret.isLeader);
            })
            .then(()=> connection.onclose(()=>{
                console.log("CONNECTION CLOSED");
            }))
            .then(()=> connection.onreconnected(()=>{
                console.log("CONNECTION RECONNECTED");
            }))
            .then(()=> connection.onreconnecting(()=>{
                console.log("CONNECTION RECONNECTING");
            }))
            .then(()=> connection.on("newChatMessage",(displayName:string,message:string )=>{
                console.log("NEW MESSAGE FROM " + displayName + ": " + message + " at " + new Date().toISOString());
                //todo something is fucky here. isnt setting state more than once. only one message comes through
                // chatMessages.push({
                //     DatePosted: new Date().toUTCString(),
                //     DisplayName: displayName,
                //     Message: message,
                // } as ChatMessage)
                console.log(new Date().toLocaleString());
                let newMessage: ChatMessage = {
                    DatePosted: new Date().toISOString(),
                    DisplayName: displayName,
                    Message: message,
                    RoomID: roomID,
                    MessageID: undefined,
                    UserID: undefined
                }
                setChatMessages((chatMessages)=>{
                    return [newMessage, ...chatMessages]
                })
            }))
            .then(()=> connection.on("newLeaderSelected",()=>{
                console.log("CLIENT HAS BEEN MADE ROOM LEADER")
                setIsLeader(true);
            }))
            .then(() => connection.on("refreshQueue", async ()=>{
                console.log("refreshing song queue");
                let data = await getRoomQueue(roomID);
                console.log(data);
                console.log(setSongQueue);
                setSongQueue(data);
            }))
            .then(()=> connection.on("refreshRoom", async()=>{
                console.log("refreshing room data from db for room " + roomID);
                //todo reset room data
                //toggle playback on
                // let updatedRoom = await getRoom(roomID.toString())
                //     .then(room => {
                //     return room?.at(0);
                //     });
                // setRoom(updatedRoom);
                getAndPlayRoomSong();
            }))
    }
    function disconnectFromServer(userID: number, roomID: number) {
        if (connection === undefined) return;
        connection.send("Disconnected", userID, roomID);
        connection.stop();
    }
    function setSongProgressAndStartTimer(progressMS: number) {
        setSongProgress(progressMS);
        console.log("playback timer started at: ", progressMS);
    }
    async function getAndPlayRoomSong(){
        let updatedRoom = await getRoom(roomID)
            .then(room => {
            return room?.at(0);
            });
        console.log(updatedRoom);
        console.log(deviceID.current);
        setRoom(updatedRoom);
        // setSongProgress(updatedRoom?.ProgressMS);
        await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceID.current}`,{
        method: 'PUT', 
        body: JSON.stringify({
            context_uri:updatedRoom!.AlbumURI,
            offset: {
                position:updatedRoom!.AlbumContext
            },
            position_ms: updatedRoom!.ProgressMS 
        }),
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + accessToken}
        }).then(async (resp)=> {
            if (resp.status === 202){
                setPlayerState(PlayerState.Playing);
                setSongProgressAndStartTimer(updatedRoom!.ProgressMS);
                let playbackState = await getPlaybackState(accessToken);
                // console.log(playbackState.device.id + ":" + deviceID)
                //if somehow the current playback state for the user is the webplayback player
                // if (playbackState.device.id !== deviceID){

                //     console.log("DEVICE MISMATCH");
                //     return;
                // }
                console.log("UPDATING ROOM PLAYBACK TO PLAYING")
                updateRoomPlayback(parseInt(roomID!), PlayerState.Playing, playbackState.ProgressMS)
                let data = await getRoomQueue(parseInt(roomID!));
                console.log(data);
                setSongQueue(data);
            }
        })
    }
    async function togglePlay(){
        if (spotifyPlayer && connection){
            // if (willBeLeader){
                //once play is toggled, set the leader to whoever started playing 
                // setWillBeLeader(false);
            connection.send("NewLeaderSelected", connection.connectionId, parseInt(roomID!));
            // }
            console.log("toggling player state...")
            // props.player.connect();
            // props.player.togglePlay();
            if (playerState == PlayerState.Playing){
                await fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceID.current}`,{
                method: 'PUT', 
                headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + accessToken}
                }).then((resp)=> {
                    if (resp.status === 202){
                        setPlayerState(PlayerState.Paused);
                    }
                })
                let playbackState = await getPlaybackState(accessToken);
                // console.log(playbackState.device.id + ":" + deviceID)
                //if somehow the current playback state for the user is the webplayback player
                // if (playbackState.device.id !== deviceID){
                //     console.log("DEVICE MISMATCH");
                //     return;
                // }
                console.log("UPDATING ROOM PLAYBACK TO PAUSED")
                updateRoomPlayback(parseInt(roomID!), PlayerState.Paused, playbackState.ProgressMS)
                //send progress_ms of to server. to be saved as rooms current playback position
            }
            else{
                //get updated room info here. since it's possible for a person to have entered room, but not yet started playing while another person has started. sync would be off
                getAndPlayRoomSong();    
            }
        }
    }
    useEffect(() => {
        let timer: NodeJS.Timer;
        if (playerState === PlayerState.Playing){
            timer = setInterval(()=>{
                setSongProgress(songProgress => songProgress! + 1000)
            },1000)
        }
        return () => clearInterval(timer);
    }, [playerState])
    useEffect(()=>{
        if (!room) return;
        console.log("SONG PROGRESS UPDATED " + songProgress)
        if (songProgress! > room!.DurationMS ){
            console.log("SONG HAS PLAYED TO THE END. BEGINNING NEXT SONG.")
            playNextSong();
        }
    },[songProgress])
    function playNextSong(){
        // if (!spotifyPlayer){console.log("player not initialized"); return;} ;
        setSongProgress(0);
        // togglePlay();
        if (isLeader || willBeLeader){
            // updateRoom();
            console.log("LEADER IS STARTING NEXT SONG")
            connection?.send("StartNextSong", parseInt(roomID!));
        }
    }
    function updateRoom(){
        let updatedRoom:Room;
        if (!songQueue || !songQueue[0]){
            updatedRoom  = {
                AlbumContext: 0, 
                AlbumPicture: "",
                AlbumURI: "",
                DurationMS: 0,
                Name: "",
                NumUsers: 0,
                ProgressMS: 0,
                RoomID: 0,
                SongArtist: "",
                SongName: ""
            }
        }
        else{
            let nextSong: QueuedSong = songQueue[0];
            console.log(nextSong);
            updatedRoom  = {
                AlbumContext: nextSong.AlbumContext, 
                AlbumPicture: nextSong.AlbumPicture,
                AlbumURI: nextSong.AlbumURI,
                DurationMS: nextSong.DurationMS,
                Name: room?.Name!,
                NumUsers: room?.NumUsers!,
                ProgressMS: 0,
                RoomID: room?.RoomID!,
                SongArtist: nextSong.SongArtist,
                SongName: nextSong.SongName
            }
        }
    }
    // const RoomQueueContext = createContext<Array<QueuedSong> | undefined>(new Array<QueuedSong>);
  return (
    // <RoomQueueProvider roomID={roomID}>
        <div className="room_page">
            <div className="header">{room?.Name}</div>
            <div className="room_container">
                <div className="playback_container">
                    <div className="album_info">
                        <img className="album_room_pic" src={room?.AlbumPicture ?? "/icons/no_song.jpg"}/>
                        <div className="playback_info">
                            <p className="album_name">{room?.SongName}</p>
                            <p className="song_name">{room?.SongArtist}</p>
                        </div>
                    </div>
                    <div className="playback_controls">
                        <PreviousButton/>
                        <PlayButton playerState={playerState} accessToken={accessToken} deviceID={deviceID.current} togglePlay={togglePlay}/>
                        <NextButton playNextSong={playNextSong}/>
                    </div>
                    <PlaybackBar accessToken={accessToken} deviceID={deviceID.current} setVolumeVisibility={setVolumeVisibility} volumeVisibility={volumeVisibility} progressMS={songProgress} durationMS={room?.DurationMS}/>
                        {spotifyPlayer != null || 
                        <button className="listen_button" onClick={() => connectPlayer()}>
                            Start listening!
                        </button>}
                </div>
                <div className="interaction_container">
                    <SearchBar deviceID={deviceID.current} accessToken={accessToken}/> 
                    <div className="queue_chat_container">
                        <SongQueue roomID={roomID}/>
                        <ChatBox addChatMessage={addChatMessage} chatMessages={chatMessages}/>
                    </div>
                </div>
            </div>
        </div>
    // </RoomQueueProvider>
  )
}





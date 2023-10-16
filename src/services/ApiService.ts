import { ChatMessage } from '../models/ChatMessage';
import {Room} from '../models/Room'
import { Track } from '../models/Track';
import {PlayerState} from '../models/PlayerState'
import { QueuedSong } from '../models/QueuedSong';
interface APIResponse {
    Success: boolean;
}
export  async function deleteRoom(roomID:number){
    await fetch(process.env.REACT_APP_API_URL! + '/Rooms/' + roomID,{
        method: 'DELETE',
    })
}
export  async function getRooms(): Promise<Room[] | null>{
    let rooms: Room[] | null = null;
    await fetch(process.env.REACT_APP_API_URL! + '/Rooms',{
        method: 'GET',
    })
    .then(response => response.json())
    .then(json =>{
        // console.log(json);
        rooms = json;
    })
    return rooms;
}
export async function getRoom(roomID: string | undefined): Promise<Room[] | null>{
    let room: Room[] | null = null;
    await fetch(process.env.REACT_APP_API_URL! + `/Rooms?RoomID=${roomID}`,{
        method: 'GET',
    })
    .then(response => response.json())
    .then(json =>{
        // console.log(json);
        room = json;
    })
    return room;
}
export async function createRoom(roomName: string){
    await fetch(process.env.REACT_APP_API_URL! + '/Rooms',{
        method: 'POST',
        headers:{"content-type": "application/json"},
        body: JSON.stringify({
            Name: roomName
        } as Room)
    })
}

export async function joinRoom(userID: number, roomID: number): Promise<boolean>{
    let response: APIResponse;
    await fetch(process.env.REACT_APP_API_URL! + `/User/Join`,{
        method: 'PUT',
        body:JSON.stringify({
            UserID: userID,
            RoomID: roomID
        }),
        headers:{"content-type": "application/json"}
        
        
    })
    .then(response => response.json())
    .then(json =>{
       response = json; 
        return response.Success;
    })
    return true;
}
export async function leaveRoom(userID: number, roomID: number){

    let response: APIResponse;
    await fetch(process.env.REACT_APP_API_URL! + `/User/Leave`,{
        method: 'PUT',
        body:JSON.stringify({
            UserID: userID,
            RoomID: roomID
        }),
        headers:{"content-type": "application/json"}
        
        
    })
    .then(response => response.json())
    .then(json =>{
       response = json; 
        return response.Success;
    })
    return true;
}
export async function getRecentChatMessages(roomID:string): Promise<Array<ChatMessage>>{
    let chatMessages: Array<ChatMessage> = new Array<ChatMessage>();
    await fetch(process.env.REACT_APP_API_URL! + `/ChatMessages?roomID=${roomID}`,{
        method: 'GET',
        headers:{"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(json =>{
        json.forEach((x: ChatMessage) => {
           chatMessages.push({
            // DatePosted: new Date((x.DatePosted)).toISOString(),
            DatePosted: new Date(x.DatePosted + "Z").toString(),
            DisplayName: x.DisplayName,
            Message: x.Message,
            MessageID: x.MessageID,
            RoomID: x.RoomID,
            UserID: x.UserID
           }) 
        });
        // chatMessages = json;
    })
    return chatMessages;
}
export async function addChatRoomMessage(userID: number, roomID: string, message: string){


}
export async function updateRoomPlayback(roomID: number, playerState: PlayerState, progressMS: number){
    await fetch(process.env.REACT_APP_API_URL! + `/Rooms/PlaybackState`,{
        method: 'POST',
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({
            roomID: roomID,
            currentlyPlaying: playerState === PlayerState.Playing,
            progressMS: progressMS
        })
    })
}
export async function getRoomQueue(roomID:number){
    let ret: Array<QueuedSong> = []
    await fetch(process.env.REACT_APP_API_URL! + `/RoomQueue?RoomID=${roomID}`,{
        method: 'GET',
        headers:{"Content-Type": "application/json"},
    })
    .then(response => response.json())
    .then(json =>{
        ret = json;
    })
    return ret;
}
export async function insertQueuedSong(song:QueuedSong){
    console.log("INSERTING SONG INTO QUEUE: ", song);
    await fetch(process.env.REACT_APP_API_URL! + `/RoomQueue`,{
        method: 'POST',
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(song)
    })
}
export async function updateRoom(room: Room){
    await fetch(process.env.REACT_APP_API_URL! + `/Rooms/${room.RoomID}`,{
        method: 'POST',
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify(room)
    })
}
import {Room} from '../models/Room'
export  async function getRooms(): Promise<Room[] | null>{
    let rooms: Room[] | null = null;
    await fetch(process.env.REACT_APP_API_URL! + '/Rooms',{
        method: 'GET',
    })
    .then(response => response.json())
    .then(json =>{
        console.log(json);
        rooms = json;
        return JSON.parse(JSON.stringify(rooms));
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
        console.log(json);
        room = json;
        return JSON.parse(JSON.stringify(room));
    })
    return room;
}

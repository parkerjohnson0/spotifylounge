import { response } from 'express'
import Room from '../models/Room'
export default async function getRooms(): Promise<Room[]>{
    await fetch(process.env.REACT_APP_API_URL! + '/Rooms',{
        method: 'GET',
    })
    .then(response => response.json())
    .then(json => console.log(json));

    return [{} as Room]
}

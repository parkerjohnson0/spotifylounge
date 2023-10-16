import signalR, { HubConnection, LogLevel, HubConnectionBuilder } from '@microsoft/signalr';
import React, { Dispatch, useState, createContext } from 'react'
import { ChatMessage } from '../models/ChatMessage';
import { QueuedSong } from '../models/QueuedSong';
import { Room } from '../models/Room';
import { getRoomQueue, getRooms, insertQueuedSong } from '../services/ApiService';
interface RoomQueueContextPropType {
   children: React.ReactNode
   roomID: string | undefined
   // connection: HubConnection | undefined
}
// interface QueueState{
//    queueState:    [Array<QueuedSong | undefined>, React.Dispatch<React.SetStateAction<QueuedSong[] | undefined>>]
// state:Array<QueuedSong | undefined>
// setState: React.Dispatch<React.SetStateAction<QueuedSong[] | undefined>>
// }
interface RoomQueueContextType {
   // queue: QueueState
   //  [Array<QueuedSong | undefined>, React.Dispatch<React.SetStateAction<QueuedSong[] | undefined>>]
   songQueue: Array<QueuedSong> | undefined,
   setSongQueue: React.Dispatch<React.SetStateAction<QueuedSong[] | undefined>>
   fetchSongQueue: (() => Promise<QueuedSong[]>) | (() => undefined)
   roomID: string | undefined,
   connection: HubConnection | undefined,
   fetchNewRoomConnection: () => void,
   rooms: Array<Room> | undefined,
   setRooms: React.Dispatch<React.SetStateAction<Room[] | undefined>>
   fetchRooms: (() => Promise<Room[]>) | (() => undefined)
}
// export const RoomQueueContext = createContext<Array<QueuedSong> | undefined>(new Array<QueuedSong>);
// export const RoomQueueContext = createContext<[Array<QueuedSong> | undefined, React.Dispatch<React.SetStateAction<QueuedSong[] | undefined>>]>([new Array<QueuedSong>, () => new Array<QueuedSong[] | undefined>]);
let connection = new HubConnectionBuilder()
   .withUrl("https:localhost:7088/room")
   .configureLogging(LogLevel.None)
   .build();
export const RoomQueueContext = createContext<RoomQueueContextType>(
   {
      roomID: undefined,
      // queue:{
      //    queueState: useState<Array<QueuedSong>>()
      // } as QueueState,

      // queueState: useState<Array<QueuedSong>>(),
      songQueue: new Array<QueuedSong>,
      setSongQueue: () => new Array<QueuedSong[] | undefined>,
      fetchSongQueue: () => undefined,
      connection: connection,
      rooms: new Array<Room>,
      fetchNewRoomConnection: () => undefined,
      setRooms: () => new Array<Room[] | undefined>,
      fetchRooms: () => undefined
   } as RoomQueueContextType

   // [new Array<QueuedSong>, () => new Array<QueuedSong[] | undefined>]
);
// function getConnection(){
//    return new HubConnectionBuilder()
//          .withUrl("https:localhost:7088/room")
//          .configureLogging(LogLevel.None)
//          .build();

// }
export const RoomQueueProvider = (props: RoomQueueContextPropType) => {
   const [songQueue, setSongQueue] = useState<Array<QueuedSong>>()
   const [rooms, setRooms] = useState<Array<Room>>()
   const [chatConnection, setChatConnection] = useState<HubConnection>(connection)
   function fetchNewRoomConnection() {
      connection = new HubConnectionBuilder()
         .withUrl("https:localhost:7088/room")
         .configureLogging(LogLevel.None)
         .build();
   }
   return (
      <RoomQueueContext.Provider value={
         {
            roomID: props.roomID,
            setSongQueue: setSongQueue,
            songQueue: songQueue,
            fetchSongQueue: () => getRoomQueue(parseInt(props.roomID!)),
            connection: chatConnection,
            fetchNewRoomConnection: fetchNewRoomConnection,
            rooms: rooms,
            setRooms: setRooms,
            fetchRooms: () => getRooms()

         } as RoomQueueContextType
      }>
         {props.children}
      </RoomQueueContext.Provider>
   )

}

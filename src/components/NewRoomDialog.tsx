import React, { useContext } from 'react'
import { RoomQueueContext } from '../context/RoomQueueContext';
import { createRoom } from '../services/ApiService';
import '../styles/NewRoomDialog.css';
import  { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface NewRoomDialogProps{
    setShowRoomDialog: React.Dispatch<React.SetStateAction<boolean>>
}
export default function NewRoomDialog(props: NewRoomDialogProps) {
    const {setRooms, rooms,fetchRooms} = useContext(RoomQueueContext)
    async function newRoom() {
        let input = document.getElementById("room_name_input") as HTMLInputElement;
        if (input.value){
            await createRoom(input.value);
            props.setShowRoomDialog(false)
            setRooms(await fetchRooms());
        }
    }
  return (
    <div className='room_dialog_container'>
        <div className='room_dialog_box'>
            <FontAwesomeIcon size={"lg"} className='room_dialog_close' icon={faWindowClose}
            onClick={() => props.setShowRoomDialog(false)} />
            <div className='room_dialog_text'>
                <p className='room_dialog_text_title'>
                    New Room
                </p>
                <div className='room_dialog_text_input'>
                    Name:   
                    <input id="room_name_input" className='room_dialog_input'/>
                </div>
                <button className='login_button'
                onClick={() => newRoom()}>
                    Create Room
                </button>
            </div>
        </div>
    </div>
  )
}


import React, { useContext, useEffect, useState } from 'react';
import '../styles/LoungeList.css';
import { Link, useParams } from 'react-router-dom';
import { deleteRoom, getRooms } from '../services/ApiService';
import { RoomQueueContext, RoomQueueProvider } from '../context/RoomQueueContext';
import { Room } from '../models/Room';
interface LoungeListProps {
    lounges: any[];
    setRoomID: React.Dispatch<React.SetStateAction<string | undefined>>
}
export default function LoungeList(props: LoungeListProps) {
    const testID = 3;
    const { accessToken, userID } = useParams();
    // const [rooms, setRooms] = useState<Room[] | null>();
    const { setRooms, rooms, fetchRooms } = useContext(RoomQueueContext)
    function getRooms(){
        const getData = async () => {
            setRooms(await fetchRooms());
        }
        getData();
    }
    useEffect(() => {
        // window.location.href= "/rooms";
        getRooms();

    }, [])
    return (
        <div className="lounge_list_container">
            {rooms?.map(x => {
                return <div key={x.RoomID} className="lounge_container">
                    {x.NumUsers == 0 &&
                        <img className="delete_room_button" src='icons/delete.jpg'
                        onClick={async () => {
                            await deleteRoom(x.RoomID);
                            getRooms();
                        }}/>}
                    <div className="room_info">
                        <div className="room_title">{x.Name}</div>
                        <div className="current_song_info">
                            <img className="current_song_pic" src={x.AlbumPicture ?? "/icons/no_song.jpg"} />
                            <div className="song_info">
                                {!x.SongName && !x.SongArtist &&
                                    <p className="empty_song_info">
                                        NO SONG PLAYING
                                    </p>
                                }
                                <p className="song_name_lounge">{x.SongName}</p>
                                <p className='artist_name_lounge'>{x.SongArtist}</p>
                            </div>
                        </div>

                    </div>
                    <div className="lounge_footer">
                        <img className='user_icon' src='/icons/lounge_user_icon.png' />
                        <div className="users_connected">{x.NumUsers}</div>
                        <Link to={`/room/${x.RoomID}`}
                            onClick={() => {
                                props.setRoomID(x.RoomID + "");
                            }}
                            state={{ accessToken: accessToken, userID: userID }} className="join_button">Join</Link>
                    </div>
                </div>
            })}
            {/* <button className="lounge_list_add_room_button">
                +
            </button> */}
        </div>

    )
}


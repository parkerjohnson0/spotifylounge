import React, { useEffect, useState } from 'react';
import '../styles/LoungeList.css';
import {Link, useParams} from 'react-router-dom';
import {getRooms} from '../services/ApiService';
import {Room} from '../models/Room';
interface LoungeListProps{
    lounges: any[];
}
export default function LoungeList(props:LoungeListProps){
    const testID = 3;
    const {accessToken, userID} = useParams();
    const [rooms, setRooms] = useState<Room[] | null>();
    useEffect(()=>{
        // window.location.href= "/rooms";
        const fetchRooms = async () =>{
            setRooms(await getRooms());
        }
        fetchRooms();

    }, [])
    return(
        <div className="lounge_list_container">
            {rooms?.map(x =>{
            return <div key={x.RoomID} className="lounge_container" >
                        <div className="room_info">
                            <div className="room_title">{x.Name}</div>
                            <div className="current_song_info">
                                <img className="current_song_pic" src={x.AlbumPicture}/>
                                <div className="song_info">
                                    <p className="song_name_lounge">{x.SongName}</p> 
                                    <p className='artist_name_lounge'>{x.SongArtist}</p> 
                                </div>
                            </div>

                        </div>
                        <div className="lounge_footer">
                            <img className='user_icon' src='/icons/lounge_user_icon.png' />
                            <div className="users_connected">{x.NumUsers}</div>
                            <Link to={`/room/${x.RoomID}`}
                            state={{accessToken: accessToken, userID:userID}} className="join_button">Join</Link>
                        </div>
                    </div>
            })}
        </div>

    )
}


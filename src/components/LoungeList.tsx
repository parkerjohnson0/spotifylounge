import React from 'react';
import '../styles/LoungeList.css';
import {Link} from 'react-router-dom';
interface LoungeListProps{
    lounges: any[]
}
export default function LoungeList(props:LoungeListProps){
    const testID = 3;
    return(
        <div className="lounge_list_container">
            {props.lounges.map(x =>{
            return <div className="lounge_container" >
                        <div className="room_info">
                            <div className="room_title">ROOM TITLE</div>
                            <div className="current_song_info">
                                <img className="current_song_pic" src='https://i.scdn.co/image/ab67616d0000b273af202a7e0acbdedb41c25de4'/>
                                <div className="song_info">
                                    <p className="song_name">Words</p> 
                                    <p className='artist_name'>Feint, Laura Brehm</p> 
                                </div>
                            </div>

                        </div>
                        <div className="lounge_footer">
                            <img className='user_icon' src='icons/lounge_user_icon.png' />
                            <div className="users_connected">6</div>
                            <Link to="/room/3" className="join_button">Join</Link>
                        </div>
                    </div>
            })}
        </div>

    )
}
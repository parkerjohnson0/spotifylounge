import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import '../styles/LoungeListPage.css';
// import useSpotifyAuth from './hooks/useSpotifyAuth';
import useSpotifyLounges from '../hooks/useSpotifyLounges';
import LoungeList from './LoungeList';
import Login from './Login'
import { useParams } from 'react-router-dom';
import NewRoomDialog from './NewRoomDialog';
import useAccessToken from '../hooks/useAccessToken';
import { AuthContext } from '../context/AuthContext';
interface LoungeListPageProgs {
  setRoomID: Dispatch<SetStateAction<string | undefined>>
  toggleShowRoomDialog: () => void
}
function LoungeListPage(props: LoungeListPageProgs) {
  // const [authorized, setAuthorized] = useState(false);
  const {authorized, setAuthorized} = useContext(AuthContext);
  let {accessToken, userID} = useParams();
  const tokenCookie = useAccessToken(authorized, setAuthorized);
  const lounges: any[] = useSpotifyLounges();

  return (
    <div className="app_container">
      <div className="inner_container">
        <div className="header">
          Spotify Lounges
        </div>
        <div className="App">
          {/* NOTE: figure out cleaner way to do this maybe */}
           <LoungeList setRoomID={props.setRoomID} lounges={lounges} />
        </div>
      </div>
        <button className="lounge_list_add_room_button"
            onClick={()=>  props.toggleShowRoomDialog()}>
            +
        </button>
    </div>
  )
}

export default LoungeListPage;

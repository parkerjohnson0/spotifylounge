import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import '../styles/LoungeListPage.css';
// import useSpotifyAuth from './hooks/useSpotifyAuth';
import useSpotifyLounges from '../hooks/useSpotifyLounges';
import LoungeList from './LoungeList';
import Login from './Login'
import { useParams } from 'react-router-dom';
import NewRoomDialog from './NewRoomDialog';
interface LoungeListPageProgs {
  setAuthorized: Dispatch<SetStateAction<boolean>>
  setRoomID: Dispatch<SetStateAction<string | undefined>>
  authorized: boolean
  toggleShowRoomDialog: () => void
}
function LoungeListPage(props: LoungeListPageProgs) {
  const [authorized, setAuthorized] = useState(false);
  const [tokenCookie, setTokenCookie] = useState<string | null>(window.localStorage.getItem("token"));
  let {accessToken, userID} = useParams();
  const lounges: any[] = useSpotifyLounges();
  // console.log("authorized: " +  authorized);
  useEffect(()=>{
    if (tokenCookie && !authorized){
      props.setAuthorized(true);
      setAuthorized(true);
      accessToken = tokenCookie;
     window.history.pushState({}, "", "/");
    }
    else if (accessToken){
      window.localStorage.setItem("token",accessToken);
      props.setAuthorized(true);
      setAuthorized(true);
    }
    else{
      setAuthorized(false);
      props.setAuthorized(false);
    }
    // console.log(cookie + " " + userID);
  },[])

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

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import '../styles/LoungeListPage.css';
// import useSpotifyAuth from './hooks/useSpotifyAuth';
import useSpotifyLounges from '../hooks/useSpotifyLounges';
import LoungeList from './LoungeList';
import Login from './Login'
import { useParams } from 'react-router-dom';
interface LoungeListPageProgs {
  setAuthorized: Dispatch<SetStateAction<boolean>>
  authorized: boolean
}
function LoungeListPage(props: LoungeListPageProgs) {
  const [authorized, setAuthorized] = useState(false);
  const [token, setToken] = useState<string | undefined>("");
  const {accessToken, userID} = useParams();
  const lounges: any[] = useSpotifyLounges();
  // console.log("authorized: " +  authorized);
  useEffect(()=>{
    const hash: string = window.location.hash;
    let cookie: string | undefined = window.localStorage.getItem("token") || accessToken;
    if (!cookie && hash){
      cookie = hash.substring(1).split("&").find(x => x.startsWith("access_token"))?.split("=")[1]!;
      window.location.hash = "";
      window.localStorage.setItem("token", cookie);
    }
    setToken(cookie);
    if (cookie && !props.authorized){
      props.setAuthorized(true);
      setAuthorized(true);
     window.history.pushState({}, "", "/");
    }
    else{
      setAuthorized(false);
      props.setAuthorized(false);
    }
    console.log(cookie + " " + userID);
  },[])

  return (
    <div className="app_container">
      <div className="inner_container">
        <div className="header">Spotify Lounges</div>
        <div className="App">
          {/* NOTE: figure out cleaner way to do this maybe */}
           <LoungeList lounges={lounges} />
        </div>
      </div>
    </div>
  )
}

export default LoungeListPage;

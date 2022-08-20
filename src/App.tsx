import React, { useEffect, useState } from 'react';
import './App.css';
// import useSpotifyAuth from './hooks/useSpotifyAuth';
import useSpotifyLounges from './hooks/useSpotifyLounges';
import LoungeList from './components/LoungeList';
import Login from './components/Login'
function App() {
  const [authorized, setAuthorize] = useState(false);
  const [token, setToken] = useState<string | null>("");
  const lounges: any[] = useSpotifyLounges();
  // console.log("authorized: " +  authorized);
  useEffect(()=>{
    const hash: string = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash){
      token = hash.substring(1).split("&").find(x => x.startsWith("access_token"))?.split("=")[1]!;
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  },[])

  return (
    <div className="app_container">
      <div className="inner_container">
        <h2 className="header">Spotify Lounges</h2>
        <div className="App">
          {/* NOTE: figure out cleaner way to do this maybe */}
           <LoungeList lounges={lounges} />
        </div>
      </div>
    </div>
  )
}

export default App;

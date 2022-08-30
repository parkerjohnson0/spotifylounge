import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import LoungeListPage from './components/LoungeListPage';
import RoomPage from './components/RoomPage';


export default function App() {
    const [authorized, setAuthorized] = useState<boolean>(false);
  return (
        <>
            {authorized || <Login />}
            <Routes>
                <Route path="/" element={<LoungeListPage authorized={authorized} setAuthorized={setAuthorized} />}/>
                <Route path="/:accessToken/user/:userID" element={<LoungeListPage authorized={authorized} setAuthorized={setAuthorized}/>}/>
                <Route path="/room/:roomID" element={<RoomPage authorized={authorized} setAuthorized={setAuthorized}/>}/>
               {/* dont this is going to be used. remove later  */}
                {/* <Route path="/room/:roomID/:accessToken/user/:userID" element={<RoomPage authorized={authorized} setAuthorized={setAuthorized}/>}/> */}
            </Routes>
        </>
  )
}

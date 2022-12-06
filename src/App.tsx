import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import LoungeListPage from './components/LoungeListPage';
import NewRoomDialog from './components/NewRoomDialog';
import RoomPage from './components/RoomPage';
import { RoomQueueContext, RoomQueueProvider } from './context/RoomQueueContext';


export default function App() {
    const [authorized, setAuthorized] = useState<boolean>(false);
    const [roomID, setRoomID] = useState<string | undefined>();
    const [showRoomDialog, setShowRoomDialog] = useState<boolean>(false);
    function toggleShowRoomDialog(){
        setShowRoomDialog(showRoomDialog => !showRoomDialog);
    }
    // const Room = useContext(RoomQueueContext)
  return (
        <RoomQueueProvider roomID={roomID}>
            {authorized || <Login />}
            {!showRoomDialog || <NewRoomDialog setShowRoomDialog={setShowRoomDialog}/>}
            <Routes>
                <Route path="/" element={<LoungeListPage toggleShowRoomDialog={toggleShowRoomDialog} setRoomID={setRoomID} authorized={authorized} setAuthorized={setAuthorized} />}/>
                <Route path="/:accessToken/user/:userID" element={<LoungeListPage
                                                            toggleShowRoomDialog={toggleShowRoomDialog}
                                                         setRoomID={setRoomID} authorized={authorized} setAuthorized={setAuthorized}/>}/>
                <Route path="/room/:roomID" element={<RoomPage authorized={authorized} setAuthorized={setAuthorized}/>}/>
               {/* dont this is going to be used. remove later  */}
                {/* <Route path="/room/:roomID/:accessToken/user/:userID" element={<RoomPage authorized={authorized} setAuthorized={setAuthorized}/>}/> */}
            </Routes>
        </RoomQueueProvider>
  )
}

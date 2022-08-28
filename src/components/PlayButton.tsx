import React from 'react'
import "../styles/PlayButton.css"
interface PlayButtonProps {
    player: Spotify.Player | null; 
    deviceID: string;
    accessToken: string;
}
export default function PlayButton(props: PlayButtonProps){
    async function  play(){
        console.log("clicked");
        if (props.player){
            // props.player.connect();
            // props.player.togglePlay();
            await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${props.deviceID}`,{
               method: 'PUT', 
               body: JSON.stringify({
                context_uri:"spotify:playlist:3ebHKSjHujS4Tyt2KKP97R",
                offset: {
                    position:15
                }
            }),
               headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + props.accessToken}
            })
        }
    }
  return (
    <div className="play_button_component_container">
        <img className="play_button_icon"
            onClick={async ()=> play()}/>
             {/* src="/icons/play.png"/> */}
    </div>
  )
}

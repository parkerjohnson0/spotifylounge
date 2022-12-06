import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { updatePlayerVolume } from '../services/SpotifyService'
import '../styles/PlaybackBar.css'
interface PlaybackBarProps{
  durationMS:number | undefined 
  progressMS:number | undefined 
  volumeVisibility: boolean | undefined
  setVolumeVisibility: Dispatch<SetStateAction<boolean>> | undefined
  deviceID: string
  accessToken: string
}
export default function PlaybackBar(props: PlaybackBarProps) {
  const [volume, setVolume] = useState<number | undefined>(50);
  // const[volumeVisibility, setVolumeVisibility] = useState<boolean>(false);
  const[sliderHover, setSliderHover] = useState<boolean>(false);
  const[volumeButtonHover, setVolumeButtonHover] = useState<boolean>(false);
  useEffect(()=>{
    if (volume != undefined && props.deviceID){
      updatePlayerVolume(volume, props.deviceID,props.accessToken);
    }
  // console.log('volume changed: ' + volume) ;
  },[volume])
  return (
    <>
    <div className="playbackbar_component_container">
        {Math.floor((props.progressMS === undefined ? 0 : props.progressMS) / 1000 / 60)}:{Math.floor((props.progressMS === undefined ? 0 : props.progressMS) / 1000 % 60)  > 9 ? Math.floor(props.progressMS === undefined ? 0 : props.progressMS / 1000 % 60): '0' +Math.floor(props.progressMS === undefined ? 0 : props.progressMS / 1000 % 60)  }
        <div className="playbackbar"
        style={
          {
           background:`linear-gradient(90deg, white ${(props.progressMS === undefined ? 0: props.progressMS / props.durationMS!) * 100}%, #8e8e8e 0%)`
          //  background:`linear-gradient(90deg, white ${51}%, #8e8e8e ${0}%)`
          }
        }>

        </div>
        {Math.floor(props.durationMS! / 1000 / 60)}:{Math.floor(props.durationMS! / 1000 % 60)  > 9 ? Math.floor(props.durationMS! / 1000 % 60): '0' +Math.floor(props.durationMS! / 1000 % 60)  }
        <div style={{position:"relative", width:"50px", height:"30px", content:""}}>
          <div className="volume_container">
            <img className="volume_button" src="/icons/volume.png"
            onClick={() => {
              props.setVolumeVisibility!(!(props.volumeVisibility));
            }}
            onMouseEnter={() =>{
              // setVolumeVisibility(true);
              // setVolumeButtonHover(true);
              // setSliderHover(false);
            } }
            onMouseLeave={() => setTimeout(() =>{
                if (!sliderHover){
                  // setVolumeVisibility(false);
                  // setVolumeButtonHover(false);
                  // setSliderHover(true);
                }
            },1000)}
            />
            {props.volumeVisibility &&
              <input defaultValue={volume} className="volume_slider" id='volume_slider' type="range"
              // onMouseUp={(e)=> changeVolume(e)}
              onMouseUp={(e)=> setVolume(parseInt((e.target as HTMLInputElement).value))}
            onMouseEnter={() =>{
              // setVolumeVisibility(true)
              // setSliderHover(true);
            } }
            onMouseLeave={() => setTimeout(() =>{
                // if (!volumeButtonHover){
                //   setVolumeVisibility(false);
                //   setVolumeButtonHover(true);
                //   setSliderHover(false);
                // }
            },1000)}>
              </input>
            }
          </div>
        </div>
    </div>
    </>
  )
}


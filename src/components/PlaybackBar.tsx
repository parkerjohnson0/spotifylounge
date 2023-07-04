import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
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
    </div>
    </>
  )
}


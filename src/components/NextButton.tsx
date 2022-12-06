import React from 'react'
import "../styles/NextButton.css"
interface NextButtonPropType{
  playNextSong: () => void
}
export default function NextButton(props: NextButtonPropType) {
  return (
    <div className="next_button_component_container">
        <img className="next_button_icon"
        onClick={() => props.playNextSong()}/>
             {/* src="/icons/play.png"/> */}
    </div>
  )
}

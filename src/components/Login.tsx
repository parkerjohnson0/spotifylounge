
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React,{Dispatch, SetStateAction, useEffect, useState} from 'react';
import '../styles/Login.css';

type Nullable<T> = T | null;

//todo only allow call  to api if isAuthorizing is null or false
//todo different text for isAuthorizing null or false
export default function Login(){
    async function authorizeUser(){
        setIsAuthorizing(() => !isAuthorizing);
        // if (isAuthorizing){
        //      return;
        // } 
        // let success: Nullable<boolean> = null;
        // setIsAuthorizing(!isAuthorizing);
        // setText(!isAuthorizing ? userPromptClicked : userPrompt);
        // authorize.url = 'test';
        // return await authorize.authorize();
    }
    const userPrompt = "This app requires authorization with Spotify's API";
    const userPromptClicked = "Authorizing";
    const[text, setText] = useState<string>("This app requires authorization with Spotify's API");
    const [isAuthorizing, setIsAuthorizing] = useState<Nullable<boolean>>(null);
    //NOTE: idk why but people online are always talking about useEffect is used in ways it's not suppsoed to be used
    // see if this is one of those cases
    useEffect(()=>{
        if (isAuthorizing) {
           setText(userPromptClicked);
        }
        else{
            setText(userPrompt);
        }
    },[isAuthorizing])
    return(
        <div className="login_box_container">

            <div className="login_box">
                <div className="login_text">
                {text}
                </div>
                <a className='login_button' href={`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}` +
            `&response_type=code&redirect_uri=https://localhost:7040/api/Auth&scope=streaming ` + 
            `user-read-playback-state user-modify-playback-state user-read-currently-playing ` +
            `user-read-email user-read-private`}
                >
                    <p>Authorize</p>
                </a>
            </div>
        </div>
     
    )
}
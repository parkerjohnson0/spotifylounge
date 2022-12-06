import React, {useRef, useEffect, useState} from 'react'
import { faD, faN, faSearch, faX } from '@fortawesome/free-solid-svg-icons';
import "../styles/SearchBar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import useDebounce from '../hooks/useDebounce';
import { searchSpotify } from '../services/SpotifyService';
import { Track } from '../models/Track';
import SearchResults from './SearchResults';
interface SearchBarProps{
  accessToken: string | undefined;
  deviceID: string
}
export default function SearchBar(props: SearchBarProps) {
  const [searchText, setSearchText] = useState<string>("");
  const [hideClear, setHideClear] = useState<boolean>(true);
  //need ref to be able to use state in event listener. event listeners only get created with initial state
  const searchRef = useRef(searchText);
  // const debounce = useDebounce(.5, searchText);
  const [searchResults, setSearchResults] = useState<Array<Track>>([]);
  // function getText(){
  //   return searchText;
  // }
  function setText(text: string){
    if(text != ""){
      setHideClear(false);
    }
    else{
      (document.getElementById("input") as HTMLInputElement).value = "";
      setHideClear(true);
      setSearchResults([]);
    }
    setSearchText(text);
    searchRef.current = text;
  }
  async function searchListener(e: KeyboardEvent){
        if (e.key === "Enter" ){
          if (!props.accessToken) return;
          await searchSpotify(props.accessToken, searchRef.current)
                .then((results)=>{
                  setSearchResults(results);
                  // console.log(results);
                });
              }
  }
  useEffect(()=>{

    (document.getElementById("input") as HTMLInputElement).addEventListener("keydown",searchListener);

     return () => (document.getElementById("input") as HTMLInputElement)?.removeEventListener("keydown", searchListener );
  },[])
  return (
    <>
    <div className="search_bar_container">
        <div className="input_container">
          <FontAwesomeIcon className="input_icon" icon={faSearch}/>
          <input id="input" autoComplete="off" type="text" className="search_bar_input_box" placeholder="Search for music"
            onChange={(e)=> setText(e.target.value)}>
          </input>
          {hideClear || <FontAwesomeIcon className="clear_icon" icon={faX}
                          onClick={()=> setText("")}/>}
          {searchResults.length == 0 || <SearchResults clearText={() => setText("")} searchResults={searchResults}/> }
          
        </div>
    </div>
    </>
  )
}

import React, { useState } from 'react'
import { getTsBuildInfoEmitOutputFilePath } from 'typescript'
import { Track } from '../models/Track'
import "../styles/SearchResults.css"
import ContextMenu from './ContextMenu'
import QueueButton from './QueueButton'
import SearchResult from './SearchResult'
interface SearchResultsProps{
    searchResults: Array<Track>,
    clearText: () => void

}
export default function SearchResults(props:SearchResultsProps) {
    const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
    if (showContextMenu){

    }
  return (
    <>
        {showContextMenu ? <ContextMenu/> : null}
        <div className="search_result_container">

            {props.searchResults.map((x,idx)=>{
               return <SearchResult clearText={props.clearText} key={idx} result={x}/> 
            })}
        </div>
    </>
  )
}

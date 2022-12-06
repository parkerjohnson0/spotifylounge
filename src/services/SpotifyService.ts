import PlaybackState from "../models/PlaybackState";
import { Track } from "../models/Track";
export async function searchSpotify(accessToken: string, searchText: string): Promise<Array<Track>>{
    if (!searchText) return [{} as Track];
    let tracks: Array<Track> = [];
    await fetch(`https://api.spotify.com/v1/search?q=${searchText}&type=track&limit=5`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + accessToken
        }
    })
    .then(response => response.json())
    .then(json => {
        const results = json.tracks.items;
        results.forEach((x: any) => {
            tracks.push({
                AlbumName: x.album.name,
                AlbumPicture: x.album.images[0].url,
                SongArtist: x.artists[0].name,
                SongName: x.name,
                SongURI: x.uri,
                AlbumContext: x.track_number - 1,
                AlbumURI: x.album.uri,
                DurationMS: x.duration_ms
            } as Track)
        });
        return tracks;
    })
    return tracks;
}
export async function getPlaybackState(accessToken: string): Promise<PlaybackState>{
    let ret: PlaybackState = {

    } as PlaybackState;
    await fetch(`https://api.spotify.com/v1/me/player`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + accessToken,
            "Accept": "application/json"
        }
    })
    .then(response =>{
        console.log(response)
        if (response.status == 200){
            return response.json()
        }
        else{
            return {
                "progress_ms": 0
            }
        }
    })
    .then(json => {
        console.log(json);
        ret.ProgressMS = json.progress_ms;
        return ret;
    })
    return ret
}
//doesnt return anything. and really cant because this only called from within a useEffect
//prime example of why I need to work on automated reqeust retries. 
//e
export async function updatePlayerVolume(volume: number, device: string, accessToken: string){
    await fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`+
    `&device_id=${device}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + accessToken
        },
    })
}
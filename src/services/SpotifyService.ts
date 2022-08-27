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
                DurationMS: x.duration_ms
            } as Track)
        });
        return tracks;
    })


    return tracks;
}
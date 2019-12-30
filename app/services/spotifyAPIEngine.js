const axios = require('axios');
const logger = require('../config/winston');

exports.getAllUserAlbums = async (accessToken) => {
    try {
        let albums = [];
        let url = 'https://api.spotify.com/v1/me/albums?limit=50';
        while (url != null) {
            const {data} = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            albums = albums.concat(data.items);
            url = data.next;
        }
        return albums;
    } catch (err) {
        logger.error(err);
        return [];
    }
};

exports.getAllUserSongs = async (accessToken) => {
    let songs = [];
    let url = "https://api.spotify.com/v1/me/albums?limit=50";
    while (url != null) {
        const {data} = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        songs = songs.concat(data.items);
        url = data.next;
    }
    return songs;
};

exports.getAllUserPlaylistsAndTracks = async (accessToken) => {
    logger.info("Getting all use playlists");
    let playlists = [];
    let url="https://api.spotify.com/v1/me/playlists?limit=50";
    while (url != null) {
        const {data} = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        playlists = playlists.concat(data.items);
        url = data.next;
    }
    logger.info(`Retrieved ${playlists.length} playlists`);
    for (const playlist of playlists) {
        let url = `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`
        let tracks = [];
        while(url != null) {
            const {data} = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            tracks = tracks.concat(data.items);
            url = data.next
        }
        playlist.tracks = tracks;
    }

    return playlists;

};
import { v4 } from "uuid";

let playlists = [];

export const playlistMemStore = {
     async getAllPlaylists() {
          return playlists;
     },

     async addPlaylist(playlist) {
          playlist.id = v4();
          playlists.push(playlist);
          return playlists;
     },

     async getPlaylistById(id) {
          return playlists.find((playlist) => playlist._id === id);
     },

     async deletePlaylistById(id) {
          const index = playlists.findIndex((playlist) => playlist._id === id);
          playlists.splice(index, 1);
     },

     async deleteAllPlaylists() {
          playlists = [];
     },
};

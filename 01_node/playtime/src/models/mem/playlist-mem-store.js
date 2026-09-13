// eslint-disable-next-line import/no-unresolved
import { v4 } from "uuid";
import { trackMemStore } from "./track-mem-store.js"

let playlists = [];

export const playlistMemStore = {
     async getAllPlaylists() {
          return playlists;
     },

     async addPlaylist(playlist) {
          playlist._id = v4();
          playlists.push(playlist);
          return playlists;
     },

     async getPlaylistById(id) {
          const list = playlists.find((playlist) => playlist._id === id);
          list.tracks = await trackMemStore.getTracksByPlaylistId(list._id)
          return list
     },

     async deletePlaylistById(id) {
          const index = playlists.findIndex((playlist) => playlist._id === id);
          playlists.splice(index, 1);
     },

     async deleteAllPlaylists() {
          playlists = [];
     },

     async getUserPlaylists(userid) {
          return playlists.filter((playlist) => playlist.userid === userid);
     },
};

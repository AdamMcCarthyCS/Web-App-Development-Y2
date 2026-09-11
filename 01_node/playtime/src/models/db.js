import { playlistMemStore } from "./mem/playlist-mem-store.js";

export const db = {
     playlistStore: null,

     init() {
          this.playlistStore = playlistMemStore;
     },
};

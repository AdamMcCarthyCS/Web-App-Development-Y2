import { playlistMemStore } from "./mem/playlist-mem-store.js";
import { trackMemStore } from "./mem/track-mem-store.js"

export const db = {
     playlistStore: null,
     trackStore: null,

     init() {
          this.playlistStore = playlistMemStore;
          this.trackStore = trackMemStore;
     },
};

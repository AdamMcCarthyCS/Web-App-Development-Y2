import { v4 } from "uuid";

let tracks = [];

export const trackMemStore = {
  async getAllTracks() {
    return tracks;
  },

  async addTrack(playlistid, track) {
    track._id = v4();
    track.playlistid = playlistid;
    tracks.push(track);
    return track;
  },

  async getTracksByPlaylistId(id) {
    return tracks.filter((track) => track.playlistid === id);
  },

  async getTrackById(id) {
    let foundTrack = tracks.find((track) => track._id === id);
    if (!foundTrack) {
      foundTrack = null;
    }
    return foundTrack;
  },

  async getPlaylistTracks(playlistid) {
    let foundTracks = tracks.filter((track) => track.playlistid === playlistid);
    if (!foundTracks) {
      foundTracks = null;
    }
    return foundTracks;
  },

  async deleteTrack(id) {
    const index = tracks.findIndex((track) => track._id === id);
    if (index !== -1) tracks.splice(index, 1);
  },

  async deleteAllTracks() {
    tracks = [];
  },

  async updateTrack(track, updatedTrack) {
    track.title = updatedTrack.title;
    track.artist = updatedTrack.artist;
    track.duration = updatedTrack.duration;
  },
};

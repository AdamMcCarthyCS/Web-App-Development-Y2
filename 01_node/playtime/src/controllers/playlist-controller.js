import { db } from "../models/db.js";
import { TrackSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const playlistController = {
  index: {
    handler: async function (request, h) {
      const playlist = await db.playlistStore.getPlaylistById(request.params.id);
      const viewData = {
        title: "Playlist",
        playlist: playlist,
      };
      return h.view("playlist", viewData);
    },
  },

  addTrack: {
    validate: {
      payload: TrackSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const playlist = await db.playlistStore.getPlaylistById(request.params.id);
        return h.view("playlist", { title: "Error adding track", playlist, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const playlist = await db.playlistStore.getPlaylistById(request.params.id);
      const newTrack = {
        title: request.payload.title,
        artist: request.payload.artist,
        duration: Number(request.payload.duration),
      };
      await db.trackStore.addTrack(playlist._id, newTrack);
      return h.redirect(`/playlist/${playlist._id}`);
    },
  },

  deleteTrack: {
    handler: async function (request, h) {
      const playlist = await db.playlistStore.getPlaylistById(request.params.playlistid);
      await db.trackStore.deleteTrack(request.params.trackId);
      return h.redirect(`/playlist/${playlist._id}`);
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        const playlist = await db.playlistStore.getPlaylistById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          playlist.img = url;
          await db.playlistStore.updatePlaylist(playlist);
        }
        return h.redirect(`/playlist/${playlist._id}`);
      } catch (error) {
        console.log(error);
        return h.redirect(`/playlist/${playlist._id}`)
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};

import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { PlaylistArray, PlaylistSpec, PlaylistSpecPlus, IdSpec } from "../models/joi-schemas.js"
import { validationError } from "./logger.js"

export const playlistApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const playlists = await db.playlistStore.getAllPlaylists();
        return playlists;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all playlists",
    notes: "Returns details of all playlists",
    response: { schema: PlaylistArray, failAction: validationError }
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const playlist = await db.playlistStore.addPlaylist(request.payload);
        if (playlist) {
          return h.response(playlist).code(201);
        }
        return Boom.badImplementation("error creating playlist");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const playlist = await db.playlistStore.getPlaylistById(request.params.id);
        if (!playlist) {
          return Boom.notFound("No playlist with this id");
        }
        return playlist;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get one playlist",
    notes: "Returns details of one traplaylistIdck using its id",
    validate: { params: { id: IdSpec, failAction: validationError }},
    response: { schema: PlaylistSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h){
      try {
        const playlist = await db.playlistStore.getPlaylistById(request.params.id);
        if (!playlist) {
          return Boom.notFound("No playlist with this id");
        }
        await db.playlistStore.deletePlaylistById(playlist._id);
        return h.response().code(204)
      } catch {
      return Boom.serverUnavailable("Database Error")
    }
  },
  description: "Get all tracks",
  notes: "Returns details of all tracks",
  response: { schema: Array, failAction: validationError }
},

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.playlistStore.deleteAllPlaylists();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
}

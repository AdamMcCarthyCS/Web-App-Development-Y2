import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { TrackArray, TrackSpec } from "../models/joi-schemas.js"
import { validationError } from "./logger.js"

export const trackApi = {
  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const { playlistId, track } = request.payload;
        const newTrack = await db.trackStore.addTrack(playlistId, track);
        if (newTrack) {
          return h.response(newTrack).code(201);
        }
        return Boom.badImplementation("error creating track");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.trackStore.deleteAllTracks();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all tracks",
    notes: "Delete all tracks in the app",
  },

  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const tracks = await db.trackStore.getAllTracks();
        return tracks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all tracks",
    notes: "Returns details of all tracks",
    response: { schema: TrackArray, failAction: validationError }
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const track = await db.trackStore.getTrackById(request.params.id);
        if (!track) {
          return Boom.notFound("No Track with this id");
        }
        return track;
      } catch (err) {
        return Boom.serverUnavailable("No Track with this id");
      }
    },
  },
};

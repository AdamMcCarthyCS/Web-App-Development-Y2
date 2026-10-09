import Boom from "@hapi/boom";
import { db } from "../models/db.js"

export const trackApi = {
    create: {
        auth: false, 
        handler: async function(request, h) {
            try {
                const {playlistId, track} = request.payload;
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
  },

  
};
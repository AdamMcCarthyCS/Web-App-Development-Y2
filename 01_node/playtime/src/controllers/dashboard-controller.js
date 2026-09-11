import { db } from "../models/db.js";

export const dashboardController = {
     index: {
          handler: async function (request, h) {
               const playlists = await db.playlistStore.getAllPlaylists();
               const viewData = {
                    title: "Playtime Dashboard",
                    playlists: playlists,
               };
               return h.view("dashboard", viewData);
          },
     },
};

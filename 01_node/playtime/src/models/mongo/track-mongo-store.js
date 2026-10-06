import { Track } from "./track.js";

export const trackMongoStore = {
    async getTracksByPlaylistId(id) {
        const tracks = await Track.find({ playlistid: id }).lean();
        return tracks;
    },

    async getAllTracks() {
        const tracks = await Track.find().lean();
        return tracks;
    },

    async addTrack(playlistId, track) {
        const newTrack = new Track(track);
        newTrack.playlistid = playlistId;
        const trackObj = await newTrack.save();
        return this.getTrackById(trackObj._id);
    },

    async getUserTracks(userid) {
        const tracks = await Track.find({ userid: id }).lean();
        return tracks
    },

    async deleteTrack(id) {
        try {
            await Track.deleteOne({ _id: id });
        } catch {
            console.log("bad id");
        }
    },

    async deleteAllTracks() {
        await Track.deleteMany({});
    }


};
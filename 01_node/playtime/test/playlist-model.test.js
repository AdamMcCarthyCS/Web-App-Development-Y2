import { assert } from "chai"
import { db } from "../src/models/db.js"
import { playlist, testPlaylists } from "./fixtures.js"

suite("Playlist API tests", () => {
    setup(async () => {
        db.init();
        await db.playlistStore.deleteAllPlaylists();
        for (let i = 0; i < testPlaylists.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            testPlaylists[i] = await db.playlistStore.addPlaylist(testPlaylists[i])
        }
    });

    test("create a playlist", async () => {
        const newPlaylist = await db.playlistStore.addPlaylist(playlist);
        assert.equal(playlist, newPlaylist);
    });

    test("get all playlists", async () => {
        const returnedPlaylists = await db.playlistStore.getAllPlaylists();
        assert.equal(returnedPlaylists.length, 3);
    });

    test("delete all playlists", async () => {
        let returnedPlaylists = await db.playlistStore.getAllPlaylists();
        assert.equal(returnedPlaylists.length, 3);
        await db.playlistStore.deleteAllPlaylists();
        returnedPlaylists = await db.playlistStore.getAllPlaylists();
        assert.equal(returnedPlaylists.length, 0);
    });

    test("get a playlist - success", async () => {
        const addedPlaylist = await db.playlistStore.addPlaylist(playlist);
        const returnedPlaylist1 = await db.playlistStore.getPlaylistById(addedPlaylist._id);
        assert.deepEqual(addedPlaylist, returnedPlaylist1);
    });


})
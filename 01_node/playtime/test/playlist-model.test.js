import { assert } from "chai"
import { db } from "../src/models/db.js"
import { playlist, testPlaylists } from "./fixtures.js"

suite("Playlist API tests", () => {

    test("create a playlist", async () => {
        const newPlaylist = await db.playlistStore.addPlaylist(playlist);
        assert.equal(playlist, newPlaylist);
    });
})
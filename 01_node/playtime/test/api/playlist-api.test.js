import { assert } from "chai";
import { playtimeService } from "./playtime-service.js";
import { assertSubset } from "../test-utils.js";
import { playlist, testPlaylists } from "../fixtures.js";

suite("Playlist API tests", () => {
    setup (async () => {
    });
    
    teardown (async () => {

    });

    test ("create a playlist", async () => {
        const newPlaylist = await playtimeService.createPlaylist(playlist);
        assertSubset(playlist, newPlaylist);
        assert.isDefined(newPlaylist._id);
    });

});
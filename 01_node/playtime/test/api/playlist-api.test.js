import { assert } from "chai";
import { playtimeService } from "./playtime-service.js";
import { assertSubset } from "../test-utils.js";
import { playlist, testPlaylists } from "../fixtures.js";

suite("Playlist API tests", () => {
    setup (async () => {
        await playtimeService.deleteAllPlaylists();
        for (let i = 0; i < testPlaylists.length; i+=1) {
            // eslint-disable-next-line no-await-in-loop
            testPlaylists[i] = await playtimeService.createPlaylist(testPlaylists[i]);
        }
    });
    
    teardown (async () => {

    });

    test ("create a playlist", async () => {
        const newPlaylist = await playtimeService.createPlaylist(playlist);
        assertSubset(playlist, newPlaylist);
        assert.isDefined(newPlaylist._id);
    });

    test ("get a playlist - success", async () => {
        const originalPlaylist = await playtimeService.createPlaylist(playlist);
        const returnedPlaylist = await playtimeService.getPlaylist(originalPlaylist._id);
        assertSubset(originalPlaylist, returnedPlaylist);
    });

    test ("delete all playlists", async () => {
        let returnedPlaylists = await playtimeService.getAllPlaylists();
        assert.equal(returnedPlaylists.length, 3);
        await playtimeService.deleteAllPlaylists();
        returnedPlaylists = await playtimeService.getAllPlaylists();
        assert.equal(returnedPlaylists.length, 0);
    })

});
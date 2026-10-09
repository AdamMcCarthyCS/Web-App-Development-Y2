import { assert } from "chai";
import { playtimeService } from "./playtime-service.js";
import { assertSubset } from "../test-utils.js";
import { playlist, track, testTracks } from "../fixtures.js";

suite("Track API tests", () => {
    setup (async () => {
        }
    );
    
    teardown (async () => {

    });

    test ("create a track", async () => {
        const newPlaylist = await playtimeService.createPlaylist(playlist);
        const newTrack = await playtimeService.createTrack(newPlaylist._id, track);
        assertSubset(track, newTrack);
        assert.isDefined(newTrack._id);
    });

});
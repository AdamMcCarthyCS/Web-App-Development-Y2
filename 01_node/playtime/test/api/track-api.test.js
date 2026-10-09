import { assert } from "chai";
import { playtimeService } from "./playtime-service.js";
import { assertSubset } from "../test-utils.js";
import { playlist, track, testTracks } from "../fixtures.js";

suite("Track API tests", () => {
  setup(async () => {
    await playtimeService.deleteAllTracks();
    for (let i = 0; i < testTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testTracks[i] = await playtimeService.createTrack(playlist._id, testTracks[i]);
    }
  });

  teardown(async () => {});

  test("create a track", async () => {
    const newTrack = await playtimeService.createTrack(playlist._id, track);
    assertSubset(track, newTrack);
    assert.isDefined(newTrack._id);
  });

  test("delete all tracks", async () => {
    let returnedTracks = await playtimeService.getAllTracks();
    assert.equal(returnedTracks.length, 3);
    await playtimeService.deleteAllTracks();
    returnedTracks = await playtimeService.getAllTracks();
    assert.equal(returnedTracks.length, 0);
  });

  test("get a track - success", async () => {
    const returnedTrack = await playtimeService.getTrack(testTracks[0]._id);
    assert.deepEqual(testTracks[0], returnedTrack);
  });

  test("get a track - bad id", async () => {
    try {
      const returnedTrack = await playtimeService.getTrack("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Track with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("get a track - deleted track", async () => {
    await playtimeService.deleteAllTracks();
    try {
      const returnedTrack = await playtimeService.getTrack(testTracks[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Track with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});

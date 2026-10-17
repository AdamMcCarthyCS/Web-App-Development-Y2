import Joi from "joi";

export const IdSpec = Joi.alternatives().try(
  Joi.string(),
  Joi.object()
).description("a valid ID")

export const UserSpec = Joi.object()
.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
  email: Joi.string().email().example("homer@simpson.com").required(),
  password: Joi.string().example("secret").required(),
  _id: IdSpec,
  __v: Joi.number(),
  }
).label("UserDetails")

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const UserCredentialSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}

export const TrackSpec = Joi.object()
.keys({
  title: Joi.string().example("Hey Boy Hey Girl").required(),
  artist: Joi.string().example("The Chemical Brothers").required(),
  duration: Joi.number().allow("").example(3.38).optional(),
  playlistId: IdSpec,
}).label("Track")

export const TrackSpecPlus = TrackSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("TrackPlus");

export const TrackArray = Joi.array().items(TrackSpecPlus).label("TrackArray");

export const PlaylistSpec = Joi.object({
  title: Joi.string().example("Easy Listening").required(),
  userid: IdSpec,
  tracks: TrackArray,
}).label("Playlist")

export const PlaylistSpecPlus = PlaylistSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlaylistPlus")

export const PlaylistArray = Joi.array().items(PlaylistSpecPlus).label("PlaylistArray");
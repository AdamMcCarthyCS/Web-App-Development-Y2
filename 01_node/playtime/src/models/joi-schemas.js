import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialSpec = Joi.object()
  .keys({
    email: Joi.string().example("user@email.com").email().required(),
    password: Joi.string().example("secret_password").required(),
  })
  .label("UserCredentials");

export const AuthResponseSpec = Joi.object().keys({
  success: Joi.bool().example(true).required(),
  token: Joi.string().example("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiSG9tZXIgU2ltcHNvbiJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"),
});

export const UserSpec = UserCredentialSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const TrackSpec = Joi.object()
  .keys({
    title: Joi.string().example("Hey Boy Hey Girl").required(),
    artist: Joi.string().example("The Chemical Brothers").required(),
    duration: Joi.number().allow("").example(3.38).optional(),
    playlistid: IdSpec,
  })
  .label("Track");

export const TrackSpecPlus = TrackSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("TrackPlus");

export const TrackArray = Joi.array().items(TrackSpecPlus).label("TrackArray");

export const PlaylistSpec = Joi.object({
  title: Joi.string().example("Easy Listening").required(),
  userid: IdSpec,
  tracks: TrackArray,
}).label("Playlist");

export const PlaylistSpecPlus = PlaylistSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlaylistPlus");

export const PlaylistArray = Joi.array().items(PlaylistSpecPlus).label("PlaylistArray");

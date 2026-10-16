import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { UserArray, UserSpec, IdSpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js"

export const userApi = {
  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await db.userStore.addUser(request.payload);
        if (user) {
          return h.response(user).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Creates a user",
    notes: "Returns a newly created user",
    validate: { payload: UserSpec, failAction: validationError },
    response: { schema: UserSpec, failAction: validationError },
  },

  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const users = await db.userStore.getAllUsers();
        return users;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all users",
    notes: "Returns details of all users",
    response: { schema: UserArray, failAction: validationError },
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await db.userStore.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No user with this id");
        }
        return user;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get one user by id",
    notes: "Returns all details of selected user",
    validate: { params: { id: IdSpec }},
    response: { schema: UserSpec, failAction: validationError }
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h){
      try {
        const user = await db.userStore.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No user with this id");
        }
        await db.userStore.deleteUserById(user._id);
        return h.response().code(204)
      } catch {
      return Boom.serverUnavailable("Database Error")
      }
    },
  tags: ["api"],
  description: "Delete one user",
  validate: { params: { id: IdSpec } },
  notes: "Delete one user using their id",
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.userStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  tags: ["api"],
  description: "Delete all users",
  notes: "Delete all users in the apps persistance location",
  },
};

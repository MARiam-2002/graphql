import {
  GraphQLFloat,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import eventModel from "../../../DB/model/event.model.js";
import bcrypt from "bcrypt";
import userModel from "../../../DB/model/user.model.js";
import { eventType } from "./product.types.js";
import { validation } from "../../utils/validation.js";
import { createProduct } from "./product.validation.js";

export const eventsFields = {
  type: new GraphQLList(
    new GraphQLObjectType({
      name: "Events",
      fields: {
        _id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        creators: {
          type: new GraphQLObjectType({
            name: "userCreated",
            fields: {
              email: { type: GraphQLString },
              password: { type: GraphQLString },
            },
          }),
        },
      },
    })
  ),
  resolve: async () => {
    const events = await eventModel.find({}).populate("creators");
    return events;
  },
};

export const userFields = {
  type: new GraphQLList(
    new GraphQLObjectType({
      name: "users",
      fields: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        events: {
          type: new GraphQLList(
            new GraphQLObjectType({
              name: "list",
              fields: {
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                price: { type: GraphQLFloat },
              },
            })
          ),
        },
      },
    })
  ),
  resolve: async () => {
    const users = await userModel.find({}).populate("events");
    return users;
  },
};

export const createEventField = {
  type: new GraphQLObjectType({
    name: "Event",
    fields: {
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      price: { type: GraphQLFloat },
      creators: { type: GraphQLID },
    },
  }),
  args: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    creators: { type: GraphQLID },
  },
  resolve: async (_, args) => {
    const event = await eventModel.create({ ...args });
    return event;
  },
};

export const createUserFieldes = {
  type: eventType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    await validation(createProduct, args);
    args.password = bcrypt.hashSync(args.password, 10);

    const user = await userModel.create({ ...args });
    return user;
  },
};

import express from "express";
import {
  GraphQLFloat,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { createHandler } from "graphql-http/lib/use/http";
import { connectDB } from "./DB/connection.js";
import eventModel from "./DB/model/event.model.js";
import userModel from "./DB/model/user.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { validation } from "./src/utils/validation.js";
import { createProduct } from "./src/modules/product/product.validation.js";
import {
  createEventField,
  createUserFieldes,
  eventsFields,
  userFields,
} from "./src/modules/product/product.fields.js";
dotenv.config();
const app = express();
const port = 3000;
connectDB();
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Rootquery",
    fields: {
      events: eventsFields,
      users: userFields,
    },
  }),

  mutation: new GraphQLObjectType({
    name: "Rootmutation",
    fields: {
      createEvents: createEventField,
      createUser: createUserFieldes,
    },
  }),
});

app.use("/graphql", createHandler({ schema }));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

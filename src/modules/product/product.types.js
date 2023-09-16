import { GraphQLObjectType, GraphQLString } from "graphql";

export const eventType = new GraphQLObjectType({
  name: "user",
  fields: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
});

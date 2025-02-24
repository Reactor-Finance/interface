import "server-only";
import { GraphQLClient } from "graphql-request";
import { GRAPHQL_URL } from "@/data/serverConstants";

export const graphqlClient = new GraphQLClient(GRAPHQL_URL);

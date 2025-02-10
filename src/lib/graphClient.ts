import { GRAPHQL_URL } from "@/data/constants";
import { GraphQLClient } from "graphql-request";
export const graphqlClient = new GraphQLClient(GRAPHQL_URL);

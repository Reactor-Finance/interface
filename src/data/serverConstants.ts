import "server-only";
import { env } from "@/env";

export const GRAPHQL_URL = env.SUBGRAPH_URL;
export const ASSETS_REPO_SLUG = env.ASSETS_REPO_SLUG;
export const GITHUB_TOKEN = env.GITHUB_TOKEN;

import { env } from "@/app/env";
import "server-only";

export const GRAPHQL_URL = env.SUBGRAPH_URL;
export const ASSETS_REPO_SLUG = env.ASSETS_REPO_SLUG;
export const GITHUB_TOKEN = env.GITHUB_TOKEN;

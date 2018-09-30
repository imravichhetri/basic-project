/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GithubQuery4
// ====================================================

export interface GithubQuery4_Github {
  name: string | null;
  username: string | null;
  avatarUrl: string | null;
  followers: number | null;
  following: number | null;
  repos: number | null;
}

export interface GithubQuery4 {
  Github: GithubQuery4_Github | null;
}

export interface GithubQuery4Variables {
  username: string;
}

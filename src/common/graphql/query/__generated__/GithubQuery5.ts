/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GithubQuery5
// ====================================================

export interface GithubQuery5_Github {
  name: string | null;
  username: string | null;
  avatarUrl: string | null;
  followers: number | null;
  following: number | null;
  repos: number | null;
}

export interface GithubQuery5 {
  Github: GithubQuery5_Github | null;
}

export interface GithubQuery5Variables {
  username: string;
}

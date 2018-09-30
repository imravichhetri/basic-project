/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GithubQuery7
// ====================================================

export interface GithubQuery7_Github {
  name: string | null;
  username: string | null;
  avatarUrl: string | null;
  followers: number | null;
  following: number | null;
  repos: number | null;
}

export interface GithubQuery7 {
  Github: GithubQuery7_Github | null;
}

export interface GithubQuery7Variables {
  username: string;
}

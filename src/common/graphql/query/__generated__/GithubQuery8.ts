/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GithubQuery8
// ====================================================

export interface GithubQuery8_Github {
  name: string | null;
  username: string | null;
  avatarUrl: string | null;
  followers: number | null;
  following: number | null;
  repos: number | null;
}

export interface GithubQuery8 {
  Github: GithubQuery8_Github | null;
}

export interface GithubQuery8Variables {
  username: string;
}

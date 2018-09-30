/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GithubQuery6
// ====================================================

export interface GithubQuery6_Github {
  name: string | null;
  username: string | null;
  avatarUrl: string | null;
  followers: number | null;
  following: number | null;
  repos: number | null;
}

export interface GithubQuery6 {
  Github: GithubQuery6_Github | null;
}

export interface GithubQuery6Variables {
  username: string;
}

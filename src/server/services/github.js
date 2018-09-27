import { getUserDetails } from "../utils/apis";

export const getGithubUserDetails = async username => {
	const { data } = await getUserDetails(username);
	return {
		username: data.login,
		name: data.name,
		followers: data.followers,
		following: data.following,
		repos: data.public_repos,
		avatarUrl: data.avatar_url
	};
};

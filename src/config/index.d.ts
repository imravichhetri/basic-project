export interface IGoogle {
  client_id: string;
  client_secret: string;
  redirect_url: string;
}

export interface IFacebook {
  auth_verify_host: string;
  app_id: string;
}

export interface IConfig {
  webapp_port: number;
  jwt_secret: string;
  google: IGoogle;
  user_posts_limit: number;
  facebook: IFacebook;
}
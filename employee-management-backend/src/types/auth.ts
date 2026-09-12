export interface AuthenticatedUser {
  sub: string;
  username?: string;
  email?: string;
  roles: string[];
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

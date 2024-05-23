export type SignInForm = {
  email: string;
  password: string;
};

export type SignUpForm = SignInForm & {
  name: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  picture: string;
};
export type AuthResponse = {
  statusCode: string;
  message: string;
  data: {
    user: User;
    token: string;
  };
};

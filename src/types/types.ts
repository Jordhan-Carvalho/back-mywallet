type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type Session = {
  userId: number;
  token: string;
};

export { User, Session };

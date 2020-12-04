interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

type Session = {
  userId: number;
  token: string;
};

type Entry = {
  id?: number;
  type: "entrada" | "saida";
  value: number;
  description: string;
  userId: number;
  date?: string;
};

export { User, Session, Entry };

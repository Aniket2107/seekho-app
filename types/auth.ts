export type userLoginType = {
  email: string;
  password: string;
};

export type initialStateType = {
  isAuthenticated: boolean;
  token: string;
  userId: string;
  knownLang: string;
  learningLang: string[];
  currentLang: string;
};

export type decodeType = {
  userId: string;
};

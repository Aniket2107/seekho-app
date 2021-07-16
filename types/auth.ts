export type userLoginType = {
  email: string;
  password: string;
};

export type registerType = {
  name: string;
  email: string;
  password: string;
  whyLearning: string;
  knownThrough: string;
  dailyGoal: number;
  knownLang: string;
  learningLang: string[];
};

export type initialStateType = {
  isAuthenticated: boolean;
  token: string;
  userId: string;
  knownLang: string;
  learningLang: string[];
  currentLang: string;
  points: Array<{
    language: string;
    coins: number;
  }>;
};

export type decodeType = {
  userId: string;
};

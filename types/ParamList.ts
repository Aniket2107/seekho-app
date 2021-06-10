import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type AuthParamList = {
  Login: undefined;
  Register: undefined;
};

export type AuthNavProps<T extends keyof AuthParamList> = {
  navigation: StackNavigationProp<AuthParamList, T>;
  route: RouteProp<AuthParamList, T>;
};

export type LearnParamList = {
  Learn: undefined;
  FlashCard: { level: string };
};

export type LearnNavProps<T extends keyof LearnParamList> = {
  navigation: StackNavigationProp<LearnParamList, T>;
  route: RouteProp<LearnParamList, T>;
};

export type FlashCardNavProps<T extends keyof LearnParamList> = {
  navigation: StackNavigationProp<LearnParamList, T>;
  route: RouteProp<LearnParamList, T>;
};

export type QuizParamList = {
  QuizList: undefined;
  Quiz: { level: string };
};

export type QuizListNavProps<T extends keyof QuizParamList> = {
  navigation: StackNavigationProp<QuizParamList, T>;
  route: RouteProp<QuizParamList, T>;
};

export type QuizNavProps<T extends keyof QuizParamList> = {
  navigation: StackNavigationProp<QuizParamList, T>;
  route: RouteProp<QuizParamList, T>;
};

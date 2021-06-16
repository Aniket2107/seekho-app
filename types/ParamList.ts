import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type AuthParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

export type AuthNavProps<T extends keyof AuthParamList> = {
  navigation: StackNavigationProp<AuthParamList, T>;
  route: RouteProp<AuthParamList, T>;
};

export type HomeNavProps<T extends keyof AuthParamList> = {
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

export type CollectionParamList = {
  Collection: undefined;
  VocabDetail: { vocabId: string; color: string };
};

export type CollectionNavProps<T extends keyof CollectionParamList> = {
  navigation: StackNavigationProp<CollectionParamList, T>;
  route: RouteProp<CollectionParamList, T>;
};

export type VocabDetailNavProps<T extends keyof CollectionParamList> = {
  navigation: StackNavigationProp<CollectionParamList, T>;
  route: RouteProp<CollectionParamList, T>;
};

export type ProfileParamList = {
  Profile: undefined;
  Ranking: { lang: string };
  VocabProgress: { userId: string };
  QuizProgress: { userId: string };
};

export type ProfileNavProps<T extends keyof ProfileParamList> = {
  navigation: StackNavigationProp<ProfileParamList, T>;
  route: RouteProp<ProfileParamList, T>;
};
export type RankingNavProps<T extends keyof ProfileParamList> = {
  navigation: StackNavigationProp<ProfileParamList, T>;
  route: RouteProp<ProfileParamList, T>;
};
export type VocabProgressNavProps<T extends keyof ProfileParamList> = {
  navigation: StackNavigationProp<ProfileParamList, T>;
  route: RouteProp<ProfileParamList, T>;
};
export type QuizProgressNavProps<T extends keyof ProfileParamList> = {
  navigation: StackNavigationProp<ProfileParamList, T>;
  route: RouteProp<ProfileParamList, T>;
};

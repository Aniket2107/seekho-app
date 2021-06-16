import { API } from "../backend";

export const postQuizData = (quizData: quizData) => {
  fetch(`${API}result/post/user-quiz`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quizData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        console.log("POST quiz data");
      } else {
        console.log("Error POST quiz");
      }
    })
    .catch((err) => console.log(err));
};

type quizData = {
  userId: string;
  language: string;
  level: string;
  score: number;
  data: data[];
};

export type data = {
  question: string;
  userAns: string;
  rightAns: string;
  timeTaken: number;
};

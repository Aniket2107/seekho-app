import { API } from "../backend";

export const initialize = (levelName: string, lang: string, userId: string) => {
  fetch(`${API}algo/initialize`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ level: levelName, language: lang, userId }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        console.log("Initialized leitner====");
      } else {
        console.log("Initialization error");
      }
    })
    .catch((err) => console.log(err));
};

export const knowTheWord = (
  language: string,
  levelName: string,
  wordId: string,
  userId: string
) => {
  let payload = getPayload(true, language, levelName, wordId, userId);

  fetch(`${API}algo/post`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        console.log("POST leitner");
      } else {
        console.log("Error POST");
      }
    })
    .catch((err) => console.log(err));
};

export const dontKnowTheWord = (
  language: string,
  levelName: string,
  wordId: string,
  userId: string
) => {
  let payload = getPayload(false, language, levelName, wordId, userId);

  fetch(`${API}algo/post`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        console.log("POST leitner");
      } else {
        console.log("Error POST");
      }
    })
    .catch((err) => console.log(err));
};

export const getPayload = (
  right: boolean,
  language: string,
  levelName: string,
  wordId: string,
  userId: string
) => {
  return {
    userId: userId,
    level: levelName,
    language: language,
    wordId,
    status: right ? 1 : 0,
  };
};

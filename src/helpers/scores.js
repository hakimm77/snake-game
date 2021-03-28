import firebase from "../firebase/firebaseConfig";

export const submitScores = (data, USER) => {
  firebase
    .database()
    .ref("/scores/" + USER)
    .on("value", (snapchot) => {
      let currentHigh = snapchot.val()["high-score"];
      if (data > currentHigh) {
        firebase
          .database()
          .ref("scores")
          .child(USER)
          .update({ "high-score": data });
      }
    });
};

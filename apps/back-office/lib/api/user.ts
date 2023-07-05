import {
  UserCredential,
  createUserWithEmailAndPassword,
  reload,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseAuth } from "../firebase/firebaseClient";
import { IUser } from "user-types";

const UserAPI = {
  registerFirebase: async (email: string, password: string) => {
    try {
      const actionCodeSettings = {
        url: "http://localhost:3000/login",
      };
      const { user } = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      await sendEmailVerification(user, actionCodeSettings);
      return true;
    } catch (error) {
      switch (error.code) {
        case "auth/weak-password":
          error.message = "비밀번호는 6자리 이상이어야 합니다";
          break;
        case "auth/invalid-email":
          error.message = "잘못된 이메일 주소입니다";
          break;
        case "auth/email-already-in-use":
          error.message = "이미 가입되어 있는 계정입니다";
          break;
        default:
          error.message = "회원가입에 실패했습니다. 다시 시도해주세요.";
      }
      throw error;
    }
  },
  /**
   * login with firebase auth and get userCredential
   */
  loginFirebase: async (email: string, password: string) => {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          error.message = "이메일 혹은 비밀번호가 일치하지 않습니다.";
          break;
        case "auth/weak-password":
          error.message = "비밀번호는 6글자 이상이어야 합니다.";
          break;
        case "auth/network-request-failed":
          error.message = "네트워크 연결에 실패 하였습니다.";
          break;
        case "auth/invalid-email":
          error.message = "잘못된 이메일 형식입니다.";
          break;
        case "auth/too-many-requests":
          error.message =
            "비밀번호를 너무 많이 틀렸습니다. 잠시 후 다시 시도해주세요.";
          break;
        case "auth/internal-error":
          error.message = "잘못된 요청입니다.";
          break;
        default:
          error.message = "로그인에 실패했습니다. 다시 시도해주세요.";
      }
      throw error;
    }
  },
  /**
   * check if email verification from firebase auth
   */
  checkEmailverification: async () => {
    try {
      await reload(firebaseAuth.currentUser);
      return firebaseAuth.currentUser.emailVerified;
    } catch (error) {
      console.error(error);
    }
  },
  /**
   * get Auth token and refresh token from server
   */
  getTokens: async (accessToken: string) => {
    try {
      const response = await fetch("http://localhost:8080/user/authorize", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authentication: accessToken,
        },
        credentials: "include",
      });
      const user: IUser = { id: 1, email: "ddd" };
      const authToken = response.headers.get("Authtoken");

      return { user, authToken };
    } catch (error) {
      console.error(error);
    }
  },
};

export default UserAPI;

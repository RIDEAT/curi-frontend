import {
  UserCredential,
  createUserWithEmailAndPassword,
  reload,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseAuth } from "../firebase/firebaseClient";

export const FirebaseAPI = {
  /**
   * register with firebase auth
   */
  register: async (email: string, password: string) => {
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
  login: async (email: string, password: string) => {
    try {
      const isEmailVerified = await FirebaseAPI.checkEmailVerification();

      if (!isEmailVerified) {
        const emailVerifyError = new Error("이메일 인증을 완료해주세요.");
        throw emailVerifyError;
      }

      const userCredential: UserCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      return userCredential;
    } catch (error) {
      if (error.message === "이메일 인증을 완료해주세요.") {
        throw error;
      }
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
  checkEmailVerification: async () => {
    try {
      await reload(firebaseAuth.currentUser);
      return firebaseAuth.currentUser.emailVerified;
    } catch (error) {
      console.error(error);
    }
  },
  /**
   *
   */
  logout: async () => {
    try {
      await firebaseAuth.signOut();
      return true;
    } catch (error) {
      console.error(error);
    }
  },
};

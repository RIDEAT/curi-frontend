import { UserCredential } from "firebase/auth";

/**
 * firebase auth userCredential 에서 accessToken 을 가져온다.
 *
 * @param userCredential
 */
const getAccessToken = async (userCredential: UserCredential) => {
  const user = userCredential.user;
  const accessToken = await user.getIdToken();
  return accessToken;
};

export default getAccessToken;

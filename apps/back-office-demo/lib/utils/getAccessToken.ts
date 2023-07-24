import { User } from "firebase/auth";

/**
 * firebase auth userCredential 에서 accessToken 을 가져온다.
 *
 * @param userCredential
 */
const getAccessToken = async (user: User) => {
  const accessToken = await user.getIdToken();
  return accessToken;
};

export default getAccessToken;

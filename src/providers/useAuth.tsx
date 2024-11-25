import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { getCurrentUser, AuthUser, fetchAuthSession } from "aws-amplify/auth";

import Auth from "aws-amplify/auth";

// Context and type definition
interface AuthContextType {
  authUser: AuthUser | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  authUser: null,
  loading: true,
  error: null,
});

interface AuthContextProviderProps {
  children: ReactNode;
}

//* Auth Provider//
const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //   useEffect(() => {
  //     const fetchAuthUser = async () => {
  //       try {
  //         const { accessToken, idToken } = await fetchAuthSession();
  //       } catch (err) {
  //     console.log(err);

  //     fetchAuthUser();
  //   }, []);

  useEffect(() => {
    async function currentAuthenticatedUser() {
      try {
        const { username, userId, signInDetails } = await getCurrentUser();
        console.log(`The username: ${username}`);
        console.log(`The userId: ${userId}`);
        console.log(`The signInDetails: ${signInDetails?.loginId}`);

        setAuthUser(userId);
      } catch (err) {
        console.log(err);
      }
    }

    currentAuthenticatedUser();
  }, []);

  const contextValue = useMemo(
    () => ({
      authUser,
      loading,
      error,
    }),
    [authUser, loading, error]
  );

  //   useEffect(() => {
  //     DataStore.query(Users, (user) => user.sub.eq(subId)).then((users) =>
  //       setDbUser(users[0])
  //     );
  //   }, [subId]);

  console.log("AUTH-USER", authUser);
  //   console.log("AUTH-SUBID:", subId);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

// //* useAuth Hook//
export const useAuthContext = () => useContext(AuthContext);

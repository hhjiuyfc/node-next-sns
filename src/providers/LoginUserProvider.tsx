import instance from "@/lib/axiosClient";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthContextType = {
  users: {
    id: number;
    username: string;
    email: string;
  } | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type LoginUserProviderProps = {
  children: ReactNode;
};

const LoginUserProvider = ({ children }: LoginUserProviderProps) => {
  const [users, setUsers] = useState<null | {
    id: number;
    username: string;
    email: string;
  }>(null);

  useEffect(() => {
    // 副作用
    const token = window.localStorage.getItem("auth_token");

    if (token) {
      instance.defaults.headers["Authorization"] = `Bearer ${token}`;
    }

    instance
      .get("/users/find")
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const login = useCallback((token: string) => {
    // トークンを付与
    localStorage.setItem("auth_token", token);
    try {
      instance.defaults.headers["Authorization"] = `Bearer ${token}`;
      instance.get("/users/find").then((response) => {
        setUsers(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("auth_token");
    setUsers(null);
    delete instance.defaults.headers["Authorization"];
  }, []);

  const value = useMemo(
    () => ({
      login,
      logout,
      users,
    }),
    [login, users, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthUser = (): AuthContextType => useContext(AuthContext);

export { LoginUserProvider, useAuthUser };

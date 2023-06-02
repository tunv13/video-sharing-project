import { createContext, useContext, useEffect, useState } from "react";
import Api from "../Api";
import { useNavigate } from "react-router-dom";
import { AuthContextType, IUser } from "../types/Auth";
import { socket } from "../socket";
import Alert from "../components/Alert";

const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: JSX.Element;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser>(null);
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [contentAlert,setContentAlert] = useState("");
  useEffect(() => {
    if (user) {
      socket.connect();
      socket.on('newPost', (value) =>{
        setContentAlert(`User: ${value.user} shared new video with title: ${value.title}`)
        setShow(true)
        console.log('1',value)
      })
    }
  }, [user]);

  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (email: string, password: string) => {
    try {
      const result = await Api.post("/login", { email, password });
      localStorage.setItem("accessToken", result.data.accessToken);
      setUser(result.data.email);
      navigate("/");
    } catch (error) {
      setError("ErrorLogin");
    }
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    socket.disconnect();
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      <Alert show={show} content={contentAlert} setShow={setShow} />
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

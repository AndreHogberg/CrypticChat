import { useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Welcome() {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.Authenticated) {
      console.log("Hello");
      navigate("/login");
    }
  }, [user]);
  return <div>Starter page</div>;
}

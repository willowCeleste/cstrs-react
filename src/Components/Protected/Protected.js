import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../Context/UserContext";

const Protected = props => {
  const navigate = useNavigate();
  const [userContext, setUserContext] = useContext(UserContext);

  useEffect(() => {
    if (!userContext.token) {
      navigate('/login');
    }
  }, [navigate, userContext.token]);

  return props.children;
};

export default Protected;
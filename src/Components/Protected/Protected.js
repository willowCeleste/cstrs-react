import { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../Context/UserContext";

const Protected = props => {
  const navigate = useNavigate();
  const [userContext, setUserContext] = useContext(UserContext);

  if (!userContext.token) {
    navigate('/login');
  }

  return props.children;
};

export default Protected;
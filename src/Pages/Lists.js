import { useState, useEffect, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import Title from "../Components/Title/Title";

const Lists = () => {
  const [userContext, setUserContext] = useContext(UserContext);
  const [lists, setLists] = useState([]);

  const fetchListsHandler = useCallback(async () => {
    // temp for testing
    const response = await fetch(`${process.env.REACT_APP_API_URL}/lists`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userContext.token}`
      }
    });

    if (!response.ok) {
      console.log("Something went wrong");
    }
    const data = await response.json();
    setLists(data.data);
  }, [userContext.token]);

  useEffect(() => {
    fetchListsHandler();
  }, [fetchListsHandler]);

  return (
    <div>
      <Title text="Lists" />
      {lists.length && (
        <ul>
          {lists.map(list => {
            return (
              <li key={list._id}>
                <Link to="/list-detail" state={list._id}><li key={list._id}>{list.title}</li></Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  );
};

export default Lists;
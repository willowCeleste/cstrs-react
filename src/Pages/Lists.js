import { useState, useEffect, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import Title from "../Components/Title/Title";
import "./Lists.css";

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
      <Link to="/create-list"><button className="o-button__quick-add o-button--round">+</button></Link>
      <Title text="Lists" />
      {lists.length && (
        <ul>
          {lists.map(list => {
            return (
              <li className="c-lists__list-item" key={list._id}>
                <Link to="/list-detail" state={list._id}>{list.title}</Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  );
};

export default Lists;
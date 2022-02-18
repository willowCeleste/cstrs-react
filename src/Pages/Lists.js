import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import Title from "../Components/Title/Title";
import Loading from "../Components/Loading/Loading";
import "./Lists.css";

const Lists = () => {
  const token = useSelector(state => state.user.token );
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState([]);

  const fetchListsHandler = useCallback(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/lists`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      console.log("Something went wrong");
    }
    const data = await response.json();
    setLists(data.data);
    setLoading(false);
  }, [token]);

  useEffect(() => {
    fetchListsHandler();
  }, [fetchListsHandler]);

  return loading ? <Loading /> : (
    <div>
      <Link to="/create-list"><button className="o-button__quick-add o-button--round">+</button></Link>
      <Title text="Lists" />
      {lists.length ? (
        <div>
          <ul>
            {lists.map(list => {
              return (
                <li className="c-lists__list-item" key={list._id}>
                  <Link className="c-lists__link" to="/list-detail" state={list._id}>{list.title}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <div>
          <p>You havent added any lists yet!</p>
        </div>
      )}
    </div>
  )
};

export default Lists;
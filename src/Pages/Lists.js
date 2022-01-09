import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Title from "../Components/Title/Title";

const Lists = props => {
  const location = useLocation();
  const [lists, setLists] = useState([]);

  const fetchListsHandler = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${props.user._id}/lists`);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      setLists(data.lists);
    } catch (e) {
      console.log(e);
    }
  }, [props.user._id]);

  const itemClickHandler = e => {
    console.log(location.state.coaster);
  };

  const renderLists = () => {
    return (
      <ul>
        {lists.map(list => {
          return location.state && location.state.add ? <li onClick={itemClickHandler}>{list.title}</li> : <li><Link key={list._id} to="/list-detail" state={list._id}>{list.title}</Link></li>
        })}
      </ul>
    );
  };

  useEffect(() => {
    fetchListsHandler();
  }, [fetchListsHandler]);

  return (
    <div>
      <Title text="Lists" />
      {lists.length && renderLists()}
    </div>
  );
};

export default Lists;
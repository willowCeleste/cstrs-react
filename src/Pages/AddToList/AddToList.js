import { useLocation } from "react-router";
import { useState, useCallback, useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import Title from "../../Components/Title/Title"
import Button from "../../Components/Button/Button";

const AddToList = () => {
  const location = useLocation();
  const [userContext, setUserContext] = useContext(UserContext);
  const [lists, setLists] = useState([]);
  const [listId, setListId] = useState('');
  const [item, setItem] = useState({
    itemId: '',
    itemName: '',
    text: ''
  });

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
    const newItem = location.state.coaster
    setItem(prev => {
      return {
        ...prev,
        itemId: newItem._id,
        itemName: newItem.title
      }
    });
  }, [fetchListsHandler, location.state.coaster]);

  const descriptionChangeHandler = e => {
    setItem(prev => {
      return {...prev, text: e.target.value}
    });
  };

  const listSelectChangeHandler = e => {
    setListId(e.target.value);
  }

  const submitHandler = async e => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/lists/${listId}/add`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userContext.token}`
      },
      body: JSON.stringify(item)
    });
    if (!response.ok) {
      alert("something went wrong");
    } else {
      alert('Added to list!');
    }
  }

  return (
    <div>
      <Title text="Add To List!" />
      <form onSubmit={submitHandler}>
        <div>
          <label for="lists">Adding {item.itemName} to </label>
          <select name="lists" id="lists" onChange={listSelectChangeHandler}>
            <option value="">Select List</option>
            {lists.map(list => <option value={list._id}>{list.title}</option>)}
          </select>
        </div>
        <div>
          <label for="text" />
          <textarea 
            name="text" 
            id="text" 
            cols="30" 
            rows="10" 
            placeholder="Description"
            onChange={descriptionChangeHandler}></textarea>
        </div>
        <Button type="submit" label="Add" />
      </form>
    </div>
  )
};

export default AddToList;
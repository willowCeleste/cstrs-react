import { useLocation } from "react-router";
import { useState, useCallback, useContext, useEffect } from "react";
import { useSelector } from 'react-redux';
import Title from "../../Components/Title/Title"
import Button from "../../Components/Button/Button";
import './AddToList.css';

const AddToList = () => {
  const location = useLocation();
  const token = useSelector(state => state.user.token );
  const [lists, setLists] = useState([]);
  const [listId, setListId] = useState('');
  const [item, setItem] = useState({
    itemId: '',
    itemName: '',
    text: ''
  });

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
  }, [token]);

  useEffect(() => {
    fetchListsHandler();
    const newItem = location.state.coaster
    setItem(prev => {
      return {
        ...prev,
        itemId: newItem._id,
        itemName: newItem.title,
        parkName: newItem._park ? newItem._park[0].title : ''
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
        Authorization: `Bearer ${token}`
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
    <div className="c-add-to-list">
      <Title text="Add To List!" />
      <form onSubmit={submitHandler}>
        <div className="c-form__field-wrapper">
          <label className="c-form__label c-add-to-list__select-label" for="lists">Adding <span className="c-add-to-list__item-name">{item.itemName}</span> to </label>
          <select className="o-input o-input__select" name="lists" id="lists" onChange={listSelectChangeHandler}>
            <option value="">Select List</option>
            {lists.map(list => <option value={list._id}>{list.title}</option>)}
          </select>
        </div>
        <div className="c-form__field-wrapper">
          <label className="c-form__label" for="text">Description</label>
          <textarea
            className="o-input o-input--textarea"
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
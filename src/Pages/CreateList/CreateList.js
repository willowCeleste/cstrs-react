import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import Title from "../../Components/Title/Title";
import Search from "../../Components/Search/Search";
import ListCard from "../../Components/ListCard/ListCard";
import "./CreateList.css";

const CreateList  = () => {
  const navigate = useNavigate();
  const [userContext, setUserContext] = useContext(UserContext);
  const [list, setList] = useState({
    title: '',
    itemType: 'coaster',
    listType: '',
    private: false,
    items: []
  });

  const handleSuggestionClick = item => {
    setList(prev => {
      return {
        ...prev,
        items: [
          ...prev.items,
          {
            rank: prev.items.length + 1,
            itemId: item._id,
            itemName: item.title,
            parkName: item._park[0].title
          }
        ]
      };
    })
  };

  const titleChangeHandler = e => {
    setList(prev => {
      return {
        ...prev,
        title: e.target.value
      }
    })
  };

  const listTypeChangeHandler = e => {
    setList(prev => {
      return {
        ...prev,
        listType: e.target.value
      }
    })
  };

  const privateChangeHandler = e => { 
    setList(prev => {
      return {
        ...prev,
        private: e.target.checked
      }
    })
  };

  const submitHandler = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/lists/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userContext.token}`
        },
        body: JSON.stringify(list)
      });
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      console.log(data);
      navigate('/list-detail', { state: data.list._id });
    } catch (e) {
      console.log(e);
      alert('Internal server error');
    }
  }

  return (
    <div className="c-create-list">
      <Title text="Create a List" />
      <div className="c-form__field-wrapper">
        <label className="c-form__label" htmlFor="title">Title</label>
        <input className="o-input" type="text" onChange={titleChangeHandler}/>
      </div>
      <div className="c-form__field-wrapper">
        <label className="c-form__label" htmlFor="listType">List Type</label>
        <select className="o-input o-input__select" name="listType" id="listType" onChange={listTypeChangeHandler}>
          <option value="unranked">Unranked</option>
          <option value="ranked">Ranked</option>
          <option value="checklist">Checklist</option>
        </select>
      </div>
      <div className="c-form__field-wrapper">
        <input type="checkbox" name="makePrivate" onChange={privateChangeHandler} />
        <label htmlFor="makePrivate">Make list private?</label>
      </div>
      <Search showSuggestions={true} suggestHandler={handleSuggestionClick} />
      <ul className="c-create-list__items">
        {list.items.map(item => <li><ListCard title={item.itemName} subtitle={item.parkName} type="unranked" /></li>)}
      </ul>
      <button className="c-button" type="submit" onClick={submitHandler}>Save List</button>
    </div>
  )
}

export default CreateList;
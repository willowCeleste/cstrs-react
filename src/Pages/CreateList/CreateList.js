import { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Title from "../../Components/Title/Title";
import Search from "../../Components/Search/Search";
import ListCard from "../../Components/ListCard/ListCard";
import "./CreateList.css";

const CreateList  = () => {
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
    } catch (e) {
      console.log(e);
      throw new Error('Something went wrong!');
    }
  }

  return (
    <div className="c-create-list">
      <Title text="Create a List" />
      <div className="c-form__field-wrapper">
        <label htmlFor="title">Title</label>
        <input className="o-input" type="text" onChange={titleChangeHandler}/>
      </div>
      <div className="c-form__field-wrapper">
        <label htmlFor="listType">List Type</label>
        <select className="o-input" name="listType" id="listType" onChange={listTypeChangeHandler}>
        <option value="">List Type</option>
          <option value="ranked">Ranked</option>
          <option value="unranked">Unranked</option>
          <option value="checklist">Checklist</option>
        </select>
      </div>
      <div className="c-form__field-wrapper">
        <label htmlFor="private">Make list private?</label>
        <input type="checkbox" onChange={privateChangeHandler} />
      </div>
      <Search showSuggestions={true} suggestHandler={handleSuggestionClick} />
      <ul className="c-create-list__items">
        {list.items.map(item => <li><ListCard title={item.itemName} subtitle={item.parkName} /></li>)}
      </ul>
      <button className="c-button" type="submit" onClick={submitHandler}>Save List</button>
    </div>
  )
}

export default CreateList;
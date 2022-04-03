import { useLocation } from "react-router";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { TransitionGroup } from "react-transition-group";
import { useSelector } from 'react-redux';
import Title from "../../Components/Title/Title";
import ListCard from "../../Components/ListCard/ListCard";
import Button from "../../Components/Button/Button";
import Search from "../../Components/Search/Search";
import Edit from "../../Components/SVGs/Edit";
import Okay from "../../Components/SVGs/Okay";
import Cancel from "../../Components/SVGs/Cancel";
import Trash from "../../Components/SVGs/Trash";
import './ListDetail.css';

const ListDetail = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const [originalList, setOriginalList] = useState(null);
  const token = useSelector(state => state.user.token );
  const [list, setList] = useState(null);
  const [edit, setEdit] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const fetchListHandler = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/lists/${location.state}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      data.data.items = data.data.items.sort(sortByRank);
      setList(data.data);
      setOriginalList(data.data);
    } catch(e) {
      console.log(e);
    }
  }, [location.state, token]);

  const renderItems = itemsArray => {
    itemsArray.sort(sortByRank);
    if (list.listType === 'checklist') {
      itemsArray.sort(sortByCompleted);
    }
    return itemsArray.map(item => {
      return (
        <CSSTransition 
          key={item.itemId}
          timeout={300}
          classNames="fade">
          <li>
            <ListCard 
              id ={item.itemId} 
              title={item.itemName} 
              subtitle={item.parkName}
              rank={item.rank} 
              description={item.text} 
              type={list.listType} 
              completed={item.completed}
              edit={edit}
              onMove={moveItem}
              onDelete={deleteItem} />
          </li>
        </CSSTransition>
      )
    });
  };

  const renderList = listType => {
    return (
      <TransitionGroup component={`ul`} className={`o-list${listType === 'ranked' ? ' o-list--ordered' : ' o-list--unordered'}`}>
        {renderItems(list.items)}
      </TransitionGroup>
    )
    // return listType === 'ranked' 
    //   ? <ol className="o-list o-list--ordered">{renderItems(list.items)}</ol>
    //   : <ul className="o-list o-list--unordered">{renderItems(list.items)}</ul>
  };

  const moveItem = (itemId, direction) => {
    const index = list.items.findIndex(item => item.itemId === itemId);
    const oldRank = index + 1;
    let items = list.items;

    if (direction === 'up') {
      if (index !== 0) {
        items[index].rank = oldRank - 1;
        items[index - 1].rank = oldRank;
      }
    } else if (direction === 'down') {
      if (index !== items.length - 1) {
        items[index].rank = oldRank + 1;
        items[index + 1].rank = oldRank;
      }
    }

    setList(prev => {
      return {...prev, items: items}
    });
  };

  const deleteItem = id => {
    const items = list.items.filter(item => {
      return item.itemId !== id;
    });
    setList(prev => {
      return {...prev, items: items}
    })
  };

  const sortByRank = (a, b) => {
    if (a.rank < b.rank) {
      return -1;
    }
    if (a.rank > b.rank) {
      return 1;
    }
    return 0;
  };

  const sortByCompleted = (a, b) => {
    return (a.completed === b.completed ? 0 : a.completed ? 1 : -1);
  };

  const editToggleHandler = () => {
    setEdit(prev => {
      return !prev;
    })
  };

  const saveHandler = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/lists/${list._id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(list)
      });
      if (!response.ok) {
        alert("something went wrong");
      } else {
        const data = await response.json();
        setList(data.data);
      }
    } catch (e) {
      console.log(e);
      alert("Internal server error")
    }
    setEdit(false);
  };

  const deleteListHandler = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/lists/${list._id}`, {
        method: 'delete',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        alert("something went wrong");
      } else {
        props.onNotification('List deleted successfully');
        navigate('/lists');
      }
    } catch (e) {
      console.log(e);
      alert('Internal server error')
    }
  }

  const cancelHandler = () => {
    setList(originalList);
    setEdit(false);
  }

  const addClickHandler = () => {
    setShowSearch(true);
  };

  const cancelSearchHandler = () => {
    setShowSearch(false);
  }

  const suggestionClickHandler = suggestion => {
    const newItem = {
      rank: list.items.length + 1,
      itemId: suggestion._id,
      itemName: suggestion.title,
      parkName: suggestion._park[0].title
    };
    addItemToList(newItem);
    setShowSearch(false);
  };

  const addItemToList = async newItem  => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/lists/${list._id}/add`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newItem)
    });
    if (!response.ok) {
      alert("something went wrong");
    } else {
      const data = await response.json();
      setList(data);
    }
  }

  useEffect(() => {
    fetchListHandler();
  }, [fetchListHandler]);

  return list ? (
    <div className="c-list-detail">
      <CSSTransition
       in={showSearch}
       timeout={300}
       classNames="fade"
       unmountOnExit>
        <div className="c-list-detail__modal">
          <div className="c-list-detail__modal-inner">
            <div className="c-list-detail__close-container">
              <span className="c-list-detail__close-container" onClick={cancelSearchHandler}>
                <Cancel />
              </span>
            </div>
            <div className="c-list-detail__search-container">
              <Search showSuggestions showIcon={false} suggestHandler={suggestionClickHandler} />
            </div>
          </div>
        </div>
      </CSSTransition>
      <div className="c-list-detail__title-container">
        <Title text={list.title} />
        <button className="c-list-detail__button" onClick={editToggleHandler}>
          {!edit && <Edit /> }
        </button>
      </div>
      {edit && (
          <div className="c-list-detail__edit-controls">
            <button className="c-list-detail__button" onClick={saveHandler}><Okay /></button>
            <button className="c-list-detail__button" onClick={deleteListHandler}><Trash /></button>
            <button className="c-list-detail__button" onClick={cancelHandler}><Cancel /></button>
          </div>
        )}
      {list.items.length ? renderList(list.listType) : <div>There's nothing on this list yet!</div>}
      <Button label="Add" onClick={addClickHandler} />
    </div>
    ) : <div>List not found</div>
};

export default ListDetail;
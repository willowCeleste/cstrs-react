import { useLocation } from "react-router";
import { useState, useEffect, useCallback, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Title from "../../Components/Title/Title";
import ListCard from "../../Components/ListCard/ListCard";
import './ListDetail.css';

const ListDetail = props => {
  const [userContext, setUserContext] = useContext(UserContext);
  const location = useLocation();
  const [originalList, setOriginalList] = useState(null);
  const [list, setList] = useState(null);
  const [edit, setEdit] = useState(false);

  const fetchListHandler = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/lists/${location.state}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userContext.token}`
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
  }, [location.state, userContext.token]);

  const renderItems = itemsArray => {
    itemsArray.sort(sortByRank);
    if (list.listType === 'checklist') {
      itemsArray.sort(sortByCompleted);
    }
    return itemsArray.map(item => {
      return (
        <li key={item.itemId}>
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
      )
    });
  };

  const renderList = listType => {
    return listType === 'ranked' ? <ol className="o-list o-list--ordered">{renderItems(list.items)}</ol> : <ul className="o-list o-list--unordered">{renderItems(list.items)}</ul>
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
      // let sorted = items.sort(sortByRank);
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

  const saveHandler = () => {
    console.log('save!');
    setEdit(false);
  };

  const cancelHandler = () => {
    setList(originalList);
    setEdit(false);
  }

  useEffect(() => {
    fetchListHandler();
  }, [fetchListHandler]);

  return list ? (
    <div>
      <div className="c-list-detail__title-container">
        <Title text={list.title} />
        <button className="c-list-detail__button" onClick={edit ? saveHandler : editToggleHandler}>
          {edit ? 'save' : 'edit'}
        </button>
        {edit && <button className="c-list-detail__button" onClick={cancelHandler}>cancel</button>}
      </div>
      {list.items.length && renderList(list.listType)}
    </div>
    ) : <div>List not found</div>
};

export default ListDetail;
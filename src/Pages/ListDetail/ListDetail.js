import { useLocation } from "react-router";
import { useState, useEffect, useCallback } from "react";
import Title from "../../Components/Title/Title";
import ListCard from "../../Components/ListCard/ListCard";

const ListDetail = props => {
  const location = useLocation();
  const [list, setList] = useState(null);
  
  const setContextualMenu = useCallback(() => {
    props.setContextual([
      <button>Edit</button>,
      <button>Delete</button>,
      <button>Share</button>
    ]);
  }, [props])

  const fetchListHandler = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/lists/${location.state}`);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      data.data.items = data.data.items.sort(sortByRank);
      setList(data.data);
    } catch(e) {
      console.log(e);
    }
  }, [location.state]);

  const renderItems = itemsArray => {
    return itemsArray.map(item => {
      return (
        <li key={item.itemId}>
          <ListCard id ={item.itemId} title={item.itemName} rank={item.rank} description={item.text} onMove={moveItem} />
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
      return {...prev, items: items.sort(sortByRank)}
    })
  }

  const sortByRank = (a, b) => {
    if (a.rank < b.rank) {
      return -1;
    }
    if (a.rank > b.rank) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    fetchListHandler();
    setContextualMenu()
  }, [fetchListHandler, setContextualMenu]);

  return list ? (
    <div>
      {console.log('list', list)}
      <Title text={list.title} />
      {list.items.length && renderList(list.listType)}
    </div>
    ) : <div>List not found</div>
};

export default ListDetail;
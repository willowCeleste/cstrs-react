import { useLocation } from "react-router";
import { useState, useEffect, useCallback } from "react";
import Title from "../../Components/Title/Title";

const ListDetail = () => {
  const location = useLocation();
  const [list, setList] = useState(null);

  const fetchListHandler = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/lists/${location.state}`);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      setList(data.data);
      console.log(data.data);
    } catch(e) {
      console.log(e);
    }
  }, [location.state]);

  const renderList = () => {
    return (
      <>
        <Title text={list.title} />
        <ul>
          {list.items.map(item => {
            return <li key={item.itemId}>{item.itemName}</li>
          })}
        </ul>
      </>
    );
  }

  useEffect(() => {
    fetchListHandler();
  }, [fetchListHandler])

  return (
    <div>
      {list && renderList()}
    </div>
  );
};

export default ListDetail;
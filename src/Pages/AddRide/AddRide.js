import { useState, useEffect, useContext, useCallback } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import "./AddRide.css";
import { UserContext } from "../../Context/UserContext";
import Title from "../../Components/Title/Title";
import Button from "../../Components/Button/Button";
import RideCard from "../../Components/RideCard/RideCard";
import Search from "../../Components/Search/Search";

const AddRide = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userContext, setUserContext] = useContext(UserContext);
  const [user, setUser] = useState(null);
  const today = new Date().toISOString().split('T')[0];
  const [ride, setRide] = useState({});
  const [coaster, setCoaster] = useState(null);

  const fetchDataHandler = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/pages/addRide`, {
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
      setUser(data.user);
    } catch(e) {
      console.log(e);
    }
  }, [userContext.token]);

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  useEffect(useCallback(async () => {
    if (location.state) {
      setCoaster(location.state.coaster ? location.state.coaster : null);
      setRide({
        coasterId: location.state.coaster._id,
        coasterName: location.state.coaster.title,
        parkId: location.state.coaster._park[0]._id,
        parkName: location.state.coaster._park[0].title,
        date: today,
        notes: '',
        rating: null
      });
    }
  }, [location.state, today]), [setCoaster, location.state, today]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await fetch(`${process.env.REACT_APP_API_URL}/createRide`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userContext.token}`
        },
        body: JSON.stringify(ride)
      });
      const data = await result.json();
      if (data.success) {
        navigate('/', { state: {
          ride: ride
        }});
      }
    } catch (e) {
      console.log(e);
      alert('Something went wrong :(');
    }
  };
  
  const dateChangeHandler = e => {
    setRide(prevState => {
      prevState.date = e.target.value;
      return prevState;
    });
  };

  const notesChangeHandler = e => {
    setRide(prevState => {
      prevState.notes = e.target.value;
      return prevState;
    });
  };

  const ratingChangeHandler = e => {
    setRide(prevState => {
      prevState.rating = e.target.value;
      return prevState;
    });
  };

  const suggestionClickHandler = suggestion => {
    setCoaster(suggestion);
    setRide({
      coasterId: suggestion._id,
      coasterName: suggestion.title,
      parkId: suggestion._park[0]._id,
      parkName: suggestion._park[0].title,
      date: today,
      notes: '',
      rating: null
    });
  };

  const buildThumbnailUrl = coaster => {
    // builds URL of image in Apostrophe's format
    const attachment = coaster.images.items[0]._image[0].attachment;
    return `${process.env.REACT_APP_CMS_URL}/uploads/attachments/${attachment._id}-${attachment.title}.one-half.${attachment.extension}`;
  };
  
  return <div className="c-add-ride">
    <Title text="Log a Ride" />
    <div className="c-add-ride__search">
      <Search type="coaster" suggestHandler={suggestionClickHandler} showSuggestions={true} />
    </div>
    {coaster && <RideCard coaster={coaster.title} park={coaster._park[0].title} thumbnail={coaster.images.items.length ? buildThumbnailUrl(coaster) : ''} />}
    <form className="c-add-ride__form" onSubmit={handleSubmit}>
      <input type="date" onChange={dateChangeHandler} defaultValue={today}/>
      <input type="number" min="0" max="10" step="0.5" placeholder="rating" onChange={ratingChangeHandler}/>
      <textarea cols="30" rows="10" placeholder="notes" onChange={notesChangeHandler}></textarea>
      <Button type="submit" label="Add Ride" />
    </form>
  </div>
};

export default AddRide;
import { useState, useEffect, useContext, useCallback } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { uiActions } from "../../store/ui";
import { useSelector } from 'react-redux';
import "./AddRide.css";
import { UserContext } from "../../Context/UserContext";
import Title from "../../Components/Title/Title";
import Button from "../../Components/Button/Button";
import RideCard from "../../Components/RideCard/RideCard";
import Search from "../../Components/Search/Search";

const AddRide = props => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const token = useSelector(state => state.user.token );
  const [user, setUser] = useState(null);
  const today = new Date().toISOString().split('T')[0];
  const [ride, setRide] = useState({});
  const [coaster, setCoaster] = useState(null);
  const [rating, setRating] = useState(0);
  const [dateUnkown, setDateUnkown] = useState(false);

  const fetchDataHandler = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/pages/addRide`, {
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
      setUser(data.user);
    } catch(e) {
      console.log(e);
    }
  }, [token]);

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
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(ride)
      });
      const data = await result.json();
      if (data.success) {
        navigate('/', { state: {
          ride: ride
        }});
        dispatch(uiActions.showAlert(`Logged ride for ${ride.coasterName}`))
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
    setRating(e.target.value);
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

  const dateUnkownHandler = e => {
    setDateUnkown(e.target.checked);
  };
  
  return <div className="c-add-ride">
    <Title text="Log a Ride" />
    <div className="c-add-ride__search">
      <Search type="coaster" suggestHandler={suggestionClickHandler} showSuggestions={true} />
    </div>
    {coaster && <RideCard coaster={coaster.title} park={coaster._park[0].title} thumbnail={coaster.thumbnail ? `${process.env.REACT_APP_CMS_URL}${coaster.thumbnail}` : ''} />}
    <form className="c-add-ride__form" onSubmit={handleSubmit}>
      <div className="c-add-ride__form-field-wrapper">
        <input className="o-checkbox" name="dateUnknown" type="checkbox" onChange={dateUnkownHandler} />
        <label htmlFor="dateUnknown">I don't know the date</label>
      </div>
      <input type="date" onChange={dateChangeHandler} defaultValue={today} disabled={dateUnkown}/>
      <label htmlFor="rating">Rating - { rating > 0 ? rating : 'Unrated' }</label>
      <div className="c-add-ride__range-container">
        <input className="c-add-ride__rating-range" name="rating" type="range" min="0" max="10" step="0.5" defaultValue="0" onChange={ratingChangeHandler} />
      </div>
      
      <textarea cols="30" rows="10" placeholder="notes" onChange={notesChangeHandler}></textarea>
      <Button type="submit" label="Add Ride" />
    </form>
  </div>
};

export default AddRide;
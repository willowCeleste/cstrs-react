import { useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import "./AddRide.css";
import Button from "../../Components/Button/Button";
import RideCard from "../../Components/RideCard/RideCard";

const AddRide = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const coaster = location.state.coaster ? location.state.coaster : null;

  const [ride, setRide] = useState({
    coasterId: coaster._id,
    coasterName: coaster.title,
    parkId: coaster._park[0]._id,
    parkName: coaster._park[0].title,
    user: props.user._id,
    date: '',
    notes: '',
    rating: null
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await fetch(`${process.env.REACT_APP_API_URL}/rides/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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
  
  return <div className="c-add-ride">
    <h2>Log A Ride</h2>
    <RideCard coaster={coaster.title} park={coaster._park[0].title} />
    <form className="c-add-ride__form" onSubmit={handleSubmit}>
      <input type="date" onChange={dateChangeHandler} />
      <input type="number" min="0" max="10" step="0.5" placeholder="rating" onChange={ratingChangeHandler}/>
      <textarea cols="30" rows="10" placeholder="notes" onChange={notesChangeHandler}></textarea>
      <Button type="submit" label="Add Ride" />
    </form>
  </div>
};

export default AddRide;
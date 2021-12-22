import { useState } from "react";
import { useLocation } from "react-router";
import "./AddRide.css";

const AddRide = () => {
  const location = useLocation();
  const coaster = location.state.coaster;

  const [ride, setRide] = useState({
    coasterId: coaster._id,
    coasterName: coaster.title,
    parkId: coaster._park[0]._id,
    parkName: coaster._park[0].title,
    user: '60f57b4d7104b26ef6ec7a0e', //TODO: remove hardcoded user
    date: '',
    notes: '',
    rating: null
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await fetch('http://localhost:4000/rides/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ride)
      });
      const data = await result.json();
      if (data.success) {
        alert('Ride created!');
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
    <h2>Add A Ride for {coaster.title} at {coaster._park[0].title}</h2>
    <form className="c-add-ride__form" onSubmit={handleSubmit}>
      <input type="date" onChange={dateChangeHandler} />
      <input type="number" min="0" max="10" step="0.5" placeholder="rating" onChange={ratingChangeHandler}/>
      <textarea cols="30" rows="10" placeholder="notes" onChange={notesChangeHandler}></textarea>
      <input type="submit" value="Add Ride" />
    </form>
  </div>
};

export default AddRide;
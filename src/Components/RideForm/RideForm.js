import { useState } from "react";
import Button from "../Button/Button";

const RideForm = props => {
  const [ride, setRide] = useState(props.ride);
  
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

  const handleEdit = async e => {
    e.preventDefault();
    try {
      const result = await fetch(`http://localhost:4000/rides/${ride._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ride)
      });

      const data = await result.json();
      if (data.success) {
        alert('Ride Edited!');
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleAdd = async e => {
    console.log('add'); // TODO: refactor saving ride to here
  };

  const submitHandler = props.mode === 'edit' ? handleEdit : handleAdd;
  
  return <form className="c-add-ride__form" onSubmit={submitHandler}>
    <input type="date" onChange={dateChangeHandler} defaultValue={ride.date.split('T')[0]} />
    <input type="number" min="0" max="10" step="0.5" placeholder="rating" onChange={ratingChangeHandler} defaultValue={ride.rating}/>
    <textarea cols="30" rows="10" placeholder="notes" onChange={notesChangeHandler} defaultValue={ride.notes}></textarea>
    <Button type="submit" label="Save Ride" />
  </form>
};

export default RideForm;
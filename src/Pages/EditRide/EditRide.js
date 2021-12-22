import RideForm from "../../Components/RideForm/RideForm";
import { useLocation } from "react-router";

const EditRide = () => {
  const location = useLocation();

  return <div>
    <h2>Editing ride for {location.state.ride.coasterName}</h2>
    <RideForm ride={location.state.ride} mode="edit" />
  </div>
};

export default EditRide;
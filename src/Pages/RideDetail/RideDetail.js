import { useParams } from "react-router";

const RideDetail = () => {
  const { id } = useParams();
  return <div>Ride detail! {id}</div>
};

export default RideDetail;
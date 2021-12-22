import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import RideCard from "../Components/RideCard/RideCard";

const SearchResults = props => {
  const { state } = useLocation();
  
  const renderResults = () => {
    if (state.length) {
      return <ul>
        { state.map(result => {
          return <li key={result._id}>
            <Link to={`/coaster/${result._id}`}>
              <RideCard key={result._id} coaster={result.title} park={result._park[0].title} />
            </Link>
          </li>
        }) }
      </ul>
    }
  };

  return <div>
    { renderResults() }
  </div>;
};

export default SearchResults;
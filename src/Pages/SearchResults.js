import { useLocation } from "react-router";
import RideCard from "../Components/RideCard/RideCard";

const SearchResults = props => {
  const { state } = useLocation();
  
  const renderResults = () => {
    if (state.results.length) {
      return <ul>
        { state.results.map(result => {
          return <li key={result._id}>
            <RideCard  key={result._id} coaster={result.title} park={result._park[0].title} />
          </li>
        }) }
      </ul>
    }
  };

  return <div>
    <h2>Search results for "{state.searchTerm}"</h2>
    { renderResults() }
  </div>;
};

export default SearchResults;
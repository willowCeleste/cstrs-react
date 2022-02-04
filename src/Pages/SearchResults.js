import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import RideCard from "../Components/RideCard/RideCard";
import Title from "../Components/Title/Title";

const SearchResults = props => {
  const { state } = useLocation();
  
  const renderResults = () => {
    if (state.results.length) {
      return <ul>
        { state.results.map(result => {
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
    <Title text={`Search results for "${state.searchTerm}"`} />
    { renderResults() }
  </div>;
};

export default SearchResults;
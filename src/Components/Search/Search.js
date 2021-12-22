import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const onSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`http://localhost:3000/api/v1/coaster?search=${searchTerm}`);
      const data = await result.json();
      navigate('/search', {state: data.results});
      setSearchTerm('');
    } catch (e) {
      console.log(e);
    }
  };

  const onInputChange = e => {
    setSearchTerm(e.target.value);
  };

  return (
    <form className="c-search" action="" onSubmit={onSearchSubmit}>
      <input className="c-search__text-input" type="text" placeholder="Search Coasters" value={searchTerm} onChange={onInputChange}/>
      <button className="c-search__submit" type="submit">
        <svg class="o-icon o-icon--search" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.5 5.5C10.5 8.26142 8.26142 10.5 5.5 10.5C2.73858 10.5 0.5 8.26142 0.5 5.5C0.5 2.73858 2.73858 0.5 5.5 0.5C8.26142 0.5 10.5 2.73858 10.5 5.5Z" stroke="black"></path>
          <path d="M9 9L13 13" stroke="black"></path>
        </svg>
      </button>
    </form>
  )
};

export default Search;
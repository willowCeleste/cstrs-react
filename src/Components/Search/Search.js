import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import MagnifyingGlass from "../SVGs/MagnifyingGlass";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const onSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${process.env.REACT_APP_CMS_URL}/api/v1/coaster?search=${searchTerm}`);
      const data = await result.json();
      navigate('/search', {state: {
        results: data.results,
        searchTerm: searchTerm
      }});
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
        <MagnifyingGlass />
      </button>
    </form>
  )
};

export default Search;
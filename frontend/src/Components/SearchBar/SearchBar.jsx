import React from 'react';
import './SearchBar.css';
function SearchBar({setQuery,setSubmitQuery,query,setSortBy,sortBy}) {
  const handleChange=(event)=>{
    setQuery(event.target.value);
  }
  const handleSubmit=()=>{
    setSubmitQuery(query);
  }
  const handleKeyDown=(event)=>{
    if (event.key=='Enter'){
      handleSubmit();
    }
  }
  return (
    <div className="search-container">
      <input onChange={handleChange}
        type="text"
        className="search-input"
        placeholder="Search for a product..."
        value={query}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSubmit} className="search-button">Search</button>
      <select
      className="sort-dropdown"
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
>
  <option value="priceLowToHigh">Price: Low to High</option>
  <option value="priceHighToLow">Price: High to Low</option>
</select>
    </div>
  );
}

export default SearchBar;


import React,{useState} from 'react'
import Navbar from './Components/Navbar/Navbar'
import SearchBar from './Components/SearchBar/SearchBar'
import Results from './Components/Results/Results'
function App() {
  const [query,setQuery]=useState('');
  const [submitQuery,setSubmitQuery]=useState('');
  const [sortBy,setSortBy]=useState('priceLowToHigh');
  return (
    <div>
      <Navbar/>
      <SearchBar setQuery={setQuery} setSubmitQuery={setSubmitQuery} query={query} setSortBy={setSortBy} sortBy={sortBy} />
      <Results query={query} submitQuery={submitQuery} sortBy={sortBy}/>
    </div>
  )
}

export default App

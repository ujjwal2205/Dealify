import React,{useState} from 'react'
import './Results.css'
import axios from "axios"
import { useEffect } from 'react'
const HandleClick=(link)=>{
window.open(link, "_blank");
}
function Results({submitQuery,sortBy}) {
     const url="https://dealify-backend-coa8.onrender.com";
     const [apiMessage,setApiMessage]=useState('');
     const [filteredResults,setFilteredResults]=useState([]);
     const [loading,setLoading]=useState(false);
     const fetchData=async()=>{
      if (!submitQuery || submitQuery.trim().length === 0) {
    console.log("Skipping fetch: Empty submitQuery");
    return;
  }
    setLoading(true);
     try{
      const res=await axios.post(`${url}/api/result/data`,{
        submitQuery
     });
     if(res.data.success){
      if(res.data.filteredData){
      setFilteredResults(res.data.filteredData);
      setApiMessage("");
    }
     else{
      console.log(res.data.message);
      setApiMessage(res.data.message);
      setFilteredResults([]);
     }}
     else{
      console.log(res.data.message);
      setApiMessage(res.data.message);
      setFilteredResults([]);
     } 
    }
     catch(error){
      console.error("Error fetching data:", error.message)
       setFilteredResults([]);
     }
     setLoading(false);
     }

    useEffect(()=>{
    setFilteredResults([]);
    fetchData();
    },[submitQuery]);

    useEffect(() => {
  if (sortBy === "priceLowToHigh") {
    setFilteredResults((prev) =>
    [...prev].sort((a, b) => a.price - b.price)
    );
  } else if (sortBy === "priceHighToLow") {
    setFilteredResults((prev) =>
    [...prev].sort((a, b) => b.price - a.price)
    );
  }
}, [sortBy]);


  return (
    <div className='results-container'>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <p className="loading-text">Fetching best deals...</p>
        </div>
      ) : (
        <>
          {apiMessage && submitQuery ? (
            <p>{apiMessage}</p>
          ) : (
            <ul className='results-list'>
              {filteredResults.map((option, index) => (
                <li key={option.id} className="result-card">
                  <div className='image'> <img src={option.image} alt={option.title} /></div>
                  <div className='title'><h2>{option.title}</h2></div>
                  <div className='price'>₹{option.price}</div>
                  <div className='site'>{option.source}</div>
                  <button onClick={() => HandleClick(option.link)} className='buy_button'>Buy Now</button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default Results;
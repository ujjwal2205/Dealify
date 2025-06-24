import React,{useState} from 'react'
import './Results.css'
import result from '../../assets/assets.js'
const HandleClick=(link)=>{
window.open(link, '_blank');
}
function Results({submitQuery,sortBy}) {
     const filteredResults = result.filter((item) =>        
        item.name.trim().toLowerCase().includes(submitQuery.trim().toLowerCase())
);
  return (
    <div className='results-container'>
    {filteredResults.length===0?(
        <p>Sorry!No matching products found.</p>
    ):(
    <ul className='results-list'>
     {
      filteredResults.map((option,index)=>(
      <li key={option.id} className="result-card">
        <div className='image'> <img src={option.source} alt={option.name}/></div>
        <div className='title'><h2>{option.name}</h2></div>
        <div className='rating'>{option.rating}/5</div>
        <div className='price'>{option.price}</div>
        <button onClick={()=>HandleClick(option.link)} className='buy_button'>Buy Now</button>
      </li>
))
     }
     </ul>
    )}
    </div>
  );
}

export default Results

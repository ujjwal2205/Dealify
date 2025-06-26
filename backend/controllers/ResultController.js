import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const API_KEY=process.env.SERPAPI_KEY;
const fetchFromAPI=async(query,site)=>{
const api_search_url=`https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}+site:${site}+₹&gl=in&hl=en&api_key=${API_KEY}`;
const {data}=await axios.get(api_search_url);
const products=[];
 if (data.organic_results?.length) {
    data.organic_results.forEach((item,index) => {
      const price = item?.rich_snippet?.bottom?.detected_extensions?.price;
      if(price && item.title && item.link && (item.thumbnail || item.favicon))
      products.push({
      id:`${site}-${encodeURIComponent(item.link)}`,
      title: item.title,
      price: typeof price === "string" ? Number(price.replace(/[^\d.]/g, "")) : price,
      link: item.link,
      image: item.thumbnail || item.favicon,
      source:`${site}`,
});
    });
  }
  return products;
};
const fetchingUserSearch = async (req, res) => {
  const { submitQuery } = req.body;
  try {
    const[amazonResults, flipkartResults,cromaResults]=await Promise.all([
        fetchFromAPI(submitQuery,"amazon.in"),
        fetchFromAPI(submitQuery,"flipkart.com"),
        fetchFromAPI(submitQuery,"croma.com"),
    ]);
    const all = [...amazonResults, ...flipkartResults,...cromaResults];
    all.sort((a,b)=>a.price-b.price);
    if (all.length == 0) {
      res.json({
        success: true,
        message: "Sorry! No matching products found."
      });
    } else {
      res.json({
        success: true,
        filteredData: all
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Cannot fetch user search"
    });
  }
};

export default fetchingUserSearch;

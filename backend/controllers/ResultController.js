import axios from "axios";
const API_KEY="267c25ff7b00519c8f9d5739ce84250a77db78aa7490a92e16c017bdd9a3ba44"
const fetchFromAPI=async(query,site)=>{
const api_search_url=`https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}+site:${site}+₹&gl=in&hl=en&api_key=${API_KEY}`;
const {data}=await axios.get(api_search_url);
console.log("API Response:", data);
const products=[];
 if (data.organic_results?.length) {
    data.organic_results.forEach((item) => {
      const price = item?.rich_snippet?.bottom?.detected_extensions?.price;
      if(price && item.title && item.link && item.thumbnail)
      products.push({
      title: item.title,
      price: typeof price === "string" ? Number(price.replace(/[^\d.]/g, "")) : price,
      link: item.link,
      image: item.thumbnail,
});
    });
  }

  return products;
};
const fetchingUserSearch = async (req, res) => {
  const { submitQuery } = req.body;
  try {
    const[amazonResults, flipkartResults]=await Promise.all([
        fetchFromAPI(submitQuery,"amazon.in"),
        fetchFromAPI(submitQuery,"flipkart.com"),
    ]);
    const all = [...amazonResults, ...flipkartResults];
    if (all.length == 0) {
      res.json({
        success: true,
        message: "Sorry! No matching products found."
      });
    } else {
      res.json({
        success: true,
        filteredData:all
      });
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cannot fetch user search"
    });
  }
};

export default fetchingUserSearch;

import axios from "axios";
import React, {useState} from "react";

function Home() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleInputChange = (event) => {
      const value = event.target.value;
      setQuery(value);
  
      if (value.length > 2) { // Fetch data if query length > 2
        fetchResults(value);
      } else {
        setResults([]);
      }
    };
  
    const fetchResults = async (searchQuery) => {
        setLoading(true);
        setError(null);
    
        try {
          const response = await fetch(`https://portal.qwords.com/apitest/whois.php?domain=${searchQuery}`);
          console.log(response);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setResults(data.results); // Adjust according to your API response
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
    return (
      <div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {/* <ul>
          {results.map((result, index) => (
            <li key={index}>{result.name}</li> // Adjust according to your API response
          ))}
        </ul> */}
      </div>
    );
}

export default Home;
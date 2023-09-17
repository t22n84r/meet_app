import { useState } from "react";

const CitySearch = ({allLocations}) => {

   const [showSuggestions, setshowSuggestions] = useState(false);
   const [query, setQuery] = useState("");
   const [suggestions, setSuggestions] = useState([]);

   const handleInputChange = (event) => {
      
      const value = event.target.value;
      const filteredLocations = allLocations ? allLocations.filter(location => location.toUpperCase().includes(value.toUpperCase())) : [];
      setQuery(value);
      setSuggestions(filteredLocations);
   }

   const handleSuggestionClick = (event) => {
      const value = event.target.textContent;
      setQuery(value);
      setshowSuggestions(false);
   }

   return (

      <div data-testid="city-search" >
         <input type="text" className="city" placeholder="Search for a city" value={query} 
         onFocus={() => setshowSuggestions(true)}
         onChange={handleInputChange}
         />

         { showSuggestions ?
            <ul className="suggestions">
               {suggestions.map(suggestion => {
                  return <li key={suggestion} onClick={handleSuggestionClick}> {suggestion}</li>
               })}
               <li key='See all cities' onClick={handleSuggestionClick}>
                  <b>See all cities</b>
               </li>
            </ul> : null }
      </div>
   );
}

export default CitySearch;
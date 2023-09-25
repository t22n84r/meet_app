import { useState, useEffect } from "react";

const CitySearch = ({allLocations=[], setCurrentCity}) => {

   const [showSuggestions, setshowSuggestions] = useState(false);
   const [query, setQuery] = useState("");
   const [suggestions, setSuggestions] = useState([]);

   useEffect(() => {
      setSuggestions(allLocations);
   }, [JSON.stringify(allLocations)]);

   const handleInputChange = (event) => {
      
      const value = event.target.value;
      const filteredLocations = allLocations.filter(location => location.includes(value));
      setQuery(value);
      setSuggestions(filteredLocations);
   }

   const handleSuggestionClick = (event) => {
      const value = event.target.textContent;
      setQuery(value);
      setshowSuggestions(false);
      setCurrentCity(value);
   }

   return (

      <div data-testid="city-search" className="city-search" >
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
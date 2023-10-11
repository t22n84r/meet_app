import { useState, useEffect } from "react";

const CitySearch = ({allLocations=[], setCurrentCity, setInfoAlert}) => {

   const [showSuggestions, setshowSuggestions] = useState(false);
   const [query, setQuery] = useState("");
   const [suggestions, setSuggestions] = useState([]);

   useEffect(() => {
      setSuggestions(allLocations);
   }, [JSON.stringify(allLocations)]);

   const handleInputChange = (event) => {
      
      const value = event.target.value;
      const filteredLocations = allLocations.filter(location => location.toUpperCase().includes(value.toUpperCase()));
      setQuery(value);
      setSuggestions(filteredLocations);

      let infoText;
      if (filteredLocations.length === 0) {
         infoText = "We can not find the city you are looking for. Please try another city."
      } else {
         infoText = ""
      }
      setInfoAlert(infoText);
   }

   const handleSuggestionClick = (event) => {
      const value = event.target.textContent;
      setQuery(value);
      setshowSuggestions(false);
      setCurrentCity(value);
      setInfoAlert("");
   }

   return (

      <div data-testid="city-search" className="city-search mt-3" >
         <input type="text" className="city" placeholder="Search for a city" value={query} 
         onFocus={() => setshowSuggestions(true)}
         onChange={handleInputChange}
         />

         { showSuggestions ?
            <ul className="suggestions mt-2 list-group position-absolute z-2" data-testid="city-search-suggestionList">
               {suggestions.map(suggestion => {
                  return <li className="list-group-item p-2" key={suggestion} onClick={handleSuggestionClick}> {suggestion}</li>
               })}
               <li className="list-group-item p-2" key='See all cities' onClick={handleSuggestionClick}>
                  <b>See all cities</b>
               </li>
            </ul> : null }
      </div>
   );
}

export default CitySearch;
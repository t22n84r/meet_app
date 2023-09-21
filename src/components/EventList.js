import { useState } from "react";
import Event from "./Event";

const EventList = ({events}) => {

   const [eventsCount, seteventsCount] = useState(32);

   const handleInputChange = (e) => {
      const value = e.target.value;
      
      // Allow empty strings and numbers greater than or equal to 0
      (value === "" || (!isNaN(value) && value >= 0)) && seteventsCount(value);
   };

   return (

      <div>
         <div className="d-flex justify-content-end align-items-center my-3">
         <label htmlFor="eventsDisplaycount" className="form-label mx-2">Number events to display</label>
            <input
               type="number"
               className="form-control w-auto"
               id="eventsDisplaycount"
               placeholder="Events count to display..."
               value={eventsCount}
               onChange={handleInputChange}
            />
         </div>

         <ul data-testid="event-list">
            {events? events.slice(0, eventsCount).map((event, index) => <Event key={event.id} event={event} index={index} />) : null}
         </ul>
      </div>
   );
}

export default EventList;
import { useState } from "react";
import Event from "./Event";
import { ErrorAlert } from "./Alert";

const EventList = ({events}) => {

   const [eventsCount, seteventsCount] = useState(32);
   const [errorAlert, setErrorAlert] = useState("");

   const handleInputChange = (e) => {
      const value = e.target.value;
      
      let infoText;
      
      if (value === "" || (!isNaN(value) && value > 0)) {
         seteventsCount(value);
         infoText = ""; // Clear the infoText if the condition is true
      } else {
         // Set the infoText when the condition is false
         infoText = "Only positive numbers allowed. Please try with a positive number.";
      }
      
      setErrorAlert(infoText);
   };   

   return (

      <div>
         <div className="d-flex justify-content-center align-items-center my-3">
            <label htmlFor="eventsDisplaycount" className="form-label mx-2">Number events to display</label>
            <input
               type="number"
               className="form-control w-auto"
               id="eventsDisplaycount"
               placeholder="Events count to display..."
               value={eventsCount}
               onChange={handleInputChange}
            />

            {errorAlert.length ? <ErrorAlert text={errorAlert}/> : null}
         </div>

         <ul data-testid="event-list" className="events">
            {events? events.slice(0, eventsCount).map((event, index) => <Event key={event.id} event={event} index={index} />) : null}
         </ul>
      </div>
   );
}

export default EventList;
import { Accordion } from 'react-bootstrap';
import './Events.css';

const Event = ({event, index}) => {

   function toLocalTime(dateTime) {
      // Parse the dateTime string into a Date object
      const date = new Date(dateTime);
  
      // Convert to user's local time and format it
      const localDate = date.toLocaleDateString();
      const localTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
      return `${localDate} ${localTime}`;
   }

   return (

      <li className="event list-group-item">
         <Accordion>
            <Accordion.Item eventKey={index}>
               <Accordion.Header>
                  <div className='text-left'>
                     <strong><u>Summary:</u></strong> {event.summary}<br/>
                     <strong><u>Location:</u></strong> {event.location}<br/>
                     <strong><u>Starting time:</u></strong> {toLocalTime(event.start.dateTime)}
                  </div>
               </Accordion.Header>
               <Accordion.Body>
                  <strong><u>Description:</u></strong> {event.description}<br />
                  <strong><u>Starting time:</u></strong> {toLocalTime(event.start.dateTime)}<br />
                  <strong><u>Ending time:</u></strong> {toLocalTime(event.end.dateTime)}<br />
                  <strong><u>Google calendar link:</u></strong> <a href={event.htmlLink} target="_blank" rel="noopener noreferrer">{event.htmlLink}</a>
               </Accordion.Body>
            </Accordion.Item>
         </Accordion>
      </li>
   );
}

export default Event;
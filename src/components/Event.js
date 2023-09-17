import Accordion from 'react-bootstrap/Accordion';

const Event = ({event, index}) => {

   return (

      <li>
         <Accordion>
            <Accordion.Item eventKey={index}>
               <Accordion.Header>Summary: {event.summary}</Accordion.Header>
               <Accordion.Body>
                  Starting time: {event.start.dateTime} <br />
                  Location: {event.location}
               </Accordion.Body>
            </Accordion.Item>
         </Accordion>
      </li>
   );
}

export default Event;
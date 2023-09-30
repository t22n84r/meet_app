import { useState, useEffect } from 'react';
import EventList from './components/EventList'
import CitySearch from './components/CitySearch';
import { getEvents, extractLocations } from './api';
import { InfoAlert } from './components/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const MeetApp = () => {

  const [events, setEvents] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {

      try {

        const allEvents = await getEvents();

        const filteredEvents = currentCity === "See all cities" ? allEvents : allEvents.filter(event => event.location === currentCity.trim());

        setEvents(filteredEvents);
        setAllLocations(extractLocations(allEvents));
      } 
      catch (error) { console.error('Failed to fetch events', error);}
    };
    fetchEvents();
  }, [currentCity]);

  return (
    <div className='MeetApp'>

      <div className="d-flex justify-content-start align-items-center">
        <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert} />
        {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
      </div>
      <EventList events={events}/>
      
    </div>
  );
 }

 export default MeetApp;

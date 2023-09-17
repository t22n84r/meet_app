import { useState, useEffect } from 'react';
import EventList from './components/EventList'
import CitySearch from './components/CitySearch';
import { getEvents } from './api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const MeetApp = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {

      try {

        const events = await getEvents();
        setEvents(events);
      } 
      catch (error) { console.error('Failed to fetch events', error);}
    };
    fetchEvents();
  }, []);

  return (
    <div className='MeetApp'>
      <CitySearch />
      <EventList events={events} />
    </div>
  );
 }

 export default MeetApp;

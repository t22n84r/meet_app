import { useState, useEffect } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const CityEventsChart = ({ allLocations, events }) => {

   const [data, setData] = useState([]);

   useEffect(() => {
     setData(getData());
   }, [`${events}`]);

   const getData = () => {
      const data = allLocations.map((location) => {
         const count = events.filter((event) => event.location === location).length
         const city = location.split((/, | - /))[0]
         return { city, count };
      })
      return data;
    };

   return (
      <ResponsiveContainer width="99%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 60,
            left: 0,
         }}
        >
          <CartesianGrid />
          <XAxis type="category" dataKey="city" name="City" angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14, fill: '#00C49F' }} />
          <YAxis type="number" dataKey="count" name="Number of events" allowDecimals={false} tick={{fill: '#00C49F'}} />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }} 
            contentStyle={{ backgroundColor: '#393053', borderWidth: '1px', borderColor: '#00C49F', borderStyle: 'solid' }}
          />
          <Scatter name="A school" data={data} fill="#00C49F" shape={<circle r={7} />} />
        </ScatterChart>
      </ResponsiveContainer>
   );
}

export default CityEventsChart;
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EventGenresChart = ({ events }) => {

   const [data, setData] = useState([]);

   const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

   const colors = ['#087ea4', '#00C49F', '#FFBB28', '#FF8042', '#DD0031'];

   const getData = () => {      
      const data = genres.map(genre => {
         const filteredEvents = events.filter(event => event.summary.includes(genre));

         return {
            name: genre,
            value: filteredEvents.length
         };
      });

      return data;
   };

   useEffect(() => {
      setData(getData());
   }, [`${events}`]);

   const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
      const RADIAN = Math.PI / 180;
      const radius = outerRadius;
      const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
      const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
      return percent ? (
        <text
          x={x}
          y={y}
          fill="#00C49F"
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
        >
          {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
        </text>
      ) : null;
   };

   return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
            <Pie
            data={data}
            dataKey="value"
            fill="#8884d8"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}           
            >

            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}

            </Pie>
         </PieChart>
      </ResponsiveContainer>
   );
};

export default EventGenresChart;
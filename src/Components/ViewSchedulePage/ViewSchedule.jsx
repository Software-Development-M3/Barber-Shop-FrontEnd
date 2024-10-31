import React, { useEffect, useState } from 'react'
import ScheduleTable from '../SelectSchedulePage/ScheduleTable'
import axios from 'axios';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';


import './ViewSechdule.css';


const ViewSchedule = () => {


    const { shopid } = useParams();
    console.log("current sipId", shopid);
  
    const navigate = useNavigate();
  
    const [availabelSchedule, setAvailabelSchedule] = useState(null);
    const [busySchedule, setBusySchedule] = useState({
      "26-10-2024": {
          "So Yern": [
              {
                  "bookid": "c0e4e8f7-8e59-4942-b620-4605569036e0",
                  "startTime": "26-10-2024T13:00",
                  "endTime": "26-10-2024T13:30",
                  "totalDuration": 30,
                  "serviceType": [
                      "Hair washing"
                  ],
                  "serviceName": [
                      "สระธรรมดา"
                  ]
              },
              {
                  "bookid": "0d75e4f5-ff72-45e9-991d-d5502f7b8be4",
                  "startTime": "26-10-2024T14:00",
                  "endTime": "26-10-2024T14:30",
                  "totalDuration": 30,
                  "serviceType": [
                      "Hair washing"
                  ],
                  "serviceName": [
                      "สระธรรมดา"
                  ]
              },
              {
                  "bookid": "074672dd-41cc-4064-83a2-4c06fb5e81ad",
                  "startTime": "26-10-2024T09:00",
                  "endTime": "26-10-2024T09:30",
                  "totalDuration": 30,
                  "serviceType": [
                      "Hair washing"
                  ],
                  "serviceName": [
                      "สระธรรมดา"
                  ]
              }
          ],
          "Racha Coco": [
              {
                  "bookid": "6124c172-1328-42d1-9134-f441227abc6b",
                  "startTime": "26-10-2024T09:00",
                  "endTime": "26-10-2024T09:30",
                  "totalDuration": 30,
                  "serviceType": [
                      "Hair washing"
                  ],
                  "serviceName": [
                      "สระธรรมดา"
                  ]
              }
          ]
      },
      "27-10-2024": {
          "So Yern": [],
          "Racha Coco": []
      },
      "28-10-2024": {
          "So Yern": [],
          "Racha Coco": []
      },
      "29-10-2024": {
          "So Yern": [],
          "Racha Coco": []
      },
      "30-10-2024": {
          "So Yern": [],
          "Racha Coco": []
      },
      "31-10-2024": {
          "So Yern": [],
          "Racha Coco": []
      },
      "01-11-2024": {
          "So Yern": [],
          "Racha Coco": []
      }
  }
  
    );
    const [barber_list, setBarber_list] = useState(null);
    const [userAppointment, setUserAppointment] = useState({});
    const [userSelectDate, setUserSelectDate] = useState(new Date());
  

    useEffect(() => {
        axios.get(`http://localhost:3000/shop/barber/${shopid}`)
        .then(resp => resp.data)
        .then(data => setBarber_list(data))
        .then(() => console.log("barber_list ", barber_list))
  
  
        axios.get(`http://localhost:3000/shop/schedule/available/${shopid}`)
        .then(resp => resp.data)
        .then(data => setAvailabelSchedule(data))
        .then(() =>console.log("available ", availabelSchedule))
  
        axios.get(`http://localhost:3000/shop/schedule/${shopid}`)
        .then(resp => resp.data)
        .then(data => setBusySchedule(data))
        .then(() => console.log("busy ", busySchedule))
  
    }, [])
  
    console.log("barber_list ", barber_list);
    console.log("available ", availabelSchedule);
    console.log("busy ", busySchedule);
  
  
    const get_barber_list = async () => {
      axios.get(`http://localhost:3000/shop/barber/${shopid}`)
      .then(resp => resp.data)
      .then(data => setBarber_list(data))
      .then(() => console.log("barber_list ", barber_list))
    }
  
    if(barber_list == null || availabelSchedule == null) {
      return <h1>LOADING</h1>
    }
  
  
    const barberIdMap = barber_list.reduce((map, barber) => {
      map[barber.name] = barber.id;
      return map;
  }, {});
  
    function transformData(data) {
      const result = [];
      for (const [date, barbers] of Object.entries(data)) {
          for (const [barberName, appointments] of Object.entries(barbers)) {
              appointments.forEach(appt => {
  
                  const [stDate, stTime] = appt.startTime.split('T')
                  const [stday, stmonth, styear] = stDate.split('-');
  
                  const [enDate, enTime] = appt.endTime.split('T');
                  const [enday, enmonth, enyear] = enDate.split('-');
                  result.push({
                      startDate: `${styear}-${stmonth}-${stday}T${stTime}`,
                      endDate: `${enyear}-${enmonth}-${enday}T${enTime}`,
                      barberName: barberName,
                      barberId: barberIdMap[barberName] // Add barberId based on the name
                  });
              });
          }
      }
      return result;
  }
  
  function getDateAvailbale(data) {
    const result = [];
    for (const [date, barbers] of Object.entries(data)) {
      const [day, month, year] = date.split('-');
      const formatDate = `${year}-${month}-${day}`;
      result.push(formatDate);
    }
    return result;
    }
  
  function getFormatBarberList(data) {
    const result = data.map(barber => ({text: barber.name, id: barber.id}))
    return result;
  }
  
  
  
  
  function transformAvailability(availabilityData, barberData) {
      const result = [];
    
      for (const date in availabilityData) {
        for (const barberName in availabilityData[date]) {
          // Find barber details in barberData array
          const barber = barberData.find(b => b.name === barberName);
          if (!barber) continue; // skip if barber not found
    
          const barberId = barber.id;
    
          // Loop through freeSlot entries and create new format
          availabilityData[date][barberName].forEach(entry => {
            entry.freeSlot.forEach(slot => {
              // Convert date to YYYY-MM-DD format
              const formattedDate = date.split("-").reverse().join("-");
    
              result.push({
                startDate: `${formattedDate}T${slot.start.split("T")[1]}`,
                endDate: `${formattedDate}T${slot.end.split("T")[1]}`,
                barberName,
                barberId
              });
            });
          });
        }
      }
      return result;
    }

    const handleGoBack = () => {
        navigate(`/shop/${shopid}`);
    }

    const appointment = transformData(busySchedule)
    console.log("trnaform dta ", appointment);
    const dateAvailable = getDateAvailbale(availabelSchedule);
    console.log("dateAvailabel ", dateAvailable);
    const formatBarber = getFormatBarberList(barber_list);
    console.log("format barber list ",formatBarber)
    const availabelSchedule_format = transformAvailability(availabelSchedule, barber_list);
    console.log("availabelSchedule_format: ", availabelSchedule_format);


    const colors_list = ['#34cf5a', "#34cf5a", "#34cf5a", "#34cf5a"]
    const update_formatBarber = formatBarber.map((barber, index) => ({...barber, color: colors_list[index]}))
    

  return (
    <div className='viewschedule_page'>
        <ScheduleTable appointment={appointment} barber_list={update_formatBarber} date_available={dateAvailable} setUserSelectDate={setUserSelectDate} availabelSchedule_format={availabelSchedule_format}></ScheduleTable>
        <button className="btn-hover goback_btn" onClick={handleGoBack}>Go Back</button> 
    </div>
  )
}

export default ViewSchedule
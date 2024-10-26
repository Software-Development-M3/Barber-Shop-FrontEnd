import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const ScheduleForm = (props) => {
  
    const duration = props.duration;
    const barber_list = props.option_barber;
    const setAppointments = props.setAppointments;
    const userSelectDate = new Date(`${props.userSelectDate}`);
    const availabelSchedule = props.availabelSchedule;


    console.log("barber_list:: ", barber_list);
    console.log("duration:: ", duration);
    console.log("userSelectDate:: ", userSelectDate);


    const navigate = useNavigate();

    
    const [currentBarber, setCurrentBarber] = useState(1);
    const [startTime, setStartTime] = useState("13:30");
    const currentDate = "2024-10-11";

    const generate_option_element = (each_option, index) => {
      return <option key={index} value={index} >{each_option.name}</option>
    }
    const handleSelectBarber = (e) => {
      const target_barber_value = e.target.value;
      setCurrentBarber(target_barber_value);
    }
    console.log("curret barber ", currentBarber);



    const handleSelectStartTime = (e) => {
      setStartTime(e);
    }


        // Function to check if the new appointment overlaps with any existing free slots
    function isOverlapping(busySlots, newAppointment) {
      const dateKey = newAppointment.startDate.split('T')[0].split('-').reverse().join('-');
      const barberSlots = busySlots[dateKey]?.[newAppointment.barberName]?.[0]?.freeSlot || [];

      console.log("barberSlots:: ", barberSlots);
      
      // Convert time strings to Date objects for comparison
      const newStart = new Date(newAppointment.startDate);
      const newEnd = new Date(newAppointment.endDate);

      for (const slot of barberSlots) {
        console.log(slot);
        const slotStart = new Date(reformatDateString(slot.start));
        const slotEnd = new Date(reformatDateString(slot.end));
        console.log(new Date(`26-10-2024T13:00`));


        console.log(`newStart  ${newStart}   slotEnd  ${slotEnd}`);
        console.log(`newEnd  ${newEnd}   slotStart  ${slotStart}`);
        console.log("Test check  ",newStart >= slotStart, newStart <= slotEnd, newEnd >= slotStart, newEnd <= slotEnd);

        // Check if the new appointment overlaps with this slot
        if ((newStart >= slotStart && newStart <= slotEnd && newEnd >= slotStart && newEnd <= slotEnd)) {
          return true; // Overlap found
        }
      }

      return false; // No overlap
    }

    function reformatDateString(dateString) {
      const [date, time] = dateString.split('T');
      const [day, month, year] = date.split('-');
      return `${year}-${month}-${day}T${time}`;
    }
    

    const handleSubmit = (e) => {
      e.preventDefault();
      const start_date_time = `${userSelectDate.getFullYear()}-${userSelectDate.getMonth() + 1}-${userSelectDate.getDate()}`+'T'+startTime;
      const start_datetime = moment(start_date_time).format('YYYY-MM-DDTHH:mm');
      const end_datetime = moment(start_date_time).add(duration, 'minute').format('YYYY-MM-DDTHH:mm');    //28-10-2024T09:30
      const newAppointment = {
        barberId: barber_list[currentBarber].id,
        barberName: barber_list[currentBarber].name,
        startDate: start_datetime,
        endDate: end_datetime,
        duration: duration,
      }

      console.log("new appointment: ", newAppointment);

      // verify appointment   

      const hasOverlap = isOverlapping(availabelSchedule, newAppointment);
      console.log(`new appointment Check with existing free slots? ${hasOverlap ? 'OK' : 'NOT OK'}`);

      if(hasOverlap == false) {
        alert("choose another time slot!");
      }
      else{
        navigate(`/booking/confirm/${shppid}`);
        sessionStorage.setItem('selectTime', JSON.stringify(newAppointment));

      }
      //

    }

  return (
    <div>
        <h1> you time is {duration} min.</h1>
        <form onSubmit={handleSubmit}>
          <select className='select_barber' onChange={handleSelectBarber}>
            {barber_list.map((item , index) => generate_option_element(item, index))}
          </select>
          <TimePicker onChange={handleSelectStartTime} value={startTime} ></TimePicker>
          <button>Create Appointment</button>
        </form>
        <h2>Date : {userSelectDate.getDate()} / {userSelectDate.getMonth() + 1}</h2>
        <button>GO BACK</button>
    </div>
  )
}

export default ScheduleForm
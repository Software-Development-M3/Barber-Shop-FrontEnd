import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import moment from 'moment';

const ScheduleForm = (props) => {
  
    const duration = props.duration;
    const barber_list = props.option_barber;
    const setAppointments = props.setAppointments;

    
    const [currentBarber, setCurrentBarber] = useState(1);
    const [startTime, setStartTime] = useState("18:30");
    const currentDate = "2024-10-11";

    const generate_option_element = (each_option, index) => {
      return <option key={index} value={each_option.id} >{each_option.text}</option>
    }
    const handleSelectBarber = (e) => {
      const target_barber_value = e.target.value;
      setCurrentBarber(parseInt(target_barber_value));
    }
    console.log("curret barber ", currentBarber);
    const handleSelectStartTime = (e) => {
      setStartTime(e);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      const start_date_time = currentDate+'T'+startTime;
      const start_datetime = moment(start_date_time).format('YYYY-MM-DDTHH:mm');
      const end_datetime = moment(start_date_time).add(duration, 'minute').format('YYYY-MM-DDTHH:mm');
      const newAppointment = {
        barberId: parseInt(currentBarber),
        barberName: barber_list[currentBarber].text,
        startDate: start_datetime,
        endDate: end_datetime,
        duration: duration,
      }
      // verify appointment   

      //

      localStorage.setItem('newAppointment', JSON.stringify(newAppointment));
      setAppointments(prev => {
        return [...prev, newAppointment];

      })
    }

  return (
    <div>
        <h1> you time is {duration} min.</h1>
        <form onSubmit={handleSubmit}>
          <select className='select_barber' onChange={handleSelectBarber}>
            {barber_list.map(generate_option_element)}
          </select>
          <TimePicker onChange={handleSelectStartTime} value={startTime} ></TimePicker>
          <button>Create Appointment</button>
        </form>
        <button>GO BACK</button>
    </div>
  )
}

export default ScheduleForm
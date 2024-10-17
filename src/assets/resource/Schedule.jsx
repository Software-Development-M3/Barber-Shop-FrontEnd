import React, { useState } from 'react'
import ScheduleTable from './ScheduleTable.jsx'
import ScheduleForm from './ScheduleForm.jsx'


const Schedule = () => {


    // const [appointments, setAppointments] = useState([
    //     {
    //       title: "0",
    //       Barbers: 1,
    //       startDate: "2017-04-28T09:30",
    //       endDate: "2017-04-28T10:30",
    //     },
    //     {
    //       title: "1",
    //       Barbers: 3,
    //       startDate: "2017-04-28T09:30",
    //       endDate: "2017-04-28T10:30",
    //     },
    //     {
    //         title: "2",
    //         Barbers: 2,
    //         startDate: "2017-04-29T09:30",
    //         endDate: "2017-04-29T10:30",
    //     }
    //   ]
    // );



    const raw_response = [
        {
          "barberId": 1,
          "barberName": "ช่างแอม",
          "date": "11-10-2024",
          "appointments": [
            {
              "startTime": "11-10-2024T09:30",
              "endTime": "11-10-2024T10:30"
            },
            {
              "startTime": "11-10-2024T11:00",
              "endTime": "11-10-2024T12:00"
            },
            {
                "startTime": "11-10-2024T13:00",
                "endTime": "11-10-2024T14:00"
              }
          ]
        },
        {
          "barberId": 2,
          "barberName": "ช่างโก๋",
          "date": "11-10-2024",
          "appointments": [
            {
              "startTime": "11-10-2024T09:30",
              "endTime": "11-10-2024T10:30"
            },
            {
              "startTime": "11-10-2024T11:00",
              "endTime": "11-10-2024T12:00"
            }
          ]
        },
        {
          "barberId": 3,
          "barberName": "ช่างบอย",
          "date": "11-10-2024",
          "appointments": [
            {
              "startTime": "11-10-2024T09:30",
              "endTime": "11-10-2024T10:30"
            },
            {
              "startTime": "11-10-2024T11:00",
              "endTime": "11-10-2024T12:00"
            }
          ]
        },
        {
          "barberId": 1,
          "barberName": "ช่างแอม",
          "date": "12-10-2024",
          "appointments": [
            {
              "startTime": "12-10-2024T09:30",
              "endTime": "12-10-2024T10:30"
            },
            {
              "startTime": "12-10-2024T11:00",
              "endTime": "12-10-2024T12:00"
            }
          ]
        },
        {
          "barberId": 2,
          "barberName": "ช่างโก๋",
          "date": "12-10-2024",
          "appointments": [
            {
              "startTime": "12-10-2024T09:30",
              "endTime": "12-10-2024T10:30"
            },
            {
              "startTime": "12-10-2024T11:00",
              "endTime": "12-10-2024T12:00"
            }
          ]
        },
        {
          "barberId": 3,
          "barberName": "ช่างบอย",
          "date": "12-10-2024",
          "appointments": [
            {
              "startTime": "12-10-2024T09:30",
              "endTime": "12-10-2024T10:30"
            },
            {
              "startTime": "12-10-2024T11:00",
              "endTime": "12-10-2024T12:00"
            }
          ]
        }
      ]

      function convertDateFormat(dateString) {
        const [datePart, timePart] = dateString.split("T");
        const [day, month, year] = datePart.split("-");
        return `${year}-${month}-${day}T${timePart}`;
      }

      const fix_format_rasponse = raw_response.flatMap(barber => {
        return barber.appointments.map(appointment => {
          return {
            barberId: barber.barberId,
            barberName: barber.barberName,
            startDate: convertDateFormat(appointment.startTime),
            endDate: convertDateFormat(appointment.endTime)
          };
        });
      });
      console.log("fix format: ", fix_format_rasponse);
      
      const barber_list = raw_response.map(each_date_barber => {
        return {barberId : each_date_barber.barberId,
                barberName: each_date_barber.barberName
        }
      })
      console.log("barber list : ", barber_list)


      let temp = []
      let unique_barber_list = []
      barber_list.forEach(element => {
        if ( !temp.includes(JSON.stringify({id: element.barberId, text: element.barberName}))) {
            temp.push(JSON.stringify({id: element.barberId, text: element.barberName}));
            unique_barber_list.push(JSON.parse(JSON.stringify({id: element.barberId, text: element.barberName})));
        }
      })
      console.log("unique_barber_list : ", unique_barber_list);

      
      const [appointments, setAppointments] = useState(fix_format_rasponse)


  return (
    <div>
        <ScheduleTable appointment={appointments} barber_list={unique_barber_list}/>
        <ScheduleForm setAppointments={setAppointments} option_barber={unique_barber_list}></ScheduleForm>
    </div>
  )
}

export default Schedule
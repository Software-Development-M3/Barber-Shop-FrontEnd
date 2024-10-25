import React, { useState } from 'react'
import ScheduleTable from './ScheduleTable.jsx'
import ScheduleForm from './ScheduleForm.jsx'
import { AlternateEmail } from '@mui/icons-material';
import moment from 'moment';


const SelectSchedule = () => {

    const duration = 60;
    let date_available = ["2024-10-10", "2024-10-11", "2024-10-12"]
    //let date_available = [];
    if(date_available.length == 0) {
      console.log("set date availabel to : ", moment());
      date_available.push(moment());
    }
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


      const raw_response1 = {
        "25-10-2024": {
            "So Yern": [
                {
                    "bookid": "17d9bf48-cb8d-4336-bab7-4900fd4c8c3c",
                    "startTime": "25-10-2024T9:00",
                    "endTime": "25-10-2024T09:30",
                    "totalDuration": 30,
                    "serviceType": ["Hair washing"],
                    "serviceName": ["สระธรรมดา"]
                }
            ],
            "Racha Coco": [
                {
                    "bookid": "c2dd63c6-949b-4535-a570-d82d39cc3ea0",
                    "startTime": "25-10-2024T9:00",
                    "endTime": "25-10-2024T09:30",
                    "totalDuration": 30,
                    "serviceType": ["Hair washing"],
                    "serviceName": ["สระธรรมดา"]
                }
            ]
        },
        "26-10-2024": {
            "So Yern": [],
            "Racha Coco": []
        },
    };

    function transformData(data) {
      const result = [];
  
      for (const [date, barbers] of Object.entries(data)) {
          for (const [barberName, appointments] of Object.entries(barbers)) {
              appointments.forEach(appt => {
                  result.push({
                      barberName: barberName,
                      startDate: appt.startTime,
                      endDate: appt.endTime
                  });
              });
          }
      }
  
      return result;
  }

  const transformedData = transformData(raw_response1);
  console.log("transform ", transformedData);



  const transformBarber = (data) => {
    // Extract unique barber names
    const barbers = new Set();
    for (const date in data) {
        for (const barber in data[date]) {
            barbers.add(barber);
        }
    }

    // Format the data as required
    return Array.from(barbers).map(barber => ({ barberId: barber, barberName: barber }));
};

    
      
      
      const barber_list = transformBarber(raw_response1)
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

      
      const [appointments, setAppointments] = useState(transformedData)

  return (
    <div>
        <ScheduleTable appointment={appointments} barber_list={unique_barber_list} date_available={date_available}/>
        <ScheduleForm setAppointments={setAppointments} option_barber={unique_barber_list} duration={duration}></ScheduleForm>
    </div>
  )
}

export default SelectSchedule;
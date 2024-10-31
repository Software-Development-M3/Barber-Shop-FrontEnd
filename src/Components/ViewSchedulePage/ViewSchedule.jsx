import React, { useEffect, useState } from 'react'
import ScheduleTable from '../SelectSchedulePage/ScheduleTable'
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const ViewSchedule = () => {


    const { shopid } = useParams();
    console.log("current sipId", shopid);

    const services = sessionStorage.getItem("selectedService");


    const [availabelSchedule, setAvailabelSchedule] = useState({
      "26-10-2024": {
          "So Yern": [
              {
                  "longestFreeDuration": 330,
                  "freeSlot": [
                      {
                          "start": "26-10-2024T09:30",
                          "end": "26-10-2024T12:00",
                          "duration": 150
                      },
                      {
                          "start": "26-10-2024T13:30",
                          "end": "26-10-2024T14:00",
                          "duration": 30
                      },
                      {
                          "start": "26-10-2024T14:30",
                          "end": "26-10-2024T20:00",
                          "duration": 330
                      }
                  ]
              }
          ],
          "Racha Coco": [
              {
                  "longestFreeDuration": 420,
                  "freeSlot": [
                      {
                          "start": "26-10-2024T09:30",
                          "end": "26-10-2024T12:00",
                          "duration": 150
                      },
                      {
                          "start": "26-10-2024T13:00",
                          "end": "26-10-2024T20:00",
                          "duration": 420
                      }
                  ]
              }
          ]
      },
      "27-10-2024": {
          "So Yern": [
              {
                  "longestFreeDuration": 420,
                  "freeSlot": [
                      {
                          "start": "27-10-2024T09:00",
                          "end": "27-10-2024T12:00",
                          "duration": 180
                      },
                      {
                          "start": "27-10-2024T13:00",
                          "end": "27-10-2024T20:00",
                          "duration": 420
                      }
                  ]
              }
          ],
          "Racha Coco": [
              {
                  "longestFreeDuration": 420,
                  "freeSlot": [
                      {
                          "start": "27-10-2024T09:00",
                          "end": "27-10-2024T12:00",
                          "duration": 180
                      },
                      {
                          "start": "27-10-2024T13:00",
                          "end": "27-10-2024T20:00",
                          "duration": 420
                      }
                  ]
              }
          ]
      },
      "28-10-2024": {
          "So Yern": [
              {
                  "longestFreeDuration": 420,
                  "freeSlot": [
                      {
                          "start": "28-10-2024T09:00",
                          "end": "28-10-2024T12:00",
                          "duration": 180
                      },
                      {
                          "start": "28-10-2024T13:00",
                          "end": "28-10-2024T20:00",
                          "duration": 420
                      }
                  ]
              }
          ],
          "Racha Coco": [
              {
                  "longestFreeDuration": 420,
                  "freeSlot": [
                      {
                          "start": "28-10-2024T09:00",
                          "end": "28-10-2024T12:00",
                          "duration": 180
                      },
                      {
                          "start": "28-10-2024T13:00",
                          "end": "28-10-2024T20:00",
                          "duration": 420
                      }
                  ]
              }
          ]
      },
      "29-10-2024": {
          "So Yern": [
              {
                  "longestFreeDuration": 420,
                  "freeSlot": [
                      {
                          "start": "29-10-2024T09:00",
                          "end": "29-10-2024T12:00",
                          "duration": 180
                      },
                      {
                          "start": "29-10-2024T13:00",
                          "end": "29-10-2024T20:00",
                          "duration": 420
                      }
                  ]
              }
          ],
          "Racha Coco": [
              {
                  "longestFreeDuration": 420,
                  "freeSlot": [
                      {
                          "start": "29-10-2024T09:00",
                          "end": "29-10-2024T12:00",
                          "duration": 180
                      },
                      {
                          "start": "29-10-2024T13:00",
                          "end": "29-10-2024T20:00",
                          "duration": 420
                      }
                  ]
              }
          ]
      },
      "30-10-2024": {
          "So Yern": [
              {
                  "longestFreeDuration": 420,
                  "freeSlot": [
                      {
                          "start": "30-10-2024T09:00",
                          "end": "30-10-2024T12:00",
                          "duration": 180
                      },
                      {
                          "start": "30-10-2024T13:00",
                          "end": "30-10-2024T20:00",
                          "duration": 420
                      }
                  ]
              }
          ],
          "Racha Coco": [
              {
                  "longestFreeDuration": 420,
                  "freeSlot": [
                      {
                          "start": "30-10-2024T09:00",
                          "end": "30-10-2024T12:00",
                          "duration": 180
                      },
                      {
                          "start": "30-10-2024T13:00",
                          "end": "30-10-2024T20:00",
                          "duration": 420
                      }
                  ]
              }
          ]
      },
      "31-10-2024": {
          "So Yern": [
              {
                  "longestFreeDuration": 420,
                  "freeSlot": [
                      {
                          "start": "31-10-2024T09:00",
                          "end": "31-10-2024T12:00",
                          "duration": 180
                      },
                      {
                          "start": "31-10-2024T13:00",
                          "end": "31-10-2024T20:00",
                          "duration": 420
                      }
                  ]
              }
          ],
          "Racha Coco": [
              {
                  "longestFreeDuration": 420,
                  "freeSlot": [
                      {
                          "start": "31-10-2024T09:00",
                          "end": "31-10-2024T12:00",
                          "duration": 180
                      },
                      {
                          "start": "31-10-2024T13:00",
                          "end": "31-10-2024T20:00",
                          "duration": 420
                      }
                  ]
              }
          ]
      },
      "01-11-2024": {
          "So Yern": [
              {
                  "longestFreeDuration": 420,
                  "freeSlot": [
                      {
                          "start": "01-11-2024T09:00",
                          "end": "01-11-2024T12:00",
                          "duration": 180
                      },
                      {
                          "start": "01-11-2024T13:00",
                          "end": "01-11-2024T20:00",
                          "duration": 420
                      }
                  ]
              }
          ],
          "Racha Coco": [
              {
                  "longestFreeDuration": 420,
                  "freeSlot": [
                      {
                          "start": "01-11-2024T09:00",
                          "end": "01-11-2024T12:00",
                          "duration": 180
                      },
                      {
                          "start": "01-11-2024T13:00",
                          "end": "01-11-2024T20:00",
                          "duration": 420
                      }
                  ]
              }
          ]
      }
  });
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
    const [barber_list, setBarber_list] = useState([
      {
          "id": "38f921dc-9757-4055-bb14-fb26221774ec",
          "name": "So Yern",
          "experience": 50,
          "specialization": "Hair Styling No.1"
      },
      {
          "id": "b0f3d2cc-39ba-483a-b86a-a2a6ab81597f",
          "name": "Racha Coco",
          "experience": 10,
          "specialization": "Beard Trimming No.2"
      }
  ]);

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
  const appointment = transformData(busySchedule)
  console.log("trnaform dta ", appointment);
  const dateAvailable = getDateAvailbale(availabelSchedule);
  console.log("dateAvailabel ", dateAvailable);
  const formatBarber = getFormatBarberList(barber_list);
  console.log("format barber list ",formatBarber)

  return (
    <div>
        <ScheduleTable appointment={appointment} barber_list={formatBarber} date_available={dateAvailable} setUserSelectDate={setUserSelectDate}></ScheduleTable>
        {/* <button onClick={handleGoBack}>Go Back</button> */}
    </div>
  )
}

export default ViewSchedule
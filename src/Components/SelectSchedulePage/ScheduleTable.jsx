import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import {
  ViewState,
  GroupingState,
  IntegratedGrouping,
  IntegratedEditing,
  EditingState,
  TodayButton,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Resources,
  Appointments,
  AppointmentTooltip,
  GroupingPanel,
  DayView,
  AppointmentForm,
  DateNavigator,
  Toolbar,
} from "@devexpress/dx-react-scheduler-material-ui";


export default class ScheduleTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      resources: [
        {
          fieldName: "barberId",
          title: "barbers",
          instances: this.props.barber_list,
        },
      ],
      grouping: [
        {
          resourceName: "barberId",
        },
      ],
      currentDate : this.props.date_available[0]
    };

    this.currentDateChange = (e) => {
      this.setState({ e });
      this.props.setUserSelectDate(e);
      console.log("Date change to ", e);
    }

  }



  render() {

    const {resources, grouping } = this.state;
    const appointment = this.props.appointment;
    const date_available = this.props.date_available;
    const barber_list = this.props.barber_list;
    const availabelSchedule_format = this.props.availabelSchedule_format;

    const formatTimeScaleDate = date => moment(date).format('hh:mm:ss');

    console.log("date_available: ", date_available);
    console.log("appointment: ", appointment);
    console.log("barber_list: ", barber_list);
    console.log("availabelSchedule: ", availabelSchedule_format);
    console.log("current date: ", this.props.date_available[0]);



    return (
      <div className="table_schedule_page">
        <Paper>
          <Scheduler 
          data={availabelSchedule_format}
          formatDate={formatTimeScaleDate}
          >
            <ViewState defaultCurrentDate={this.state.currentDate} onCurrentDateChange={(e) => this.currentDateChange(e)}/>
            <GroupingState grouping={grouping} />
            <DayView 
            startDayHour={8} 
            endDayHour={21} 
            isShaded={true}
            />
            <Appointments />
            <Resources data={resources} mainResourceName="barberId" />
            <IntegratedGrouping />
            <GroupingPanel />
            <Toolbar />
            <DateNavigator />
            {/* <TodayButton /> */}
          </Scheduler>
        </Paper>
      </div>
    );
  }
}

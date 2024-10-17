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
    };

  }

  render() {
    const {resources, grouping } = this.state;
    const appointment = this.props.appointment;
    console.log("appointment: ", appointment);
   


    return (
      <div>
        <Paper>
          <Scheduler data={appointment}>
            <ViewState defaultCurrentDate="2024-10-11" />
            <GroupingState grouping={grouping} />
            <DayView startDayHour={9} endDayHour={17} />
            <Appointments />
            <Resources data={resources} mainResourceName="barberId" />
            <IntegratedGrouping />
            <GroupingPanel />
            <Toolbar />
            <DateNavigator />
          </Scheduler>
        </Paper>
      </div>
    );
  }
}

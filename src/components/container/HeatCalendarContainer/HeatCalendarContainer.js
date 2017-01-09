// MIT © 2017 azu
"use strict";
const React = require("react");

import HeatCalendar from "react-heat-calendar";

const STYLE = {
    fontWeight: "normal",
    fontSize: "16px"
}

export default class HeatCalendarContainer extends React.Component {
    render() {
        const title = `${this.props.items.length} items in the term`
        const {beginDate, endDate, items} = this.props

        return <div>
            <h2 style={STYLE}>{title}</h2>
            <HeatCalendar data={items} beginDate={beginDate} endDate={endDate}/>
        </div>
    }
}

// MIT © 2017 azu
"use strict";
const React = require("react");
import {DateField} from 'react-date-picker'
require("react-date-picker/index.css");
const moment = require("moment");
export default class DatePickerInputRange extends React.Component {
    render() {
        const onChangeBeginDate = (date) => {
            this.props.onChange({
                beginDate: date,
                endDate: this.props.endDate
            });
        };
        const onChangeEndDate = (date) => {
            this.props.onChange({
                beginDate: this.props.beginDate,
                endDate: date
            });
        };
        return <div className="DatePickerInputRange">
            <DateField
                dateFormat="YYYY-MM-DD"
                defaultValue={moment(this.props.beginDate).format("YYYY-MM-DD")}
                onChange={(dateString, {dateMoment, timestamp}) => {
                    onChangeBeginDate(dateMoment.toDate());
                }}
            />
            <span className="DatePickerInputRange-spacer">〜</span>
            <DateField
                dateFormat="YYYY-MM-DD"
                defaultValue={moment(this.props.endDate).format("YYYY-MM-DD")}
                onChange={(dateString, {dateMoment, timestamp}) => {
                    onChangeEndDate(dateMoment.toDate());
                }}
            />
        </div>
    }
}
DatePickerInputRange.propsType = {
    onChange: React.PropTypes.func,
    beginDate: React.PropTypes.instanceOf(Date),
    endDate: React.PropTypes.instanceOf(Date)
};
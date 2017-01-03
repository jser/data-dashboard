// MIT © 2016 azu
"use strict";
const React = require("react");
const moment = require("moment");
import DatePickerInputRange from "../project/DatePickerInputRange";
import DomainRankingContainer from "./DomainRankingContainer/DomainRankingContainer";
import JSerPostingCountContainer from "./JSerPostingCountContainer/JSerPostingCountContainer";
import ItemCountPerPostContainer from "./ItemCountPerPostContainer/ItemCountPerPostContainer";
export default class App extends React.Component {
    constructor() {
        super();
        this.jserStat = null;
        this.state = {
            beginDate: moment().subtract(1, "years").toDate(),
            endDate: moment().toDate(),
            items: [],
            weeks: []
        };

        this.onChangeDatePicker = ({beginDate, endDate}) => {
            const items = this.jserStat.findItemsBetween(beginDate, endDate);
            const weeks = this.jserStat.findJSerWeeksBetween(beginDate, endDate);
            this.setState({items, weeks, beginDate, endDate});
        }
    }

    componentDidMount() {
        this.jserStat = this.props.value;
        const items = this.jserStat.findItemsBetween(this.state.beginDate, this.state.endDate);
        const weeks = this.jserStat.findJSerWeeksBetween(this.state.beginDate, this.state.endDate);
        this.setState({items, weeks});
    }

    render() {
        return <div className="App">
            <div className="App-inputDates panel panel-default">
                <div className="panel-body">
                    <span className="label label-default">日付:</span>
                    <DatePickerInputRange
                        beginDate={this.state.beginDate}
                        endDate={this.state.endDate}
                        onChange={this.onChangeDatePicker}
                    />
                </div>
            </div>
            <ItemCountPerPostContainer weeks={this.state.weeks} />
            <JSerPostingCountContainer weeks={this.state.weeks} />
            <DomainRankingContainer items={this.state.items}/>
        </div>;
    }
}
App.propTypes = {
    value: React.PropTypes.object
};
// MIT © 2016 azu
"use strict";
const React = require("react");
const moment = require("moment");
const Sticky = require('react-stickynode');
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
            <Sticky enabled={true} top={0} innerZ={1} bottomBoundary={".App-footer"}>
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
            </Sticky>
            <ul className="nav nav-pills">
                <li role="presentation"><a href="#ItemCountPerPostContainer">紹介URL</a></li>
                <li role="presentation"><a href="#DomainRankingContainer">ドメイン</a></li>
                <li role="presentation"><a href="#JSerPostingCountContainer">投稿記事数</a></li>
            </ul>
            <ItemCountPerPostContainer weeks={this.state.weeks}/>
            <DomainRankingContainer items={this.state.items}/>
            <JSerPostingCountContainer weeks={this.state.weeks}/>
            <div className="App-footer"></div>
        </div>;
    }
}
App.propTypes = {
    value: React.PropTypes.object
};
// MIT © 2016 azu
"use strict";
const React = require("react");
const moment = require("moment");
const Sticky = require('react-stickynode');
import DatePickerInputRange from "../project/DatePickerInputRange";
// container
import LastWeekContainer from "./LastWeekContainer/LastWeekContainer";
import TotalItemCountContainer from "./TotalItemCountContainer/TotalItemCountContainer";
import TotalWeekCountContainer from "./TotalWeekCountContainer/TotalWeekCountContainer";
import DomainRankingContainer from "./DomainRankingContainer/DomainRankingContainer";
import TagRankingContainer from "./TagRankingContainer/TagRankingContainer";
import TagStateRankingPerMonthContainer from "./TagStateRankingPerMonthContainer/TagStateRankingPerMonthContainer";
import AverageTagStateRankingPerMonthContainer from "./AverageTagStateRankingPerMonthContainer/AverageTagStateRankingPerMonthContainer";
import JSerPostingCountContainer from "./JSerPostingCountContainer/JSerPostingCountContainer";
import ItemCountPerPostContainer from "./ItemCountPerPostContainer/ItemCountPerPostContainer";
import ItemCountPerYearContainer from "./ItemCountPerYearContainer/ItemCountPerYearContainer";
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
            <header className="App-header">
                <h1>JSer.info Data Dashboard</h1>
                <p><a href="https://jser.info/">JSer.info</a>の統計データを集約したダッシュボード</p>
                <div className="App-index panel panel-default">
                    <h2 className="panel-heading">用語</h2>
                    <div className="panel-body">
                        <dl>
                            <dt>アイテム</dt>
                            <dd>紹介したサイト(URLや関連URLを含め)のことを1アイテムとしています。<a href="https://github.com/jser/stat-js">jser/stat-js</a>を参照</dd>

                            <dt>記事/投稿記事</dt>
                            <dd><a href="https://jser.info/">JSer.info</a>に投稿される1記事のこと。<a
                                href="https://github.com/jser/stat-js">jser/stat-js</a>ではJSerWeekが該当する
                            </dd>
                        </dl>
                    </div>
                </div>
            </header>
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
            <div className="panel panel-default">
                <h2 className="panel-heading">Meta</h2>
                <p>この期間におけるデータです。</p>
                <div className="panel-body">
                    <TotalItemCountContainer items={this.state.items}/>
                    <TotalWeekCountContainer weeks={this.state.weeks}/>
                    <LastWeekContainer weeks={this.state.weeks}/>
                </div>
            </div>
            <ul className="nav nav-pills">
                <li role="presentation"><a href="#ItemCountPerPostContainer">紹介アイテム数</a></li>
                <li role="presentation"><a href="#TagStateRankingPerMonthContainer">タグ(総数)</a></li>
                <li role="presentation"><a href="#AverageTagStateRankingPerMonthContainer">タグ(平均)</a></li>
                <li role="presentation"><a href="#DomainRankingContainer">ドメイン</a></li>
                <li role="presentation"><a href="#JSerPostingCountContainer">投稿記事数</a></li>
            </ul>
            <ItemCountPerYearContainer items={this.state.items}/>
            <ItemCountPerPostContainer weeks={this.state.weeks}/>
            <TagRankingContainer weeks={this.state.weeks}/>
            <TagStateRankingPerMonthContainer weeks={this.state.weeks}/>
            <AverageTagStateRankingPerMonthContainer weeks={this.state.weeks}/>
            <DomainRankingContainer items={this.state.items}/>
            <JSerPostingCountContainer weeks={this.state.weeks}/>
            <div className="App-footer"></div>
        </div>;
    }
}
App.propTypes = {
    value: React.PropTypes.object
};
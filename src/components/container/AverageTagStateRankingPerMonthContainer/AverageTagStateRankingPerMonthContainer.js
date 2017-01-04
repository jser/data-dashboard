// MIT © 2017 azu
"use strict";
const React = require("react");
const url = require("url");
const moment = require("moment");
const countBy = require("lodash.countby");
const sortBy = require("lodash.sortby");
const {compute} = require("jser-stat");
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
require("bootstrap/dist/css/bootstrap.css");
require("react-bootstrap-table/dist/react-bootstrap-table-all.min.css");
export default class AverageTagStateRankingPerMonthContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            sortName: undefined,
            sortOrder: undefined
        };
        this.onSortChange = (sortName, sortOrder) => {
            this.setState({
                sortName,
                sortOrder
            });
        }
    }

    /**
     *
     * @param {JSerWeek[]}weeks
     * @returns {*}
     */
    createDate(weeks) {
        const reverseWeeks = weeks.slice().reverse();
        // 一つもない場合は空のデータを返す
        if (reverseWeeks.length === 0) {
            return [];
        }
        /**
         *
         * @param {Date} aDate
         * @param {Date} bDate
         */
        const isSameYearAndMonth = (aDate, bDate) => {
            return aDate.getFullYear() === bDate.getFullYear() && aDate.getMonth() === bDate.getMonth();
        };
        const currentMonth = reverseWeeks[0].post.date;
        const prevOneMonth = moment(currentMonth).subtract(1, "month").toDate();
        const prevThreeMonth = moment(currentMonth).subtract(3, "month").toDate();
        const prevHalfYearMonth = moment(currentMonth).subtract(6, "month").toDate();
        const prevOneYearMonth = moment(currentMonth).subtract(1, "year").toDate();
        // 月ごとに投稿数は異なるので固定する
        const weekLimit = 4;
        const currentWeek = reverseWeeks.splice(0, weekLimit);
        const prevOneMonthWeek = reverseWeeks.splice(0, weekLimit);
        const prevThreeMonthWeek = reverseWeeks.filter(week => {
            return isSameYearAndMonth(week.post.date, prevThreeMonth);
        }).slice(0, weekLimit);
        const prevHalfYearMonthWeek = reverseWeeks.filter(week => {
            return isSameYearAndMonth(week.post.date, prevHalfYearMonth);
        }).slice(0, weekLimit);
        const prevOneYearWeek = reverseWeeks.filter(week => {
            return isSameYearAndMonth(week.post.date, prevOneYearMonth);
        }).slice(0, weekLimit);
        const currentGroup = currentWeek && compute.countTagsByGroup(currentWeek);
        const prevOneMonthWeekGroup = prevOneMonthWeek && compute.countTagsByGroup(prevOneMonthWeek);
        const prevThreeMonthWeekGroup = prevThreeMonthWeek && compute.countTagsByGroup(prevThreeMonthWeek);
        const prevHalfYearWeekGroup = prevHalfYearMonthWeek && compute.countTagsByGroup(prevHalfYearMonthWeek);
        const prevOneYearWeekGroup = prevOneYearWeek && compute.countTagsByGroup(prevOneYearWeek);
        return sortBy(Object.entries(currentGroup).map((entry, index) => {
            const tag = entry[0];
            const currentCount = entry[1];
            return {
                id: String((index + 1)),
                name: tag,
                "現在": currentCount,
                "一ヶ月前": prevOneMonthWeekGroup[tag] || 0,
                "三ヶ月前": prevThreeMonthWeekGroup[tag] || 0,
                "六ヶ月前": prevHalfYearWeekGroup[tag] || 0,
                "一年前": prevOneYearWeekGroup[tag] || 0
            };
        }).map(item => {
            return {
                id: item.id,
                name: item.name,
                "現在": item["現在"] > 0
                    ? item["現在"] / currentWeek.length : 0,
                "一ヶ月前": item["一ヶ月前"] > 0
                    ? item["一ヶ月前"] / prevOneMonthWeek.length : 0,
                "三ヶ月前": item["三ヶ月前"] > 0
                    ? item["三ヶ月前"] / prevThreeMonthWeek.length : 0,
                "六ヶ月前": item["六ヶ月前"] > 0
                    ? item["六ヶ月前"] / prevHalfYearMonthWeek.length : 0,
                "一年前": item["一年前"] > 0
                    ? item["一年前"] / prevOneYearWeek.length : 0
            };
        }), "現在").reverse();
    }

    render() {
        const data = this.createDate(this.props.weeks);
        const options = {
            sizePerPage: 20,
            sortName: this.state.sortName,
            sortOrder: this.state.sortOrder,
            onSortChange: this.onSortChange
        };
        return <div id="AverageTagStateRankingPerMonthContainer"
                    className="AverageTagStateRankingPerMonthContainer panel panel-default">
            <h2 className="AverageTagStateRankingPerMonthContainer-title panel-heading">Tag数遷移(平均)</h2>
            <p className="panel-body">紹介したアイテムにつけたタグ数の遷移</p>
            <p className="panel-body">投稿した記事で紹介したアイテムにつけたタグの個数の平均を算出(タグ数 / 記事数)</p>
            <BootstrapTable data={data} options={options} pagination exportCSV>
                <TableHeaderColumn dataField="id"
                                   isKey={true}
                                   hidden>ID</TableHeaderColumn>
                <TableHeaderColumn dataField="name" dataSort={true}>タグ名</TableHeaderColumn>
                <TableHeaderColumn dataField="一年前" dataSort={true}>一年前</TableHeaderColumn>
                <TableHeaderColumn dataField="六ヶ月前" dataSort={true}>六ヶ月前</TableHeaderColumn>
                <TableHeaderColumn dataField="三ヶ月前" dataSort={true}>三ヶ月前</TableHeaderColumn>
                <TableHeaderColumn dataField="一ヶ月前" dataSort={true}>一ヶ月前</TableHeaderColumn>
                <TableHeaderColumn dataField="現在" dataSort={true}>現在</TableHeaderColumn>
            </BootstrapTable>,
        </div>
    }
}
AverageTagStateRankingPerMonthContainer.propsType = {
    items: React.PropTypes.arrayOf(React.PropTypes.object)
};
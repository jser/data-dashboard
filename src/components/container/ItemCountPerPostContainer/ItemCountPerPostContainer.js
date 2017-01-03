// MIT © 2017 azu
"use strict";
const React = require("react");
const moment = require("moment");
const countBy = require("lodash.countBy");
const sortBy = require("lodash.sortBy");
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
require("bootstrap/dist/css/bootstrap.css");
require("react-bootstrap-table/dist/react-bootstrap-table-all.min.css");
export default class ItemCountPerPostContainer extends React.Component {
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
        const countByYearMonth = weeks.map(week => {
            return {
                title: week.post.title,
                url: week.post.url,
                beginDate: moment(week.beginDate).format("YYYY-MM-DD"),
                endDate: moment(week.endDate).format("YYYY-MM-DD"),
                itemCount: week.items.length
            };
        });
        return sortBy(countByYearMonth, "beginDate");
    }

    render() {
        const data = this.createDate(this.props.weeks);
        console.log(data);
        const options = {
            sizePerPage: 20,
            sortName: this.state.sortName,
            sortOrder: this.state.sortOrder,
            onSortChange: this.onSortChange
        };
        return <div className="ItemCountPerPostContainer panel panel-default">
            <h2 className="ItemCountPerPostContainer-title panel-heading">JSer.infoの記事 - 紹介したURL数</h2>
            <p className="panel-body">JSer.infoに投稿されてる記事ごとに紹介しているURLのカス</p>
            <BootstrapTable data={data} options={options} pagination exportCSV>
                <TableHeaderColumn dataField="title">URL</TableHeaderColumn>
                <TableHeaderColumn dataField="url" isKey={true}>URL</TableHeaderColumn>
                <TableHeaderColumn dataField="beginDate" dataSort={true}>開始日</TableHeaderColumn>
                <TableHeaderColumn dataField="endDate" dataSort={true}>終了日(投稿日)</TableHeaderColumn>
                <TableHeaderColumn dataField="itemCount" dataSort={true}>紹介URL数</TableHeaderColumn>
            </BootstrapTable>,
        </div>
    }
}
ItemCountPerPostContainer.propsType = {
    weeks: React.PropTypes.arrayOf(React.PropTypes.object)
};
// MIT © 2017 azu
"use strict";
const React = require("react");
const moment = require("moment");
const countBy = require("lodash.countBy");
const sortBy = require("lodash.sortBy");
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
require("bootstrap/dist/css/bootstrap.css");
require("react-bootstrap-table/dist/react-bootstrap-table-all.min.css");
export default class JSerPostingCountContainer extends React.Component {
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
        const countByYearMonth = countBy(weeks, (week) => {
            return moment(week.post.date).format("YYYY-MM");
        });
        return sortBy(Object.entries(countByYearMonth).map((entry, index) => {
            return {
                id: String((index + 1)),
                date: entry[0],
                count: entry[1]
            };
        }), "count").reverse()
    }

    render() {
        const data = this.createDate(this.props.weeks);
        const options = {
            sizePerPage: 20,
            sortName: this.state.sortName,
            sortOrder: this.state.sortOrder,
            onSortChange: this.onSortChange
        };
        return <div className="JSerPostingCountContainer panel panel-default">
            <h2 className="JSerPostingCountContainer-title panel-heading">JSer.infoの記事 - 年月毎の投稿数</h2>
            <p className="panel-body">JSer.infoに投稿されてる記事数を年月別で出したデータ</p>
            <BootstrapTable data={data} options={options} pagination exportCSV>
                <TableHeaderColumn dataField="id"
                                   isKey={true}
                                   dataSort={true}>ID</TableHeaderColumn>
                <TableHeaderColumn dataField="date" dataSort={true}>YYYY-MM</TableHeaderColumn>
                <TableHeaderColumn dataField="count" dataSort={true}>投稿数</TableHeaderColumn>
            </BootstrapTable>,
        </div>
    }
}
JSerPostingCountContainer.propsType = {
    weeks: React.PropTypes.arrayOf(React.PropTypes.object)
};
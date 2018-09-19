// MIT © 2017 azu
import PropTypes from "prop-types";

import * as React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

const moment = require("moment");
const countBy = require("lodash.countby");
const sortBy = require("lodash.sortby");
require("bootstrap/dist/css/bootstrap.css");
require("react-bootstrap-table/dist/react-bootstrap-table-all.min.css");
export default class JSerPostingCountPerYearContainer extends React.Component {
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
        };
    }

    /**
     *
     * @param {JSerWeek[]} weeks
     * @returns {*}
     */
    createDate(weeks) {
        const countByYear = countBy(weeks, week => {
            return moment(week.post.date).format("YYYY");
        });
        return sortBy(
            Object.entries(countByYear).map((entry, index) => {
                return {
                    id: String(index + 1),
                    year: entry[0],
                    count: entry[1]
                };
            }),
            "count"
        ).reverse();
    }

    render() {
        const data = this.createDate(this.props.weeks);
        const options = {
            sizePerPage: 20,
            sortName: this.state.sortName,
            sortOrder: this.state.sortOrder,
            onSortChange: this.onSortChange
        };
        return (
            <div id="ItemCountPerYearContainer" className="ItemCountPerYearContainer panel panel-default">
                <h2 className="ItemCountPerYearContainer-title panel-heading">年ごとに投稿記事数</h2>
                <p className="panel-body">年ごとに投稿した記事数</p>
                <BootstrapTable data={data} options={options} pagination exportCSV>
                    <TableHeaderColumn dataField="year" isKey={true} dataSort={true}>
                        年
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="count" dataSort={true}>
                        投稿記事数
                    </TableHeaderColumn>
                </BootstrapTable>
                ,
            </div>
        );
    }
}
JSerPostingCountPerYearContainer.propsType = {
    weeks: PropTypes.arrayOf(PropTypes.object)
};

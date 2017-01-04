// MIT © 2017 azu
"use strict";
const React = require("react");
const moment = require("moment");
const countBy = require("lodash.countby");
const sortBy = require("lodash.sortby");
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
require("bootstrap/dist/css/bootstrap.css");
require("react-bootstrap-table/dist/react-bootstrap-table-all.min.css");
export default class ItemCountPerYearContainer extends React.Component {
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
     * @param {JSerItem[]} items
     * @returns {*}
     */
    createDate(items) {
        const countByYearMonth = countBy(items, (item) => {
            return moment(item.date).format("YYYY");
        });
        return sortBy(Object.entries(countByYearMonth).map((entry, index) => {
            return {
                id: String((index + 1)),
                year: entry[0],
                count: entry[1]
            };
        }), "year")
    }

    render() {
        const data = this.createDate(this.props.items);
        const options = {
            sizePerPage: 20,
            sortName: this.state.sortName,
            sortOrder: this.state.sortOrder,
            onSortChange: this.onSortChange
        };
        return <div id="ItemCountPerYearContainer" className="ItemCountPerYearContainer panel panel-default">
            <h2 className="ItemCountPerYearContainer-title panel-heading">年ごとのアイテム数</h2>
            <p className="panel-body">年ごとに扱ったアイテムの数</p>
            <BootstrapTable data={data} options={options} pagination exportCSV>
                <TableHeaderColumn dataField="year" isKey={true} dataSort={true}>年</TableHeaderColumn>
                <TableHeaderColumn dataField="count" dataSort={true}>紹介アイテム数</TableHeaderColumn>
            </BootstrapTable>,
        </div>
    }
}
ItemCountPerYearContainer.propsType = {
    weeks: React.PropTypes.arrayOf(React.PropTypes.object)
};
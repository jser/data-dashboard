// MIT © 2017 azu
"use strict";
const React = require("react");
const url = require("url");
const countBy = require("lodash.countby");
const sortBy = require("lodash.sortby");
const {compute} = require("jser-stat");
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
require("bootstrap/dist/css/bootstrap.css");
require("react-bootstrap-table/dist/react-bootstrap-table-all.min.css");
export default class TagRankingContainer extends React.Component {
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

    createDate(weeks) {
        const groupByTag = compute.countTagsByGroup(weeks);
        return sortBy(Object.entries(groupByTag).map((entry, index) => {
            return {
                id: String((index + 1)),
                name: entry[0],
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
        return <div id="TagRankingContainer" className="TagRankingContainer panel panel-default">
            <h2 className="TagRankingContainer-title panel-heading">Tagランキング(合計)</h2>
            <p className="panel-body">紹介したアイテムのタグを合計数でランキング</p>
            <BootstrapTable data={data} options={options} pagination exportCSV>
                <TableHeaderColumn dataField="id"
                                   isKey={true}
                                   hidden>ID</TableHeaderColumn>
                <TableHeaderColumn dataField="name" dataSort={true}>Domain</TableHeaderColumn>
                <TableHeaderColumn dataField="count" dataSort={true}>Count</TableHeaderColumn>
            </BootstrapTable>,
        </div>
    }
}
TagRankingContainer.propsType = {
    items: React.PropTypes.arrayOf(React.PropTypes.object)
};
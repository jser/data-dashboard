// MIT © 2017 azu
"use strict";
const React = require("react");
const url = require("url");
const countBy = require("lodash.countBy");
const sortBy = require("lodash.sortBy");
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
require("bootstrap/dist/css/bootstrap.css");
require("react-bootstrap-table/dist/react-bootstrap-table-all.min.css");
export default class DomainRankingContainer extends React.Component {
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

    createDate(items) {
        const hosts = items.map((item) => {
            const urlObject = url.parse(item.url);
            return urlObject.host;
        });
        const countByHosts = countBy(hosts);
        return sortBy(Object.entries(countByHosts).map((entry, index) => {
            return {
                id: String((index + 1)),
                name: entry[0],
                count: entry[1]
            };
        }), "count").reverse()
    }

    render() {
        const data = this.createDate(this.props.items);
        const options = {
            sizePerPage: 20,
            sortName: this.state.sortName,
            sortOrder: this.state.sortOrder,
            onSortChange: this.onSortChange
        };
        return <div id="DomainRankingContainer" className="DomainRankingContainer panel panel-default">
            <h2 className="DomainRankingContainer-title panel-heading">Domain Ranking</h2>
            <p className="panel-body">紹介した記事のドメイン別ランキング</p>
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
DomainRankingContainer.propsType = {
    items: React.PropTypes.arrayOf(React.PropTypes.object)
};
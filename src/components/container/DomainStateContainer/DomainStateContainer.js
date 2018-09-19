// MIT © 2017 azu
import PropTypes from "prop-types";

import * as React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

const url = require("url");
const moment = require("moment");
const groupBy = require("lodash.groupby");
const countBy = require("lodash.countby");
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
        };
    }

    createDate(items) {
        const itemsByYear = groupBy(items, item => {
            return moment(item.date).format("YYYY");
        });
        /**
         * @type {{year:number, name: string, count: number}}
         */
        let result = [];
        let id = 0;
        Object.entries(itemsByYear).forEach(([year, yearItems]) => {
            const hosts = yearItems.map(item => {
                const urlObject = url.parse(item.url);
                return urlObject.host;
            });
            const countByHosts = countBy(hosts);
            const countByHostsByYear = Object.entries(countByHosts).map((entry, index) => {
                return {
                    id: id++,
                    year: year,
                    name: entry[0],
                    count: entry[1]
                };
            });
            result = result.concat(countByHostsByYear);
        });
        return result;
    }

    render() {
        const data = this.createDate(this.props.items);
        const options = {
            sizePerPage: 20,
            sortName: this.state.sortName,
            sortOrder: this.state.sortOrder,
            onSortChange: this.onSortChange
        };
        return (
            <div id="DomainRankingContainer" className="DomainRankingContainer panel panel-default">
                <h2 className="DomainRankingContainer-title panel-heading">Domain(年ごと)</h2>
                <p className="panel-body">紹介したアイテムの年とドメイン別ランキング</p>
                <BootstrapTable data={data} options={options} pagination exportCSV>
                    <TableHeaderColumn dataField="id" isKey={true} hidden>
                        ID
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="year" dataSort={true}>
                        Year
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="name" dataSort={true}>
                        Domain
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="count" dataSort={true}>
                        Count
                    </TableHeaderColumn>
                </BootstrapTable>
                ,
            </div>
        );
    }
}
DomainRankingContainer.propsType = {
    items: PropTypes.arrayOf(PropTypes.object)
};

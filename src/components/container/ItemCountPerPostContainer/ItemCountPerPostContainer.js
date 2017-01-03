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
                post: {
                    title: week.post.title,
                    url: week.post.url,
                },
                beginDate: moment(week.beginDate).format("YYYY-MM-DD"),
                endDate: moment(week.endDate).format("YYYY-MM-DD"),
                itemCount: week.items.length
            };
        });
        return sortBy(countByYearMonth, "beginDate");
    }

    render() {
        const data = this.createDate(this.props.weeks);
        const options = {
            sizePerPage: 20,
            sortName: this.state.sortName,
            sortOrder: this.state.sortOrder,
            onSortChange: this.onSortChange
        };
        const colFormatter = ({title, url}, row) => {
            return (<a href={url} title={title}>
                {title}
            </a>);
        };
        return <div id="ItemCountPerPostContainer" className="ItemCountPerPostContainer panel panel-default">
            <h2 className="ItemCountPerPostContainer-title panel-heading">紹介したURL数</h2>
            <p className="panel-body">JSer.infoに投稿記事ごとに紹介しているURL数</p>
            <BootstrapTable data={data} options={options} pagination exportCSV>
                <TableHeaderColumn width='600' dataFormat={colFormatter} dataField="post">記事</TableHeaderColumn>
                <TableHeaderColumn dataField="beginDate" isKey={true} dataSort={true}>開始日</TableHeaderColumn>
                <TableHeaderColumn dataField="endDate" dataSort={true}>終了日(投稿日)</TableHeaderColumn>
                <TableHeaderColumn dataField="itemCount" dataSort={true}>紹介URL数</TableHeaderColumn>
            </BootstrapTable>,
        </div>
    }
}
ItemCountPerPostContainer.propsType = {
    weeks: React.PropTypes.arrayOf(React.PropTypes.object)
};
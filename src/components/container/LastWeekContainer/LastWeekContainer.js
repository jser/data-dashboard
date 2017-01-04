// MIT © 2017 azu
"use strict";
const React = require("react");
const moment = require("moment");
export default class LastWeekContainer extends React.Component {
    render() {
        const weeks = this.props.weeks;
        const lastWeek = weeks[weeks.length - 1];
        if (!lastWeek) {
            return <div className="LastWeekContainer">投稿なし</div>;
        }
        const lastDate = moment(lastWeek.post.date).format("YYYY-MM-DD");
        return <div className="LastWeekContainer">
            <p>最後の投稿記事</p>
            <ul>
                <li>日付: {lastDate}
                </li>
                <li>
                    #{lastWeek.weekNumber} <a href={lastWeek.post.url}>{lastWeek.post.title}</a>
                </li>
            </ul>
        </div>
    }
}
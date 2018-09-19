// MIT © 2017 azu
import * as React from "react";
export default class TotalWeekCountContainer extends React.Component {
    render() {
        return <div className="TotalWeekCountContainer">合計記事数: {this.props.weeks.length}</div>;
    }
}

// MIT © 2017 azu
"use strict";
const React = require("react");
export default class TotalItemCountContainer extends React.Component {
    render() {
        return <div className="TotalItemCountContainer">
            合計紹介URL数: {this.props.items.length}
        </div>
    }
}
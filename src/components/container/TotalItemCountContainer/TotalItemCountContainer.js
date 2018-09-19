// MIT © 2017 azu
import * as React from "react";
export default class TotalItemCountContainer extends React.Component {
    render() {
        return <div className="TotalItemCountContainer">合計紹介アイテム数: {this.props.items.length}</div>;
    }
}

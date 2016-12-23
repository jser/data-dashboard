// MIT © 2016 azu
"use strict";
const React = require("react");
import DomainRanking from "./DomainRanking/DomainRanking";
export default class App extends React.Component {
    render() {
        const stat = this.props.value;
        const items = stat.items;
        return <DomainRanking items={items} />
    }
}
App.propTypes = {
    value: React.PropTypes.object
};
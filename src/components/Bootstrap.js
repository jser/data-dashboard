// MIT © 2016 azu
import fetchJSerStat from "./utils/fetch-jser";
import LoadingContainer from "./ui-kit/LoadingContainer/LoadingContainer";
import App from "./container/App";

import * as React from "react";
const Loading = LoadingContainer({
    Success: App,
    Failure: <div>FAIL Load</div>
});
export default class Bootstrap extends React.Component {
    render() {
        const promise = fetchJSerStat();
        return <Loading promise={promise}>Loading JSer.info data...</Loading>;
    }
}

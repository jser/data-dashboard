// MIT © 2016 azu
import * as React from "react";
import * as ReactDOM from "react-dom";
import Bootstrap from "./components/Bootstrap.js";

function requireAll(r) {
    r.keys().forEach(r);
}

require("babel-polyfill");
requireAll(require.context("./", true, /\.css$/));
ReactDOM.render(<Bootstrap />, document.getElementById("root"));

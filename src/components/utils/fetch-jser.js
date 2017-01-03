// MIT © 2016 azu
"use strict";
const JSerStat = require("jser-stat").JSerStat.default;
function fetchURL(URL) {
    return new Promise(function (resolve, reject) {
        const req = new XMLHttpRequest();
        req.open('GET', URL);
        req.onload = function () {
            if (req.status >= 200 && req.status < 300) {
                resolve(JSON.parse(req.response));
            } else {
                reject(Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(Error(req.statusText));
        };
        req.send();
    });
}
function fetchData() {
    if (process.env.NODE_ENV !== 'production') {
        return new Promise((resolve) => {
            resolve([
                require("jser-stat/data/posts"),
                require("jser-stat/data/items")
            ])
        });
    } else {
        return Promise.all([
            fetchURL("https://jser.info/posts.json"),
            fetchURL("https://jser.info/source-data/items.json")
        ]);
    }
}
export default function fetchStat() {
    if (fetchStat._jSerStat) {
        return Promise.resolve(fetchStat._jSerStat);
    }
    return fetchData().then(function (results) {
        const posts = results[0];
        const items = results[1];
        const jSerStat = new JSerStat(items, posts);
        fetchStat._jSerStat = jSerStat;
        return jSerStat;
    });
}
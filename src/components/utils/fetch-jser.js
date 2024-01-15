// MIT © 2016 azu
import { JSerStat } from "@jser/stat";

function fetchURL(URL) {
    return fetch(URL).then(function(response) {
        if (!response.ok) {
            throw new Error(`fetch error: ${URL}`);
        }
        return response.json();
    });
}

function fetchData() {
    return Promise.all([
        fetchURL("https://jser.info/posts.json"),
        fetchURL("https://jser.info/source-data/items.json")
    ]);
}

export default function fetchStat() {
    if (fetchStat._jSerStat) {
        return Promise.resolve(fetchStat._jSerStat);
    }
    return fetchData().then(function(results) {
        const posts = results[0];
        const items = results[1];
        const jSerStat = new JSerStat(items, posts);
        fetchStat._jSerStat = jSerStat;
        return jSerStat;
    });
}

// MIT © 2016 azu
"use strict";
const React = require("react");
const Plotly = require("plotly.js");
const url = require("url");
const countBy = require("lodash.countBy");
export default class DomainRanking extends React.Component {
    componentDidMount() {
        const items = this.props.items;
        const hosts = items.map((item) => {
            const urlObject = url.parse(item.url);
            return urlObject.host;
        });
        const countByHosts = countBy(hosts);
        const data = [
            {
                type: 'bar',
                x: Object.values(countByHosts),
                y: Object.keys(countByHosts),
                orientation: 'h'
            }

        ];

        const layout = {
            title: 'Votes cast for ten lowest voting age population in OECD countries',
            xaxis: {
                showgrid: false,
                showline: true,
                linecolor: 'rgb(102, 102, 102)',
                titlefont: {
                    font: {
                        color: 'rgb(204, 204, 204)'
                    }
                },
                tickfont: {
                    font: {
                        color: 'rgb(102, 102, 102)'
                    }
                },
                autotick: false,
                dtick: 10,
                ticks: 'outside',
                tickcolor: 'rgb(102, 102, 102)'
            },
            margin: {
                l: 140,
                r: 40,
                b: 50,
                t: 80
            },
            legend: {
                font: {
                    size: 10,
                },
                yanchor: 'middle',
                xanchor: 'right'
            },
            width: 600,
            height: 600,
            paper_bgcolor: 'rgb(254, 247, 234)',
            plot_bgcolor: 'rgb(254, 247, 234)',
            hovermode: 'closest'
        };
        Plotly.newPlot('DomainRanking', data, layout);
    }


    render() {
        return <div id="DomainRanking" style={{
            width: 480,
            height: 1500
        }}/>
    }
}
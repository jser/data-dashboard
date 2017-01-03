const path = require("path");

module.exports = {
    entry: [
        "./src/index.js"
    ],
    devtool: process.env.WEBPACK_DEVTOOL || "source-map",
    output: {
        path: path.join(__dirname, "public", "build"),
        publicPath: "/build/",
        filename: "bundle.js"
    },
    node: {
        fs: "empty",
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.css/,
                loaders: ['style-loader', 'css-loader']
            },
            {test: /\.svg$/, loader: 'url-loader?mimetype=image/svg+xml'},
            {test: /\.woff$/, loader: 'url-loader?mimetype=application/font-woff'},
            {test: /\.woff2$/, loader: 'url-loader?mimetype=application/font-woff'},
            {test: /\.eot$/, loader: 'url-loader?mimetype=application/font-woff'},
            {test: /\.ttf$/, loader: 'url-loader?mimetype=application/font-woff'}
        ]
    },
    performance: {hints: false}
};

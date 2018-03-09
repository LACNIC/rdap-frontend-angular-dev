module.exports = {
    server: {
        middleware: {
            // overrides the second middleware default with new settings
            1: require('connect-history-api-fallback')({ verbose: false, rewrites: [
                {
                    from: /^\/ip\/.*$/,
                to: '/'
            }] })
        },
        baseDir: "./src",
        routes: {
            "/node_modules": "node_modules"
        }
    }
};

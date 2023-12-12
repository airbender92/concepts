module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json']
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, loader: "ts-loader"},
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: 'pre', test: /\.js/, loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows brwosers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
}
/**
 * 理想情况下，我们只需要在浏览器里引入React模块，
 * 但是大部分浏览器还没有支持模块。 因此大部分代码库会把自己包裹在一个单独的全局变量内，
 * 比如：jQuery或_。 这叫做“命名空间”模式，
 * webpack也允许我们继续使用通过这种方式写的代码库。 
 * 通过我们的设置"react": "React"，
 * webpack会神奇地将所有对"react"的导入转换成从React全局变量中加载。
 */
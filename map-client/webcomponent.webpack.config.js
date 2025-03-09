const path = require('path');

module.exports = {
    entry: './src/WebComponentWrapper.tsx', // Path to your main TypeScript/React file
    output: {
        filename: 'nahal-oz-map-web-component.js',
        path: path.resolve(__dirname, '../public/dist/map'), // Output directory
        library: 'SupplySandboxWebComponent', // Set library name for exposing the Web Component globally
        libraryTarget: 'umd', // Set library target as UMD
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    module: {
        rules:  [
            {
                test: /\.(j|t)sx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript', // Add TypeScript preset
                        ],
                    },
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]', // Keep original file name and extension
                            outputPath: 'images/', // Output directory for images
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};

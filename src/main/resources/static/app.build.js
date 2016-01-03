({
    appDir: "public",
    baseUrl: ".",
    dir: "dist",
    //Comment out the optimize line if you want
    //the code minified by UglifyJS
    optimize: "uglify",

    mainConfigFile: 'public/main.js',

    packages: ["welcome"],

    modules: [
        //Optimize the require-jquery.js file by applying any minification
        //that is desired via the optimize: setting above.
        {
            name: "main"
        }
    ]
})

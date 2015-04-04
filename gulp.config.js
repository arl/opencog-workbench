module.exports = function() {


    var client = './src/client/';
    var server = './src/server/';

    var clientApp = client + 'app/';
    var clientContent = client + 'content/';
    var report = './report/';
    var build = './build/';
    var api = '/api';
    var bower = {
        dir: './bower_components/'
    };


    var data = '/../../data/';    

  var config =  {

    client: client,
    server: server,
    api: api,
    data: data,
    test: client + 'test/',
    html: client + '**/*.html/',
    htmltemplates: clientApp + '**/*.html/',
    vendorjs: [
      bower.dir + "jquery/dist/jquery.min.js",
      bower.dir + "angular/angular.min.js",
      bower.dir + "angular-animate/angular-animate.min.js",
      bower.dir + "angular-route/angular-route.min.js",
      bower.dir + "angular-sanitize/angular-sanitize.min.js",
      bower.dir + "bootstrap/dist/js/bootstrap.min.js",
      bower.dir + "toastr/toastr.min.js",
      bower.dir + "moment/min/moment.min.js",
      bower.dir + "extras.angular.plus/ngplus-overlay.js",
      clientContent + "lib/js/ui-bootstrap-0.12.1.min.js",
      clientContent + "lib/js/ui-bootstrap-tpls-0.12.1.min.js"
    ],
    vendorcss: [
      bower.dir + "bootstrap/dist/css/bootstrap.min.css",
      bower.dir + "font-awesome/css/font-awesome.min.css",
      bower.dir + "toastr/toastr.css"
    ],
    css: [
      clientContent + "customtheme.css",
      clientContent + "styles.css"
    ],
    js: [
      clientApp + "**/*module*.js",
      clientApp + "**/*.js",
      '!' + clientApp + "**/*-spaghetti.js"
    ],
    specs: [
      client + "test/specs/*.spec.js"
    ],
    nodejs: [
      server + "**/*.js"
    ],
    fonts: [
      bower.dir + "font-awesome/fonts/**/*.*"
    ],
    images: [
      clientContent + "images/**/*"
    ],
    report: report,
    build: build

  }

  return config;

}



// {
//   "client": "./src/client/",
//   "server": "./src/server/",
//   "api": "/api",
//   "data": "/../../data/",
//   "test": "./src/client/test/",
//   "html": "./src/client/**/*.html",
//   "htmltemplates": "./src/client/app/**/*.html",
//   "vendorjs": [
//     "./bower_components/jquery/dist/jquery.min.js",
//     "./bower_components/angular/angular.min.js",
//     "./bower_components/angular-animate/angular-animate.min.js",
//     "./bower_components/angular-route/angular-route.min.js",
//     "./bower_components/angular-sanitize/angular-sanitize.min.js",
//     "./bower_components/bootstrap/dist/js/bootstrap.min.js",
//     "./bower_components/toastr/toastr.min.js",
//     "./bower_components/moment/min/moment.min.js",
//     "./bower_components/extras.angular.plus/ngplus-overlay.js",
//     "./src/client/content/lib/js/ui-bootstrap-0.12.1.min.js",
//     "./src/client/content/lib/js/ui-bootstrap-tpls-0.12.1.min.js"
//   ],
//   "vendorcss": [
//     "./bower_components/bootstrap/dist/css/bootstrap.min.css",
//     "./bower_components/font-awesome/css/font-awesome.min.css",
//     "./bower_components/toastr/toastr.css"
//   ],
//   "css": [
//     "./src/client/content/css/customtheme.css",
//     "./src/client/content/css/styles.css"
//   ],
//   "js": [
//     "./src/client/app/**/*module*.js",
//     "./src/client/app/**/*.js",
//     "!./src/client/app/**/*-spaghetti.js"
//   ],
//   "specs": [
//     "./src/client/test/specs/*.spec.js"
//   ],
//   "nodejs": [
//     "./src/server/**/*.js"
//   ],
//   "fonts": [
//     "./bower_components/font-awesome/fonts/**/*.*"
//   ],
//   "images": [
//     "./src/client/content/images/**/*"
//   ],
//   "report": "./report/",
//   "build": "./build/"
// }





// module.exports = function() {
//     var client = './src/client/';
//     var server = './src/server/';
//     var clientApp = client + 'app/';
//     var report = './report/';
//     var root = './';
//     var specRunnerFile = 'specs.html';
//     var temp = './.tmp/';
//     var wiredep = require('wiredep');
//     var bowerFiles = wiredep({devDependencies: true})['js'];
//     var bower = {
//         json: require('./bower.json'),
//         directory: './bower_components/',
//         ignorePath: '../..'
//     };
//     var nodeModules = 'node_modules';

//     var config = {
//         /**
//          * File paths
//          */
//         // all javascript that we want to vet
//         alljs: [
//             './src/**/*.js',
//             './*.js'
//         ],
//         build: './build/',
//         client: client,
//         css: temp + 'styles.css',
//         fonts: bower.directory + 'font-awesome/fonts/**/*.*',
//         html: client + '**/*.html',
//         htmltemplates: clientApp + '**/*.html',
//         images: client + 'images/**/*.*',
//         index: client + 'index.html',
//         // app js, with no specs
//         js: [
//             clientApp + '**/*.module.js',
//             clientApp + '**/*.js',
//             '!' + clientApp + '**/*.spec.js'
//         ],
//         jsOrder: [
//             '**/app.module.js',
//             '**/*.module.js',
//             '**/*.js'
//         ],
//         less: client + 'styles/styles.less',
//         report: report,
//         root: root,
//         server: server,
//         source: 'src/',
//         stubsjs: [
//             bower.directory + 'angular-mocks/angular-mocks.js',
//             client + 'stubs/**/*.js'
//         ],
//         temp: temp,

//         /**
//          * optimized files
//          */
//         optimized: {
//             app: 'app.js',
//             lib: 'lib.js'
//         },

//         /**
//          * plato
//          */
//         plato: {js: clientApp + '**/*.js'},

//         /**
//          * browser sync
//          */
//         browserReloadDelay: 1000,

//         /**
//          * template cache
//          */
//         templateCache: {
//             file: 'templates.js',
//             options: {
//                 module: 'app.core',
//                 root: 'app/',
//                 standAlone: false
//             }
//         },

//         /**
//          * Bower and NPM files
//          */
//         bower: bower,
//         packages: [
//             './package.json',
//             './bower.json'
//         ],

//         /**
//          * specs.html, our HTML spec runner
//          */
//         specRunner: client + specRunnerFile,
//         specRunnerFile: specRunnerFile,

//         *
//          * The sequence of the injections into specs.html:
//          *  1 testlibraries
//          *      mocha setup
//          *  2 bower
//          *  3 js
//          *  4 spechelpers
//          *  5 specs
//          *  6 templates
         
//         testlibraries: [
//             nodeModules + '/mocha/mocha.js',
//             nodeModules + '/chai/chai.js',
//             nodeModules + '/mocha-clean/index.js',
//             nodeModules + '/sinon-chai/lib/sinon-chai.js'
//         ],
//         specHelpers: [client + 'test-helpers/*.js'],
//         specs: [clientApp + '**/*.spec.js'],
//         serverIntegrationSpecs: [client + '/tests/server-integration/**/*.spec.js'],

//         /**
//          * Node settings
//          */
//         nodeServer: './src/server/app.js',
//         defaultPort: '7203'
//     };

//     /**
//      * wiredep and bower settings
//      */
//     config.getWiredepDefaultOptions = function() {
//         var options = {
//             bowerJson: config.bower.json,
//             directory: config.bower.directory,
//             ignorePath: config.bower.ignorePath
//         };
//         return options;
//     };

//     /**
//      * karma settings
//      */
//     config.karma = getKarmaOptions();

//     return config;

//     ////////////////

//     function getKarmaOptions() {
//         var options = {
//             files: [].concat(
//                 bowerFiles,
//                 config.specHelpers,
//                 clientApp + '**/*.module.js',
//                 clientApp + '**/*.js',
//                 temp + config.templateCache.file,
//                 config.serverIntegrationSpecs
//             ),
//             exclude: [],
//             coverage: {
//                 dir: report + 'coverage',
//                 reporters: [
//                     // reporters not supporting the `file` property
//                     {type: 'html', subdir: 'report-html'},
//                     {type: 'lcov', subdir: 'report-lcov'},
//                     // reporters supporting the `file` property, use `subdir` to directly
//                     // output them in the `dir` directory.
//                     // omit `file` to output to the console.
//                     // {type: 'cobertura', subdir: '.', file: 'cobertura.txt'},
//                     // {type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt'},
//                     // {type: 'teamcity', subdir: '.', file: 'teamcity.txt'},
//                     //{type: 'text'}, //, subdir: '.', file: 'text.txt'},
//                     {type: 'text-summary'} //, subdir: '.', file: 'text-summary.txt'}
//                 ]
//             },
//             preprocessors: {}
//         };
//         options.preprocessors[clientApp + '**/!(*.spec)+(.js)'] = ['coverage'];
//         return options;
//     }
// };
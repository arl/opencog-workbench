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
      bower.dir + "angular-ui-router/release/angular-ui-router.min.js",
      bower.dir + "angular-sanitize/angular-sanitize.min.js",
      bower.dir + "toastr/toastr.min.js",
      bower.dir + "moment/min/moment.min.js",
      bower.dir + "extras.angular.plus/ngplus-overlay.js",
      bower.dir + "underscore/underscore.js",
      clientContent + "lib/js/ui-bootstrap-tpls-0.12.1.min.js",
      clientContent + "lib/js/angular-underscore.js"
    ],
    vendorcss: [
      bower.dir + "bootstrap/dist/css/bootstrap.min.css",
      bower.dir + "font-awesome/css/font-awesome.min.css",
      bower.dir + "toastr/toastr.css"
    ],
    tmpcss: clientContent + ".tmpcss/",
    scss: {
      files : [ 
        clientContent + "styles/**/*.scss"
      ],
      entrypoint : clientContent + "styles/styles.scss"
    },
    js: [
      clientApp + "**/*module*.js",
      clientApp + "**/*.js"
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
module.exports = function() {

    var server = './src/server/';

    var client = './src/client/';
    var clientApp = client + 'app/';
    var clientContent = client + 'content/';
		var imagesDir = clientContent + "images/";

    var report = './report/';
    var build = './build/';
    var bower = {
        dir: './bower_components/'
    };

	var config =  {

		client: client,
		server: server,
		test: client + 'test/',
		html: client + '**/*.html/',
		htmltemplates: clientApp + '**/*.html/',
		nodejs: server + "**/*.js",

		/* javascript */
		vendorjs: [
		  bower.dir + "jquery/dist/jquery.min.js",
		  bower.dir + "jquery-ui/jquery-ui.min.js",
		  bower.dir + "angular/angular.min.js",
		  bower.dir + "angular-animate/angular-animate.min.js",
		  bower.dir + "angular-sanitize/angular-sanitize.min.js",
		  bower.dir + "angular-ui-router/release/angular-ui-router.min.js",
		  bower.dir + "ui-router-extras/release/modular/ct-ui-router-extras.core.min.js",
		  bower.dir + "ui-router-extras/release/modular/ct-ui-router-extras.sticky.min.js",
		  bower.dir + "toastr/toastr.min.js",
		  bower.dir + "moment/min/moment.min.js",
		  bower.dir + "extras.angular.plus/ngplus-overlay.js",
		  bower.dir + "underscore/underscore-min.js",
		  bower.dir + "angular-dragdrop/src/angular-dragdrop.min.js",
		  bower.dir + "ngstorage/ngStorage.min.js",
		  bower.dir + "jquery.terminal/js/jquery.terminal-min.js",            
		  clientContent + "lib/js/ui-bootstrap-tpls-0.12.1.min.js",
		  clientContent + "lib/js/angular-underscore.js"
		],
		js: [
		  clientApp + "**/*module*.js",
		  clientApp + "**/*.js"
		],
		specs: client + "test/specs/*.spec.js",
		
		/* styles */
		vendorcss: [
		  bower.dir + "bootstrap/dist/css/bootstrap.min.css",
		  bower.dir + "font-awesome/css/font-awesome.min.css",
		  bower.dir + "toastr/toastr.css",
		  bower.dir + "jquery.terminal/css/jquery.terminal.css"
		],
		tmpcss: clientContent + ".tmpcss/",
		scss: {
		  files : clientContent + "styles/**/*.scss",
		  entrypoint : clientContent + "styles/styles.scss"
		},

		/* workbench components */
		components: {
		  styles : clientApp + "components/*/assets/styles/**/*.scss",
		  images : clientApp + "components/*/assets/images/**/*.*"
		},

		/* assets */
		fonts: [
		  bower.dir + "font-awesome/fonts/**/*.*"
		],
		images: imagesDir + "**/*",
		imagesDir : imagesDir,
		report: report,
		build: build,

		/* doc generation */
		doc: {
			output: './doc',
			title: 'Workbench Doc',
			startPage: '/overview',
			sections : {
				'overview' : {
					title: 'Overview', 
					api: false,
					glob: [
						client + 'app/*.ngdoc'
					]
				},
				'workbench': {
					title: 'API Documentation',
					api: true,
					glob: [
						clientApp + '**/*.js',
						clientApp + "**/*module*.js",
						'!' + clientApp + 'components/**/*.*'
						]
				},				
				'exampleComponent' : {
					title: 'Example Component', 
					api: false,
					glob: [
						clientApp + 'components/dummy/**/*.*'
					]
				}
			}
		}
  }

  return config;

}

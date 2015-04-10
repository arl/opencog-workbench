/* jshint camelcase:false */
var gulp = require('gulp');
var browserSync = require('browser-sync');
var del = require('del');
var glob = require('glob');
var karma = require('karma').server;
var merge = require('merge-stream');
var config = require('./gulp.config.js')();
var plato = require('plato');
var gutil = require('gulp-util');
var chalk = require('chalk');
var plug = require('gulp-load-plugins')();

//var colors = chalk;
var env = plug.util.env;
var log = plug.util.log;
var port = process.env.PORT || 7203;


// create 2 browser-sync instances
var bsClient = browserSync.create("bsClient");
var bsKarmaRpt = browserSync.create("bsKarmaRpt");

/**
 * List the available gulp tasks
 */
gulp.task('help', plug.taskListing);
gulp.task('default', ['welcome', 'help']);

gulp.task('welcome', function() {

    var ocpic = Array('',
'                                à"^``    ``"²ì',
'                                Ñ            ╫',
'                              =ª^             `"%═ ',
'                           ="                      ª═ ',
'                    =ªª«%%                           `≈%ª¬ª,',
'                   Θ              -r²\'````"²%─             `═',
'                  ╝            -²              ²=           `═',
'                 ò           .²     .=o%«a=.     ╙,          ².',
'                .Ñ          .^    ╓M        "»    ²>          ╫',
'                :╗          ▒    ╔            ▒    ╠         .╝',
'                   "H       ╡    ▒            ╚    j       ▒`',
'                    ▒       ▒    ╚            ╩    ╠       ▒',
'                    ╠       `.    ^═²       ╓º    ,M      .`',
'                     ▒       `w     `²«>∞«²`     ╓┘       ╝',
'                     `N        ^=              -²        ╝',
'                      ╔\'          ^%=..  ..=≥²           9',
'                     ó`                                  ╚┐',
'                     `î.                                ╓M',
'                       `ª┬                            ="',
'                          "9╥. .à``"¬ªª%ªªª"\'`"=  .»M`',
'                              "`                "`').join('\n');

    // WELCOME MESSAGE
    gutil.log(chalk.blue.bold(ocpic));
    gutil.log(chalk.red.bold('Welcome to the ocWorkbench development server'));

    // TODO
    gutil.log(chalk.yellow('TODO'), 'gulpfile.js : add comments to the tasks');
    gutil.log(chalk.yellow('TODO'), 'layout : USE TABS OPEN COMPONENTS (SUB-WEBAPP\'s) AND FASTER SWITCHING');
    gutil.log(chalk.yellow('TODO'), 'Get rid of bootstrap.js (since its not needed for angular-ui-bootstrap)');


    // DESIGN IDEAS
    gutil.log('idea', 'a simple HELP or WIKI module linking to OpenCog wiki pages for example');

    gutil.log(chalk.yellow('BUG'), 'busy.gif is show in dev but not in build mode');
    log('normal log')
});


/**
 * Lint the code, create coverage report, and a visualizer
 * @return {Stream}
 */
gulp.task('analyze', function() {
    log('Analyzing source with JSHint, JSCS, and Plato');

    var jshint = analyzejshint([].concat(config.js, config.specs, config.nodejs));
    var jscs = analyzejscs([].concat(config.js, config.nodejs));

    startPlatoVisualizer();

    return merge(jshint, jscs);
});

/**
 * Create $templateCache from the html templates
 * @return {Stream}
 */
gulp.task('templatecache', function() {
    log('Creating an AngularJS $templateCache');

    return gulp
        .src(config.htmltemplates)
        // .pipe(plug.bytediff.start())
        .pipe(plug.minifyHtml({
            empty: true
        }))
        // .pipe(plug.bytediff.stop(bytediffFormatter))
        .pipe(plug.angularTemplatecache('templates.js', {
            module: 'app.core',
            standalone: false,
            root: 'app/'
        }))
        .pipe(gulp.dest(config.build + 'js/'));
});

/**
 * Minify and bundle the app's JavaScript
 * @return {Stream}
 */
gulp.task('js', ['analyze', 'templatecache'], function() {
    log('Bundling, minifying, and copying the app\'s JavaScript');

    var source = [].concat(config.js, config.build + 'js/templates.js');
    return gulp
        .src(source)
        .pipe(plug.concat('all.min.js'))
        .pipe(plug.ngAnnotate({
            add: true,
            single_quotes: true
        }))
        .pipe(plug.bytediff.start())
        .pipe(plug.uglify({
            mangle: true
        }))
        .pipe(plug.bytediff.stop(bytediffFormatter))
        .pipe(gulp.dest(config.build + 'js/'));
});

/**
 * Copy the Vendor JavaScript
 * @return {Stream}
 */
gulp.task('vendorjs', function() {
    log('Bundling, minifying, and copying the Vendor JavaScript');

    return gulp.src(config.vendorjs)
        .pipe(plug.concat('vendor.min.js'))
        .pipe(plug.bytediff.start())
        .pipe(plug.uglify())
        .pipe(plug.bytediff.stop(bytediffFormatter))
        .pipe(gulp.dest(config.build + 'js/'));
});


/**
 * Watch SCSS
 * @return {Stream}
 */
gulp.task('scss-watcher', function() {
    log('Watching for SCSS file changes');

    // watch and compile into css
    gulp.watch([config.scss.files], ['scss']);
});


/**
 * Compile SCSS into CSS
 * @return {Stream}
 */
gulp.task('scss', function() {
    log('Compiling SCSS --> CSS');

    return gulp
        .src(config.scss.entrypoint)
        .pipe(plug.plumber()) // exit gracefully if something fails after this
        .pipe(plug.sass())
        .on('error', errorLogger) // more verbose and dupe output. requires emit.
        .pipe(plug.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(plug.rename('all.css'))
        .pipe(gulp.dest(config.tmpcss))

//        .pipe(plug.autoprefixer('last 2 version', '> 5%'))
        .pipe(plug.bytediff.start())
        .pipe(plug.minifyCss({}))
        .pipe(plug.bytediff.stop(bytediffFormatter))
        .pipe(plug.rename('all.min.css'))
        .pipe(gulp.dest(config.build + 'css/'));    

});


/**
 * Remove all styles from the build and temp folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-styles', function(done) {
    var files = [].concat(
        config.tmpcss + '*.css',
        config.build + 'content/**/*.css'
    );
    clean(files, done);
});


/**
 * Minify and bundle the Vendor CSS
 * @return {Stream}
 */
gulp.task('vendorcss', function() {
    log('Compressing, bundling, copying vendor CSS');

    var vendorFilter = plug.filter(['**/*.css']);

    return gulp.src(config.vendorcss)
        .pipe(vendorFilter)
        .pipe(plug.concat('vendor.min.css'))
        .pipe(plug.bytediff.start())
        .pipe(plug.minifyCss({}))
        .pipe(plug.bytediff.stop(bytediffFormatter))
        .pipe(gulp.dest(config.build + 'css/'));
});

/**
 * Inject minified files into the new index.html
 * @return {Stream}
 */
gulp.task('inject', ['js', 'vendorjs', 'scss', 'vendorcss'], function() {
    log('Injecting minified files into index.html');

    var minifiedJs = config.build + 'js/**/*.min.*';
    var minifiedCss = config.build + 'css/**/*.min.*';
    var index = config.client + 'index.html';
    var minJsFilter = plug.filter(['**/*.min.js']);
    var minCssFilter = plug.filter(['**/*.min.css', '!**/*.map']);
    var indexFilter = plug.filter(['index.html']);

    var stream = gulp
    
        .src([].concat(minifiedJs, minifiedCss, index)) // add all built min files and index.html

        .pipe(minJsFilter)                              // filter the stream to minified js
            .pipe(gulp.dest(config.build + 'js/'))      // write minified js
        .pipe(minJsFilter.restore())                    // remove filter, back to original stream

        .pipe(minCssFilter)                             // filter the stream to minified css
            .pipe(gulp.dest(config.build + 'css/'))     // write minified css
        .pipe(minCssFilter.restore())                   // remove filter, back to original stream

        // inject the files into index.html
        .pipe(indexFilter)
        .pipe(inject('css/vendor.min.css', 'inject-vendor'))
            .pipe(inject('css/all.min.css'))
            .pipe(inject('js/vendor.min.js', 'inject-vendor'))
            .pipe(inject('js/all.min.js'))
            .pipe(gulp.dest(config.build))
        .pipe(indexFilter.restore());

    function inject(path, name) {
        var pathGlob = config.build + path;
        var options = {
            ignorePath: config.build.substring(1),
            read: false
        };
        if (name) {
            options.name = name;
        }
        return plug.inject(gulp.src(pathGlob), options);
    }
});

/**
 * Copy fonts
 * @return {Stream}
 */
gulp.task('fonts', function() {
    var dest = config.build + 'fonts/';
    log('Copying fonts');
    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(dest));
});

/**
 * Compress images
 * @return {Stream}
 */
gulp.task('images', function() {
    var dest = config.build + 'images/';
    log('Compressing, caching, and copying images');
    return gulp
        .src(config.images)
        .pipe(plug.cache(plug.imagemin({
            optimizationLevel: 3
        })))
        .pipe(gulp.dest(dest));
});


/**
 * Build the optimized app
 * @return {Stream}
 */
gulp.task('build', ['inject', 'images', 'fonts'], function() {
    log('Building the optimized app');

    return gulp.src('').pipe(plug.notify({
        onLast: true,
        message: 'Deployed code!'
    }));
});


/**
 * Remove all files from the build folder
 * One way to run clean before all tasks is to run
 * from the cmd line: gulp clean && gulp build
 * @return {Stream}
 */
gulp.task('clean', function(cb) {
    log('Cleaning: ' + chalk.blue(config.build));

    var delPaths = [].concat(config.build, config.report);
    del(delPaths, cb);
});

/**
 * Watch files and build
 */
gulp.task('watch', function() {
    log('Watching all files');

    var css = ['gulpfile.js'].concat(config.css, config.vendorcss);
    var images = ['gulpfile.js'].concat(config.images);
    var js = ['gulpfile.js'].concat(config.js);

    gulp
        .watch(js, ['js', 'vendorjs'])
        .on('change', logWatch);

    gulp
        .watch(css, ['scss', 'vendorcss'])
        .on('change', logWatch);

    gulp
        .watch(images, ['images'])
        .on('change', logWatch);

    function logWatch(event) {
        log('*** File ' + event.path + ' was ' + event.type + ', running tasks...');
    }
});

/**
 * Run specs once and exit
 * To start servers and run midway specs as well:
 *    gulp test --startServers
 * @return {Stream}
 */
gulp.task('test', function(done) {
    startTests(true /*singleRun*/ , done);
});

/**
 * Run specs and wait.
 * Watch for file changes and re-run tests on each change
 * To start servers and run midway specs as well:
 *    gulp autotest --startServers
 */
gulp.task('autotest', function(done) {
    startTests(false /*singleRun*/ , done);
});

/**
 * serve the dev environment, with debug,
 * and with node inspector
 */
gulp.task('serve-dev-debug', function() {
    serve({
        mode: 'dev',
        debug: '--debug'
    });
});

/**
 * serve the dev environment, with debug-brk,
 * and with node inspector
 */
gulp.task('serve-dev-debug-brk', function() {
    serve({
        mode: 'dev',
        debug: '--debug-brk'
    });
});

/**
 * serve the dev environment
 */
gulp.task('serve-dev', ['scss', 'scss-watcher'], function() {
    serve({
        mode: 'dev'
    });
});

/**
 * build and serve the build environment
 */
gulp.task('serve-build', ['build', 'scss-watcher'], function() {
    serve({
        mode: 'build'
    });
});

////////////////

/**
 * Execute JSHint on given source files
 * @param  {Array} sources
 * @param  {String} overrideRcFile
 * @return {Stream}
 */
function analyzejshint(sources, overrideRcFile) {
    var jshintrcFile = overrideRcFile || './.jshintrc';
    log('Running JSHint');
    log(sources);
    return gulp
        .src(sources)
        .pipe(plug.jshint(jshintrcFile))
        .pipe(plug.jshint.reporter('jshint-stylish'));
}

/**
 * Execute JSCS on given source files
 * @param  {Array} sources
 * @return {Stream}
 */
function analyzejscs(sources) {
    log('Running JSCS');
    return gulp
        .src(sources)
        .pipe(plug.jscs('./.jscsrc'));
}

/**
 * Start the node server using nodemon.
 * Optionally start the node debugging.
 * @param  {Object} args - debugging arguments
 */
function serve(args) {
    var options = {
        script: config.server + 'app.js',
        delayTime: 1,
        env: {
            'NODE_ENV': args.mode,
            'PORT': port
        },
        watch: [config.server]
    };

    var exec;
    if (args.debug) {
        log('Running node-inspector. Browse to http://localhost:8080/debug?port=5858');
        exec = require('child_process').exec;
        exec('node-inspector');
        options.nodeArgs = [args.debug + '=5858'];
    }

    return plug.nodemon(options)
        .on('start', function() {
            startBrowserSync(args.mode == 'dev');
        })
        //.on('change', tasks)
        .on('restart', function() {
            log('restarted!');
            setTimeout(function () {
                bsClient.reload({ stream: false });
            }, 1000);
        });
}

/**
 * Start BrowserSync
 */
function startBrowserSync(isDev) {

    if(bsClient.active) {
        return;
    }

    log('Starting BrowserSync on port ' + port);

    // places some watches before starting the browser
    if (isDev) {
         
        // in dev mode: watch only scss files
        gulp.watch([config.scss.files],

            // => on change: only compile scss to css 
            // (browser-sync handles reload)
            ['scss']

        ).on('change', changeEvent);

    } else {
        
        gulp.watch(
            // watch everything that can change
            [config.scss.files, config.js, config.html],

            // => trigger the whole min/inject process on change
            ['inject',

            // => restart browser-sync
            bsClient.reload]

        ).on('change', changeEvent);
    }

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: isDev ? [
            config.client + '**/*.*',
            config.tmpcss + '*.css',
            '!' + config.scss.files,
            '!' + config.test + '**/*.*'
        ] : [config.build + '**/*.*'],
        ghostMode: { // these are the defaults t,f,t,t
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'warn',
        logPrefix: 'ocWorkbench',
        notify: true,
        reloadDelay: 1000
    };

    bsClient.init(options);
}

/**
 * When files change, log it
 * @param  {Object} event - event that fired
 */
function changeEvent(event) {
    log('File ' + event.path + ' ' + event.type);
}

/**
 * Start Plato inspector and visualizer
 */
function startPlatoVisualizer() {
    log('Running Plato');

    var files = glob.sync('./src/client/app/**/*.js');
    var excludeFiles = /\/src\/client\/app\/.*\.spec\.js/;

    var options = {
        title: 'Plato Inspections Report',
        exclude: excludeFiles
    };
    var outputDir = './report/plato';

    plato.inspect(files, outputDir, options, platoCompleted);

    function platoCompleted(report) {
        var overview = plato.getOverviewReport(report);
        log(overview.summary);
    }
}

/**
 * Start the tests using karma.
 * @param  {boolean} singleRun - True means run once and end (CI), or keep running (dev)
 * @param  {Function} done - Callback to fire when karma is done
 * @return {undefined}
 */
function startTests(singleRun, done) {
    var child;
    var excludeFiles = [];
    var fork = require('child_process').fork;

    if (env.startServers) {
        log('Starting servers');
        var savedEnv = process.env;
        savedEnv.NODE_ENV = 'dev';
        savedEnv.PORT = 8888;
        child = fork('src/server/app.js', childProcessCompleted);
    } else {
        excludeFiles.push('./src/client/test/midway/**/*.spec.js');
    }


    // in autotest mode, karma tests reports are auto-reloaded
    if (!singleRun) {

         bsKarmaRpt.init({
                server: {
                    baseDir: './report/karma/',
                    directory: true
                },
                ghostMode: false,
                logLevel: 'info',
                logPrefix: 'ocWorkbench-test',
            });

        gulp.watch('./report/karma/**/*.html').on("change", bsKarmaRpt.reload);
    }

    karma.start({
        configFile: __dirname + '/karma.conf.js',
        exclude: excludeFiles,
        singleRun: !!singleRun
    }, karmaCompleted);

    ////////////////

    function childProcessCompleted(error, stdout, stderr) {
        log('stdout: ' + stdout);
        log('stderr: ' + stderr);
        if (error !== null) {
            log('exec error: ' + error);
        }
    }

    function karmaCompleted() {
        if (child) {
            child.kill();
        }
        done();
    }
}

/**
 * Log an error message and emit the end of a task
 */
function errorLogger(error) {
    log('*** Start of Error ***');
    log(error);
    log('*** End of Error ***');
    this.emit('end');
}

/**
 * Delete all files in a given path
 * @param  {Array}   path - array of paths to delete
 * @param  {Function} done - callback when complete
 */
function clean(path, done) {
    log('Cleaning: ' + chalk.blue(path));
    del(path, done);
}

/**
 * Formatter for bytediff to display the size changes after processing
 * @param  {Object} data - byte data
 * @return {String}      Difference in bytes, formatted
 */
function bytediffFormatter(data) {
    var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
    return data.fileName + ' went from ' +
        (data.startSize / 1000).toFixed(2) + ' kB to ' + (data.endSize / 1000).toFixed(2) + ' kB' +
        ' and is ' + formatPercent(1 - data.percent, 2) + '%' + difference;
}

/**
 * Format a number as a percentage
 * @param  {Number} num       Number to format as a percent
 * @param  {Number} precision Precision of the decimal
 * @return {String}           Formatted percentage
 */
function formatPercent(num, precision) {
    return (num * 100).toFixed(precision);
}

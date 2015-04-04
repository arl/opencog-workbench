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
var plug = require('gulp-load-plugins')();
var reload = browserSync.reload;

var colors = plug.util.colors;
var env = plug.util.env;
var log = plug.util.log;
var port = process.env.PORT || 7203;

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
    gutil.log(gutil.colors.cyan(ocpic));
    gutil.log(gutil.colors.green('Welcome to the ocWorkbench development server'));

    // TODO
    gutil.log(gutil.colors.yellow('TODO'));
    gutil.log(gutil.colors.yellow('TODO'), 'gulpfile.js : add comments to the tasks');
    gutil.log(gutil.colors.yellow('TODO'), 'gulpfile.js/css : reload css files with browser-sync in serve-dev mode for fast styling');
    gutil.log(gutil.colors.yellow('TODO'), 'gulpfile.js/css : see an example here : https://gist.github.com/DESIGNfromWITHIN/11383339');
    gutil.log(gutil.colors.yellow('TODO'), 'gulpfile.js/sass : add sass compiling, example in previous line');
    gutil.log(gutil.colors.yellow('TODO'), 'layout : add menu with controller in topnav, menu items coming from the modules, like the routes are already doing using routehelper.js');
    gutil.log(gutil.colors.yellow('TODO'), 'layout : USE TABS OPEN COMPONENTS (SUB-WEBAPP\'s) AND FASTER SWITCHING');


    // DESIGN IDEAS
    gutil.log('idea design', 'I NEED TO UNDERSTAND WHERE THE CONNECTION IS DONE BETWEEN THE MODULES and THE HTML (shell or index.html?)');
    gutil.log('idea design', 'an HELP or WIKI module linking to OpenCog wiki pages for example');


    gutil.log('BUGS', 'busy.gif is show in dev but not in build mode');


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
        .pipe(gulp.dest(config.build));
});

/**
 * Minify and bundle the app's JavaScript
 * @return {Stream}
 */
gulp.task('js', ['analyze', 'templatecache'], function() {
    log('Bundling, minifying, and copying the app\'s JavaScript');

    var source = [].concat(config.js, config.build + 'templates.js');
    return gulp
        .src(source)
        // .pipe(plug.sourcemaps.init()) // get screwed up in the file rev process
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
        // .pipe(plug.sourcemaps.write('./'))
        .pipe(gulp.dest(config.build));
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
        .pipe(gulp.dest(config.build));
});

/**
 * Minify and bundle the CSS
 * @return {Stream}
 */
gulp.task('css', function() {
    log('Bundling, minifying, and copying the app\'s CSS');

    return gulp.src(config.css)
        .pipe(plug.concat('all.min.css')) // Before bytediff or after
        .pipe(plug.autoprefixer('last 2 version', '> 5%'))
        .pipe(plug.bytediff.start())
        .pipe(plug.minifyCss({}))
        .pipe(plug.bytediff.stop(bytediffFormatter))
        //        .pipe(plug.concat('all.min.css')) // Before bytediff or after
        .pipe(gulp.dest(config.build + 'content'));
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
        .pipe(gulp.dest(config.build + 'content'));
});

/**
 * Copy fonts
 * @return {Stream}
 */
gulp.task('fonts', function() {
    var dest = config.build + 'fonts';
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
    var dest = config.build + 'content/images';
    log('Compressing, caching, and copying images');
    return gulp
        .src(config.images)
        .pipe(plug.cache(plug.imagemin({
            optimizationLevel: 3
        })))
        .pipe(gulp.dest(dest));
});

/**
 * Inject all the files into the new index.html
 * rev, but no map
 * @return {Stream}
 */
gulp.task('rev-and-inject', ['js', 'vendorjs', 'css', 'vendorcss'], function() {
    log('Rev\'ing files and building index.html');

    var minified = config.build + '**/*.min.*';
    var index = config.client + 'index.html';
    var minFilter = plug.filter(['**/*.min.*', '!**/*.map']);
    var indexFilter = plug.filter(['index.html']);

    var stream = gulp
        // Write the revisioned files
        .src([].concat(minified, index)) // add all built min files and index.html
        .pipe(minFilter) // filter the stream to minified css and js
        .pipe(plug.rev()) // create files with rev's
        .pipe(gulp.dest(config.build)) // write the rev files
        .pipe(minFilter.restore()) // remove filter, back to original stream

    // inject the files into index.html
    .pipe(indexFilter) // filter to index.html
    .pipe(inject('content/vendor.min.css', 'inject-vendor'))
        .pipe(inject('content/all.min.css'))
        .pipe(inject('vendor.min.js', 'inject-vendor'))
        .pipe(inject('all.min.js'))
        .pipe(gulp.dest(config.build)) // write the rev files
    .pipe(indexFilter.restore()) // remove filter, back to original stream

    // replace the files referenced in index.html with the rev'd files
    .pipe(plug.revReplace()) // Substitute in new filenames
    .pipe(gulp.dest(config.build)) // write the index.html file changes
    .pipe(plug.rev.manifest()) // create the manifest (must happen last or we screw up the injection)
    .pipe(gulp.dest(config.build)); // write the manifest

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
 * Build the optimized app
 * @return {Stream}
 */
gulp.task('build', ['rev-and-inject', 'images', 'fonts'], function() {
    log('Building the optimized app');

    return gulp.src('').pipe(plug.notify({
        onLast: true,
        message: 'Deployed code!'
    }));
});

/**
 * Backwards compatible call to make stage and build equivalent
 */
gulp.task('stage', ['build'], function() {});

/**
 * Remove all files from the build folder
 * One way to run clean before all tasks is to run
 * from the cmd line: gulp clean && gulp build
 * @return {Stream}
 */
gulp.task('clean', function(cb) {
    log('Cleaning: ' + plug.util.colors.blue(config.build));

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
        .watch(css, ['css', 'vendorcss'])
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
gulp.task('serve-dev', function() {
    serve({
        mode: 'dev'
    });
});

/**
 * serve the build environment
 */
gulp.task('serve-build', function() {
    serve({
        mode: 'build'
    });
});

/**
 * Backwards compatible call to make stage and build equivalent
 */
gulp.task('serve-stage', ['serve-build'], function() {});

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
 * @return {Stream}
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
                browserSync.reload({ stream: false });
            }, 1000);
        });
}

/**
 * Start BrowserSync
 */
function startBrowserSync(isDev) {

log('to make autoreload work on the dev server, look line 502 of gulpfile.js.johnpapa.gulp-patterns.js');
log('to make autoreload work on the dev server, look line 502 of gulpfile.js.johnpapa.gulp-patterns.js');
log('to make autoreload work on the dev server, look line 502 of gulpfile.js.johnpapa.gulp-patterns.js');
log('to make autoreload work on the dev server, look line 502 of gulpfile.js.johnpapa.gulp-patterns.js');

    if(/*!env.browserSync ||*/ browserSync.active) {
        return;
    }

    log('Starting BrowserSync on port ' + port);
    log('env.browserSync :' + env.browserSync);


    // If build: watches the files, builds, and restarts browser-sync.
    // If dev: watches less, compiles it to css, browser-sync handles reload
    // if (isDev) {
    //     log('Settings watches on : ' + paths.css.join(','));
    //     gulp.watch(paths.css/*, ['styles']*/)
    //         .on('change', changeEvent);
    // }/* else {
    /*    gulp.watch([config.less, config.js, config.html], ['optimize', browserSync.reload])
            .on('change', changeEvent);
    }*/

    // If build: watches the files, builds, and restarts browser-sync.
    // If dev: watches less, compiles it to css, browser-sync handles reload
    if (isDev) {
        // gulp.watch([config.less], ['styles'])
        //     .on('change', changeEvent);
        //
        //
        //     browser-sync watches everything and handles reload
        //
        //
    } else {
        // gulp.watch([config.less, config.js, config.html], ['optimize', browserSync.reload])
        //     .on('change', changeEvent);
        gulp.watch([config.client + '/**/*.css', config.js, config.html], ['optimize', browserSync.reload])
            .on('change', changeEvent);
    }

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: isDev ? [
            config.client + '**/*.*'/*,
            '!' + config.less,
            // config.temp + '**.css'
            //*/
        ] : [],
        ghostMode: { // these are the defaults t,f,t,t
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'warn',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0 //1000
    };

    browserSync(options);
}

/**
 * When files change, log it
 * @param  {Object} event - event that fired
 */
function changeEvent(event) {
    // originla code from gulp-patterns
    // var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    // log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);

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
    var excludeFiles = ['./src/client/app/**/*spaghetti.js'];
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

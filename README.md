#OpenCog Workbench

**the doc is still in progress...**

## Install dependencies
refer to [INSTALL.md](./INSTALL.md) 

## How to run OpenCog Workbench?
Type ```gulp build```  to generate an optimized build.
Then ```gulp serve-build``` and browse to http://localhost:7200

## How to hack OpenCog Workbench?

### Running the development environment
Type `gulp serve-dev` and browse to `http://localhost:7200`

### Application Structure
	/build	(created on the fly with gulp build)
	/src
		/client
			/app
			    /components	 (location of workbench modules)
			/content
			/test
 	/report		(various reports)
	

### Dev Builds
The dev build does not optimize the deployed code. It simply runs it in place. You can run a dev build in multiple ways.

####Option 1 - Serve
Type `gulp serve-dev` and browse to `http://localhost:7200`

####Option 2 - Serve and Debug Node
Type `gulp serve-dev-debug` and browse to `http://localhost:7200` for the client and `http://localhost:8080/debug?port-5858` to debug the server.

####Option 3 - Serve and Debug Node Breaking on 1st Line
Type `gulp serve-dev-debug-brk` and browse to `http://localhost:7200` for the client and `http://localhost:8080/debug?port-5858` to debug the server.

### Staging Build
The staging build is an optimized build. Type `gulp serve-stage` and browse to `http://localhost:7200`

The optimizations are performed by the gulp tasks and include the following list. See the `gulpfile.js` for details

- jshint
- preparing Angular's templatecache for html templates
- concat task to bundle css and js, separately
- Angular dependency injection annotations using ngAnnotate
- uglify to minify javascript
- css autoprefixer for vendor prefixes
- minify css
- optimize images
- index.html injection for scripts and links
- deploying all js, css, images, fonts, and index.html

## How It Works
Every component in ```src/client/app/components``` add its own route and set of menus to the workbench


### The Modules
The app has 4 feature modules and depends on a series of external modules and custom but cross-app modules


## core Module
Core modules are ones that are shared throughout the entire application. Example might be common data services.

This is an aggregator of modules that the application will need. The `core` module takes the blocks, common, and Angular sub-modules as dependencies. 

## blocks Modules
Block modules are reusable blocks of code that can be used across projects simply by including them as dependencies.

### blocks.logger Module
The `blocks.logger` module handles logging across the Angular app.

### blocks.exception Module
The `blocks.exception` module handles exceptions across the Angular app.

It depends on the `blocks.logger` module, because the implementation logs the exceptions.

### blocks.router Module
The `blocks.router` module contains a routing helper module that assists in adding routes to the $routeProvider.

### Testing
Type `gulp test` to run the tests once. 
`gulp autotest` creates a watch on the files, running the tests on each save

Testing uses karma, mocha, chai, sinon, ngMidwayTester libraries.

### Issues 


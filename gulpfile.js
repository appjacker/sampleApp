var gulp = require('gulp'),
	minifycss = require('gulp-minify-css'),										// for minifying the css
	concat = require('gulp-concat'),													// concatinating the resources both js and css
	uglify = require('gulp-uglify'),													// minifying the js files. triggered only in 'deploy' task below
	clean = require('gulp-clean'),														// removing files from a directory
	jshint = require('gulp-jshint'),													// check the validity of js files
	stylish = require('jshint-stylish'),											// to display the jshint messages in a human readable format with line number and file name
	templateCache = require('gulp-angular-templatecache'),		// to cache angular.js templates
	htmlmin = require('gulp-htmlmin'),												// to minify html templates
	ngmin = require('gulp-ng-annotate'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer');
	rename = require('gulp-rename');


// Setting up the js, css, fonts, templates and images src n destination directories.
// Follows ng-boilerplate directory structure by default.
// Change the variables below to suit for project needs.
var options = new function() {
	
	this.PARTIALS_SRC = 'app/js/**/*.tpl',
	this.ANGULAR_MODULE_NAME = 'app',

	this.FONTS_SRC = 'app/assets/fonts/**/*',
	this.IMAGES_SRC = 'app/assets/images/**/*',
	this.JS_SRC_DEV = ['app/assets/js/**/*.js', 'app/js/app.js', 'app/js/**/*.js', 'app/profiles/dev/**/*.js'],
	// this.JS_SRC_PROD = ['public/libs/js/**/*.js', 'public/js/app.js', 'public/js/**/*.js', 'public/profiles/prod/**/*.js',  '!public/libs/js/sails.io.js'],
	// this.JS_SRC_UAT = ['public/libs/js/**/*.js', 'public/js/app.js', 'public/js/**/*.js', 'public/profiles/uat/**/*.js',  '!public/libs/js/sails.io.js'],  
	// this.JS_SRC_LOCAL = ['public/libs/js/**/*.js', 'public/js/app.js', 'public/js/**/*.js', 'public/profiles/local/**/*.js',  '!public/libs/js/sails.io.js'],      // ,'assets/profiles/dev/*.js' 0 index must be vendor libs for convention sake
	    // ,'assets/profiles/dev/*.js' 0 index must be vendor libs for convention sake
	this.CSS_SRC = ['app/assets/css/**/*.css'], // 0 index must be vendor libs for convention sake
	// this.SASS_SRC = ['app/sass/**/*.sass', 'app/sass/**/*.scss'],

	//this.DIST_SRC = '.tmp/public/includes/',	// specific to sails-starter-project. change to suit your project needs.
	
	this.DIST_SRC = 'app/includes/',
	this.PARTIALS_DEST = 'app/includes/templates',
	this.FONTS_DEST = this.DIST_SRC + '/fonts',
	this.IMAGES_DEST = this.DIST_SRC + '/images',
	this.JS_DEST = this.DIST_SRC + '/js',
	this.CSS_DEST = this.DIST_SRC + '/css',

	this.JS_DEST_NAME = 'app.min.js',
	this.CSS_DEST_NAME = 'app.min.css',
	this.TEMPLATES_DEST_NAME = 'templates.js'										
};

gulp.task('template-cache', function () {
	return gulp.src(options.PARTIALS_SRC)
		.pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
		.pipe(templateCache(options.TEMPLATES_DEST_NAME, {standalone: true}))
		.pipe(gulp.dest(options.PARTIALS_DEST));
});

gulp.task('fonts', function() {
	return gulp.src(options.FONTS_SRC)
		.pipe(gulp.dest(options.FONTS_DEST));
});

gulp.task('imgs', function() {
	return gulp.src(options.IMAGES_SRC)
		.pipe(gulp.dest(options.IMAGES_DEST));
});

gulp.task('jshint', function() {
	return gulp.src(options.JS_SRC_DEV.concat( '!' + options.JS_SRC_DEV[0] )					// excluding vendor libs from lint checking
			.concat( '!' + options.PARTIALS_DEST + '/**/*.js'))										// excluding angular templates from lint checking
		.pipe(jshint( {globals:{angular: true}} ))															// adding angular to global scope to avoid angular not found errors in lint
		.pipe(jshint.reporter(stylish));
});

gulp.task('uglify', function() {
  return gulp.src(options.JS_SRC_PROD)
  		.pipe(concat(options.JS_DEST_NAME))
    	.pipe(uglify({mangle: false}).on('error', function(e){
            console.log(e);
         }))
    	.pipe(gulp.dest(options.JS_DEST));
});

gulp.task('js', ['jshint', 'template-cache', 'uglify'], function() {
	return gulp.src(options.JS_SRC_PROD)
		.pipe(ngmin())
		.pipe(uglify())
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest(options.JS_DEST));
});

// not minifying the files for debugging purposes.
gulp.task('js-dev', ['jshint'], function() {
	return gulp.src(options.JS_SRC_DEV)
		.pipe(concat(options.JS_DEST_NAME))
		.pipe(gulp.dest(options.JS_DEST));
});

// gulp.task('js-dev-local', ['jshint', 'template-cache'], function() {
// 	return gulp.src(options.JS_SRC_LOCAL)
// 		.pipe(concat(options.JS_DEST_NAME))
// 		.pipe(gulp.dest(options.JS_DEST));
// });

// gulp.task('js-dev-uat', ['jshint', 'template-cache'], function() {
// 	return gulp.src(options.JS_SRC_UAT)
// 		.pipe(concat(options.JS_DEST_NAME))
// 		.pipe(gulp.dest(options.JS_DEST));
// });

// gulp.task('compile-sass', function () {
//     var stream = gulp.src(options.SASS_SRC) // path to your file
//     .pipe(concat('app.all.scss'))
//     .pipe(sass())
//     .pipe(gulp.dest('app/css/sass'));
//     return stream;
// });

gulp.task('css', [], function() {
	return gulp.src(options.CSS_SRC)
		.pipe(concat(options.CSS_DEST_NAME))
		.pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
		.pipe(minifycss())
		.pipe(gulp.dest(options.CSS_DEST));
});

// not minifying the files for debugging purposes.


gulp.task('css-dev', [], function() {
	return gulp.src(options.CSS_SRC)
		.pipe(concat(options.CSS_DEST_NAME))
		.pipe(autoprefixer({ cascade: false }))
		.pipe(gulp.dest(options.CSS_DEST));
});

gulp.task('clean', function() {
	return gulp.src([options.DIST_SRC + '/*']
			.concat(options.PARTIALS_DEST + '/*'), {read: false})
		.pipe(clean( {force: true} ));
});

gulp.task('deploy', ['fonts', 'imgs', 'js', 'css']);
// gulp.task('uat', ['fonts', 'imgs', 'js-dev-uat', 'css']);
// gulp.task('dev', ['fonts', 'imgs', 'js-dev', 'css']);

gulp.task('default', ['fonts', 'imgs', 'js-dev', 'css-dev'], function() {
	gulp.watch(options.FONTS_SRC, ['fonts']);
	gulp.watch(options.IMAGES_SRC, ['imgs']);
	gulp.watch(options.JS_SRC_DEV, ['js-dev']);
	gulp.watch(options.CSS_SRC, ['css-dev']);
	gulp.watch(options.PARTIALS_SRC, ['template-cache']);
});

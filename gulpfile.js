Gulp = {
	self        : null,
	browsersync : null,
	uglify      : null,
	cssmin      : null,
	init: function(){
		Gulp.self        = require('gulp');
		Gulp.browsersync = require('browser-sync');
		Gulp.uglify      = require('gulp-uglify');
		Gulp.cssmin      = require('gulp-cssmin');
		Gulp.browser_sync();
		Gulp.js();
		Gulp.css();
		Gulp.watch();
		Gulp.default();
	},
	browser_sync: function(){
		Gulp.self.task('browser_sync', function(){
			console.log('[BrowserSync] Started');
			return Gulp.browsersync(
			{
				server: {
					baseDir : './public',
					index   : 'index.html'
				}
			});
		});
	},
	css: function(){
		Gulp.self.task('css', function(){
			console.log('[CSS] Minificando Arquivos CSS');
			Gulp.self.src('public/assets/css/src/**/*.css')
			.pipe(Gulp.cssmin())
			.pipe(Gulp.self.dest('public/assets/css/dist'));
		});
	},
	js: function(){
		Gulp.self.task('js', function(){
			console.log('[JS] Minificando Arquivos JavaScript');
			Gulp.self.src(['public/js/src/**/*.js', '!js/dist/**'])
			.pipe(Gulp.uglify())
			.pipe(Gulp.self.dest('public/js/dist'))
		});
	},
	default: function(){
		console.log('[GULP] Default Command');
		Gulp.self.task('default', ['browser_sync', 'watch']);
	},
	watch: function(){
		Gulp.self.task('watch', function(){
			console.log('[GULP] Watch Command');
			Gulp.self.watch('public/**', Gulp.browsersync.reload);
			Gulp.self.watch('public/js/**/*.js', ['js']);
			Gulp.self.watch('public/assets/css/src/**', ['css']);
		});
	}
}
Gulp.init();
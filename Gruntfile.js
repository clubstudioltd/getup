module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'dist/css/getup.css': 'src/sass/getup.scss'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },
            no_dest: {
                src: 'dist/css/**/*.css'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'dist/js/getup.min.js': [
                        'dist/js/getup.js'
                    ]
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            uglify: {
                files: ['src/js/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            },
            sass: {
                files: ['src/sass/**/*.{scss,sass}'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            },
            autoprefixer: {
                files: ['dist/css/*.css'],
                tasks: ['autoprefixer'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['sass', 'autoprefixer', 'uglify']);
};

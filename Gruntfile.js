module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'vendor/bower_components/',
                        src: [
                            'jquery/dist/jquery.min.js',
                            'html5shiv/dist/html5shiv.min.js'
                        ],
                        dest: 'dist/js/vendor/'
                    }
                ]
            }
        },
        sass: {
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'dist/css/getup.css': 'assets/sass/getup.scss'
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
                files: ['assets/js/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            },
            sass: {
                files: ['assets/sass/**/*.{scss,sass}'],
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
    grunt.registerTask('build', ['copy', 'sass', 'autoprefixer', 'uglify']);
};

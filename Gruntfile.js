module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'css/main.css': 'css/sass/main.scss',
                    'css/responsive.css': 'css/sass/responsive.scss'
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'public/assets/js/main.min.js': [
                    ]
                }
            }
        },
        imagemin: {
            static: {
                options: {
                    opimizationLevel: 3
                }
            },
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'public/assets/img/_src',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'public/assets/img/'
                }]
            },
            options: {
                cache: false
            }
        },
        watch: {
            uglify: {
                files: ['js/*.js', '!js/*.min.js'],
                tasks: ['uglify']
            },
            sass: {
                files: ['css/**/*.scss'],
                tasks: ['sass']
            },
            imagemin: {
                files: ['img/_src/**/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '*.html',
                    'css/*.css'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
}

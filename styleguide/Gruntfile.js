module.exports = function(grunt) {

    // All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // CONCATENATE SASS & CSS FILES
        concat: {
            palm: {
                src: ['scss/base/**/*.palm.scss', 'scss/components/**/*.palm.scss'],
                dest: 'scss/tmp/palm.scss'
            },
            lap: {
                src:  ['scss/base/**/*.lap.scss', 'scss/components/**/*.lap.scss'],
                dest: 'scss/tmp/lap.scss',
                options: {
                    banner: '@media screen and (min-width:768px){',
                    footer: '}'
                }
            },
            desk: {
                src: ['scss/base/**/*.desk.scss', 'scss/components/**/*.desk.scss'],
                dest: 'scss/tmp/desk.scss',
                options: {
                    banner: '@media screen and (min-width:1024px){',
                    footer: '}'
                }
            },
            concat_css: {
                src: [
                        'css/vendor/normalize.css',
                        'css/vendor/skeleton.css',
                        'css/tmp/palm.css',
                        'css/tmp/lap.css',
                        'css/tmp/desk.css'
                ],
                dest: 'css/theme.css'
            }
        },

        // COMPILE SASS TO CSS
        sass: {                                    
            palm: {                                
                files: {
                    'css/tmp/palm.css': 'scss/tmp/palm.scss'
                }
            },
            lap: {                               
                files: {
                    'css/tmp/lap.css': 'scss/tmp/lap.scss'
                }
            },
            desk: {
                files: {
                    'css/tmp/desk.css': 'scss/tmp/desk.scss'
                }
            }

        },

        // WATCH
        watch: {
            sass: {
                files: ['Gruntfile.js', 'template.hbs', 'js/*.js', 'scss/**/*.scss'],
                tasks: ['default']
            }
        },
        
          debug: {
            options: {}
          },

    });

    // Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-sass');    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-debug-task');

    // Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', [
        'concat:palm', 'concat:lap', 'concat:desk',
        'sass',
        'concat:concat_css',
        'watch'
    ]);    

};
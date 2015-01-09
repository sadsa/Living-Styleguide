module.exports = function(grunt) {

    // All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // STYLEGUIDE
        sassdown: {
            styleguide: {
                options: {
                    assets: ['css/main.min.css'],
                    theme: 'styleguide/css/theme.css',
                    scripts: ['styleguide/js/*.js'],
                    template: 'styleguide/template.hbs',                    
                    excludeMissing: true
                },
                files: [{
                    expand: true,
                    cwd: 'scss/',
                    src: ['components/*.scss'],
                    dest: 'styleguide/'
                }]
            }
        },         
        
        // CONCATENATE SASS & CSS FILES
        concat: {
            palm: {
                src: ['scss/components/*.palm.scss', 'scss/base/*.palm.scss'],
                dest: 'scss/tmp/palm.scss'
            },
            lap: {
                src:  'scss/components/*.lap.scss',
                dest: 'scss/tmp/lap.scss',
                options: {
                    banner: '@media screen and (min-width:768px){',
                    footer: '}'
                }
            },
            desk: {
                src: 'scss/components/*.desk.scss',
                dest: 'scss/tmp/desk.scss',
                options: {
                    banner: '@media screen and (min-width:1024px){',
                    footer: '}'
                }
            },
            concat_css: {
                src: [
                        'scss/vendor/bootstrap/bootstrap.css',
                        'css/tmp/palm.css',
                        'css/tmp/lap.css',
                        'css/tmp/desk.css'
                ],
                dest: 'css/main.css'
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

        // MINIFY CSS   
        cssmin: {
            my_target: {
                    src: 'css/main.css',
                    dest: 'css/main.min.css'
            }
        },    

        // WATCH
        watch: {
            sass: {
                files: ['Gruntfile.js', 'scss/**/*.scss', 'scss/*.scss'],
                tasks: [
                    'concat:palm', 'concat:lap', 'concat:desk',
                    'sass',
                    'concat:concat_css',
                    'cssmin',
                    'sassdown'
                ]
            }
        }

    });

    // Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-sass');    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('sassdown');

    // Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', [
        'concat:palm', 'concat:lap', 'concat:desk',
        'sass',
        'concat:concat_css',
        'cssmin',
        'sassdown',
        'watch'
    ]);
    
    grunt.registerTask('styleguide', ['sassdown']);

};
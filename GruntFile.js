module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            beforeconcat: ['src/<%= pkg.name %>.js', 'test/tests.js'],
            afterconcat: ['<%= pkg.name %>.js'],
            options: {
                expr:true, sub:true, supernew:true, debug:true, node:true, 
                boss:true, devel:true, evil:true, laxcomma:true, eqnull:true, 
                undef:true, unused:true, browser:true, jquery:true, maxerr:100
            }
        },
        concat: {
            options: {
                banner: '/*!'
                    + '\n * <%= pkg.name %> <%= pkg.version %>+<%= grunt.template.today("UTC:yyyymmddHHMM") %>'
                    + '\n * <%= pkg.homepage %>'
                    + '\n * MIT License 2013 <%= pkg.author %>'
                    + '\n */\n\n'
            },
            build: {
                files: {
                    '<%= pkg.name %>.js': ['src/<%= pkg.name %>.js']
                }
            }
        },
        uglify: {
            options: {
                preserveComments: 'some',
            },
            build: {
                files: {
                    '<%= pkg.name %>.min.js': ['<%= pkg.name %>.js']
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    // Type `grunt` on the command line to run.
    grunt.registerTask('default', ['jshint:beforeconcat', 'concat', 'jshint:afterconcat', 'uglify']);
};
module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-tslint");

  var packageJson = grunt.file.readJSON("package.json");
  var tsconfigFile = grunt.file.readJSON("tsconfig.json");

  grunt.initConfig({
    name: packageJson.name,
    version: packageJson.version,
    all: [
      "./app/*.ts",
      "./app/**/*.ts",
      "./app/**/**/*.ts",
      "./app/*.tsx",
      "./app/**/*.tsx",
      "./app/**/**/*.tsx",
      "./typings.d.ts"
    ],
    skipTests: ["<%= all %>", "!tests/**/*.ts"],
    staticTestFiles: ["tests/**/*.{html,css,json,xml}"],

    ts: {
      options: tsconfigFile.compilerOptions,
      dev: {
        src: ["<%= all %>"]
      },
      dist: {
        options: {
          inlineSourceMap: true,
          inlineSources: true
        },
        outDir: "dist",
        src: ["<%= skipTests %>"]
      }
    },

    tslint: {
      options: {
        configuration: "tslint.json",
        force: true,
        fix: false
      },
      src: {
        src: [
          "<%= all %>",
          "!typings/*.ts",
          "!typings/**/*.ts",
          "!tests/typings/**/*.ts"
        ]
      }
    },

    watch: {
      grunt: {
        options: {
          reload: true
        },
        files: ["Gruntfile.js"]
      },
      src: {
        options: {
          atBegin: true
        },
        files: ["<%= all %>", "<%= staticTestFiles %>"],
        tasks: [
          "dev"
        ]
      }
    }
  });

  grunt.registerTask("dev", [
    "tslint",
    "ts:dev"
  ]);

};


module.exports = {
    default: {
        tags: process.env.npm_config_tags || "",
        formatOptions: {
            snippetInterface: "async-await",
            specDirectory: 'src/test/features/**/*.feature'
        },
        paths: [
            "src/test/features/**/*.feature"
        ],
        publishQuiet: false,
        dryRun: false,
        require: [
            "src/test/steps/*.ts",
            "src/hooks/hooks.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            ['./report.js']
            
        ],
        parallel: 2
    },
}
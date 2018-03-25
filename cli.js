const
    app = require('./app'),
    yargs = require('yargs')

    const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: 'search the api',
        handler: () => { app.search()}
    })
    .help('help')
    .argv

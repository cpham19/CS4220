const
    app = require('./app'),
    yargs = require('yargs')

    const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'findCompletedItems',
        desc: 'Returns items whose listings are completed and are no longer available for sale on eBay.',
        builder: (yargs) => {
            return yargs.option('q', {
                alias: 'query',
                describe: 'pass in a query'
            })
        },
        handler: (argv) => {app.findCompletedItems(argv.query)}
    })
    .command({
        command: 'findItemsAdvanced',
        desc: 'Finds items by a keyword query and/or category and allows searching within item descriptions.',
        builder: (yargs) => {
            return yargs.option('q', {
                alias: 'query',
                describe: 'pass in a query'
            })
        },
        handler: (argv) => {app.findItemsAdvanced(argv.query)}
    })
    .command({
        command: 'findItemsByCategory',
        desc: 'Returns items in a specific category. Results can be filtered and sorted.',
        builder: (yargs) => {
            return yargs.option('q', {
                alias: 'query',
                describe: 'pass in a query'
            })
        },
        handler: (argv) => {app.findItemsByCategory(argv.query)}
    })
    .command({
        command: 'findItemsByKeywords',
        desc: 'Returns items based upon a keyword query and returns details for matching items.',
        builder: (yargs) => {
            return yargs.option('q', {
                alias: 'query',
                describe: 'pass in a query'
            })
        },
        handler: (argv) => {app.findItemsByKeywords(argv.query)}
    })
    .command({
        command: 'findItemsByProduct',
        desc: 'Returns items based on ISBN, UPC, EAN, or ePID.',
        builder: (yargs) => {
            return yargs.option('q', {
                alias: 'query',
                describe: 'pass in a query'
            })
        },
        handler: (argv) => {app.findItemsByProduct(argv.query)}
    })
    .command({
        command: 'findItemsIneBayStores',
        desc: '	Returns items in eBay stores. Can search a specific store or can search all stores with a keyword query.',
        builder: (yargs) => {
            return yargs.option('q', {
                alias: 'query',
                describe: 'pass in a query'
            })
        },
        handler: (argv) => {app.findItemsIneBayStores(argv.query)}
    })
    .command({
        command: 'start',
        desc: 'start the api',
        handler: () => { app.start()}
    })
    .help('help')
    .argv
const
     config = require('./config'),
     superagent = require('superagent')

const APP_ID = 'CalvinPh-MyApplic-PRD-9e44c9784-d9928e5d'

// Example link
//http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=CalvinPh-MyApplic-PRD-9e44c9784-d9928e5d&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=harry%20potter%20phoenix

const _fetch = (param) => {
    return superagent.get(`${config.url}${param}`)
        .then(response => response)
        .catch(error => error.response)
}

// example command: node cli.js findCompletedItems -q 'Nintendo 64'
exports.findCompletedItems = (query) => {
    // Construct the request
    // Replace MyAppID with your Production AppID
    let numberOfItemsOnPage = 20
    let param = "?OPERATION-NAME=findCompletedItems"
    param += "&SERVICE-VERSION=1.0.0"
    param += "&SECURITY-APPNAME=" + APP_ID
    param += "&RESPONSE-DATA-FORMAT=JSON"
    param += "&REST-PAYLOAD"
    param += '&paginationInput.entriesPerPage=' + numberOfItemsOnPage
    const keywords = query.split(" ")
    param += "&keywords="
    param += keywords.join("%20")
    return _fetch(param)
}

// example command: node cli.js findItemsAdvanced -q 'Pokemon'
exports.findItemsAdvanced = (query) => {
    // Construct the request
    // Replace MyAppID with your Production AppID
    let numberOfItemsOnPage = 20
    let param = "?OPERATION-NAME=findItemsAdvanced"
    param += "&SERVICE-VERSION=1.0.0"
    param += "&SECURITY-APPNAME=" + APP_ID
    param += "&RESPONSE-DATA-FORMAT=JSON"
    param += "&REST-PAYLOAD"
    param += '&paginationInput.entriesPerPage=' + numberOfItemsOnPage
    const keywords = query.split(" ")
    param += "&keywords="
    param += keywords.join("%20")
    return _fetch(param)
}

// example command: node cli.js findItemByCategory -q 626
exports.findItemsByCategory = (query) => {
    // Link for category ids
    //http://pages.ebay.com/sellerinformation/news/categorychanges.html
    //https://pages.ebay.com/sellerinformation/growing/categorychanges/cameras-all.html

    // Construct the request
    // Replace MyAppID with your Production AppID
    let numberOfItemsOnPage = 20
    let param = "?OPERATION-NAME=findItemsByCategory"
    param += "&SERVICE-VERSION=1.0.0"
    param += "&SECURITY-APPNAME=" + APP_ID
    param += "&RESPONSE-DATA-FORMAT=JSON"
    param += "&REST-PAYLOAD"
    param += '&paginationInput.entriesPerPage=' + numberOfItemsOnPage
    param += "&categoryId=" + query
    return _fetch(param)
}

// example command: node cli.js findItemsByKeywords -q 'GTX 1080'
exports.findItemsByKeywords = (query) => {
    // Construct the request
    // Replace MyAppID with your Production AppID
    let numberOfItemsOnPage = 20
    let param = "?OPERATION-NAME=findItemsByKeywords"
    param += "&SERVICE-VERSION=1.0.0"
    param += "&SECURITY-APPNAME=" + APP_ID
    param += "&RESPONSE-DATA-FORMAT=JSON"
    param += "&REST-PAYLOAD"
    param += '&paginationInput.entriesPerPage=' + numberOfItemsOnPage
    const keywords = query.split(" ")
    param += "&keywords="
    param += keywords.join("%20")
    return _fetch(param)
}

// example command: node cli.js findItemsByProduct -q 978-0316015844
// NOTE: ISBN numbers that start with 0 such as 0316015849 will be seen as 316015849 and will give error!
// Product types can be ISBN, UPC, EAN, or ReferenceID (productIds are corresponded to this)
exports.findItemsByProduct = (query) => {
    // Construct the request
    // Replace MyAppID with your Production AppID
    let numberOfItemsOnPage = 20
    let param = "?OPERATION-NAME=findItemsByProduct"
    param += "&SERVICE-VERSION=1.0.0"
    param += "&SECURITY-APPNAME=" + APP_ID
    param += "&RESPONSE-DATA-FORMAT=JSON"
    param += "&REST-PAYLOAD"
    param += '&paginationInput.entriesPerPage=' + numberOfItemsOnPage
    param += "&productId.@type=ISBN"
    param += "&productId=" + query
    return _fetch(param)
}

// example command: node cli.js findItemsIneBayStores -q OfficialBestBuy
exports.findItemsIneBayStores = (query) => {
    // Construct the request
    // Replace MyAppID with your Production AppID
    let numberOfItemsOnPage = 20
    let param = "?OPERATION-NAME=findItemsIneBayStores"
    param += "&SERVICE-VERSION=1.0.0"
    param += "&SECURITY-APPNAME=" + APP_ID
    param += "&RESPONSE-DATA-FORMAT=JSON"
    param += "&REST-PAYLOAD"
    param += '&paginationInput.entriesPerPage=' + numberOfItemsOnPage
    param += '&storeName=' + query
    param += '&itemFilter(0).name=MinPrice'
    param += '&itemFilter(0).value=11.00'
    param += '&itemFilter(0).paramName=Currency'
    param += '&itemFilter(0).paramValue=USD'
    param += '&itemFilter(1).name=MaxPrice'
    param += '&itemFilter(1).value=25.00'
    param += '&itemFilter(1).paramName=Currency'
    param += '&itemFilter(1).paramValue=USD'
    param += '&paginationInput.entriesPerPage=' + numberOfItemsOnPage
    param += '&keywords='
    return _fetch(param)
}
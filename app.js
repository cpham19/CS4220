const inquirer = require('inquirer'),
      api = require('api')

const findCompletedItems = (query) => {
    api.findCompletedItems(query).then(res => {
        let obj = JSON.parse(res.text)
        let searchResults = obj.findCompletedItemsResponse[0].searchResult[0].item
        // Use this console.log to see what object attributes are there
        //console.log(searchResults)

        let counter = 1
        console.log("Completed Items for '" + query + "'")
        console.log('----------------')
        searchResults.forEach(obj => {
            console.log(`Item #${counter}` + ": " + obj.title)
            counter++
        })
    })
}

const findItemsAdvanced = (query) => {
    api.findItemsAdvanced(query).then(res => {
        let obj = JSON.parse(res.text)
        let searchResults = obj.findItemsAdvancedResponse[0].searchResult[0].item
        // Use this console.log to see what object attributes are there
        //console.log(searchResults)

        let counter = 1
        console.log("Items Advanced for '" + query + "'")
        console.log('----------------')
        searchResults.forEach(obj => {
            console.log(`Item #${counter}` + ": " + obj.title)
            counter++
        })
    })
}

const findItemsByCategory = (query) => {
    api.findItemsByCategory(query).then(res => {
        let obj = JSON.parse(res.text)
        let searchResults = obj.findItemsByCategoryResponse[0].searchResult[0].item
        // Use this console.log to see what object attributes are there
        //console.log(searchResults)

        let counter = 1
        console.log("Items Based on Category ID #" + query)
        console.log('----------------')
        searchResults.forEach(obj => {
            console.log(`Item #${counter}` + ": " + obj.title)
            counter++
        })
    })
}

const findItemsByKeywords = (query) => {
    api.findItemsByKeywords(query).then(res => {
        let obj = JSON.parse(res.text)
        let searchResults = obj.findItemsByKeywordsResponse[0].searchResult[0].item
        // Use this console.log to see what object attributes are there
        //console.log(searchResults)

        let counter = 1
        console.log("Items using '" + query + "'")
        console.log('----------------')
        searchResults.forEach(obj => {
            console.log(`Item #${counter}` + ": " + obj.title)
            counter++
        })
    })
}

const findItemsByProduct = (query) => {
    api.findItemsByProduct(query).then(res => {
        let obj = JSON.parse(res.text)
        let searchResults = obj.findItemsByProductResponse[0].searchResult[0].item
        // Use this console.log to see what object attributes are there
        //console.log(searchResults)

        let counter = 1
        console.log("Items using Product ID #'" + query + "'")
        console.log('----------------')
        searchResults.forEach(obj => {
            console.log(`Item #${counter}` + ": " + obj.title)
            counter++
        })
    })
}

const findItemsIneBayStores = (query) => {
    api.findItemsIneBayStores(query).then(res => {
        let obj = JSON.parse(res.text)
        let searchResults = obj.findItemsIneBayStoresResponse[0].searchResult[0].item
        // Use this console.log to see what object attributes are there
        //console.log(searchResults)

        let counter = 1
        console.log("Items in Store '" + query + "'")
        console.log('----------------')
        searchResults.forEach(obj => {
            console.log(`Item #${counter}` + ": " + obj.title)
            counter++
        })
    })
}

module.exports = {
    findCompletedItems, findItemsAdvanced, findItemsByCategory, 
    findItemsByKeywords, findItemsByProduct, findItemsIneBayStores
}
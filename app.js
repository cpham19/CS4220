const inquirer = require('inquirer'),
      api = require('api'),
      colors = require('colors'),
      Table = require('cli-table')

    
 
//need to install npm cli-table &  colors

 
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});


//
//*********table code */
 

//findCompletedItems
let findCompletedItemsTable = new Table({
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
    head: [colors.verbose('Item#'), colors.verbose('Description')]

})
//findItemsAdvanced
let findItemsAdvancedTable = new Table({
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
    head: [colors.verbose('Item#'), colors.verbose('Description')]

})
//findItemsByCategory
let findItemsByCategoryTable = new Table({
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
    head: [colors.verbose('Item#'), colors.verbose('Description')]

})
//findItemsByKeywords
let findItemsByKeywordsTable = new Table({
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
    head: [colors.verbose('Item#'), colors.verbose('Description')]

})
//findItemsByProduct
let findItemsByProductTable = new Table({
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
    head: [colors.verbose('Item#'), colors.verbose('Description')]

})
//findItemsIneBayStores
let findItemsIneBayStoresTable = new Table({
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
    head: [colors.verbose('Item#'), colors.verbose('Description')]

})

//********************* */

 


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
            let objString = obj.title.toString()
           
            findCompletedItemsTable.push(
            [colors.info(counter), colors.data(objString)]
          
            ); 
          //  console.log(colors.info(`Item #${counter}`)+ ": " + colors.data(obj.title))
            counter++
        })
        console.log(findCompletedItemsTable.toString());
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
            let objString = obj.title.toString()
           
            findItemsAdvancedTable.push(
            [colors.info(counter), colors.data(objString)]
          
            ); 
         //   console.log(colors.info(`Item #${counter}`)+ ": " + colors.data(obj.title))
            counter++
        })
        console.log(findItemsAdvancedTable.toString());
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
            let objString = obj.title.toString()
           
            findItemsByCategoryTable.push(
            [colors.info(counter), colors.data(objString)]
          
            ); 
          //  console.log(colors.info(`Item #${counter}`)+ ": " + colors.data(obj.title))
            counter++
        })
        console.log(findItemsByCategoryTable.toString());
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
            let objString = obj.title.toString()
           
    findItemsByKeywordsTable.push(
    [colors.info(counter), colors.data(objString)]
  
    ); 
         
         //  console.log(colors.info(`Item #${counter}` + ": ") + colors.data( obj.title))
            counter++
        })
        console.log(findItemsByKeywordsTable.toString());
 

      
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
            let objString = obj.title.toString()
           
            findItemsByProductTable.push(
            [colors.info(counter), colors.data(objString)]
          
            ); 
          //  console.log(color.info(`Item #${counter}`) + ": " +colors.data(obj.title))
            counter++
        })
        console.log(findItemsByProductTable.toString());
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
            let objString = obj.title.toString()
           
        findItemsIneBayStoresTable.push(
            [colors.info(counter), colors.data(objString)]
          
            ); 
           // console.log(colors.info(`Item #${counter}`)+ ": " + colors.data(obj.title))
            counter++
        })
        console.log(findItemsIneBayStoresTable.toString());
    })
}

module.exports = {
    findCompletedItems, findItemsAdvanced, findItemsByCategory, 
    findItemsByKeywords, findItemsByProduct, findItemsIneBayStores
}
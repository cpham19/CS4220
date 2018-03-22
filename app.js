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


const mainPrompt = () => {
	return inquirer.prompt([{
		type: 'list',
		message: 'Select an option below.',
		name: 'feature',
        choices: ['Find Completed Items', 'Find Items Advanced',
                  'Find Items By Category', 'Find Items By Keywords',
                  'Find Items By Product', 'Find Items In eBay Stores'],        
                  // implement choices array - look at the inquirer documentation,
	}])
}

const promptForCompletedItems = () => {
	return inquirer.prompt([{
		type: 'input',
		message: 'Type your keywords.',
        name: 'keywords',
        default: function() {
            return 'Nintendo 64';
        }
	}])
}

const promptForItemsAdvanced = () => {
	return inquirer.prompt([
    {   type: 'input',
		message: 'Type your keywords.',
        name: 'keywords',
        default: function() {
            return 'Pokemon';
        }
    },
    {  type: 'input',
        message: 'Type the category id #.',
        name: 'id',
        default: function() {
            return '139973';
        }   
    }])
}

const promptForItemsByCategory = () => {
	return inquirer.prompt([{
		type: 'input',
		message: 'Type your category id #.',
        name: 'id',
        default: function() {
            return '625';
        }
	}])
}

const promptForItemsByKeywords = () => {
	return inquirer.prompt([{
		type: 'input',
		message: 'Type your keywords.',
        name: 'keywords',
        default: function() {
            return 'GTX 1080';
        }
	}])
}

const promptForItemsByProduct = () => {
	return inquirer.prompt([{
        type: 'list',
		message: 'Select an option below.',
		name: 'productIdType',
        choices: ['ISBN', 'UPC','EAN', 'ePID',], 
    },
    {   type: 'input',
        message: 'Type your product id #.',
        name: 'productId',
    }])
}

const promptForItemsIneBayStores = () => {
	return inquirer.prompt([{
		type: 'input',
		message: 'Type your store name.',
        name: 'storeName',
        default: function() {
            return 'OfficialBestBuy';
        }
	}])
}

const findCompletedItems = (query) => {
    api.findCompletedItems(query).then(res => {
        let obj = JSON.parse(res.text)
        let count = obj.findCompletedItemsResponse[0].searchResult[0]
        count = count["@count"]

        if (count === "0") {
            console.log("There are no item results to return.")
        }
        else {
            let searchResults = obj.findCompletedItemsResponse[0].searchResult[0].item
            // Use this console.log to see what object attributes are there
            //console.log(searchResults)
    
            let counter = 1
            console.log("Completed Items for '" + query + "'")
            console.log('---------------------------------')
            searchResults.forEach(obj => {
                let objString = obj.title.toString()
               
                findCompletedItemsTable.push(
                [colors.info(counter), colors.data(objString)]
              
                ); 
              //  console.log(colors.info(`Item #${counter}`)+ ": " + colors.data(obj.title))
                counter++
            })
            console.log(findCompletedItemsTable.toString());
        }
    })
}

const findItemsAdvanced = (query) => {
    api.findItemsAdvanced(query).then(res => {
        let obj = JSON.parse(res.text)
        let count = obj.findItemsAdvancedResponse[0].searchResult[0]
        count = count["@count"]

        if (count === "0") {
            console.log("There are no item results to return.")
        }
        else {
            let searchResults = obj.findItemsAdvancedResponse[0].searchResult[0].item
            // Use this console.log to see what object attributes are there
            //console.log(searchResults)

            let counter = 1
            console.log("Items Advanced for '" + query.keywords + "' and category id #" + query.id)
            console.log('-------------------------------------------------------------')
            searchResults.forEach(obj => {
                let objString = obj.title.toString()
            
                findItemsAdvancedTable.push(
                [colors.info(counter), colors.data(objString)]
            
                ); 
            //   console.log(colors.info(`Item #${counter}`)+ ": " + colors.data(obj.title))
                counter++
            })
            console.log(findItemsAdvancedTable.toString());
        }
    })
}

const findItemsByCategory = (query) => {
    api.findItemsByCategory(query).then(res => {
        let obj = JSON.parse(res.text)
        let ack = obj.findItemsByCategoryResponse[0].ack[0]

        if (ack === "Failure") {
            console.log("Invalid category id.")
        }
        else {
            let searchResults = obj.findItemsByCategoryResponse[0].searchResult[0].item
            // Use this console.log to see what object attributes are there
            //console.log(searchResults)

            let counter = 1
            console.log("Items Based on Category ID #" + query)
            console.log('---------------------------------')
            searchResults.forEach(obj => {
                let objString = obj.title.toString()
            
                findItemsByCategoryTable.push(
                [colors.info(counter), colors.data(objString)]
            
                ); 
            //  console.log(colors.info(`Item #${counter}`)+ ": " + colors.data(obj.title))
                counter++
            })
            console.log(findItemsByCategoryTable.toString());
        }
    })
}

const findItemsByKeywords = (query) => {
    api.findItemsByKeywords(query).then(res => {
        let obj = JSON.parse(res.text)
        let count = obj.findItemsByKeywordsResponse[0].searchResult[0]
        count = count["@count"]

        if (count === "0") {
            console.log("There are no item results to return.")
        }
        else {
            let searchResults = obj.findItemsByKeywordsResponse[0].searchResult[0].item
            // Use this console.log to see what object attributes are there
            //console.log(searchResults)

            let counter = 1
            console.log("Items using '" + query + "'")
            console.log('---------------------------------')

            searchResults.forEach(obj => {
                let objString = obj.title.toString()
            
            findItemsByKeywordsTable.push(
            [colors.info(counter), colors.data(objString)]
        
            ); 
            
            //  console.log(colors.info(`Item #${counter}` + ": ") + colors.data( obj.title))
                counter++
            })
            console.log(findItemsByKeywordsTable.toString());
        }
    })
}

const findItemsByProduct = (query) => {
    api.findItemsByProduct(query).then(res => {
        let obj = JSON.parse(res.text)
        let searchResults = obj.findItemsByProductResponse[0].searchResult[0].item
        // Use this console.log to see what object attributes are there
        //console.log(searchResults)

        let counter = 1
        console.log("Items using product id type '" + query.productIdType + "' and Product ID #'" + query.productId + "'")
        console.log('---------------------------------')
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
        console.log('---------------------------------')
        
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

const getSearchKeywordsRecommendation = (query)=> {
      api.getSearchKeywordsRecommendation(query).then(res => {
        let obj = JSON.parse(res.text)
        let keywordResults = obj.getSearchKeywordsRecommendationResponse[0].keywords[0]
        if (!(keywordResults === "")) {
                console.log("Do you mean to type '" + keywordResults + "'?")
        }
      })
}

const selectedOption = (answer) => {
    if (answer === 'Find Completed Items') {
        promptForCompletedItems().then(answer => {
            getSearchKeywordsRecommendation(answer.keywords)
            findCompletedItems(answer.keywords)
        })
    }
    else if (answer === 'Find Items Advanced') {
        promptForItemsAdvanced().then(answer => {
            getSearchKeywordsRecommendation(answer.keywords)
            findItemsAdvanced(answer)
        })
    }
    else if (answer === 'Find Items By Category') {
        promptForItemsByCategory().then(answer => {
            findItemsByCategory(answer.id)
        })
    }
    else if (answer === 'Find Items By Keywords') {
        promptForItemsByKeywords().then(answer => {
            getSearchKeywordsRecommendation(answer.keywords)
            findItemsByKeywords(answer.keywords)
        })
    }
    else if (answer === 'Find Items By Product') {
        promptForItemsByProduct().then(answer => {
            findItemsByProduct(answer)
        })
    }
    else if (answer === 'Find Items In eBay Stores') {
        promptForItemsIneBayStores().then(answer => {
            findItemsIneBayStores(answer.storeName)
        })
    }
}

const start = () => {
    mainPrompt().then(answer => {
        selectedOption(answer.feature)
    });
}

module.exports = {
    start
}
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


// //
// //*********table code */
 
let designTable = new Table({
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
    head: [colors.verbose('Item ID'), colors.verbose('Title'), colors.verbose('Item Condition')]
})

let designTable2 = new Table({
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
    head: [colors.verbose('Listing type'),colors.verbose('Sold Price'), colors.verbose('Shipping price'), colors.verbose('Shipping Type'), colors.verbose('Shipped from'), colors.verbose('Ship to')]
})

let designTable3 = new Table({
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
    head: [colors.verbose('Category ID'), colors.verbose('Category Name')]
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
        name: 'keywords'
	}])
}

const promptForDetails = (searchResults) => {
	return inquirer.prompt([{
		type: 'list',
		message: 'Select a listing.',
        name: 'listing',
        choices: searchResults.map(listing => {
            return listing.itemId[0]
        }),
	}]).then(selection => {
        let itemId = selection.listing

        searchResults.forEach(listing => {
            if (listing.itemId[0] === itemId) {
                let itemId = listing.itemId[0]
                let title = listing.title[0]
                let condition = listing.condition[0].conditionDisplayName
                let location = listing.location[0]
                let listingType = listing.listingInfo[0].listingType[0]
                let soldPrice = listing.sellingStatus[0].currentPrice[0].__value__ + " " + listing.sellingStatus[0].currentPrice[0]["@currencyId"]
                let shippingPrice = listing.shippingInfo[0].shippingServiceCost[0].__value__+ " " + listing.shippingInfo[0].shippingServiceCost[0]["@currencyId"]
                let shippingType = listing.shippingInfo[0].shippingType[0]
                let shipTo = listing.shippingInfo[0].shipToLocations[0]
                let categoryId = listing.primaryCategory[0].categoryId[0]
                let categoryName = listing.primaryCategory[0].categoryName[0]

                designTable.push([colors.info(itemId), colors.data(title), colors.data(condition)])
                designTable2.push([colors.info(listingType), colors.data(soldPrice), colors.data(shippingPrice), colors.data(shippingType), colors.data(location), colors.data(shipTo)])
                designTable3.push([colors.info(categoryId), colors.data(categoryName)])

                console.log(designTable.toString())
                console.log(designTable2.toString())
                console.log(designTable3.toString())
            }
        })
    })
}

const promptForItemsAdvanced = () => {
	return inquirer.prompt([
    {   type: 'input',
		message: 'Type your keywords.',
        name: 'keywords',
    },
    {  type: 'input',
        message: 'Type the category id #.',
        name: 'id',
        validate: function(input) {
            if (input.match(/^[0-9]+$/)) {
				return true
			}
			else {
				return "You have to type numbers only!"
			}
        }   
    }])
}

const promptForItemsByCategory = () => {
	return inquirer.prompt([{
		type: 'input',
		message: 'Type your category id #.',
        name: 'id',
        validate: function(input) {
            if (input.match(/^[0-9]+$/)) {
				return true
			}
			else {
				return "You have to type numbers only!"
			}
        }   
	}])
}

const promptForItemsByKeywords = () => {
	return inquirer.prompt([{
		type: 'input',
		message: 'Type your keywords.',
        name: 'keywords'
	}])
}

const promptForItemsByProduct = () => {
	return inquirer.prompt([{
        type: 'list',
		message: 'Select an option below.',
		name: 'productIdType',
        choices: ['ISBN', 'UPC','EAN']
    }])
}

const promptForItemsByProduct2 = (productType) => {
	return inquirer.prompt([{
        type: 'input',  
        message: 'Type your product id #.',
        name: 'productId',
        validate: function(input) {
            if (input.match(/^[0-9]+$/)) {
				if (productType === 'ISBN') {
                    if (input.length !== 10 || input.length !== 13) {
                        return true;
                    }
                    else {
                        return "Please enter a 10-digit or 13-digit ISBN!"
                    }
                }
                else if (productType === 'UPC') {
                    if (input.length === 12) {
                        return true;
                    }
                    else {
                        return "Please enter a 12-digit UPC!"
                    }
                }
                else if (productType === 'EAN') {
                    if (input.length === 13) {
                        return true;
                    }
                    else {
                        return "Please enter a 13-digit EAN!"
                    }
                }
			}
			else {
				return "You have to type numbers only!"
			}
        }   
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
            // console.log(searchResults)

            promptForDetails(searchResults)
        }
    })
}

const findItemsAdvanced = (query) => {
    api.findItemsAdvanced(query).then(res => {
        let obj = JSON.parse(res.text)
        let ack = obj.findItemsAdvancedResponse[0].ack[0]

        if (ack === "Failure") {
            console.log("Invalid name or Invalid category id.")
        }
        else {
            let count = obj.findItemsAdvancedResponse[0].searchResult[0]
            count = count["@count"]

            if (count === "0") {
                console.log("There are no item results to return.")
            }
            else {
                let searchResults = obj.findItemsAdvancedResponse[0].searchResult[0].item
                // Use this console.log to see what object attributes are there
                //console.log(searchResults)
    
                promptForDetails(searchResults)
            }
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

            promptForDetails(searchResults)
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

            promptForDetails(searchResults)
        }
    })
}

const findItemsByProduct = (query) => {
    api.findItemsByProduct(query).then(res => {
        let obj = JSON.parse(res.text)
        let ack = obj.findItemsByProductResponse[0].ack[0]

        if (ack === "Failure") {
            console.log("Invalid product id.")
        }
        else {
            let count = obj.findItemsByProductResponse[0].searchResult[0]
            count = count["@count"]

            if (count === "0") {
                console.log("There are no item results to return.")
            }
            else {
                let searchResults = obj.findItemsByProductResponse[0].searchResult[0].item
                // Use this console.log to see what object attributes are there
                //console.log(searchResults)

                promptForDetails(searchResults)
            }
        }
    })
}

const findItemsIneBayStores = (query) => {
    api.findItemsIneBayStores(query).then(res => {
        let obj = JSON.parse(res.text)
        let ack = obj.findItemsIneBayStoresResponse[0].ack[0]

        if (ack === "Failure") {
            console.log("Invalid store name.")
        }
        else {
            let count = obj.findItemsIneBayStoresResponse[0].searchResult[0]
            count = count["@count"]

            if (count === "0") {
                console.log("There are no item results to return.")
            }
            else {
                let searchResults = obj.findItemsIneBayStoresResponse[0].searchResult[0].item
                // Use this console.log to see what object attributes are there
                //console.log(searchResults)

                promptForDetails(searchResults)
            }
        }
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
            promptForItemsByProduct2(answer.productIdType).then(answer2 => {
                findItemsByProduct({productIdType: answer.productIdType, productId: answer2.productId})
            })
        })
    }
    else if (answer === 'Find Items In eBay Stores') {
        promptForItemsIneBayStores().then(answer => {
            findItemsIneBayStores(answer.storeName)
        })
    }
}

const search = () => {
    mainPrompt().then(answer => {
        selectedOption(answer.feature)
    });
}

module.exports = {
    search
}
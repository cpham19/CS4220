/**
 * List prompt example
 */

'use strict';
var inquirer = require('inquirer');

// inquirer
//   .prompt([
//     {
//       type: 'list',
//       name: 'theme',
//       message: 'What do you want to do?',
//       choices: [
//         'Order a pizza',
//         'Make a reservation',
//         new inquirer.Separator(),
//         'Ask for opening hours',
//         {
//           name: 'Contact support',
//           disabled: 'Unavailable at this time'
//         },
//         'Talk to the receptionist'
//       ]
//     },
//     {
//       type: 'list',
//       name: 'size',
//       message: 'What size do you need?',
//       choices: ['Jumbo', 'Large', 'Standard', 'Medium', 'Small', 'Micro'],
//       filter: function(val) {
//         return val.toLowerCase();
//       }
//     }
//   ])
//   .then(answers => {
//     console.log(JSON.stringify(answers, null, '  '));
//   });


  var questions = [
    {
      type: 'input',
      name: 'first_name',
      message: "What's your first name"
    },
    {
      type: 'input',
      name: 'last_name',
      message: "What's your last name",
      default: function() {
        return 'Doe';
      }
    },
    {
      type: 'input',
      name: 'phone',
      message: "What's your phone number",
      validate: function(value) {
        var pass = value.match(
          /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
        );
        if (pass) {
          return true;
        }
  
        return 'Please enter a valid phone number';
      }
    }
  ];
  
  inquirer.prompt(questions).then(answers => {
    console.log(JSON.stringify(answers, null, '  '));
  });
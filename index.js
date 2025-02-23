// Include packages needed for this application
import inquirer from "inquirer";
import fs from "fs";
import generateMarkdown from "./utils/generateMarkdown.js"

// Array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the name of your project?',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('Please add the title of your project');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'What is the description of your project?',
        validate: descInput => {
            if (descInput) {
                return true;
            } else {
                console.log('Please add the description of your project!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the instructions for installing?',
        default: 'npm install'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'How does the application works?'
    },
    {
        type: 'list',
        name: 'license',
        message: 'What type of licenses does your project needs?',
        choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3', 'none']
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'How can other persons contribute to your project?'
    },
    {
        type: 'input',
        name: 'tests',
        message: 'How do the tests work in your project?',
        default: 'npm test'
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your username in GITHUB?',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter your Github username');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
    }
];

// Function to write README file
function writeToFile(fileName, data) {
    return fs.writeFileSync(fileName, data);
}

// Function to initialize app
async function init() {
    try {
        // Prompt user for answers
        const answers = await inquirer.prompt(questions);
        
        // Generate markdown content
        const markdown = generateMarkdown(answers);
        
        // Write to README file
        writeToFile('README.md', markdown);
        
        console.log('Successfully created README.md');
    } catch (error) {
        console.error('Error creating README:', error);
    }
}

// Function call to initialize app
init();
// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/readme-template.js')

// TODO: Create an array of questions for user input
const promptProject = readMeData => {
    console.log(`
  =================
  Create readme
  =================
  `);
  
     // if there's no 'projects' array property, create one
     if (!readMeData.projects) {
      readMeData.projects = [];
    }
  
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)'
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)'
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
      readMeData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(readMeData);
      } else {
        return readMeData;
      }
    });
  };

promptProject()
  .then(readMeData => {
    const readMe = generatePage(readMeData);

    fs.writeFile('./readme.md', readMe, err => {
      if (err) throw new Error(err);

      console.log('ReadMe created! Check out readme.md in this directory to see it!');
    });
  });
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Empty array to show different roles
const teamArray = [];

//manager
const managerQuestions = [
  {
    type: "input",
    name: "managerName",
    message: "Who is the manager of the team?"
  },
  {
    type: "input",
    name: "managerId",
    message: "Please add your ID number?"
  },
  {
    type: "input",
    name: "email",
    message: "Please add your email"
  },
  {
    type: "input",
    name: "managerPhoneNumber",
    message: "Please add your office number"
  },
]
//engineer
const engineerQuestions = [
  {
    type: "input",
    name: "engineerName",
    message: "Who is the engineer of the team?"
  },
  {
    type: "input",
    name: "engineerId",
    message: "Please add your ID number?"
  },
  {
    type: "input",
    name: "GitHubUser",
    message: "Please add your Github Username"
  },
  
  {
    type: "input",
    name: "email",
    message: "Please add your email"
  },
]
//intern
const internQuestions = [
  {
    type: "input",
    name: "intern",
    message: "Who is the intern of the team?"
  },
  {
    type: "input",
    name: "email",
    message: "Please add your email"
  },
  {
    type: "input",
    name: "internId",
    message: "Please add your ID number?"
  },
 
  {
    type: "input",
    name: "school",
    message: "Please add your school name"
  },
]
const anotherPerson=[
  {
    type:"list",
    choices:["Engineer","Intern","Done"],
    name:"role",
    message:"would you like to add another person"
  }
]

//Manager promt
function managerPrompt() {
  inquirer.prompt(managerQuestions).then((response) => {
    let name = response.managerName;
    let id = response.managerId;
    let email = response.email;
    let office = response.managerPhoneNumber;

    //manager object
    const manager = new Manager(name, id, email, office);

    teamArray.push(manager);
    console.log(teamArray)
    next();
  })
}
//next person
function next() {
  inquirer.prompt(anotherPerson).then((response) => {
    console.log(response);
    switch (response.role) {
      case "Engineer":
        engineerPrompt();
        break;
      case "Intern":
        internPrompt();
        break;
      case "Done":
        console.log("Team is created!");
        makeTeam();
    };
  });
}
//Engineer promt
function engineerPrompt() {
  inquirer.prompt(engineerQuestions).then((response) => {
    let name = response.engineerName;
    let id = response.engineerId;
    let email = response.email;
    let GitHubUser = response.GitHubUser;
    
    //engineer object
    const engineer = new Engineer(name, id,email,GitHubUser);

    teamArray.push(engineer);
    console.log(teamArray)
    next();
  })
}

//Intern promt
function internPrompt() {
  inquirer.prompt(internQuestions).then((response) => {
    let name = response.intern;
    let school = response.school;
    let id= response.internId;
    let email = response.email;

    //Intern object
    const intern = new Intern(name, id,email,school);

    teamArray.push(intern);
    console.log(teamArray)
    next();
  })
}
//start function for manager
function start() {
  managerPrompt();
};
// creating a html file for the team
function makeTeam() {
  fs.writeFile(outputPath, render(teamArray), (err) => {
    if (err) {
      return console.log("error")
      
    }
  });
}
start();
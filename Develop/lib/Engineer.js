
const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, email,GitHubUser) {
    super(name,id,email)
   
    this.github=GitHubUser
  }
  
  getGithub() {
    return this.github;
  }

  getRole(){
    return "Engineer"
  }
}

module.exports= Engineer
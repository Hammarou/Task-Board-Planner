# Task-Board-Planner


## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [GitHub Deployment Location (HTTPS)](#github-deployment-location-https)
- [GitHub Repository Location](#github-repository-location)
- [Credits](#credits)
- [Webpage Screenshots](#webpage-screenshots)
- [License](#license)

  
## Description

Greetings! 

- The Task Board Planner intends to enable the potential user (a company associate/manager handling the employee payroll matrix) to view and manage employee payroll data. The user will be prompted to enter as many employees as they wish (they will be prompted to provide nominal background information about each employee, such as first and last names, and salary). From this, the user will be able to acquire a list of all the employees (along with their information) they have entered; as well as calculate the average employee salary.


## Installation

* Clone repository: `git clone git@github.com:Hammarou/Task-Board-Planner.git`
* Inside the terminal cd into the cloned repository in the local machine `cd Task-Board-Planner`
* Install dependencies: `npm install` 


## Usage

- The purpose of the Task Board Planner is to grant potential users the ability to create/record project tasks and assign each task a due date for completion. 

- Tasks are stored locally and will continue across multiple user sessions, unless deleted.

### Add task

 For the successful utilization of this application:

* Click the 'Add Task' button.
* Complete all the fields in the pop-up modal.
* Click the "Add Task" button in the pop-up.


### Task description

Tasks saved to the 'To Do' task lane  have a title, due date, and description based on the inputs placed by the user in the modal form. Based on when each task is due, they are color-coded:

* White: The task is due at some date in the future of the current date.
* Yellow: The task is due on the same day as the current date.
* Red: The task is overdue.


### Move task

Each task can be moved between the three task lanes ('To Do', In Progress', and 'Done') by drag and drop. However, once the task is placed in the 'Done' task lane it changes color to white and can no longer be dropped in the 'To Do' task lane.


## Webpage Screenshot

![]( /assets/screenshots/screenshot1.png "First screenshot")
![](/assets/screenshots/screenshot2.png "Second screenshot")
![](/assets/screenshots/screenshot3.png "Third screenshot")
![](/assets/screenshots/screenshot4.png "Fourth screenshot")


## GitHub Deployment Location (HTTPS)

The deployed webpage can be viewed at the following URL:

https://github.com/Hammarou/Task-Board-Planner


## GitHub Repository Location

https://hammarou.github.io/Task-Board-Planner/


## Credits

N/A

## License

Please refer to the LICENSE in the repo.

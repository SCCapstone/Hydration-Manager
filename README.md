**Hydration-Manager**

This project seeks to aid the athletic training staff at the University of South Carolina.
Currently, the training staff is using pencil and paper method of tracking water weight loss, weighing athletes before and after practice.
They then plug in this data into an excel spreadsheet, which calculates hydration statuses of the athletes.
The purpose of Hydration-Manager is to move this process into an online, web-based application that will alert the staff immediately if athletes are dehydrated,
thus improving their response time to cases of severe dehydration and promoting the overall health and capacity of the student athletes.

Please check out our wiki for information regarding this application!

https://github.com/SCCapstone/Hydration-Manager/wiki

**Installing Locally**

1. Download the git file from https://github.com/SCCapstone/Hydration-Manager/archive/master.zip ,
2. Install node and npm from https://www.npmjs.com/get-npm ,
3. Install chocolatey from https://chocolatey.org/install#installing-chocolatey ,
4. Install meteor from https://www.meteor.com/install ,

5. Using a command prompt, in the project directory, run the command `meteor npm install` to install the related meteor and npm packages for the app.
6. Then, run the command `meteor` to start the app.

Hydration Manager may be accessed from `http://localhost:3000/` on your local machine.

**Use of the Application**

To use Hydration Manger, one will generally need to `create a team` first on the `yourTeams` page.
Once you have a team, you may edit this team or delete it via the modal pop up window. 
By clicking on the team, you will be taken to this team's `master report` page, 
where you may `create athletes` for this team. Alternatively, you may view a master report for all teams via the dropdown.
The process of creating teams and athletes will generally only need to be done a few times a semester.
Also on the `master report` screen, 
you may click any athletes name to take you directly to the `athlete report` screen for that player. On this page, you can `edit an athlete` as well as `edit individual weight entries`.
The primary focus of the app, and the first page we launch the user to, is the `weight entry` screen. This will be the screen used daily by the athletic training staff.
On this page, weight entries for pre and post practice may be entered. As these values are entered, they are pushed directly into the athlete's data, and will update automatically on the athlete report page.

Athletes that are dehydrated to various degrees will appear on the `alerts` page. There will also be SMS messages produced to alert the head athletic trainer of severe dehydration cases.




**Testing Information**

Behavioral Tests run with chimp by using following command:
`chimp --ddp=http://localhost:3000 --mocha --path=tests`

Unit test run with mocha using the following command:
`meteor test --driver-package practicalmeteor:mocha`

**University of South Carolina Capstone Project, 2017-2018**
> * [@afraznein](https://github.com/afraznein)
> * [@george-clayton](https://github.com/george-clayton)
> * [@jacobah](https://github.com/jacobah)
> * [@Justin-Schneider](https://github.com/Justin-Schneider)
> * [@DJaymel](https://github.com/DJaymel)

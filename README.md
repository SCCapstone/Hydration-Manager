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
6.  After running into issues, you may need to also `meteor npm install babel-runtime` if the above command did not install it for you.
7. Then, run the command `meteor` to start the app.

Hydration Manager may be accessed from `http://localhost:3000/` on your local machine.

**Use of the Application**

1. To use Hydration Manger, one will generally need to `create a team` first on the `yourTeams` page.
2. In order to `create a team`, however, you must be logged into an admin account.
3. Once you have a team, you may edit this team or delete it via the modal pop up window. 
4. By clicking on the team, you will be taken to this team's `master report` page, 
where you may `create athletes` for this team. Alternatively, you may view a master report for all teams via the drop-down.
5. The process of creating teams and athletes will generally only need to be done a few times a semester.
6. Also on the `master report` screen, 
you may click any athletes name to take you directly to the `athlete report` screen for that player. 
7. On this page, you can `edit an athlete` as well as `edit individual weight entries`.
8. The primary focus of the app, and the first page we launch the user to, is the `weight entry` screen. This will be the screen used daily by the athletic training staff.
On this page, weight entries for pre and post practice may be entered. As these values are entered, they are pushed directly into the athlete's data, and will update automatically on the athlete report page.
9. Athletes that are dehydrated to various degrees will appear on the `alerts` page. There will also be SMS messages produced to alert the head athletic trainer of severe dehydration cases.




**Testing Information**

Behavioral Tests run with chimp by using following command:
`chimp --ddp=http://localhost:3000 --mocha --path=tests`

Unit test run with mocha using the following command:
`meteor test --driver-package practicalmeteor:mocha`

                    --- **or** ---

                  `npm run test`

**University of South Carolina Capstone Project, 2017-2018**
> * [@afraznein](https://github.com/afraznein)
> * [@george-clayton](https://github.com/george-clayton)
> * [@jacobah](https://github.com/jacobah)
> * [@Justin-Schneider](https://github.com/Justin-Schneider)
> * [@DJaymel](https://github.com/DJaymel)

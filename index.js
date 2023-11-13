const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'BixeyBoy@115',
        database: 'employees_db'
    }
);

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log(`Connected to the ${db.config.database} database.`);

    startPrompt();
})

const startPrompt = function() {
    inquirer
        .prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View Departments', 'View Roles', 'View Employees', 'Exit']
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View Departments':
                    viewDepartments();
                    break;
                case 'View Roles':
                    viewRoles();
                    break;
                case 'View Employees':
                    viewEmployees();
                    break;
                case 'Exit':
                    console.log('Exiting...');
                    db.end();
                    break;
                default:
                    console.log('Invalid action');
                    break;
            }
        });
}

const viewDepartments = function() {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) {
            console.error('Error querying departments: ', err);
            return;
        }
        console.table(results);
        
        startPrompt();
    })
}
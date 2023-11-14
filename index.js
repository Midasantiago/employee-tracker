const inquirer = require('inquirer');
const mysql = require('mysql2');
const { viewRolesQuery, viewEmployeesQuery } = require('./queries/viewQueries');

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
            choices: [
                      'View All Departments',
                      'View All Roles',
                      'View All Employees',
                      'Add A Department',
                      'Add A Role',
                      'Add An Employee',
                      'Update An Employee',
                      'Exit'
                    ]
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View All Departments':
                    viewDepartments();
                    break;
                case 'View All Roles':
                    viewRoles();
                    break;
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'Add A Department':
                    addDepartment();
                    break;
                case 'Add A Role':
                    addRole();
                    break;
                case 'Add An Employee':
                    addEmployee();
                    break;
                case 'Update An Employee':
                    updateEmployee();
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
};

const viewRoles = function() {
    db.query(viewRolesQuery, (err, results) => {
        if (err) {
            console.error('Error querying roles: ', err);
            return;
        }
        console.table(results);

        startPrompt();
    })
};

const viewEmployees = function() {
    db.query(viewEmployeesQuery, (err, results) => {
        if (err) {
            console.error('Error querying employees: ', err);
            return;
        }
        console.table(results);

        startPrompt();
    })
};
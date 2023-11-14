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

const startPrompt = function () {
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

const viewDepartments = function () {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) {
            console.error('Error querying departments: ', err);
            return;
        }
        console.table(results);

        startPrompt();
    })
};

const viewRoles = function () {
    db.query(viewRolesQuery, (err, results) => {
        if (err) {
            console.error('Error querying roles: ', err);
            return;
        }
        console.table(results);

        startPrompt();
    })
};

const viewEmployees = function () {
    db.query(viewEmployeesQuery, (err, results) => {
        if (err) {
            console.error('Error querying employees: ', err);
            return;
        }
        console.table(results);

        startPrompt();
    })
};

const addDepartment = function () {
    inquirer
        .prompt({
            type: 'input',
            name: 'departmentName',
            message: 'Enter the name of the department:'
        })
        .then((answer) => {
            const departmentName = answer.departmentName.trim();
            if (departmentName) {
                db.query('INSERT INTO department (dep_name) VALUES (?)', [departmentName], (err, result) => {
                    if (err) {
                        console.error('Error adding department: ', err);
                    } else {
                        console.log(`Department '${departmentName}' added successfully!`);
                    }
                    startPrompt();
                });
            } else {
                console.log('Please provide a valid department name.');
                startPrompt();
            }
        });
};

const addRole = function() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'Enter the name of the role:'
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'Enter the salary of the role:'
            },
            {
                type: 'input',
                name: 'roledepartment',
                message: 'Enter the department of the role:'
            }
        ])
        .then((answer) => {
            const roleName = answer.roleName.trim();
            const roleSalary = answer.roleSalary.trim();
            const roledepartment = answer.roledepartment.trim();
            if (roleName && roleSalary && roledepartment) {
                db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [roleName, roleSalary, roledepartment], (err, result) => {
                    if (err) {
                        console.error('Error adding role: ', err);
                    } else {
                        console.log(`Role '${roleName}' added successfully!`);
                    }
                    startPrompt();
                });
            } else {
                console.log('Please provide valid role data.');
            }
        });
};

const addEmployee = function() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employeeFirst',
                message: "Enter the employee's first name:"
            },
            {
                type: 'input',
                name: 'employeeLast',
                message: "Enter the employee's last name:"
            },
            {
                type: 'input',
                name: 'employeeRole',
                message: "Enter the employee's role:"
            },
            {
                type: 'input',
                name: 'employeeManager',
                message: "Enter the employee's manager:"
            }
        ])
        .then((answer) => {
            const employeeFirst = answer.employeeFirst.trim();
            const employeeLast = answer.employeeLast.trim();
            const employeeRole = answer.employeeRole.trim();
            const employeeManager = answer.employeeManager.trim();
            if (employeeFirst && employeeLast && employeeRole && employeeManager) {
                db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [employeeFirst, employeeLast, employeeRole, employeeManager], (err, result) => {
                    if (err) {
                        console.error('Error adding employee: ', err);
                    } else {
                        console.log(`Role '${employeeFirst}' added successfully!`);
                    }
                    startPrompt();
                });
            } else {
                console.log('Please provide valid employee data.');
            }
        });
};
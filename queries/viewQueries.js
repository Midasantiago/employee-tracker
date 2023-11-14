const viewRolesQuery = 'SELECT role.id AS id, role.title AS title, department.dep_name AS department, role.salary FROM role JOIN department ON role.department_id = department.id'

const viewEmployeesQuery = 'SELECT employee.id AS id, employee.first_name, employee.last_name, role.title AS title, department.dep_name AS department, role.salary AS salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id'

module.exports = { viewRolesQuery, viewEmployeesQuery };
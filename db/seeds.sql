INSERT INTO department (dep_name)
VALUES 
  ('IT'),
  ('HR'),
  ('Finance'),
  ('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES 
  ('Software Engineer', 80000.00, 1),
  ('HR Specialist', 60000.00, 2),
  ('Financial Analyst', 70000.00, 3),
  ('Marketing Coordinator', 55000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
  ('Michael', 'Santiago', 1, NULL),
  ('Anyae', 'Smith', 2, 1),
  ('Pamela', 'Pomales', 3, 1),
  ('Kevin', 'Mestizo', 4, 2),
  ('Angel', 'Martinez', 1, 3),
  ('Mildaury', 'Santos', 2, 3),
  ('Samanta', 'Munoz', 3, 4),
  ('Abismael', 'Santos', 4, 4);
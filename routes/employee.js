const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

// Get all employees
router.get('/employees', async (req, res) => {
  const employees = await Employee.find();
  res.status(200).json(employees);
});

// Create employee
router.post('/employees', async (req, res) => {
  const employee = new Employee(req.body);
  await employee.save();
  res.status(201).json({ message: 'Employee created successfully', employee_id: employee._id });
});

// Get employee by ID
router.get('/employees/:eid', async (req, res) => {
  const employee = await Employee.findById(req.params.eid);
  res.status(200).json(employee);
});

// Update employee
router.put('/employees/:eid', async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
  res.status(200).json({ message: 'Employee details updated successfully' });
});

// Delete employee
router.delete('/employees', async (req, res) => {
  await Employee.findByIdAndDelete(req.query.eid);
  res.status(200).json({ message: 'Employee deleted successfully' });
});

module.exports = router;

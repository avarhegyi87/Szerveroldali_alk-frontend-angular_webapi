import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm!: FormGroup;
  submitted = false;
  error = '';

  addEmployeeRequest: Employee = {
    id: '',
    firstName: '',
    lastName: '',
    department: '',
    email: '',
    phone: '',
    device: '',
  };
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addEmployeeForm = this.formBuilder.group({
      inputFirstName: ['', Validators.required],
      inputLastName: ['', Validators.required],
      inputDepartment: ['', Validators.required],
      inputEmail: [
        '',
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
      inputPhone: ['', Validators.nullValidator],
      inputDevice: ['', Validators.nullValidator],
    });
  }

  get f() {
    return this.addEmployeeForm.controls;
  }

  addEmployee() {
    this.error = '';
    this.submitted = true;

    console.log(this.addEmployeeForm.status);
    if (this.addEmployeeForm.invalid) {
      this.error = 'Incomplete form';
      return;
    }

    this.employeeService.addEmployee(this.addEmployeeRequest).subscribe({
      next: (employee) => {
        this.router.navigate(['employees']);
      },
    });
  }
}

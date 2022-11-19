import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  editEmployeeForm!: FormGroup;
  submitted = false;
  error = '';

  employeeDetails: Employee = {
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
    private route: ActivatedRoute,
    private employeeService: EmployeesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.employeeService.getEmployee(id).subscribe({
            next: (response) => {
              this.employeeDetails = response;
            },
          });
        }
      },
    });

    this.editEmployeeForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }, Validators.required],
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
    return this.editEmployeeForm.controls;
  }

  updateEmployee() {
    this.error = '';
    this.submitted = true;

    if (this.editEmployeeForm.invalid) {
      this.error = 'Incomplete form';
      return;
    }

    this.employeeService
      .updateEmployee(this.employeeDetails.id, this.employeeDetails)
      .subscribe({
        next: (response) => {
          this.router.navigate(['employees']);
        },
      });
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (response) => {
        this.router.navigate(['employees']);
      },
    });
  }
}

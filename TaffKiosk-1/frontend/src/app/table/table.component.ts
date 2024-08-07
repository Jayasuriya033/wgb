import { Component,OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})


export class TableComponent implements OnInit {
  employees: any[] = [];
  constructor(private employeeService: EmployeeService) {
  }

  
  ngOnInit(): void {
    this.fetchEmployees();
}


fetchEmployees(): void {
  this.employeeService.getEmployees().subscribe(
    ( res) => {
      this.employees = res;
    },
    (error) => {
      console.error('Error fetching employees:', error);
    }
  );
}
}
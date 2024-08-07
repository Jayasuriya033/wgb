import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../services/userservices';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  roleId :string | null = '';

  constructor(
    public logoutService: LogoutService
  ) {}

  ngOnInit(): void {
 this.roleId = localStorage.getItem('roleId');
  }
  


}

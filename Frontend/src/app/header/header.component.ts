import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isCollapse = true;


  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  toggleState() {
        const foo = this.isCollapse;
        this.isCollapse = foo === false ? true : false;
    }
}

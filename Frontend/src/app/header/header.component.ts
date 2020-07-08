import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isCollapse = true;


  constructor() { }

  ngOnInit(): void {
  }

  toggleState() {
        const foo = this.isCollapse;
        this.isCollapse = foo === false ? true : false;
    }
}

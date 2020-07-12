import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  focus : boolean;
  constructor() { }

  ngOnInit(): void {
    this.focus = false;
  }

  mostrarText():void{
    this.focus = true;
  }

}

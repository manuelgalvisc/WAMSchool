import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-objeto-aprendizaje',
  templateUrl: './objeto-aprendizaje.component.html',
  styleUrls: ['./objeto-aprendizaje.component.css']
})
export class ObjetoAprendizajeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  crearOA(){
    alert("hola");
  }

}

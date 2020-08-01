import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

@Component({
  selector: 'app-editor-texto',
  templateUrl: './editor-texto.component.html',
  styleUrls: ['./editor-texto.component.css']
})

export class EditorTextoComponent implements OnInit {

  @Output() editorTexto : EventEmitter<string>;
  texto: string = "";
  constructor() { 
    this.editorTexto = new EventEmitter<string>();
  }

  ngOnInit(): void {
  }

  changedEditor(event : EditorChangeContent | EditorChangeSelection){
    this.texto = event['editor']['root']['innerHTML'];
    this.editorTexto.emit(this.texto);
    //console.log(this.texto);
  }

}

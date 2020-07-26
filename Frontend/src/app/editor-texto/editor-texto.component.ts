import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

@Component({
  selector: 'app-editor-texto',
  templateUrl: './editor-texto.component.html',
  styleUrls: ['./editor-texto.component.css']
})

export class EditorTextoComponent implements OnInit {

  editorTexto : string = "";
  constructor() { }

  ngOnInit(): void {
  }

  changedEditor(event : EditorChangeContent | EditorChangeSelection){
    this.editorTexto = event['editor']['root']['innerHTML'];
    console.log(this.editorTexto);
  }

}

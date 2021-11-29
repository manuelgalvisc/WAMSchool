import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Enlace } from '../model/enlace';

@Component({
  selector: 'app-componenteyoutube',
  templateUrl: './componenteyoutube.component.html',
  styleUrls: ['./componenteyoutube.component.css']
})
/**
 * Componente que permite visualizar los videos de youtube,
 * solo es necesario ingresar el código
 */
export class ComponenteyoutubeComponent implements OnInit {

  @Input() enlace : Enlace;
  
  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    // This code loads the IFrame Player API code asynchronously, according to the instructions at
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
    console.log(this.enlace.url);
  }

}

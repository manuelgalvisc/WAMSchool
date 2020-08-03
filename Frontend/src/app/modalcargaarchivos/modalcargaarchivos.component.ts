import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modalcargaarchivos',
  templateUrl: './modalcargaarchivos.component.html',
  styleUrls: ['./modalcargaarchivos.component.css']
})
export class ModalcargaarchivosComponent implements OnInit {

n;

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { 

  }


  ngOnInit(): void {
  }

}

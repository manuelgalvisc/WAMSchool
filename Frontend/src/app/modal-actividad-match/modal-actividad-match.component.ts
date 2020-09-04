import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-actividad-match',
  templateUrl: './modal-actividad-match.component.html',
  styleUrls: ['./modal-actividad-match.component.css']
})
export class ModalActividadMatchComponent implements OnInit {

  constructor(private modalService: NgbModal,
              public activeModal: NgbActiveModal,) { }

  ngOnInit(): void {
  }

}

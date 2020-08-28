import { Component, OnInit } from '@angular/core';
import { ParejaItem } from '../model/parejaItem';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modalemparejamiento',
  templateUrl: './modalemparejamiento.component.html',
  styleUrls: ['./modalemparejamiento.component.css']
})
/**
 * Componente auxiliar Modal para crear las parejas 
 */
export class ModalemparejamientoComponent implements OnInit {

  constructor(private ngbModal:NgbModal,public ngbActive:NgbActiveModal) { }

  pareja1:string;
  pareja2:string;
  pareja:ParejaItem;
  mssError:string;


  ngOnInit(): void {
    this.mssError = "";
    this.pareja1 = "";
    this.pareja2 = "";
  }

  crear(){
    if(this.pareja1!=null && this.pareja2 != null){
      this.pareja = new ParejaItem();
      this.pareja.cadena1 = this.pareja1;
      this.pareja.cadena2 = this.pareja2;
      this.ngbActive.close(this.pareja);
    }else{
      this.mssError = "Debe llenar ambos campos";
    }
  }

}

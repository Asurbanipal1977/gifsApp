import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  constructor (private gifsService : GifsService ) { }

  ngOnInit(): void {
  }

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
  //El signo ! es un operador para asegurarase que ese objeto no es nulo

  buscar( ) : void {
    const valor = this.txtBuscar.nativeElement.value;

    if (valor.trim().length == 0) return;

    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value='';
  }

}

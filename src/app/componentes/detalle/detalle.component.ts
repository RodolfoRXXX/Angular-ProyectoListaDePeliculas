import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Pelicula } from 'src/app/entidades/peliculas';
import { AccesoBDService } from 'src/app/servicios/acceso-bd.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() id: string;
  @Input() longArray: number;

  @Output() cancelar = new EventEmitter();
  @Output() cambioStock = new EventEmitter();

  pelicula: any;

  constructor( private acceso: AccesoBDService ) { }

  ngOnInit(): void {
    this.getPelicula( this.id );
    console.log(this.id);
  }

  ngOnChanges( change: SimpleChanges ):void{
    this.id = change['id'].currentValue;
    this.pelicula = null;
    this.getPelicula( this.id );
  }

  getPelicula( id: string ){
    this.acceso.getListado( id ).subscribe( (data: any) => {
      this.pelicula = {...data};
    } )
  }

  alquilarPelicula( pelicula: Pelicula ){
    pelicula.stock--;
    this.acceso.alquilarPelicula( pelicula ).subscribe( (data) => {} )
    this.cambioStock.emit();
  }

  prev( id: string ){
    id = <any>(parseInt(id)-1);
    this.getPelicula( id );
  }

  next( id: string ){
    id = <any>(parseInt(id)+1);
    this.getPelicula( id );
  }

  cerrarDetalle(){
    this.cancelar.emit();
    this.pelicula = null;
  }

}

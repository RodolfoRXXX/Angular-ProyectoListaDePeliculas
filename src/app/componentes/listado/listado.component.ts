import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pelicula } from 'src/app/entidades/peliculas';
import { AccesoBDService } from 'src/app/servicios/acceso-bd.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  @Output() idDetalle: string;
  @Output() longArray: number;
  
  peliculas: Pelicula[];

  constructor( private acceso: AccesoBDService ) { }

  ngOnInit(): void {
    this.getListado();
  }

  getListado():void{
    this.acceso.getListado().subscribe( (data:Pelicula[]) => {
      this.peliculas = data;
      this.longArray = data.length;
    } )
  }

  onDetalle( id: string ){
    if(this.idDetalle != id){
      this.idDetalle = id;
    } else{
      this.idDetalle = '';
    }
  }

  cerrarDetalle(){
    this.idDetalle = '';
  }

  alquilarPelicula( pelicula: Pelicula ){
    pelicula.stock--;
    this.acceso.alquilarPelicula( pelicula ).subscribe( (data) => {} )
  }

  recargar(){
    this.getListado();
  }

}

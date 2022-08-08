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
  @Output() idEdicion: string;
  @Output() longArray: number;

  peliculas: Pelicula[];
  estado: string;

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
      this.idEdicion = "";
    } else{
      this.idDetalle = '';
    }
  }

  cerrarDetalle(){
    this.idDetalle = '';
  }

  alquilarPelicula( pelicula: Pelicula ){
    pelicula.stock--;
    this.acceso.alquilarPelicula( pelicula ).subscribe({
      next: () => {
        this.estado = 'alquilado'
      },
      error: () => {
        this.estado = 'noalquilado'
      }
    })
  }

  recargar(e: string){
    this.estado = e;
    this.getListado();
  }

  abrirCreacion(){
    this.idEdicion = "0";
    this.idDetalle = '';
  }

  cerrarCreacion(){
    this.idEdicion = "";
  }

  editarPelicula( id: string ){
    if(this.idEdicion != id){
      this.idEdicion = id;
      this.idDetalle = '';
    } else{
      this.idEdicion = '';
    }
  }

  eliminarPelicula( id: string ){
    this.acceso.eliminarPelicula(id).subscribe({
      next: () => {
        this.estado = 'eliminado'
      },
      error: () => {
        this.estado = 'noeliminado'
      },
      complete: () => {
        this.ngOnInit()
      }
    })
  }

}

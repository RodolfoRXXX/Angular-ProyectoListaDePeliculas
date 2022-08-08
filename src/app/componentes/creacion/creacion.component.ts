import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pelicula } from 'src/app/entidades/peliculas';
import { AccesoBDService } from 'src/app/servicios/acceso-bd.service';

@Component({
  selector: 'app-creacion',
  templateUrl: './creacion.component.html',
  styleUrls: ['./creacion.component.css']
})
export class CreacionComponent implements OnInit {
  @Output() cancelar = new EventEmitter();
  @Output() cambios  = new EventEmitter(); 

  @Input() id: string;

  pelicula: Pelicula;
  formulario: FormGroup;

  constructor( private acceso: AccesoBDService ) { }

  ngOnInit(): void {
    if(this.id != '0'){
      this.getPelicula(this.id);
    } else{
      this.crearFormulario();
    }
  }

  getPelicula( id: string ){
    this.acceso.getListado(id).subscribe( (data: any) => {
      this.crearFormulario( {...data} );
    } )
  }

  crearFormulario( pelicula?: Pelicula ){
    (pelicula != undefined)?this.pelicula = pelicula:'';
    this.formulario = new FormGroup({
      titulo: new FormControl((pelicula?.titulo)?pelicula.titulo:'',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ]),
      genero: new FormControl((pelicula?.genero)?pelicula.genero:'',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      foto: new FormControl((pelicula?.foto)?pelicula.foto:'',
      [
        Validators.required,
        Validators.maxLength(200)
      ]),
      year: new FormControl((pelicula?.year)?pelicula.year:'',
      [
        Validators.required,
        Validators.min(1000),
        Validators.max(2100)
      ]),
      stock: new FormControl((pelicula?.stock)?pelicula.stock:'',
      [
        Validators.required
      ]),
      precio: new FormControl((pelicula?.precio)?pelicula.precio:'',
      [
        Validators.required
      ]),
      id: new FormControl((pelicula?.id)?pelicula.id:'')
    })
  }
  

  onSubmit(){
    if(this.formulario.valid){
      if(this.formulario.controls?.['id'].value == ''){
        this.acceso.crearPelicula(this.formulario.value).subscribe({
          next: () => {
              this.cambios.emit('creado')
          },
          error: () => {
            this.cambios.emit('nocreado')
          },
          complete: () => {
            this.cancelarCreacion();
          }
        })
      } else{
        this.acceso.editarPelicula(this.formulario.value).subscribe({
          next: () => {
              this.cambios.emit('actualizado')
          },
          error: () => {
              this.cambios.emit('noactualizado')
          },
          complete: () => {
            this.cancelarCreacion();
          }
        })
      }
    }
  }

  cancelarCreacion(){
    this.cancelar.emit();
  }

}

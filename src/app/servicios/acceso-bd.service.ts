import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Pelicula } from '../entidades/peliculas';

@Injectable({
  providedIn: 'root'
})
export class AccesoBDService {
  url: string = "https://62e9b0c001787ec7121b68cf.mockapi.io/peliculas/";

  constructor( private http: HttpClient ) { }

  //HEADERS
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'Application/json'
    })
  }

  //HandleERROR
  private handleError( error: HttpErrorResponse ){
    if( error.error instanceof ErrorEvent ){
      console.warn( 'Ocurrió un error: ', error.error.message );
    } else{
      console.warn( `El backend retornó el código de error: ${error.status}, el cuerpo del mensaje de error es: ${error.message}` );
    }

    return throwError(()=>new Error('test'));
  }

  //GET
  getListado( id?:string|undefined ){
    return this.http.get<Pelicula[]>(this.url + (id||''))
              .pipe(
                catchError( this.handleError )
              );
  }

  //PUT
  alquilarPelicula( pelicula: Pelicula ){
    return this.http.put<Pelicula>(this.url + pelicula.id,pelicula, this.httpOptions)
              .pipe(
                catchError(this.handleError)
              );
  }

}

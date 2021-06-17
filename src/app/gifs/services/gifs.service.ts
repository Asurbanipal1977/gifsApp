import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apikey: string = 'oxF831f46Cje78UUuKUYRjK2u6LlCUwm';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  constructor (private http: HttpClient) {
      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
      this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  };

  get historial()
  {
     return [...this._historial];
  }
  buscarGifs (query : string) {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query))
    {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify( this._historial));
      console.log(this._historial);
    }
    const params = new HttpParams()
      .set('api_key',this._apikey)
      .set('q',query)
      .set('limit','10');

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
    .subscribe((resp)=> 
    {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify( this.resultados));
    });

    /*
    fetch('https://api.giphy.com/v1/gifs/search?api_key=oxF831f46Cje78UUuKUYRjK2u6LlCUwm&q=dragon ball&limit=10')
    .then(resp => resp.json())
    .then(data => console.log(data));*/
  }
}

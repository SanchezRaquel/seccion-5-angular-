import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchRespose, Gifs } from '../interfaces/gifs.interface';

@Injectable({providedIn: 'root'})
export class GifsService {
  public gifsList: Gifs[]=[];

  private _tagsHitory:      string[]=[];
  private apiKey:           string='NLRUdKNIvB9HmL3gIbnR8ig4uMnVWa7X';
  private serviceUrl:       string='https://api.giphy.com/v1/gifs';

  constructor( private http:HttpClient) { }

  get tagsHistory(){
    return [...this._tagsHitory];
  }

  private organizeHistory(tag:string){

    tag=tag.toLowerCase(); //Se pasa a minusculas para guardar el arreglo

    if(this._tagsHitory.includes(tag)){
      this._tagsHitory=this._tagsHitory.filter((oldTag)=>oldTag !==tag) //Se elimina que se dupliquen busquedad en tag
    }
    this._tagsHitory.unshift(tag); //Se inserta
    this._tagsHitory=this._tagsHitory.splice(0,10); //aqui solo se permiten que haya 10 busquedas a lo maximo

    }


  public searchTag(tag:string): void{
    if (tag.length===0)return; //Validacion para no dejar dar enter con el espacio vacio en busqueda
    this.organizeHistory(tag);

    const params=new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit', '40')
      .set('q',tag)


    this.http.get<SearchRespose>(`${this.serviceUrl}/search`,{params})
.subscribe(resp=>{

  this.gifsList=resp.data;
  // console.log({Gifs:this.gifsList});
});
  }

}

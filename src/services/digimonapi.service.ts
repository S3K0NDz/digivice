import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DigimonapiService {

  constructor(private http: HttpClient) { }

  getDigimonList(pageSize: number, page: number, name?: string, attribute?: string, level?: string): Observable<any[]> {
    let params = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('page', page.toString())

    if (name) {
      params = params.set('name', name);
    }

    if (attribute) {
      params = params.set('attribute', attribute);
    }

    if (level) {
      params = params.set('level', level);
    }

    const url = 'https://www.digi-api.com/api/v1/digimon';
    return this.http.get<any[]>(url, { params });
  }

  getAttributes(): Observable<string[]> {
    const url = 'https://www.digi-api.com/api/v1/attribute';

    return this.http.get<any>(url).pipe(
      map(response => {
        const attributes = response.content.fields.map((field: { name: any; }) => field.name);
        return attributes;
      })
    );
  }

  getLevels(): Observable<string[]> {
    const url = 'https://www.digi-api.com/api/v1/level';
    
    return this.http.get<any>(url).pipe(
      map(response => {
        const attributes = response.content.fields.map((field: { name: any; }) => field.name);
        return attributes;
      })
    );
  }


  getDigimon(digimonNumber: number): Observable<any> {
    const url = `https://www.digi-api.com/api/v1/digimon/${digimonNumber}`;
    return this.http.get(url);
  }
 

}




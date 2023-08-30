import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DigimonapiService {

  constructor(private http: HttpClient) { }

  // Función para obtener una lista de digimon basada en varios filtros
  getDigimonList(pageSize: number, page: number, name?: string, attribute?: string, level?: string): Observable<any[]> {
    // Crea un objeto HttpParams para construir los parámetros de la consulta
    let params = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('page', page.toString())

    // Verifica si se proporcionan parámetros opcionales y agrégales a la consulta
    if (name) {
      params = params.set('name', name);
    }

    if (attribute) {
      params = params.set('attribute', attribute);
    }

    if (level) {
      params = params.set('level', level);
    }

    // URL de la API para obtener datos de los digimon
    const url = 'https://www.digi-api.com/api/v1/digimon';
    
    // Realiza la solicitud HTTP GET con los parámetros especificados
    return this.http.get<any[]>(url, { params });
  }

  // Función para obtener una lista de atributos desde la API
  getAttributes(): Observable<string[]> {
    const url = 'https://www.digi-api.com/api/v1/attribute';

    // Realiza la solicitud HTTP GET y mapea la respuesta para extraer los atributos
    return this.http.get<any>(url).pipe(
      map(response => {
        const attributes = response.content.fields.map((field: { name: any; }) => field.name);
        return attributes;
      })
    );
  }

  // Función para obtener una lista de niveles desde la API
  getLevels(): Observable<string[]> {
    const url = 'https://www.digi-api.com/api/v1/level';
    
    // Realiza la solicitud HTTP GET y mapea la respuesta para extraer los niveles
    return this.http.get<any>(url).pipe(
      map(response => {
        const attributes = response.content.fields.map((field: { name: any; }) => field.name);
        return attributes;
      })
    );
  }

  // Función para obtener detalles de un digimon específico por su número
  getDigimon(digimonNumber: number): Observable<any> {
    const url = `https://www.digi-api.com/api/v1/digimon/${digimonNumber}`;
    // Realiza la solicitud HTTP GET para obtener detalles del digimon
    return this.http.get(url);
  }
}

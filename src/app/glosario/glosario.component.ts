import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Define las interfaces para los datos
interface Data {
  description: any;
  details: Data;
  id: number;
  name: string;
  href: string;
}

interface ApiResponse {
  content: {
    description: string;
    fields: Data[];
  };
  pageable: {
    nextPage: string;
  };
}

@Component({
  selector: 'app-glosario',
  templateUrl: './glosario.component.html',
  styleUrls: ['./glosario.component.css']
})
export class GlosarioComponent implements OnInit {
  // Arreglos para almacenar los niveles, atributos y campos
  levels: Data[] = [];
  attributes: Data[] = [];
  fields: Data[] = [];

  // Descripciones de las categorías
  descriptionLevels: string = '';
  descriptionAttributes: string = '';
  descriptionFields: string = '';

  // URLs de las APIs
  apiUrlLevel = 'https://www.digi-api.com/api/v1/level';
  apiUrlAttribute = 'https://www.digi-api.com/api/v1/attribute';
  apiUrlFields = 'https://www.digi-api.com/api/v1/field';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Carga los niveles, atributos y campos al inicializar el componente
    this.fetchLevels(this.apiUrlLevel);
    this.fetchAttributes(this.apiUrlAttribute);
    this.fetchFields(this.apiUrlFields);
  }

  // Función para obtener atributos desde la API recursivamente
  fetchAttributes(url: string): void {
    this.http.get<ApiResponse>(url).subscribe(response => {
      this.descriptionAttributes = response.content.description;
      const currentPageAttributes = response.content.fields;

      for (const attribute of currentPageAttributes) {
        this.http.get<Data>(attribute.href).subscribe(attributeDetails => {
          attribute.description = attributeDetails.description;
        });
      }

      this.attributes = this.attributes.concat(currentPageAttributes);

      if (response.pageable.nextPage) {
        this.fetchAttributes(response.pageable.nextPage);
      } else {
        console.log("Attributes", this.attributes);
      }
    });
  }

  // Función para obtener campos desde la API recursivamente
  fetchFields(url: string): void {
    this.http.get<ApiResponse>(url).subscribe(response => {
      this.descriptionFields = response.content.description;
      const currentPageFields = response.content.fields;

      for (const field of currentPageFields) {
        this.http.get<Data>(field.href).subscribe(fieldDetails => {
          field.description = fieldDetails.description;
          field.href = fieldDetails.href;
        });
      }

      this.fields = this.fields.concat(currentPageFields);

      if (response.pageable.nextPage) {
        this.fetchFields(response.pageable.nextPage);
      } else {
        console.log("Fields", this.fields);
      }
    });
  }

  // Función para obtener niveles desde la API recursivamente
  fetchLevels(url: string): void {
    this.http.get<ApiResponse>(url).subscribe(response => {
      this.descriptionLevels = response.content.description;
      const currentPageLevels = response.content.fields;

      for (const level of currentPageLevels) {
        this.http.get<Data>(level.href).subscribe(levelDetails => {
          level.description = levelDetails.description;
        });
      }

      this.levels = this.levels.concat(currentPageLevels);

      if (response.pageable.nextPage) {
        this.fetchLevels(response.pageable.nextPage);
      } else {
        console.log("Levels", this.levels);
      }
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-digimon-detail',
  templateUrl: './digimon-detail.component.html',
  styleUrls: ['./digimon-detail.component.css']
})
export class DigimonDetailComponent implements OnInit {
  digimonDetails: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location, private router: Router) { }

  ngOnInit() {
    // Obtiene el ID del digimon de los parámetros de la ruta actual
    const id = this.route.snapshot.paramMap.get('id');

    // Si hay un ID, realiza la solicitud para obtener los detalles del digimon
    if (id) {
      const url = `https://www.digi-api.com/api/v1/digimon/${id}`;
      this.http.get(url).subscribe((data) => {
        this.digimonDetails = data;
      });
    }
  }

  // Función para obtener la descripción en inglés de un array de descripciones
  getEnglishDescription(descriptions: any) {
    const englishDescription = descriptions.find((desc: { language: string; }) => desc.language === 'en_us');
    return englishDescription ? englishDescription.description : 'no hay descripción';
  }

  // Función para regresar a la página anterior
  public goBack() {
    this.location.back();
  }

  // Función asincrónica para navegar a los detalles de otro digimon
  async irDetalles(id: number) {
    // Crea una nueva promesa y resuélvela inmediatamente
    await new Promise<void>(resolve => {
      resolve();
    });

    // Navega a la página de detalles de digimon con el ID proporcionado
    this.router.navigate(['/digimon-details', id]);
  }
}

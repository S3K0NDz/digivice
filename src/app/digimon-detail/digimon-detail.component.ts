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
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const url = `https://www.digi-api.com/api/v1/digimon/${id}`;
      this.http.get(url).subscribe((data) => {
        this.digimonDetails = data;
      });
    }
  }

  getEnglishDescription(descriptions: any) {
    const englishDescription = descriptions.find((desc: { language: string; }) => desc.language === 'en_us');
    return englishDescription ? englishDescription.description : 'no hay descripción';
  }

  public goBack() {
    this.location.back();
  }

  async irDetalles(id: number) {


    new Promise<void>(resolve => {
      resolve();
    });

    this.router.navigate(['/digimon-details', id]);
  }
}

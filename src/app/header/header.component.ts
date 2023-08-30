import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router) { }

 // Función para navegar a los detalles de un digimon
 digimonList() {
  this.router.navigate(['/digimon-list']);
}
  

}

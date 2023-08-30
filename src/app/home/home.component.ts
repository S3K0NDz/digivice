import { Component, OnInit, OnDestroy } from '@angular/core';
import { DigimonapiService } from 'src/services/digimonapi.service';
import { Subscription, interval } from 'rxjs';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  digimonData: any;
  private alive = true;
  private subscription: Subscription | undefined;

  constructor(private digimonapiService: DigimonapiService, private router: Router) { }

  ngOnInit(): void {
    // Inicia con la obtención y muestra de un digimon aleatorio
    this.randomizeAndFetchDigimon();
    // Inicia el intervalo para obtener y mostrar digimons aleatorios cada 3 segundos
    this.startInterval();
  }

  ngOnDestroy(): void {
    // Se desactiva la bandera 'alive' y se cancela la suscripción al intervalo
    this.alive = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Función para navegar a los detalles de un digimon
  digimonDetail(idDigimon: any) {
    this.router.navigate(['/digimon-details', idDigimon]);
  }

  // Genera un número aleatorio entre 1 y 1000
  private randomizeNumber(): number {
    return Math.floor(Math.random() * 1000) + 1;
  }

  // Obtiene y muestra un digimon aleatorio
  private randomizeAndFetchDigimon(): void {
    const digimonNumber = this.randomizeNumber();
    this.digimonapiService.getDigimon(digimonNumber).subscribe(
      (data) => {
        this.digimonData = data;
        console.log(this.digimonData);
      },
      (error) => {
        console.error('Error fetching digimon data:', error);
      }
    );
  }

  // Inicia el intervalo para obtener y mostrar digimons aleatorios
  private startInterval(): void {
    const source = interval(3000); // Crea un intervalo de 3 segundos
    this.subscription = source.pipe(
      takeWhile(() => this.alive) // Continúa mientras 'alive' sea verdadero
    ).subscribe(() => {
      this.randomizeAndFetchDigimon(); // Obtiene y muestra un nuevo digimon aleatorio
    });
  }
}

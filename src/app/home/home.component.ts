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
    this.randomizeNumber();
    this.startInterval();
  }







  ngOnDestroy(): void {
    this.alive = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }



  digimonDetail(idDigimon: any) {
    this.router.navigate(['/digimon-details', idDigimon]);
  }



  private randomizeNumber(): number {
    return Math.floor(Math.random() * 1000) + 1; // Generamos un número aleatorio entre 1 y 1000
  }

  private startInterval(): void {
    const source = interval(3000); // Creamos un intervalo de 3 segundos
    this.subscription = source.pipe(
      takeWhile(() => this.alive) // Continuamos mientras 'alive' sea verdadero
    ).subscribe(() => {
      const digimonNumber = this.randomizeNumber(); // Generamos un nuevo número aleatorio
      this.digimonapiService.getDigimon(digimonNumber).subscribe(
        (data) => {
          this.digimonData = data;
          console.log(this.digimonData);
        },
        (error) => {
          console.error('Error fetching digimon data:', error);
        }
      );
    });
  }
}

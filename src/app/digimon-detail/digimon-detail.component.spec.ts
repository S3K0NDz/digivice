import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigimonDetailComponent } from './digimon-detail.component';

describe('DigimonDetailComponent', () => {
  let component: DigimonDetailComponent;
  let fixture: ComponentFixture<DigimonDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DigimonDetailComponent]
    });
    fixture = TestBed.createComponent(DigimonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

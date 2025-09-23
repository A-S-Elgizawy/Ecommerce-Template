import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FevoritComponent } from './fevorit.component';

describe('FevoritComponent', () => {
  let component: FevoritComponent;
  let fixture: ComponentFixture<FevoritComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FevoritComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FevoritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Shop5Component } from './shop5.component';

describe('Shop5Component', () => {
  let component: Shop5Component;
  let fixture: ComponentFixture<Shop5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shop5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Shop5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

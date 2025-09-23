import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Shop4Component } from './shop4.component';

describe('Shop4Component', () => {
  let component: Shop4Component;
  let fixture: ComponentFixture<Shop4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shop4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Shop4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

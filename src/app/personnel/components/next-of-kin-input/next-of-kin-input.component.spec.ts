import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextOfKinInputComponent } from './next-of-kin-input.component';

describe('NextOfKinInputComponent', () => {
  let component: NextOfKinInputComponent;
  let fixture: ComponentFixture<NextOfKinInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextOfKinInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NextOfKinInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

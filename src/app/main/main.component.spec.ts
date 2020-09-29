import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MainComponent} from './main.component';
import {By} from '@angular/platform-browser';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have button with name generate', () => {
    const debug = fixture.debugElement.query(By.css('button[name="generate"]'));
    const buttonElem = debug.nativeElement;
    expect(buttonElem.name).toContain('generate');
  });

  it('should have button with name sort', () => {
    const debug = fixture.debugElement.query(By.css('button[name="sort"]'));
    const buttonElem = debug.nativeElement;
    expect(buttonElem.name).toContain('sort');
  });

});

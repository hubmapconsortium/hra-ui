import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerSelectorComponent } from './server-selector.component';

describe('ServerSelectorComponent', () => {
  let component: ServerSelectorComponent;
  let fixture: ComponentFixture<ServerSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServerSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

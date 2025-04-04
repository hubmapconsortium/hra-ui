import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerSelectorComponent } from './server-selector.component';
import { servers } from '../../constants/server.constants';

describe('ServerSelectorComponent', () => {
  let component: ServerSelectorComponent;
  let fixture: ComponentFixture<ServerSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServerSelectorComponent);
    fixture.componentRef.setInput('servers', servers);
    fixture.componentRef.setInput('selectedServer', servers[0]);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});

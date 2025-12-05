import { NgControl } from '@angular/forms';
import { render } from '@testing-library/angular';
import { BehaviorSubject } from 'rxjs';
import { OmapControlsComponent } from './omap-controls.component';

describe('OmapControlsComponent', () => {
  async function setup() {
    return render(OmapControlsComponent, {
      providers: [
        {
          provide: NgControl,
          useValue: { valueChanges: new BehaviorSubject(null) },
        },
      ],
    });
  }

  it('should create', async () => {
    const { fixture } = await setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should emit updated config when checkbox is clicked', async () => {
    const { fixture } = await setup();
    const component = fixture.componentInstance;
    const updateConfigSpy = jest.fn();
    component['updateConfig'].subscribe(updateConfigSpy);

    component.checkBoxClicked({ organsOnly: true, proteinsOnly: false });

    expect(updateConfigSpy).toHaveBeenCalledWith({ organsOnly: true, proteinsOnly: false });
  });

  it('should update both checkbox values', async () => {
    const { fixture } = await setup();
    const component = fixture.componentInstance;
    const updateConfigSpy = jest.fn();
    component['updateConfig'].subscribe(updateConfigSpy);

    component.checkBoxClicked({ organsOnly: true, proteinsOnly: true });

    expect(updateConfigSpy).toHaveBeenCalledWith({ organsOnly: true, proteinsOnly: true });
  });
});

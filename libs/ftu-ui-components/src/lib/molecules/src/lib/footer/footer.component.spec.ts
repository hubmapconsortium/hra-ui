import { OverlayModule } from '@angular/cdk/overlay';
import { MatListModule } from '@angular/material/list';
import { LinkDirective } from '@hra-ui/cdk';
import { selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { Shallow } from 'shallow-render';

import { FooterComponent } from './footer.component';

jest.mock('@hra-ui/cdk/injectors');
jest.mocked(selectQuerySnapshot).mockReturnValue(() => undefined as never);

describe('FooterComponent', () => {
  let shallow: Shallow<FooterComponent>;

  beforeEach(() => {
    shallow = new Shallow(FooterComponent).dontMock(OverlayModule, MatListModule, LinkDirective);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  it('should do nothing if download list is open and the download button is clicked', async () => {
    const mockEvent = {
      target: { innerText: 'download' } as unknown,
    } as MouseEvent;
    const { instance } = await shallow.render();
    instance.downloadListOpen = true;
    instance.handleOutsideClick(mockEvent);
    expect(instance.downloadListOpen).toBeTruthy();
  });

  it('should close the download list if open and the user clicks somewhere besides the button', async () => {
    const mockEvent = {
      target: { innerText: 'Somewhere Else' } as unknown,
    } as MouseEvent;
    const { instance } = await shallow.render();
    instance.downloadListOpen = true;
    instance.handleOutsideClick(mockEvent);
    expect(instance.downloadListOpen).toBeFalsy();
  });
});

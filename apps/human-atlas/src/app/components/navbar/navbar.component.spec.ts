import { Shallow } from 'shallow-render';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let shallow: Shallow<NavbarComponent>;

  beforeEach(async () => {
    shallow = new Shallow(NavbarComponent, ToolbarModule);
    jest.spyOn(window, 'open').mockImplementation();
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  it('should emit itemClick event when externalWindow is called', async () => {
    const { instance } = await shallow.render();
    const url = 'https://humanatlas.io';
    window.open = jest.fn();
    instance.externalWindow(url);
    expect(window.open).toHaveBeenCalledWith(url, '_blank');
  });
});

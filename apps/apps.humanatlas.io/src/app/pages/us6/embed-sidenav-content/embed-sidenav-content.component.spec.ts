import { By, DomSanitizer } from '@angular/platform-browser';
import { render, screen, fireEvent } from '@testing-library/angular';
import { MatTabsModule } from '@angular/material/tabs';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { CodeBlockComponent } from '@hra-ui/design-system/code-block';
import { EmbedSidenavContentComponent } from './embed-sidenav-content.component';
import { FlatCardModule } from '@hra-ui/design-system/cards/flat-card';

describe('EmbedSidenavContentComponent', () => {
  const renderComponent = async (props = {}) => {
    return render(EmbedSidenavContentComponent, {
      imports: [MatTabsModule, ButtonsModule, CodeBlockComponent, FlatCardModule],
      providers: [
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustHtml: (val: string) => val,
          },
        },
      ],
      inputs: {
        tagline: 'Test Tagline',
        code: '<p>Test Code</p>',
        showApp: true,
        documentLink: 'https://example.com',
        ...props,
      },
    });
  };

  it('should create', async () => {
    const result = await renderComponent();
    expect(result.fixture.componentInstance).toBeTruthy();
  });

  it('should display the correct tagline', async () => {
    await renderComponent({ tagline: 'Test Tagline' });
    expect(screen.getByText('Test Tagline')).toBeTruthy();
  });

  it('should show tab group when showApp is true', async () => {
    await renderComponent({ showApp: true });
    expect(screen.getByRole('tablist')).toBeTruthy();
  });

  it('should emit closeSidenav event when close button is clicked', async () => {
    const { fixture } = await renderComponent();
    const component = fixture.componentInstance;
    const closeSpy = jest.spyOn(component.closeSidenav, 'emit');

    const closeButton = fixture.debugElement.query(By.css('hra-flat-card')).componentInstance;
    closeButton.closeClick.emit();

    expect(closeSpy).toHaveBeenCalled();
  });

  it('should open document link in new tab when Documentation button is clicked', async () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation();
    await renderComponent();

    const docButton = screen.getByText('Documentation');
    fireEvent.click(docButton);

    expect(openSpy).toHaveBeenCalledWith('https://example.com', '_blank');
  });
});

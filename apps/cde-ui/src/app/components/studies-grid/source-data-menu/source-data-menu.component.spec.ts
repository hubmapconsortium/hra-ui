import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { PublicationItem } from '../../../state/studies/with-studies.feature';
import { SourceDataMenuComponent } from './source-data-menu.component';

describe('SourceDataMenuComponent', () => {
  const SINGLE_PUBLICATION: PublicationItem[] = [{ label: 'Test Publication', url: 'https://example.com/test' }];

  const MULTIPLE_PUBLICATIONS: PublicationItem[] = [
    { label: 'Publication 1', url: 'https://example.com/1' },
    { label: 'Publication 2', url: 'https://example.com/2' },
  ];

  const THREE_PUBLICATIONS: PublicationItem[] = [
    { label: 'Publication 1', url: 'https://example.com/1' },
    { label: 'Publication 2', url: 'https://example.com/2' },
    { label: 'Publication 3', url: 'https://example.com/3' },
  ];

  const EMPTY_PUBLICATIONS: PublicationItem[] = [];

  async function setup(publications: PublicationItem[] = SINGLE_PUBLICATION) {
    const renderResult = await render(SourceDataMenuComponent, {
      inputs: { publications },
    });

    return {
      ...renderResult,
      user: userEvent.setup(),
    };
  }

  describe('Single Publication', () => {
    it('should render a single link button when there is one publication', async () => {
      await setup(SINGLE_PUBLICATION);

      const button = screen.getByRole('link', { name: /source data/i });
      expect(button).toBeInTheDocument();
    });

    it('should set the correct href on the link', async () => {
      await setup(SINGLE_PUBLICATION);

      const link = screen.getByRole('link', { name: /source data/i });
      expect(link).toHaveAttribute('href', 'https://example.com/test');
    });
  });

  describe('Multiple Publications', () => {
    it('should render a menu button when there are multiple publications', async () => {
      await setup(MULTIPLE_PUBLICATIONS);

      const button = screen.getByRole('button', { name: /source data/i });
      expect(button).toBeInTheDocument();
    });

    it('should not render a menu by default', async () => {
      const { fixture } = await setup(MULTIPLE_PUBLICATIONS);

      const menu = fixture.nativeElement.querySelector('mat-menu');
      expect(menu).toBeInTheDocument();
    });

    it('should open menu when button is clicked', async () => {
      const { user } = await setup(MULTIPLE_PUBLICATIONS);

      const button = screen.getByRole('button', { name: /source data/i });
      await user.click(button);

      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems).toHaveLength(2);
    });

    it('should render all publications as menu items', async () => {
      const { user } = await setup(THREE_PUBLICATIONS);

      const button = screen.getByRole('button', { name: /source data/i });
      await user.click(button);

      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems).toHaveLength(3);
    });

    it('should set correct href on menu item links', async () => {
      const { user } = await setup(MULTIPLE_PUBLICATIONS);

      const button = screen.getByRole('button', { name: /source data/i });
      await user.click(button);

      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems[0]).toHaveAttribute('href', 'https://example.com/1');
      expect(menuItems[1]).toHaveAttribute('href', 'https://example.com/2');
    });

    it('should have open_in_new icon on menu items', async () => {
      const { user } = await setup(MULTIPLE_PUBLICATIONS);

      const button = screen.getByRole('button', { name: /source data/i });
      await user.click(button);

      const icons = screen.getAllByText('open_in_new');
      expect(icons).toHaveLength(2);
    });
  });

  describe('Empty State', () => {
    it('should not render anything when publications array is empty', async () => {
      await setup(EMPTY_PUBLICATIONS);

      const buttons = screen.queryAllByRole('button');
      const links = screen.queryAllByRole('link');
      expect(buttons).toHaveLength(0);
      expect(links).toHaveLength(0);
    });
  });
});

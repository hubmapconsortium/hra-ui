import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { InfoModalComponent } from './info-modal.component';

describe('InfoModalComponent', () => {
  const data = [
    { label: 'Cell type', value: 'T cell' },
    { label: 'CL ID', value: 'CL:0000084' },
  ];

  it('is a group named by its title, with a description list and a labeled close button', async () => {
    const { fixture } = await render(InfoModalComponent, {
      inputs: { title: 'Cell info', closeLabel: 'Close cell info', data },
    });
    const close = jest.fn();
    fixture.componentInstance.close.subscribe(close);

    expect(screen.getByRole('group', { name: 'Cell info' })).not.toHaveAttribute('title');
    expect(screen.queryByText('Cell info')).not.toBeInTheDocument();
    expect(screen.getByText('Cell type')).toBeInTheDocument();
    expect(screen.getByText('CL:0000084')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Close cell info' }));
    expect(close).toHaveBeenCalled();
  });

  it('labels the close button "Close" by default', async () => {
    await render(InfoModalComponent, { inputs: { title: 'Cell info' } });

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });
});

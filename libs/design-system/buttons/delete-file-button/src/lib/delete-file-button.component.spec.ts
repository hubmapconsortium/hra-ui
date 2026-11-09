import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { DeleteFileButtonComponent } from './delete-file-button.component';

describe('DeleteFileButtonComponent', () => {
  it('names the delete button after the file', async () => {
    await render(DeleteFileButtonComponent, { inputs: { fileName: 'nodes.csv' } });

    expect(screen.getByText('nodes.csv')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete nodes.csv' })).toBeInTheDocument();
  });

  it('emits cancelLoad when clicked', async () => {
    const cancelLoad = jest.fn();
    await render(DeleteFileButtonComponent, { inputs: { fileName: 'nodes.csv' }, on: { cancelLoad } });

    await userEvent.click(screen.getByRole('button', { name: 'Delete nodes.csv' }));
    expect(cancelLoad).toHaveBeenCalled();
  });
});

import { render, screen, fireEvent } from '@testing-library/angular';
// import userEvent from '@testing-library/user-event';
import { CreateVisualizationPageComponent } from './create-visualization-page.component';

describe('CreateVisualizationPageComponent', () => {
  it('should render the form and allow input', async () => {
    // const user = userEvent.setup();
    await render(CreateVisualizationPageComponent);

    const inputElements = {
      title: screen.getByLabelText(/title/i),
      age: screen.getByLabelText(/age/i),
      organ: screen.getByLabelText(/organ/i),
    };

    fireEvent.input(inputElements.title, { target: { value: 'Example Title' } });
    expect(inputElements.title).toHaveValue('Example Title');

    fireEvent.input(inputElements.age, { target: { value: '25' } });
    expect(inputElements.age).toHaveValue(25);

    fireEvent.change(inputElements.organ, { target: { value: 'Heart' } });
    expect(inputElements.organ).toHaveValue('Heart');

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  });
});

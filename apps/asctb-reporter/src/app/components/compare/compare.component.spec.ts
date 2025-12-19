import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { CompareData } from '../../models/sheet.model';
import { CompareComponent } from './compare.component';

describe('CompareComponent', () => {
  const VALID_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit';

  const createMockSheet = (overrides?: Partial<CompareData>): CompareData => ({
    title: 'Test Sheet',
    description: 'Test description',
    link: `${VALID_SHEET_URL}#gid=123`,
    color: '#FF0000',
    fileName: 'test.csv',
    formData: new FormData(),
    sheetId: 'test-sheet-id',
    gid: '123',
    csvUrl: '',
    ...overrides,
  });

  const renderComponent = async (compareSheets: CompareData[] = []) => {
    const compareDataSpy = jest.fn();
    const result = await render(CompareComponent, {
      inputs: {
        compareSheets,
      },
      on: { compareData: compareDataSpy },
    });

    return { fixture: result.fixture, compareDataSpy };
  };

  it('should render with compare sheets data', async () => {
    await renderComponent([createMockSheet()]);
    expect(screen.getByText(/Dataset 1/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Sheet')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test description')).toBeInTheDocument();
  });

  it('should render with empty data and create default sheet', async () => {
    await renderComponent();
    expect(screen.getByText(/Dataset 1/i)).toBeInTheDocument();
  });

  it('should allow switching between file and link input', async () => {
    const user = userEvent.setup();
    await renderComponent();
    expect(screen.getByText(/Upload file/i)).toBeInTheDocument();
    const linkToggle = screen.getByText(/Link URL/i);
    await user.click(linkToggle);
    expect(screen.getByLabelText(/Google Sheet or CSV URL/i)).toBeInTheDocument();
  });

  it('should add and remove compare sheet rows', async () => {
    const user = userEvent.setup();
    await renderComponent();
    const addButton = screen.getByRole('button', { name: /Add Dataset/i });
    await user.click(addButton);
    expect(screen.getByText(/Dataset 2/i)).toBeInTheDocument();
    const removeButtons = screen
      .getAllByRole('button')
      .filter((btn) => btn.getAttribute('hrafeature') === 'remove-dataset');
    await user.click(removeButtons[1]);
    expect(screen.queryByText(/Dataset 2/i)).not.toBeInTheDocument();
  });

  it('should emit compare data when form is valid and compare is clicked', async () => {
    const user = userEvent.setup();
    const { compareDataSpy } = await renderComponent([]);
    const linkToggle = screen.getByRole('radio', { name: /Link URL/i });
    await user.click(linkToggle);
    const linkInput = screen.getByLabelText(/Google Sheet or CSV URL/i);
    await user.type(linkInput, `${VALID_SHEET_URL}#gid=123`);
    const compareButton = screen.getByRole('button', { name: /Compare/i });
    await user.click(compareButton);
    expect(compareDataSpy).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          link: `${VALID_SHEET_URL}#gid=123`,
          sheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
          gid: '123',
        }),
      ]),
    );
  });

  it('should not emit compare data when form is invalid', async () => {
    const user = userEvent.setup();
    const { compareDataSpy } = await renderComponent([]);
    const linkToggle = screen.getByRole('radio', { name: /Link URL/i });
    await user.click(linkToggle);
    const compareButton = screen.getByRole('button', { name: /Compare/i });
    await user.click(compareButton);
    expect(compareDataSpy).not.toHaveBeenCalled();
  });

  it('should set formData control value when file is uploaded', async () => {
    const user = userEvent.setup();
    await renderComponent();
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['dummy content'], 'test.csv', { type: 'text/csv' });
    await user.upload(fileInput, file);
    expect(fileInput.files?.[0]).toBe(file);
    expect(fileInput.files).toHaveLength(1);
  });

  it('should show error state on compare button when form is invalid', async () => {
    const user = userEvent.setup();
    await renderComponent();
    const linkToggle = screen.getByRole('radio', { name: /Link URL/i });
    await user.click(linkToggle);
    const compareButton = screen.getByRole('button', { name: /Compare/i });
    await user.click(compareButton);
    expect(compareButton.className).toMatch(/compare-button-color/);
  });
});

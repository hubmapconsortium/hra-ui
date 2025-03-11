import { render } from '@testing-library/angular';
import { CodeBlockComponent } from './code-block.component';
import { provideCodeBlock } from './providers';

describe('CodeBlockComponent', () => {
  it('should create', async () => {
    const result = render(CodeBlockComponent, {
      providers: [provideCodeBlock()],
      inputs: {
        code: '',
        language: 'html',
      },
    });
    await expect(result).resolves.toBeTruthy();
  });
});

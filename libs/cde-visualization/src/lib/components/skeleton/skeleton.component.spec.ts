import { render } from '@testing-library/angular';
import { SkeletonComponent } from './skeleton.component';

describe('SkeletonComponent', () => {
  it('should default to a line of text that is hidden from assistive technology', async () => {
    const { fixture } = await render(SkeletonComponent);
    const el: HTMLElement = fixture.nativeElement;

    expect(el).toHaveAttribute('data-shape', 'text');
    expect(el).toHaveAttribute('aria-hidden', 'true');
  });

  it('should take a shape', async () => {
    const { fixture } = await render(SkeletonComponent, { inputs: { shape: 'circle' } });

    expect(fixture.nativeElement).toHaveAttribute('data-shape', 'circle');
  });
});

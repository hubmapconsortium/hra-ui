import { ActionCardSchema } from './action-card.schema';

describe('ActionCardSchema', () => {
  it('should accept an outlined card with an eyebrow', () => {
    const result = ActionCardSchema.safeParse({
      component: 'ActionCard',
      variant: 'outlined',
      eyebrow: 'Digital object',
      tagline: 'Title',
    });

    expect(result.success).toBe(true);
  });

  it('should accept an outlined card without an eyebrow', () => {
    const result = ActionCardSchema.safeParse({
      component: 'ActionCard',
      variant: 'outlined',
      tagline: 'Title',
    });

    expect(result.success).toBe(true);
  });
});

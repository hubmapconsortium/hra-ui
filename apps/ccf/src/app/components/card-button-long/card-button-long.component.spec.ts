
import { CardButtonLongComponent } from './card-button-long.component';
import { CardButtonLongModule } from './card-button-long.module';

import { NgFor } from '@angular/common';
import { Shallow } from 'shallow-render';
import { LongCard } from './long-card';

describe('CardButtonLongComponent', () => {
  const items: LongCard[] = [
    {
      icon: '',
      title: '',
      body: ''
    }
  ];

  let shallow: Shallow<CardButtonLongComponent>

  beforeEach(async () => {
    shallow = new Shallow(CardButtonLongComponent, CardButtonLongModule)
      .withStructuralDirective(NgFor);
  });

  it('should create', () => {
    expect(shallow.render()).toBeTruthy();
  });

  it('should emit', async () => {
    const { outputs, find } = await shallow.render({
      bind: { longButtonItems: items }
    });
    const [card] = find('mat-card');

    card.triggerEventHandler('click');
    expect(outputs.cardRoutes.emit).toHaveBeenCalledWith(items[0]);
  })
});

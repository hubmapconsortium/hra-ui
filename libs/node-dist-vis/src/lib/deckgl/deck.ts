import { Signal } from '@angular/core';
import { Deck, DeckProps } from '@deck.gl/core/typed';
import { derivedAsync } from 'ngxtension/derived-async';

export function createDeck(props: Signal<DeckProps>): Signal<Deck | undefined> {
  return derivedAsync((previous) => {
    previous?.finalize();
    return new Promise((resolve) => {
      const deck = new Deck({
        ...props(),
        onLoad: () => resolve(deck),
      });
    });
  });
}

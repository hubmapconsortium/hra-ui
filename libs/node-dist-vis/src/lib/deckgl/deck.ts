import { computed, effect, Signal } from '@angular/core';
import { Deck, DeckProps } from '@deck.gl/core/typed';

export function createDeck(canvas: Signal<HTMLCanvasElement>, props: DeckProps): Signal<Deck> {
  const deck = computed(() => {
    return new Deck({
      canvas: canvas(),
      ...props,
    });
  });

  effect((onCleanup) => {
    const instance = deck();
    onCleanup(() => instance.finalize());
  });

  return deck;
}

import { computed, effect, Signal } from '@angular/core';
import { Deck, DeckProps } from '@deck.gl/core/typed';

/**
 * Create a deck instance. Automatically cleans up the deck when the
 * surrounding injection context is destroyed.
 *
 * @param canvas Canvas element
 * @param props Additional deckgl props
 * @returns A deck instance
 */
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

import { DeckProps } from '@deck.gl/core/typed';

export type Mode = 'explore' | 'inspect' | 'select';

const DEFAULT_NODE_SIZE = 1.5;
const INSPECT_NODE_SIZE = 3;

export function getNodeSize(mode: Mode): number {
  return mode === 'inspect' ? INSPECT_NODE_SIZE : DEFAULT_NODE_SIZE;
}

const DEFAULT_CONTROLLER_OPTIONS: DeckProps['controller'] = true;
const SELECT_CONTROLLER_OPTIONS: DeckProps['controller'] = {
  dragRotate: false,
};

export function getControllerOptions(mode: Mode): DeckProps['controller'] {
  return mode === 'select' ? SELECT_CONTROLLER_OPTIONS : DEFAULT_CONTROLLER_OPTIONS;
}

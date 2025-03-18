import { Shallow } from 'shallow-render';

import { SpatialSearchKeyboardUIBehaviorComponent } from './spatial-search-keyboard-ui-behavior.component';
import { SpatialSearchKeyboardUIBehaviorModule } from './spatial-search-keyboard-ui-behavior.module';

describe('SpatialSearchKeyboardUIBehaviorComponent', () => {
  let shallow: Shallow<SpatialSearchKeyboardUIBehaviorComponent>;

  beforeEach(() => {
    shallow = new Shallow(SpatialSearchKeyboardUIBehaviorComponent, SpatialSearchKeyboardUIBehaviorModule);
  });

  it('creates', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeDefined();
  });

  describe('handleKey', () => {
    const qEvent = { key: 'q', preventDefault: () => undefined } as KeyboardEvent;
    const shiftEvent = { key: 'e', shiftKey: true, preventDefault: () => undefined } as KeyboardEvent;
    const gEvent = { key: 'g', preventDefault: () => undefined } as KeyboardEvent;

    it('should handle direction key press', async () => {
      const { instance } = await shallow.render({ bind: { position: { x: 0, y: 0, z: 0 } } });
      instance.handleKey(qEvent);
      expect(instance.changePosition.emit).toHaveBeenCalledWith({ x: 0, y: 0, z: 1 });
    });

    it('should handle shift key', async () => {
      const { instance } = await shallow.render({ bind: { position: { x: 0, y: 0, z: 0 } } });
      instance.handleKey(shiftEvent);
      expect(instance.shiftPressed).toBeTruthy();
    });

    it('should ignore other keys', async () => {
      const { instance } = await shallow.render({ bind: { position: { x: 0, y: 0, z: 0 } } });
      instance.handleKey(gEvent);
      expect(instance.changePosition.emit).toHaveBeenCalledTimes(0);
    });
  });

  describe('keyUp', () => {
    it('releases Shift', async () => {
      const shiftEvent = { key: 'Shift', preventDefault: () => undefined } as KeyboardEvent;
      const { instance } = await shallow.render({ bind: { position: { x: 0, y: 0, z: 0 } } });
      instance.shiftPressed = true;
      instance.keyUp(shiftEvent);
      expect(instance.shiftPressed).toBeFalsy();
    });

    it('clears current key', async () => {
      const wEvent = { key: 'w', preventDefault: () => undefined } as KeyboardEvent;
      const { instance } = await shallow.render({ bind: { position: { x: 0, y: 0, z: 0 } } });
      instance.handleKey(wEvent);
      expect(instance.currentKey).toBe('w');
      instance.keyUp(wEvent);
      expect(instance.currentKey).toBeUndefined();
    });
  });

  describe('keyClick', () => {
    it('updates position', async () => {
      const { instance } = await shallow.render({ bind: { position: { x: 0, y: 0, z: 0 } } });
      const spy = jest.spyOn(instance, 'updatePosition');
      instance.keyClick('q');
      expect(spy).toHaveBeenCalledWith('q');
    });
  });

  describe('keyHover', () => {
    it('updates current key', async () => {
      const { instance } = await shallow.render();
      instance.keyHover('q');
      expect(instance.currentKey).toBe('q');
    });
  });
});

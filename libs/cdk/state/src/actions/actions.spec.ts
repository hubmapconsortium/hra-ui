import { actionTypeRegistry } from './action-type-registry';
import { Action, ActionGroup } from './actions';

const group = 'Test Action Group';
const type = 'Test Action Type';
afterEach(() => actionTypeRegistry.clear());

describe(Action, () => {
  it('returns an action base class', () => {
    const action = Action(type);
    expect(action).toBeInstanceOf(Function);
  });

  it('creates actions with the specified type', () => {
    const action = Action(type);
    expect(new action().type).toEqual(type);
  });
});

describe(ActionGroup, () => {
  it('returns an action factory', () => {
    expect(ActionGroup(group)).toBeInstanceOf(Function);
  });

  it('creates actions with types containing the group', () => {
    const factory = ActionGroup(group);
    const action = factory(type);
    expect(action.type).toContain(group);
  });
});

import { BoardMembersComponent } from './board-members.component';
import { BoardMembersModule } from './board-members.module';
import { Shallow } from 'shallow-render';

describe('BoardMembersComponent', () => {
  let shallow: Shallow<BoardMembersComponent>;

  beforeEach(async () => {
    shallow = new Shallow(BoardMembersComponent, BoardMembersModule);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});

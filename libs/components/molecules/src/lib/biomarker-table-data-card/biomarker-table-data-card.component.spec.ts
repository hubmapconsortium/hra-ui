import { MatTableModule } from '@angular/material/table';
import { Shallow } from 'shallow-render';
import { BiomarkerTableDataCardComponent, SectionItem } from './biomarker-table-data-card.component';
import { data } from './biomarker-table-data-card.component.stories';

describe('BiomarkerTableDataCardComponent', () => {
  let shallow: Shallow<BiomarkerTableDataCardComponent>;

  beforeEach(() => {
    shallow = new Shallow(BiomarkerTableDataCardComponent).dontMock(MatTableModule);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  it('should bind input and trigger ngOnChanges', async () => {
    const sectionItems: SectionItem[] = [
      { section: 0, data: data[0][0], isLastItem: false },
      { section: 0, data: data[0][1], isLastItem: false },
      { section: 0, data: data[0][2], isLastItem: true },
      { section: 1, data: data[1][0], isLastItem: false },
      { section: 1, data: data[1][1], isLastItem: false },
      { section: 1, data: data[1][2], isLastItem: true },
      { section: 2, data: data[2][0], isLastItem: false },
      { section: 2, data: data[2][1], isLastItem: false },
      { section: 2, data: data[2][2], isLastItem: true },
    ];
    const { instance } = await shallow.render({ bind: { data } });
    expect(instance.sectionItems).toEqual(sectionItems);
  });
});

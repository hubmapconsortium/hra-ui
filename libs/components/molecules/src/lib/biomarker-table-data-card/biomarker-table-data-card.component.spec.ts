import { MatTableModule } from '@angular/material/table';
import { Shallow } from 'shallow-render';
import { BiomarkerTableDataCardComponent, SectionItem } from './biomarker-table-data-card.component';
import { data } from './biomarker-table-data-card.stories';

describe('BiomarkerTableDataCardComponent', () => {
  let shallow: Shallow<BiomarkerTableDataCardComponent>;
  beforeEach(() => {
    shallow = new Shallow(BiomarkerTableDataCardComponent).dontMock(MatTableModule);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  it('should bind input and trigger ngOnChanges', async () => {
    const { instance } = await shallow.render({ bind: { data } });
    const sectionItems: SectionItem[] = [];
    data.forEach((section) => {
      section.forEach((item, index) => {
        sectionItems.push({
          data: item,
          section: index,
          isLastItem: index === section.length - 1,
        });
      });
    });
    expect(instance.sectionItems).toEqual(sectionItems);
  });
});

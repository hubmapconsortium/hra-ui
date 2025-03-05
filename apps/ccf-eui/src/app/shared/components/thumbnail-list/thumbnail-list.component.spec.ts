// import { TissueDataset } from '@hra-api/ng-client';
// import { GlobalConfigState } from 'ccf-shared';
// import { of } from 'rxjs/internal/observable/of';
// import { Shallow } from 'shallow-render';
// import { ThumbnailListComponent } from './thumbnail-list.component';

// function castPartial<T>(partial: Partial<T>): T {
//   return partial as T;
// }

// describe('ThumbnailListComponent', () => {
//   let shallow: Shallow<ThumbnailListComponent>;

//   beforeEach(() => {
//     shallow = new Shallow(ThumbnailListComponent).mock(GlobalConfigState, {
//       getOption: () => of(undefined),
//     });
//   });

//   describe('itemId(index, item)', () => {
//     it('returns an identifier', async () => {
//       const { instance } = await shallow.render();
//       const result = instance.itemId(0, castPartial<TissueDataset>({ thumbnail: 'abc' }));
//       expect(result).toEqual('abc');
//     });
//   });
// });

// import { MatDialogRef } from '@angular/material/dialog';
// import { OrganInfo } from 'ccf-shared';
// import { of } from 'rxjs';
// import { Shallow } from 'shallow-render';

// import { Immutable } from '@angular-ru/cdk/typings';
// import { ModelState } from '../../../core/store/model/model.state';
// import { PageState } from '../../../core/store/page/page.state';
// import { RegistrationContentComponent } from './registration-content.component';
// import { RegistrationContentModule } from './registration-content.module';
// import { SpatialEntityJsonLd } from 'ccf-body-ui';
// import { RegistrationState, RegistrationStateModel } from '../../../core/store/registration/registration.state';

// describe('RegistrationContentComponent', () => {
//   const registrationContentSelector = '.registration-button';
//   let shallow: Shallow<RegistrationContentComponent>;
//   const mockModelState = jasmine.createSpyObj<ModelState>('ModelState', [
//     'setViewType',
//     'setViewSide',
//     'setSex',
//     'setOrgan',
//     'setOrganDefaults',
//   ]);
//   const mockPageState = jasmine.createSpyObj<PageState>('PageState', [
//     'setUserName',
//     'registrationStarted',
//     'isOrcidValid',
//     'uriToOrcid'
//   ]);
//   const mockMatDialog = jasmine.createSpyObj<MatDialogRef<unknown, unknown>>('DialogRef', ['close']);

//   const mockRegistrationState = jasmine.createSpyObj<RegistrationState>('RegistrationState', ['editRegistration']);

//   const sampleReg: SpatialEntityJsonLd = {
//     '@context': '',
//     '@id': '',
//     '@type': '',
//     label: '',
//     comment: '',
//     creator: '',
//     creator_first_name: '',
//     creator_last_name: '',
//     creator_email: '',
//     creation_date: '',
//     updated_date: '',
//     ccf_annotations: [],
//     representation_of: '',
//     reference_organ: '',
//     extraction_set: '',
//     rui_rank: 1,
//     slice_thickness: 1,
//     slice_count: 1,
//     x_dimension: 1,
//     y_dimension: 1,
//     z_dimension: 1,
//     dimension_units: '',
//     object: {
//       '@id': '',
//       '@type': '',
//       file: '',
//       file_format: '',
//       placement: {
//         '@id': '',
//         '@type': '',
//         target: '',
//         placement_date: '',
//         x_scaling: 0,
//         y_scaling: 0,
//         z_scaling: 0,
//         scaling_units: '',
//         x_rotation: 0,
//         y_rotation: 0,
//         z_rotation: 0,
//         rotation_units: '',
//         x_translation: 0,
//         y_translation: 0,
//         z_translation: 0,
//         translation_units: '',
//       }
//     },
//     placement: {
//       '@id': 'test',
//       '@type': 'test',
//       target: '',
//       placement_date: '',
//       x_scaling: 0,
//       y_scaling: 0,
//       z_scaling: 0,
//       scaling_units: '',
//       x_rotation: 0,
//       y_rotation: 0,
//       z_rotation: 0,
//       rotation_units: '',
//       x_translation: 0,
//       y_translation: 0,
//       z_translation: 0,
//       translation_units: '',
//     }
//   }

//   beforeEach(() => {
//     shallow = new Shallow(RegistrationContentComponent, RegistrationContentModule)
//       .mock(ModelState, {
//         ...mockModelState,
//         sex$: of('male' as 'male' | 'female'),
//         organ$: of({ src: '' } as Immutable<OrganInfo>),
//       })
//       .mock(PageState, {
//         ...mockPageState,
//         user$: of({ firstName: '', lastName: '', email: '' }),
//         organOptions$: of([]),
//         isOrcidValid: () => true,
//         uriToOrcid: () => ''
//       })
//       .mock(MatDialogRef, {
//         ...mockMatDialog,
//         disableClose: true,
//       })
//       .mock(RegistrationState, {
//         ...mockRegistrationState,
//         state$: of({} as Immutable<RegistrationStateModel>),
//       });
//   });

//   it('checks to see if a name has been entered', async () => {
//     const { instance } = await shallow.render();
//     instance.checkNameValid();
//     expect(instance.nameValid).toBeFalse();
//     instance.checkNameValid();
//     expect(instance.nameValid).toBeTrue();
//   });

//   it('should set the appropriate organ', async () => {
//     const { instance } = await shallow.render();
//     const testOrgan = { src: 'test', name: 'test', organ: 'test' } as OrganInfo;
//     instance.organSelect(testOrgan);
//     expect(instance.currentOrgan).toBe(testOrgan);
//     expect(instance.organSelected).toBeTrue();
//   });

//   it('closes the dialog if button is clicked and organ is selected and a name has been entered', async () => {
//     const { find, instance } = await shallow.render();
//     instance.organSelected = true;
//     instance.nameValid = true;
//     const spy = spyOn(instance, 'closeDialog');
//     find(registrationContentSelector).triggerEventHandler('click', '');
//     expect(spy).toHaveBeenCalled();
//   });

//   it('does not close the dialog if an organ has not been selected', async () => {
//     const { find, instance } = await shallow.render();
//     instance.organSelected = false;
//     const spy = spyOn(instance, 'closeDialog');
//     find(registrationContentSelector).triggerEventHandler('click', '');
//     expect(spy).toHaveBeenCalledTimes(0);
//   });

//   it('does not close the dialog if a name has not been entered', async () => {
//     const { find, instance } = await shallow.render();
//     instance.nameValid = true;
//     const spy = spyOn(instance, 'closeDialog');
//     find(registrationContentSelector).triggerEventHandler('click', '');
//     expect(spy).toHaveBeenCalledTimes(0);
//   });

//   it('closeDialog closes the dialog', async () => {
//     const { instance, inject } = await shallow.render();
//     instance.closeDialog();
//     expect(inject(MatDialogRef).close).toHaveBeenCalled();
//   });

//   it('prevents default', async () => {
//     const mockEvent = {
//       preventDefault: () => undefined,
//     } as MouseEvent;
//     const { instance } = await shallow.render();
//     const spy = spyOn(mockEvent, 'preventDefault');
//     instance.registerButtonClick(mockEvent);
//     expect(spy).toHaveBeenCalled();
//   });

//   it('sets orcidValid to false if orcid not valid', async () => {
//     const { instance } = await shallow
//       .mock(PageState, {
//         ...mockPageState,
//         isOrcidValid: () => false,
//       })
//       .render();
//     expect(instance.orcidValid).toBeFalse();
//   });

//   it('handles registration select', async () => {
//     const { instance } = await shallow.render();
//     instance.handleRegistrationUpload(sampleReg);
//     expect(instance.registrationSelected).toBeTrue();
//   });
// });

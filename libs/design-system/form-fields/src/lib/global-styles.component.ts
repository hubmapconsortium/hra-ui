import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/** Global styles for form fields */
@Component({
  selector: 'hra-form-field-global-styles',
  standalone: true,
  template: '',
  styleUrls: ['./global-styles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldsGlobalStylesComponent {}

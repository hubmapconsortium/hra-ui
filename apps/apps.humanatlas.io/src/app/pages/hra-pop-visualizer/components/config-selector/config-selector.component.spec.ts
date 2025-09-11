import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigSelectorComponent } from './config-selector.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DATA_TYPE_CONFIGS, Y_AXIS_OPTIONS, SORT_OPTIONS } from '../../utils/data-type-config';

describe('ConfigSelectorComponent', () => {
  let component: ConfigSelectorComponent;
  let fixture: ComponentFixture<ConfigSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigSelectorComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigSelectorComponent);
    component = fixture.componentInstance;

    // Set required model inputs
    fixture.componentRef.setInput('dataTypeOptions', Object.values(DATA_TYPE_CONFIGS));
    fixture.componentRef.setInput('organOptions', ['Heart', 'Brain']);
    fixture.componentRef.setInput('xAxisOptions', DATA_TYPE_CONFIGS.anatomical.xAxisOptions);
    fixture.componentRef.setInput('yAxisOptions', Y_AXIS_OPTIONS);
    fixture.componentRef.setInput('sortOptions', SORT_OPTIONS);
    fixture.componentRef.setInput('availableTools', ['azimuth', 'celltypist']);
    fixture.componentRef.setInput('selectedDataType', 'anatomical');
    fixture.componentRef.setInput('selectedOrgan', 'Heart');
    fixture.componentRef.setInput('selectedTools', ['azimuth']);
    fixture.componentRef.setInput('selectedSexes', ['Male', 'Female']);
    fixture.componentRef.setInput('selectedXAxis', 'anatomicalStructureLabel');
    fixture.componentRef.setInput('selectedYAxis', 'cellCount');
    fixture.componentRef.setInput('selectedSort', 'totalCellCount');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle tool selection changes', () => {
    component.onToolChange('celltypist', true);
    expect(component.selectedTools()).toContain('celltypist');

    component.onToolChange('azimuth', false);
    expect(component.selectedTools()).not.toContain('azimuth');
  });

  it('should handle sex selection changes', () => {
    component.onSexesChange(['Male']);
    expect(component.selectedSexes()).toEqual(['Male']);
  });

  it('should check tool availability', () => {
    expect(component.isToolAvailable('azimuth')).toBe(true);
    expect(component.isToolAvailable('nonexistent')).toBe(false);
  });
});

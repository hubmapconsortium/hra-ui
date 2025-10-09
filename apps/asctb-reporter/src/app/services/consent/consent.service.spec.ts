import { Consent, ConsentService } from './consent.service';

describe('ConsentService', () => {
  let service: ConsentService;

  beforeEach(() => {
    service = new ConsentService();
  });

  afterEach(() => {
    service.ngOnDestroy();
  });

  it('should be created with initial state', () => {
    expect(service).toBeTruthy();
    expect(service.consent).toBe('not-set');
  });

  it('should emit initial consent value on creation', (done) => {
    service.consentChange.subscribe((consent) => {
      expect(consent).toBe('not-set');
      done();
    });
  });

  describe('setConsent', () => {
    it('should update and emit when value changes', (done) => {
      let callCount = 0;
      service.consentChange.subscribe((consent) => {
        callCount++;
        if (callCount === 2) {
          // Skip initial emission
          expect(consent).toBe('given');
          expect(service.consent).toBe('given');
          done();
        }
      });

      service.setConsent('given');
    });

    it('should not update or emit when value is identical', () => {
      const nextSpy = jest.spyOn(service.consentChange, 'next');
      const initialCallCount = nextSpy.mock.calls.length;

      service.setConsent('not-set'); // Same as initial

      expect(nextSpy.mock.calls.length).toBe(initialCallCount);
      expect(service.consent).toBe('not-set');
      nextSpy.mockRestore();
    });

    it('should handle all consent types', () => {
      const consentTypes: Consent[] = ['given', 'rescinded', 'not-set'];

      consentTypes.forEach((consentType) => {
        service.setConsent(consentType);
        expect(service.consent).toBe(consentType);
      });
    });
  });

  describe('unsetConsent', () => {
    it('should reset to "not-set" and emit', () => {
      service.setConsent('given');

      let lastEmittedValue: Consent | undefined;
      service.consentChange.subscribe((consent) => {
        lastEmittedValue = consent;
      });

      service.unsetConsent();

      expect(service.consent).toBe('not-set');
      expect(lastEmittedValue).toBe('not-set');
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete subject and prevent further emissions', () => {
      const completeSpy = jest.spyOn(service.consentChange, 'complete');
      let emissionCount = 0;

      service.consentChange.subscribe({
        next: () => emissionCount++,
        complete: () => {
          service.setConsent('given'); // Should not emit after destroy
          expect(emissionCount).toBe(1); // Only initial emission
        },
      });

      service.ngOnDestroy();
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});

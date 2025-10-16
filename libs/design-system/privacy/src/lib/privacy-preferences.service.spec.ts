import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConsentService } from '@hra-ui/common/analytics';
import { EventCategory } from '@hra-ui/common/analytics/events';
import { of } from 'rxjs';
import { PrivacyPreferencesService } from './privacy-preferences.service';

// Mock store2
jest.mock('store2', () => ({
  local: {
    has: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
  },
}));

interface MockStore {
  local: {
    has: jest.Mock;
    get: jest.Mock;
    set: jest.Mock;
  };
}

describe('PrivacyPreferencesService', () => {
  let service: PrivacyPreferencesService;
  let mockDialog: jest.Mocked<MatDialog>;
  let mockConsentService: jest.Mocked<ConsentService>;
  let mockStore: MockStore;

  const mockCategories = {
    [EventCategory.Necessary]: true,
    [EventCategory.Statistics]: false,
    [EventCategory.Preferences]: false,
    [EventCategory.Marketing]: false,
  };

  beforeEach(async () => {
    mockStore = (await import('store2')).default as unknown as MockStore;

    const mockDialogRef = {
      afterClosed: jest.fn(() => of('allow-all')),
    };

    const mockDialogService = {
      open: jest.fn(() => mockDialogRef),
      getDialogById: jest.fn(),
    };

    const mockConsent = {
      categories: signal(mockCategories),
      updateCategories: jest.fn(),
      enableAllCategories: jest.fn(),
      disableAllCategories: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        PrivacyPreferencesService,
        { provide: MatDialog, useValue: mockDialogService },
        { provide: ConsentService, useValue: mockConsent },
      ],
    });

    service = TestBed.inject(PrivacyPreferencesService);
    mockDialog = TestBed.inject(MatDialog) as jest.Mocked<MatDialog>;
    mockConsentService = TestBed.inject(ConsentService) as jest.Mocked<ConsentService>;

    // Reset mocks
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('hasPrivacyPreferences', () => {
    it('should return true when preferences exist in storage', () => {
      mockStore.local.has.mockReturnValue(true);

      expect(service.hasPrivacyPreferences()).toBe(true);
      expect(mockStore.local.has).toHaveBeenCalledWith('__hra-analytics-privacy-preferences');
    });

    it('should return false when preferences do not exist in storage', () => {
      mockStore.local.has.mockReturnValue(false);

      expect(service.hasPrivacyPreferences()).toBe(false);
    });
  });

  describe('getPrivacyPreferences', () => {
    it('should return preferences from storage', () => {
      const mockPreferences = { [EventCategory.Statistics]: true };
      mockStore.local.get.mockReturnValue(mockPreferences);

      const result = service.getPrivacyPreferences();

      expect(result).toEqual(mockPreferences);
      expect(mockStore.local.get).toHaveBeenCalledWith('__hra-analytics-privacy-preferences');
    });

    it('should return empty object when no preferences exist', () => {
      mockStore.local.get.mockReturnValue(null);

      const result = service.getPrivacyPreferences();

      expect(result).toEqual({});
    });
  });

  describe('launch', () => {
    it('should update categories and enable sync when preferences exist', () => {
      const mockPreferences = { [EventCategory.Statistics]: true };
      jest.spyOn(service, 'hasPrivacyPreferences').mockReturnValue(true);
      jest.spyOn(service, 'getPrivacyPreferences').mockReturnValue(mockPreferences);
      jest.spyOn(service, 'enableSync');

      service.launch();

      expect(mockConsentService.updateCategories).toHaveBeenCalledWith(mockPreferences);
      expect(service.enableSync).toHaveBeenCalled();
    });

    it('should open consent banner when no preferences exist', () => {
      jest.spyOn(service, 'hasPrivacyPreferences').mockReturnValue(false);
      jest.spyOn(service, 'openConsentBanner');

      service.launch();

      expect(service.openConsentBanner).toHaveBeenCalled();
    });
  });

  describe('openConsentBanner', () => {
    it('should not open banner if dialog is already active', () => {
      mockDialog.getDialogById.mockReturnValue({} as MatDialogRef<unknown>);

      service.openConsentBanner();

      expect(mockDialog.open).not.toHaveBeenCalled();
    });

    it('should open consent banner dialog with correct configuration', () => {
      mockDialog.getDialogById.mockReturnValue(undefined);

      service.openConsentBanner();

      expect(mockDialog.open).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          id: 'consentBannerDialog',
          disableClose: true,
          hasBackdrop: false,
        }),
      );
    });
  });

  describe('openPrivacyPreferences', () => {
    it('should not open dialog if one is already active', () => {
      mockDialog.getDialogById.mockReturnValue({} as MatDialogRef<unknown>);

      service.openPrivacyPreferences();

      expect(mockDialog.open).not.toHaveBeenCalled();
    });

    it('should open privacy preferences dialog with correct configuration', () => {
      mockDialog.getDialogById.mockReturnValue(undefined);

      service.openPrivacyPreferences('manage');

      expect(mockDialog.open).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          id: 'privacyPreferencesDialog',
          data: expect.objectContaining({
            tab: 'manage',
          }),
        }),
      );
    });
  });

  describe('enableSync', () => {
    it('should enable sync', () => {
      service.enableSync();

      expect(() => service.enableSync()).not.toThrow();
    });
  });

  describe('constructor effect', () => {
    it('should sync categories to storage when sync is enabled', () => {
      service.enableSync();

      TestBed.flushEffects();

      expect(mockStore.local.set).toHaveBeenCalledWith('__hra-analytics-privacy-preferences', mockCategories);
    });
  });

  describe('handleDialogResult', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockDialog.getDialogById.mockReturnValue(undefined);
    });

    it('should handle "allow-all" result', () => {
      const mockDialogRef = {
        afterClosed: jest.fn(() => of('allow-all')),
      } as unknown as MatDialogRef<unknown>;
      mockDialog.open.mockReturnValue(mockDialogRef);
      jest.spyOn(service, 'enableSync');

      service.openConsentBanner();

      expect(mockConsentService.enableAllCategories).toHaveBeenCalled();
      expect(service.enableSync).toHaveBeenCalled();
    });

    it('should handle "allow-necessary" result', () => {
      const mockDialogRef = {
        afterClosed: jest.fn(() => of('allow-necessary')),
      } as unknown as MatDialogRef<unknown>;
      mockDialog.open.mockReturnValue(mockDialogRef);
      jest.spyOn(service, 'enableSync');

      service.openConsentBanner();

      expect(mockConsentService.disableAllCategories).toHaveBeenCalled();
      expect(service.enableSync).toHaveBeenCalled();
    });

    it('should handle "customize" result', () => {
      const mockDialogRef = {
        afterClosed: jest.fn(() => of('customize')),
      } as unknown as MatDialogRef<unknown>;
      mockDialog.open.mockReturnValue(mockDialogRef);
      jest.spyOn(service, 'openPrivacyPreferences');

      service.openConsentBanner();

      expect(service.openPrivacyPreferences).toHaveBeenCalledWith('consent');
    });

    it('should handle "dismiss" result', () => {
      const mockDialogRef = {
        afterClosed: jest.fn(() => of('dismiss')),
      } as unknown as MatDialogRef<unknown>;
      mockDialog.open.mockReturnValue(mockDialogRef);

      expect(() => {
        service.openConsentBanner();
      }).not.toThrow();
    });

    it('should handle custom categories result', () => {
      const customCategories = {
        [EventCategory.Necessary]: true,
        [EventCategory.Statistics]: true,
        [EventCategory.Preferences]: false,
        [EventCategory.Marketing]: false,
      };

      const mockDialogRef = {
        afterClosed: jest.fn(() => of(customCategories)),
      } as unknown as MatDialogRef<unknown>;
      mockDialog.open.mockReturnValue(mockDialogRef);
      jest.spyOn(service, 'enableSync');

      service.openPrivacyPreferences();

      expect(mockConsentService.updateCategories).toHaveBeenCalledWith(customCategories);
      expect(service.enableSync).toHaveBeenCalled();
    });
  });
});

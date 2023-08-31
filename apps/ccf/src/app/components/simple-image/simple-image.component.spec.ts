import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleImageComponent } from './simple-image.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ImageData } from './simple-image';

describe('SimpleImageComponent', () => {
  let component: SimpleImageComponent;
  let fixture: ComponentFixture<SimpleImageComponent>;
  let dialogSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimpleImageComponent],
      imports: [MatDialogModule],
      providers: [MatDialog]
    }).compileComponents();
  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(SimpleImageComponent);
    component = fixture.componentInstance;
    dialogSpy = jest.spyOn(TestBed.inject(MatDialog), 'open');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open image modal', ()=> {
    const mockImageData: ImageData[] = [
      { title: 'title 1.jpg', description: 'description 1', image: 'image 1', imageDialog: 'image1' },
      { title: 'title 2.jpg', description: 'description 2', image: 'image 2', imageDialog: 'image2' },
    ];

    component.imageInfo = mockImageData;
    fixture.detectChanges();

    const buttonElement = fixture.nativeElement.querySelector('.open-button');
    buttonElement.click();

    expect(dialogSpy).toHaveBeenCalledWith(null, { panelClass: 'custom-modal' });
  })
});

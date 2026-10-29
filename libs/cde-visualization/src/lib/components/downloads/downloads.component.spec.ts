import { TestBed } from '@angular/core/testing';
import { fireEvent, render, screen } from '@testing-library/angular';
import { DownloadsComponent } from './downloads.component';
import { DOWNLOADS_CONTENT, UnavailableDownloads } from './downloads.content';

describe('DownloadsComponent', () => {
  const files = DOWNLOADS_CONTENT.groups.flatMap((group) => group.files);
  const formats = files.flatMap((file) => file.formats.map((format) => ({ file, format })));

  it('should render the title, description, groups, notices, and files', async () => {
    await render(DownloadsComponent);

    expect(screen.getByRole('heading', { level: 2, name: DOWNLOADS_CONTENT.title })).toBeInTheDocument();
    expect(screen.getByText(DOWNLOADS_CONTENT.description)).toBeInTheDocument();
    for (const group of DOWNLOADS_CONTENT.groups) {
      expect(screen.getByRole('heading', { level: 3, name: group.heading })).toBeInTheDocument();
      if (group.notice) {
        expect(screen.getByText(group.notice.text, { exact: false })).toBeInTheDocument();
      }
    }

    for (const file of files) {
      expect(screen.getByText(file.name)).toBeInTheDocument();
      expect(screen.getByText(file.description)).toBeInTheDocument();
    }
  });

  it('should render notice links that open in a new tab', async () => {
    await render(DownloadsComponent);

    const links = DOWNLOADS_CONTENT.groups.flatMap((group) => group.notice?.link ?? []);
    expect(links).not.toHaveLength(0);
    for (const link of links) {
      const anchor = screen.getByRole('link', { name: link.label });
      expect(anchor).toHaveAttribute('href', link.url);
      expect(anchor).toHaveAttribute('target', '_blank');
    }
  });

  it.each(formats)('should emit a download request for $format.ariaLabel', async ({ file, format }) => {
    const download = jest.fn();
    await render(DownloadsComponent, { on: { download } });

    fireEvent.click(screen.getByRole('button', { name: format.ariaLabel }));
    expect(download).toHaveBeenCalledWith({ file: file.id, format: format.id });
  });

  it.each(formats)('should include the visible label in the name of $format.ariaLabel', async ({ format }) => {
    await render(DownloadsComponent);

    const button = screen.getByRole('button', { name: format.ariaLabel });
    expect(button).toHaveTextContent(format.label);
    expect(format.ariaLabel).toContain(format.label);
  });

  it('should emit closeClick when the close button is clicked', async () => {
    const closeClick = jest.fn();
    await render(DownloadsComponent, { on: { closeClick } });

    fireEvent.click(screen.getByRole('button', { name: DOWNLOADS_CONTENT.closeLabel }));
    expect(closeClick).toHaveBeenCalled();
  });

  describe('unavailable files', () => {
    const unavailable: UnavailableDownloads = { files: ['violin-graph', 'histogram'], notice: 'Charts are empty.' };

    it('should disable only the unavailable files', async () => {
      await render(DownloadsComponent, { inputs: { unavailable } });

      for (const { file, format } of formats) {
        const button = screen.getByRole('button', { name: format.ariaLabel });
        if (unavailable.files.includes(file.id)) {
          expect(button).toBeDisabled();
        } else {
          expect(button).toBeEnabled();
        }
      }
    });

    it('should show the notice and describe the drawer with it', async () => {
      const { fixture } = await render(DownloadsComponent, { inputs: { unavailable } });
      const { descriptionId, unavailableNoticeId } = fixture.componentInstance;

      expect(fixture.nativeElement.querySelector(`#${unavailableNoticeId}`)).toHaveTextContent(unavailable.notice);
      expect(fixture.componentInstance.describedBy()).toEqual(`${descriptionId} ${unavailableNoticeId}`);
    });

    it('should not show the notice when every file is available', async () => {
      const { fixture } = await render(DownloadsComponent);
      const { descriptionId, unavailableNoticeId } = fixture.componentInstance;

      expect(fixture.nativeElement.querySelector(`#${unavailableNoticeId}`)).toBeNull();
      expect(fixture.componentInstance.describedBy()).toEqual(descriptionId);
    });

    it('should name the anchor cell type in the no distances notice', () => {
      expect(DOWNLOADS_CONTENT.unavailable.noDistances('Endothelial')).toContain('Endothelial');
    });
  });

  it('should give each instance a unique title id', async () => {
    const { fixture } = await render(DownloadsComponent);
    const otherFixture = TestBed.createComponent(DownloadsComponent);
    const { titleId } = fixture.componentInstance;

    expect(fixture.nativeElement.querySelector('h2')).toHaveAttribute('id', titleId);
    expect(otherFixture.componentInstance.titleId).not.toEqual(titleId);
  });

  it('should give each instance a unique description id', async () => {
    const { fixture } = await render(DownloadsComponent);
    const otherFixture = TestBed.createComponent(DownloadsComponent);
    const { descriptionId } = fixture.componentInstance;

    expect(fixture.nativeElement.querySelector('.description')).toHaveAttribute('id', descriptionId);
    expect(otherFixture.componentInstance.descriptionId).not.toEqual(descriptionId);
  });
});

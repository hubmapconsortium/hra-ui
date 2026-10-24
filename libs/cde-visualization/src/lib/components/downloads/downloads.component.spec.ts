import { TestBed } from '@angular/core/testing';
import { fireEvent, render, screen } from '@testing-library/angular';
import { DownloadsComponent } from './downloads.component';
import { DOWNLOADS_CONTENT } from './downloads.content';

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

  it('should emit a mouse close event when the close button is clicked', async () => {
    const closeClick = jest.fn();
    await render(DownloadsComponent, { on: { closeClick } });

    fireEvent.click(screen.getByRole('button', { name: DOWNLOADS_CONTENT.closeLabel }), { screenX: 10, screenY: 10 });
    expect(closeClick).toHaveBeenCalledWith('mouse');
  });

  it('should emit a keyboard close event when the close button is activated by keyboard', async () => {
    const closeClick = jest.fn();
    await render(DownloadsComponent, { on: { closeClick } });

    fireEvent.click(screen.getByRole('button', { name: DOWNLOADS_CONTENT.closeLabel }));
    expect(closeClick).toHaveBeenCalledWith('keyboard');
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

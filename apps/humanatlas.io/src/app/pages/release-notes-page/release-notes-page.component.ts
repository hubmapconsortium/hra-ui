import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ContentTemplateOutletDirective } from '@hra-ui/cdk/content-template';
import { HraCommonModule } from '@hra-ui/common';
import { ContentTemplatesModule } from '@hra-ui/design-system/content-templates';
import { TableOfContentsLayoutModule } from '@hra-ui/design-system/layouts/table-of-contents';
import { ReleaseNotesContent } from './types/content.schema';
import { ReleaseNotesVersions } from './types/versions.schema';

/**
 * Page for displaying current and past HRA release notes
 */
@Component({
  selector: 'hra-release-notes-page',
  imports: [HraCommonModule, ContentTemplateOutletDirective, ContentTemplatesModule, TableOfContentsLayoutModule],
  templateUrl: './release-notes-page.component.html',
  styleUrl: './release-notes-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReleaseNotesPageComponent {
  readonly version = input.required<string>();
  readonly versions = input.required<ReleaseNotesVersions>();
  readonly data = input.required<ReleaseNotesContent>();

  // /** Release notes content ref */
  // readonly content = viewChild.required<ElementRef<HTMLElement>>('content');

  // /** Http injector */
  // readonly http = inject(HttpClient);

  // /** Router service */
  // readonly router = inject(Router);

  // /** Versions data */
  // readonly versions = input.required<ReleaseVersionData[]>();

  // /** Current selected release version */
  // readonly currentVersion = linkedSignal<ReleaseVersionData>(() => this.versions()[0]);

  // /** Data to display on the page */
  // readonly currentVersionData = linkedSignal<ReleaseNotesSectionData[]>(() => []);

  // /** Resolver based on current version */
  // readonly resolver = linkedSignal<Observable<ReleaseNotesSectionData[]>>(() =>
  //   this.releaseNotesResolver(this.currentVersion().version),
  // );

  // /** Width of content section (used to set YouTube player width) */
  // readonly contentWidth = signal<number>(0);

  // /**
  //  * Subscribes to the current resolver to update data and sets anchor scrolling offset
  //  */
  // constructor() {
  //   effect(() => {
  //     this.resolver().subscribe((data) => {
  //       this.setCurrentVersionFromUrl(this.router.url);
  //       this.currentVersionData.set(data);
  //     });
  //   });

  //   effect((cleanup) => {
  //     const observer = new ResizeObserver(() =>
  //       this.contentWidth.set(Math.min(this.content().nativeElement.clientWidth, 640)),
  //     );
  //     observer.observe(this.content().nativeElement, { box: 'border-box' });
  //     cleanup(() => observer.disconnect());
  //   });
  // }

  // /**
  //  * Navigates to release version path on version select
  //  * @param event Mat select event
  //  */
  // navigate(event: MatSelectChange) {
  //   this.router.navigate([`/release-notes/v${event.value.version}`]);
  // }

  // /**
  //  * Sets current version from the page url
  //  * @param url Current url
  //  */
  // setCurrentVersionFromUrl(url: string) {
  //   const currentVersionNum = url.split('/')[2].split('#')[0].slice(1);
  //   this.currentVersion.set(
  //     this.versions().find((v) => v.version.toString() === currentVersionNum) || this.versions()[0],
  //   );
  // }

  // /**
  //  * Returns an observable for fetching release notes
  //  * @param version Current release version
  //  * @returns Observable with page data
  //  */
  // releaseNotesResolver(version: string): Observable<ReleaseNotesSectionData[]> {
  //   return this.http.get(`assets/content/pages-v2/release-notes/v${version}.yaml`, { responseType: 'text' }).pipe(
  //     map((yamlString) => load(yamlString)),
  //     map((raw) => ReleaseNotesSectionDataSchema.array().parse(raw)),
  //   );
  // }

  // /**
  //  * Converts id to anchor id
  //  * @param name Id
  //  * @returns Anchor id
  //  */
  // toAnchor(name: string): string {
  //   return name.toLowerCase().split(' ').join('-');
  // }
}

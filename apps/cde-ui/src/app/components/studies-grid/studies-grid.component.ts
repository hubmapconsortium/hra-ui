import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AnalyticsModule } from '@hra-ui/common/analytics';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { CollectionCardActionComponent, CollectionCardComponent } from '@hra-ui/design-system/cards/collection-card';
import { GridContainerComponent } from '@hra-ui/design-system/content-templates/grid-container';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import * as YAML from 'js-yaml';
import * as z from 'zod';

/** Zod schema for raw study data from YAML */
const RawStudySchema = z.object({
  slug: z.string(),
  organName: z.string(),
  technology: z.string(),
  authors: z.string(),
  affiliations: z.string(),
  consortium: z.string().optional(),
  thumbnail: z.string().optional(),
  cellCount: z.number().optional(),
  description: z.string().optional(),
  datasets: z.array(z.any()).optional(),
  euiUrl: z.string().optional(),
  publication: z.array(z.string()).optional(),
  publications: z.array(z.string()).optional(),
  citations: z.array(z.string()).optional(),
});

type RawStudy = z.infer<typeof RawStudySchema>;

/** Zod schema for the gallery YAML structure */
const GalleryDataSchema = z.object({
  studies: z.array(RawStudySchema),
});

/** Study card data structure for collection card display */
interface PublicationLink {
  url: string;
  label?: string;
}

interface StudyCard {
  tagline: string;
  taglineChips: string[];
  image: string;
  label: string;
  supportingText: string;
  viewButtonText: string;
  tags: { icon: string; text: string }[];
  publications: PublicationLink[];
  isHraRegistered: boolean;
  euiUrl?: string;
}

/** Studies grid wrapper component that displays featured spatial omics studies */
@Component({
  selector: 'cde-studies-grid',
  imports: [
    AnalyticsModule,
    ButtonsModule,
    CollectionCardActionComponent,
    CollectionCardComponent,
    GridContainerComponent,
    MatIconModule,
    MatMenuModule,
    PlainTooltipDirective,
  ],
  templateUrl: './studies-grid.component.html',
  styleUrl: './studies-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudiesGridComponent {
  /** YAML URL to fetch studies from */
  readonly yamlUrl = input.required<string>();

  /** Fetch and parse YAML data reactively */
  private readonly studiesResource = httpResource.text<StudyCard[]>(() => ({ url: this.yamlUrl() }), {
    parse: (yamlText) => this.parseGalleryYaml(yamlText).map((study) => this.transformStudy(study)),
    defaultValue: [],
  });

  /** Parsed and transformed studies */
  readonly studies = this.studiesResource.value;

  /**
   * Parses and validates YAML text into gallery data
   * @param yamlText - Raw YAML text
   * @returns Array of raw study objects
   * @throws ZodError if validation fails
   */
  private parseGalleryYaml(yamlText: string): RawStudy[] {
    const parsedYaml = YAML.load(yamlText) as unknown;
    const { studies } = GalleryDataSchema.parse(parsedYaml);
    return studies;
  }

  /**
   * Transforms raw study data into StudyCard format for display
   */
  private transformStudy(study: RawStudy): StudyCard {
    const datasetCount = study.datasets?.length ?? 0;
    const taglineChips: string[] = [];
    taglineChips.push(`${datasetCount} dataset${datasetCount > 1 ? 's' : ''}`);

    if (study.cellCount) {
      taglineChips.push(`${study.cellCount.toLocaleString()} cells`);
    }

    const tags: { icon: string; text: string }[] = [];
    if (study.consortium) {
      tags.push({ icon: 'diversity_3', text: study.consortium });
    }
    const isHraRegistered = !!study.euiUrl;
    if (isHraRegistered) {
      tags.push({ icon: 'check_circle', text: 'HRA registered' });
    }

    const thumbnailFilename = study.thumbnail?.split('/').pop() ?? '';
    const image = thumbnailFilename
      ? `assets/data/gallery/thumbnails/${thumbnailFilename}`
      : 'assets/ui-images/placeholder.png';

    const rawPublications = study.publication ?? study.publications ?? [];
    const publications = rawPublications.map((url, idx) => ({
      url,
      label: study.citations?.[idx],
    }));

    return {
      tagline: `${study.organName}, ${study.technology}`,
      taglineChips,
      image,
      label: study.authors,
      supportingText: study.affiliations,
      viewButtonText: datasetCount > 1 ? 'View datasets' : 'View dataset',
      tags,
      publications,
      isHraRegistered,
      euiUrl: study.euiUrl,
    };
  }
}

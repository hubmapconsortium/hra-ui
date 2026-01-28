import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { injectAssetUrlResolver } from '@hra-ui/common/url';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { TableOfContentsLayoutModule } from '@hra-ui/design-system/layouts/table-of-contents';
import { TableComponent, TableColumn } from '@hra-ui/design-system/table';
import { load } from 'js-yaml';
import * as z from 'zod';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { TextHyperlinkComponent } from '@hra-ui/design-system/buttons/text-hyperlink';
import { MarkdownModule } from 'ngx-markdown';

/** Zod schema for raw study data from YAML */
const RawStudySchema = z
  .object({
    slug: z.string(),
    organName: z.string(),
    technology: z.string(),
    authors: z.string(),
    affiliations: z.string(),
    consortium: z.string().optional(),
    thumbnail: z.string().optional(),
    cellCount: z.number().optional(),
    description: z.string().optional(),
    datasets: z.array(z.record(z.string(), z.unknown())).optional(),
    euiUrl: z.string().optional(),
    publication: z.array(z.string()).optional(),
    publications: z.array(z.string()).optional(),
    citations: z.array(z.string()).optional(),
  })
  .strict();

/** Type for raw study data from YAML */
type RawStudy = z.infer<typeof RawStudySchema>;

/** Parsed study card with all section data */
interface StudyData {
  slug: string;
  tagline: string;
  taglineChips: string[];
  image: string;
  label: string;
  supportingText: string;
  viewButtonText: string;
  tags: { icon: string; text: string }[];
  publications: PublicationLink[];
  citations: string[];
  isHraRegistered: boolean;
  euiUrl?: string;
  description?: string;
  datasets: Record<string, unknown>[];
}

/** A single publication link and optional display label (citation) */
interface PublicationLink {
  /** URL to the publication (DOI, figshare, etc.) */
  url: string;
  /** Optional human-readable label for the publication (e.g., citation text) */
  label?: string;
}

/**
 * Component for displaying a study page in the Cell Distance Explorer app.
 */
@Component({
  selector: 'cde-study-page',
  imports: [
    HraCommonModule,
    MatChipsModule,
    MatIconModule,
    PageSectionComponent,
    TableOfContentsLayoutModule,
    TableComponent,
    ButtonsModule,
    TextHyperlinkComponent,
    MarkdownModule,
  ],
  templateUrl: './study-page.component.html',
  styleUrl: './study-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyPageComponent {
  readonly tags = input<{ icon: string; text: string }[]>([]);

  private readonly assetUrlResolver = injectAssetUrlResolver();
  private readonly route = inject(ActivatedRoute);

  /** Get study name from route params */
  readonly selectedStudySlug = computed(() => this.route.snapshot.paramMap.get('studyName'));

  /** YAML URL to fetch studies from - points to gallery data */
  private readonly yamlUrl = 'assets/data/gallery/data.yaml';

  /** Fetch and parse YAML data reactively */
  private readonly studiesResource = httpResource.text<StudyData[]>(() => this.assetUrlResolver(this.yamlUrl), {
    parse: (yamlText: string) => {
      const rawStudies = this.parseGalleryYaml(yamlText);
      return rawStudies.map((study) => this.transformStudy(study));
    },
    defaultValue: [],
  });

  /** Parsed and transformed studies */
  readonly studies = this.studiesResource.value;

  /** Currently selected study data */
  readonly studyData = computed(() => {
    const slug = this.selectedStudySlug();
    const studies = this.studies();
    if (!slug || !studies || studies.length === 0) {
      return undefined;
    }
    return studies.find((s) => s.slug === slug);
  });

  /** Table columns for datasets */
  readonly datasetColumns = computed((): TableColumn[] => [
    {
      column: 'actions',
      label: '',
      type: {
        type: 'buttonIcon',
        buttonLabel: 'Explore',
        previewIcon: 'preview',
        imageUrlColumn: 'thumbnail',
        imageAltColumn: 'slug',
        titleColumn: 'slug',
      },
    },
    { column: 'slug', label: 'Dataset ID', type: 'text' },
    { column: 'cellCount', label: '#Cells', type: 'numeric' },
    { column: 'originalCellTypesCount', label: '#Original Cell types', type: 'numeric' },
    { column: 'level3CellTypesCount', label: '#level 3 cell types', type: 'numeric' },
    { column: 'level2CellTypesCount', label: '#level 2 cell types', type: 'numeric' },
    { column: 'level1CellTypesCount', label: '#level 1 cell types', type: 'numeric' },
  ]);

  /** Table rows for datasets */
  readonly datasetRows = computed((): Record<string, string | number | boolean>[] => {
    return (
      this.studyData()?.datasets?.map((dataset) => ({
        slug: (dataset['slug'] ?? '') as string,
        thumbnail: (dataset['thumbnail'] ?? '') as string,
        cellCount: (dataset['cellCount'] ?? 0) as number,
        originalCellTypesCount: (dataset['originalCellTypesCount'] ?? 0) as number,
        level3CellTypesCount: (dataset['level3CellTypesCount'] ?? 0) as number,
        level2CellTypesCount: (dataset['level2CellTypesCount'] ?? 0) as number,
        level1CellTypesCount: (dataset['level1CellTypesCount'] ?? 0) as number,
      })) ?? []
    );
  });

  /**
   * Parses and validates YAML text into gallery data
   * @param yamlText - Raw YAML text
   * @returns Array of raw study objects
   * @throws ZodError if validation fails
   */
  private parseGalleryYaml(yamlText: string): RawStudy[] {
    try {
      const parsedYaml = load(yamlText) as { studies?: unknown[] };
      const studies = Array.isArray(parsedYaml.studies) ? parsedYaml.studies : [];
      return studies.map((study) => RawStudySchema.parse(study));
    } catch {
      return [];
    }
  }

  /**
   * Transforms raw study data into StudyData format for display
   */
  private transformStudy(study: RawStudy): StudyData {
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

    const image = `assets/data/gallery/${study.thumbnail ?? ''}`;

    const rawPublications = study.publication ?? study.publications ?? [];
    const publications = rawPublications
      .map((u) => (typeof u === 'string' ? u.trim() : u))
      .filter(Boolean)
      .map((url, idx) => ({
        url: url as string,
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
      citations: study.citations ?? [],
      isHraRegistered,
      euiUrl: study.euiUrl,
      description: study.description,
      datasets: study.datasets ?? [],
      slug: study.slug,
    };
  }
}

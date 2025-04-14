import { ChangeDetectionStrategy, Component, computed, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { SectionLinkComponent } from '@hra-ui/design-system/content-templates/section-link';
import { MarkdownModule } from 'ngx-markdown';

const samplePubs: Record<string, string[]> = {
  2025: [
    '<span>Bidanta, Supriya, Katy Börner, Bruce W. Herr II, Ellen M. Quardokus, Marcell Nagy, Katherine Gustilo, Rachel Bajema, Elizabeth Maier, and Griffin Weber. 2025. "<a href="https://www.nature.com/articles/s41467-024-54591-6">Functional tissue units in the Human Reference Atlas</a>". <i>Nature Communications</i> 16: 1526. </span>',
    '<span>Börner, Katy, Philip Blood, Jonathan C. Silverstein, Matthew Ruffalo, Sarah A. Teichmann, Gloria Pryhuber, Ravi Misra, Jeffrey Purkerson, Jean Fan, John W. Hickey, Gesmira Molla, Chuan Xu, Yun Zhang, Griffin Weber, Yashvardhan Jain, Danial Qaurooni, Yongxin Kong, HRA Team, Andreas Bueckle, and Bruce W. Herr II. 2025. "<a href="https://www.nature.com/articles/s41592-024-02563-5">Human BioMolecular Atlas Program (HuBMAP): 3D Human Reference Atlas Construction and Usage</a>". <i>Nature Methods</i>. doi: https://doi.org/10.1038/s41592-024-02563-5. </span>',
  ],
  2024: [
    '<span>Bueckle, Andreas, Bruce W. Herr II, Josef Hardi, Ellen M Quardokus, Mark A. Musen, and Katy Börner. 2024. "<a href="https://www.biorxiv.org/content/10.1101/2024.12.22.630006v1">Construction, Deployment, and Usage of the Human Reference Atlas Knowledge Graph for Linked Open Data</a>". doi: https://doi.org/10.1101/2024.12.22.630006. </span>',
    '<span>He, Yongqun , Laura Barisoni, Avi Z. Rosenberg, Peter N. Robinson, Alexander D. Diehl, Yichao Chen, Jimmy P. Phuong, Jens Hansen, Bruce W. Herr II, Katy Börner, Jennifer Schaub, Nikki Bonevich, Ghida Arnous, Saketh Boddapati, Jie Zheng, Fadhl Alakwaa, Pinaki Sarder, William D. Duncan, Chen Liang, M. Todd Valerius, Sanjay Jain, Ravi Iyengar, Jonathan Himmelfarb, Matthias Kretzler, and Kidney Precision Medicine Project. 2024. "<a href="https://www.biorxiv.org/content/10.1101/2024.04.01.587658v2">Ontology-based modeling, integration, and analysis of heterogeneous clinical, pathological, and molecular kidney data for precision medicine</a>". doi: https://doi.org/10.1101/2024.04.01.587658.</span>',
  ],
};

@Component({
  selector: 'hra-publications-page',
  imports: [HraCommonModule, PageSectionComponent, SectionLinkComponent, MarkdownModule],
  templateUrl: './publications-page.component.html',
  styleUrl: './publications-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PublicationsPageComponent {
  data = input<Record<string, string[]>>(samplePubs);

  years = computed(() => {
    const values = Object.keys(this.data()).sort((a, b) => {
      if (a < b) {
        return 1;
      }
      if (a > b) {
        return -1;
      }
      return 0;
    });
    return values;
  });
}

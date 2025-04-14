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
  2023: [],
  2022: [
    '<span>Bueckle, Andreas, Kristen M. Browne, Bruce W. Herr II, Katy Börner. 2022. "<a href="https://osf.io/z9gm3_v1">The Common Coordinate Framework (CCF) Organ VR Gallery"</a>. OSF preprint. doi: 10.31219/osf.io/z9gm3.</span>',
    '<span>Bueckle, Andreas., Kilian Buehling, Patrick C. Shih, and Katy Börner. 2022. "<a href="https://www.frontiersin.org/journals/virtual-reality/articles/10.3389/frvir.2021.727344/full">Optimizing Performance and Satisfaction in Matching and Movement Tasks in Virtual Reality with Interventions Using the Data Visualization Literacy Framework</a>". <i>Frontiers in Virtual Reality</i> 2. doi: 10.3389/frvir.2021.727344.</span>',
  ],
  2021: [
    '<span>Börner, Katy, Andreas Bueckle, Bruce W. Herr II, Leonard E. Cross, Ellen M. Quardokus, Elizabeth G. Record, Yingnan Ju, Jonathan C. Silverstein, Kristen M. Browne, Sanjay Jain, Clive H. Wasserfall, Marda L. Jorgensen, Jeffrey M. Spraggins, Nathan H. Patterson, Griffin M. Weber. 2021. "<a href="https://www.biorxiv.org/content/10.1101/2021.12.30.474265v1">Tissue Registration and Exploration User Interfaces in support of a Human Reference Atlas.</a>” <i>biorXiv</i> December 30, 2021. doi: 10.1101/2021.12.30.474265.</span>',
    '<span>Börner, Katy, Sarah A. Teichmann, Ellen M. Quardokus, James C. Gee, Kristen Browne, David Osumi-Sutherland, Bruce W. Herr, et al. 2021. "<a href="https://www.nature.com/articles/s41556-021-00788-6">Anatomical structures, cell types and biomarkers of the Human Reference Atlas</a>". <i>Nature Cell Biology</i> 23 (11): 1117-28.</span>',
    '<span>Bueckle, Andreas., Kilian Buehling, Patrick C. Shih, and Katy Börner. 2021. “<a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0258103">3D Virtual Reality vs. 2D Desktop Registration User Interface Comparison.</a>” <i>PLOS ONE</i> 16 (10): e0258103. doi: 10.1371/journal.pone.0258103.</span>',
  ],
  2020: [
    '<span>Börner Katy, Ellen M. Quardokus, Bruce W. Herr II, Leonard E. Cross, Elizabeth G. Record, Yingnan Ju, Andreas D. Bueckle, James P. Sluka, Jonathan C. Silverstein, Kristen M. Browne, Sanjay Jain, Clive H. Wasserfall, Marda L. Jorgensen, Jeffrey M. Spraggins, Nathan H. Patterson, Mark A. Musen, and Griffin M. Weber. 2020. "<a href="https://arxiv.org/abs/2007.14474">Construction and Usage of a Human Body Common Coordinate Framework Comprising Clinical, Semantic, and Spatial Ontologies</a>". <i>arXiv</i>, July 28, 2020. doi: 10.48550/arxiv.2007.14474.</span>',
    '<span>Weber Griffin M., Yingnan Ju, and Katy Börner. 2020. "<a href="https://www.frontiersin.org/journals/cardiovascular-medicine/articles/10.3389/fcvm.2020.00029/full">Considerations for Using the Vasculature as a Coordinate System to Map All the Cells in the Human Body<a>". <i>Frontiers in Cardiovascular Medicine</i> 7: 29. doi: 10.3389/fcvm.2020.00029.</span>',
  ],
  2019: [
    '<span>Börner, Katy, Andreas D. Bueckle, and Michael Ginda. 2019. "<a href="https://cns.iu.edu/docs/publications/2019-borner-pnas.pdf">Data Visualization Literacy: Definitions, Conceptual Frameworks, Exercises, and Assessments</a>". <i>PNAS</i> 116 (6): 1857-1864. doi:10.1073/pnas.1807180116.</span>',
    '<span>Ginda, Michael, Michael C. Richey, Mark Cousino, and Katy Börner. 2019. "<a href="https://cns.iu.edu/docs/publications/2019-journal.pone.0215964.pdf">Visualizing Learner Engagement, Performance, and Trajectories to Evaluate and Optimize Online Course Design</a>". <i>PLOS One</i> 14 (5): e0215964. doi: 10.1371/journal.pone.0215964.</span>',
    '<span>Snyder, Michael P., Shin Lin, Amanda Posgai, Mark Atkinson, Aviv Regev, Jennifer Rood, Orit Rozenblatt-Rosen, Leslie Gaffney, Anna Hupalowska, Rahul Satija, Nils Gehlenborg, Jay Shendure, Julia Laskin, Pehr Harbury, Nicholas A. Nystrom, Jonathan C. Silverstein, Ziv Bar-Joseph, Kun Zhang, Katy Börner, Yiing Lin, Richard Conroy, Dena Procaccini, Ananda L. Roy, Ajay Pillai, Marishka Brown, and Zorina S. Galis. 2019. "<a href="https://cns.iu.edu/docs/publications/2019-Snyder-HuBMAP.pdf">The Human Body at Cellular Resolution: The NIH Human Biomolecular Atlas Program</a>". <i>Nature</i> 574: 187-192. doi:10.1038/s41586-019-1629-x.</span>',
  ],
  2018: [
    '<span>Börner, Katy, William Rouse, Paul Trunfio, and H. Eugene Stanley. 2018. "<a href="https://cns.iu.edu/docs/publications/2018-borner-forecasting-innovations.pdf">Forecasting Innovations in Science, Technology, and Education</a>". <i>PNAS</i> 115 (50): 12573-12581. doi: 10.1073/pnas.1818750115.</span>',
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

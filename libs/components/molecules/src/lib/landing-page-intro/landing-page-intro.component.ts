import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'hra-landing-page-intro',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MarkdownModule],
  templateUrl: './landing-page-intro.component.html',
  styleUrls: ['./landing-page-intro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageIntroComponent {
  /** Description for FTU */
  @Input()
  description = ` A functional tissue unit (FTU) is the smallest tissue organization that performs a unique physiologic function and
  is replicated multiple times in a whole organ. Explore medical illustrations of FTUs to view cell type populations
  by gene, protein, and lipid biomarkers. The FTU Explorer features experimental datasets from
  <a href='' target='_blank'>HuBMAP</a>, <a href='' target='_blank'>CellxGene</a>,
  <a href='' target='_blank'>NeMO</a>, and <a href='' target='_blank'>GTEx</a>.`;

  /** message */
  @Input()
  thankyouMessage = `A special thanks to our partners: The FTU Explorer was designed in close collaboration with
<a href='' target='_blank'>Kidney Precision Medicine Project</a> and <a href=''>European Bioinformatics Institute.</a>`;

  /** image file */
  @Input() welcomeImg = '../../assets/welcome.svg';
}

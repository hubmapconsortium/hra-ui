import { Injectable, signal } from '@angular/core';
import { AsctbTerms, TermsIndex } from '../digital-objects-metadata.schema';
import { FilterOption, handleValue } from '../utils/utils';
import { TableRow } from '@hra-ui/design-system/table';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  readonly allRows = signal<TableRow[]>([]);
  readonly termsIndex = signal<TermsIndex>({ terms: [], purls: [], term_to_purls: [], purl_to_terms: [] });

  generateAsctbOptions(type: string, objects: AsctbTerms): FilterOption[] {
    return objects
      .filter((term) => term.asctb_type === type)
      .map((term) => {
        return {
          id: term.iri,
          label: term.label,
          count: this.termsIndex().term_to_purls[this.termsIndex().terms.indexOf(term.iri)]?.length ?? 0,
        };
      })
      .sort((o1, o2) => o1.label.localeCompare(o2.label));
  }

  calculateCount(filterOption: string, category: string): number {
    console.log(this.allRows());
    return this.allRows().filter((row) => {
      const cat = handleValue(row[category] as string[] | string | undefined);
      if (cat) {
        return cat.some((value) => String(value).toLowerCase().includes(filterOption.toLowerCase()));
      }
      return cat === filterOption;
    }).length;
  }
}

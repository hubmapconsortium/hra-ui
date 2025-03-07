import { JsonLd } from 'jsonld/jsonld-spec';
import { Edge_type, GraphData } from '../models/graph.model';
import { fixOntologyId, guessIri } from './lookup.functions';

enum OwlType {
  CLASS = 'owl:Class',
  RESTRICTION = 'owl:Restriction',
}

enum OwlProperty {
  ANNOTATION = 'owl:AnnotationProperty',
  OBJECT = 'owl:ObjectProperty',
}

enum CcfProperty {
  PART_OF = 'ccf:ccf_part_of',
  LOCATED_IN = 'ccf:located_in',
  CT_IS_A = 'ccf:ct_is_a',
  CHARACTERIZES = 'ccf:characterizes',
  OCCURS_IN = 'ccf:occurs_in',
}

export function makeJsonLdData(data: GraphData, withSubclasses = true): JsonLd {
  const { nodes, edges } = data;
  const iriLookup: Record<number, string> = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nodeMap = new Map<string, any>();

  nodes.forEach((node, index) => {
    let ontologyId = node.metadata.ontologyId;
    let iri = '';
    if (ontologyId?.trim().length > 0) {
      ontologyId = fixOntologyId(ontologyId);
      iri = guessIri(ontologyId) ?? '';
    }
    if (!iri) {
      const suffix = node.name
        ?.toLowerCase()
        .trim()
        .replace(/\W+/g, '-')
        .replace(/[^a-z0-9-]+/g, '');
      ontologyId = `ASCTB-TEMP:${suffix}`;
      iri = `https://purl.org/ccf/ASCTB-TEMP_${suffix}`;
    }
    iriLookup[index] = iri;

    if (!nodeMap.has(iri)) {
      nodeMap.set(iri, {
        '@id': iri,
        '@type': OwlType.CLASS,
        id: ontologyId,
        asctb_type: node.type,
        label: node.metadata.label || node.metadata.name,
        preferred_label: node.name || node.metadata.label,
        references: node.metadata.references,
      });
    }
  });

  edges.forEach((edge) => {
    const source = {
      iri: iriLookup[edge.source],
      type: nodes[edge.source].type,
      node: nodeMap.get(iriLookup[edge.source]),
    };
    const target = {
      iri: iriLookup[edge.target],
      type: nodes[edge.target].type,
      node: nodeMap.get(iriLookup[edge.target]),
    };

    if (source.iri !== target.iri) {
      switch (source.type + target.type) {
        case Edge_type.AS_AS:
          target.node.part_of = (target.node.part_of ?? new Set()).add(source.iri);
          break;
        case Edge_type.AS_CT:
          target.node.located_in = (target.node.located_in ?? new Set()).add(source.iri);
          break;
        case Edge_type.CT_CT:
          target.node.is_a = (target.node.is_a ?? new Set()).add(source.iri);
          break;
        case Edge_type.CT_G:
        case Edge_type.CT_P:
        case Edge_type.CT_BL:
        case Edge_type.CT_BM:
        case Edge_type.CT_BF:
          target.node.characterizes = (target.node.characterizes ?? new Set()).add(source.iri);
          break;
        case Edge_type.AS_G:
        case Edge_type.AS_P:
          target.node.occurs_in = (source.node.occurs_in ?? new Set()).add(source.iri);
          break;
        default:
          console.log(source.type + target.type);
      }
    }
  });

  for (const node of nodeMap.values()) {
    Object.assign(node, {
      part_of: node.part_of ? [...node.part_of] : undefined,
      located_in: node.located_in ? [...node.located_in] : undefined,
      is_a: node.is_a ? [...node.is_a] : undefined,
      characterizes: node.characterizes ? [...node.characterizes] : undefined,
      occurs_in: node.occurs_in ? [...node.occurs_in] : undefined,
    });

    if (withSubclasses) {
      let subclasses = node['rdfs:subClassOf'] ?? [];

      if (node.part_of) {
        subclasses = subclasses.concat(
          node.part_of.map((iri: string, index: number) => ({
            '@id': `_:n${node.id.replace(':', '')}_ASAS${index}`,
            '@type': OwlType.RESTRICTION,
            onProperty: CcfProperty.PART_OF,
            // onProperty: 'http://purl.obolibrary.org/obo/RO_0001025',
            someValuesFrom: iri,
          })),
        );
      }
      if (node.located_in) {
        subclasses = subclasses.concat(
          node.located_in.map((iri: string, index: number) => ({
            '@id': `_:n${node.id.replace(':', '')}_ASCT${index}`,
            '@type': OwlType.RESTRICTION,
            onProperty: CcfProperty.LOCATED_IN,
            someValuesFrom: iri,
          })),
        );
      }
      if (node.is_a) {
        subclasses = subclasses.concat(
          node.is_a.map((iri: string, index: number) => ({
            '@id': `_:n${node.id.replace(':', '')}_CTCT${index}`,
            '@type': OwlType.RESTRICTION,
            onProperty: CcfProperty.CT_IS_A,
            someValuesFrom: iri,
          })),
        );
      }
      if (node.characterizes) {
        subclasses = subclasses.concat(
          node.characterizes.map((iri: string, index: number) => ({
            '@id': `_:n${node.id.replace(':', '')}_CTBM${index}`,
            '@type': OwlType.RESTRICTION,
            onProperty: CcfProperty.CHARACTERIZES,
            someValuesFrom: iri,
          })),
        );
      }
      if (node.occurs_in) {
        subclasses = subclasses.concat(
          node.occurs_in.map((iri: string, index: number) => ({
            '@id': `_:n${node.id.replace(':', '')}_ASBM${index}`,
            '@type': OwlType.RESTRICTION,
            onProperty: CcfProperty.OCCURS_IN,
            someValuesFrom: iri,
          })),
        );
      }

      if (subclasses.length > 0) {
        node['rdfs:subClassOf'] = subclasses;
      }
    }
  }

  const propertyType = withSubclasses ? OwlProperty.OBJECT : OwlProperty.ANNOTATION;

  return {
    '@context': Object.assign(
      {
        ccf: 'http://purl.org/ccf/latest/ccf.owl#',
        rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
        oboInOwl: 'http://www.geneontology.org/formats/oboInOwl#',
        owl: 'http://www.w3.org/2002/07/owl#',
        id: 'oboInOwl:id',
        label: 'rdfs:label',
        preferred_label: 'ccf:ccf_preferred_label',
        asctb_type: 'ccf:asctb_type',
        references: 'ccf:ccf_references',
        defines: {
          '@reverse': 'rdfs:isDefinedBy',
        },
        onProperty: {
          '@id': 'owl:onProperty',
          '@type': '@id',
        },
        someValuesFrom: {
          '@id': 'owl:someValuesFrom',
          '@type': '@id',
        },
      },
      withSubclasses
        ? {}
        : {
            part_of: {
              '@id': CcfProperty.PART_OF,
              // '@id': 'http://purl.obolibrary.org/obo/RO_0001025',
              '@type': '@id',
            },
            located_in: {
              '@id': CcfProperty.LOCATED_IN,
              '@type': '@id',
            },
            is_a: {
              '@id': CcfProperty.CT_IS_A,
              '@type': '@id',
            },
            characterizes: {
              '@id': CcfProperty.CHARACTERIZES,
              '@type': '@id',
            },
            occurs_in: {
              '@id': CcfProperty.OCCURS_IN,
              '@type': '@id',
            },
          },
    ),
    '@graph': [
      ...[
        {
          '@id': 'http://purl.org/ccf/latest/ccf.owl#',
          '@type': 'owl:Ontology',
          label: 'CCF ASCT+B Tables',
          defines: [
            {
              '@id': CcfProperty.PART_OF,
              '@type': propertyType,
              label: 'ccf part of',
            },
            {
              '@id': CcfProperty.CHARACTERIZES,
              '@type': propertyType,
              label: 'characterizes',
            },
            {
              '@id': CcfProperty.CT_IS_A,
              '@type': propertyType,
              label: 'cell type is a',
            },
            {
              '@id': CcfProperty.LOCATED_IN,
              '@type': propertyType,
              label: 'located in',
            },
            {
              '@id': CcfProperty.OCCURS_IN,
              '@type': propertyType,
              label: 'occurs in',
            },
          ],
        },
        {
          '@id': 'oboInOwl:id',
          '@type': OwlProperty.ANNOTATION,
          label: 'ID',
        },
        {
          '@id': 'ccf:asctb_type',
          '@type': OwlProperty.ANNOTATION,
          label: 'ASCT+B type',
        },
        {
          '@id': 'ccf:ccf_preferred_label',
          '@type': OwlProperty.ANNOTATION,
          label: 'CCF preferred label',
        },
      ],
      ...nodeMap.values(),
    ],
  };
}

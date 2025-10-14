import * as _angular_core from '@angular/core';
import { z } from 'zod';
import { ContentTemplateDef } from '@hra-ui/cdk/content-template';

/** Type for viewer file data, includes label and URL */
type ViewerFile = z.infer<typeof ViewerFileSchema>;
/** Schema for viewer file data */
declare const ViewerFileSchema: z.ZodObject<{
    label: z.ZodString;
    url: z.ZodString;
}, z.core.$strip>;
/** Type for viewer card data, includes file data for the card */
type ViewerCard = z.infer<typeof ViewerCardSchema>;
/** Schema for viewer card data */
declare const ViewerCardSchema: z.ZodObject<{
    label: z.ZodString;
    alt: z.ZodOptional<z.ZodString>;
    fileUrl: z.ZodString;
    sourceDataUrl: z.ZodString;
    fullscreenUrl: z.ZodOptional<z.ZodString>;
    crosswalkUrl: z.ZodOptional<z.ZodString>;
    files: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        url: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** Type for individual organ data, includes data for the viewer cards of that organ */
type ViewerOrganData = z.infer<typeof ViewerOrganDataSchema>;
/** Schema for organ data */
declare const ViewerOrganDataSchema: z.ZodObject<{
    label: z.ZodString;
    icon: z.ZodString;
    cards: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        alt: z.ZodOptional<z.ZodString>;
        fileUrl: z.ZodString;
        sourceDataUrl: z.ZodString;
        fullscreenUrl: z.ZodOptional<z.ZodString>;
        crosswalkUrl: z.ZodOptional<z.ZodString>;
        files: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            url: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** Type for release version data, includes organ data for all organs */
type ReleaseVersionData = z.infer<typeof ReleaseVersionDataSchema>;
/** Schema for release version data */
declare const ReleaseVersionDataSchema: z.ZodObject<{
    version: z.ZodString;
    label: z.ZodString;
    date: z.ZodString;
    crosswalkUrl: z.ZodOptional<z.ZodString>;
    extractionsSitesUrl: z.ZodOptional<z.ZodString>;
    referenceOrgansUrl: z.ZodOptional<z.ZodString>;
    organData: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        icon: z.ZodString;
        cards: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            alt: z.ZodOptional<z.ZodString>;
            fileUrl: z.ZodString;
            sourceDataUrl: z.ZodString;
            fullscreenUrl: z.ZodOptional<z.ZodString>;
            crosswalkUrl: z.ZodOptional<z.ZodString>;
            files: z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                url: z.ZodString;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** Data viewer variant */
type DataViewerVariant = z.infer<typeof DataViewerVariantSchema>;
/** Schema for data viewer variant */
declare const DataViewerVariantSchema: z.ZodEnum<{
    ftu: "ftu";
    "3d-organ": "3d-organ";
}>;
/** Data viewer component data */
type DataViewer = z.infer<typeof DataViewerSchema>;
/** Schema for data viewer component */
declare const DataViewerSchema: z.ZodObject<{
    classes: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    styles: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    controllers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
    }, z.core.$loose>>>;
    component: z.ZodLiteral<"DataViewer">;
    variant: z.ZodEnum<{
        ftu: "ftu";
        "3d-organ": "3d-organ";
    }>;
    githubIconsUrl: z.ZodString;
    releaseVersionData: z.ZodArray<z.ZodObject<{
        version: z.ZodString;
        label: z.ZodString;
        date: z.ZodString;
        crosswalkUrl: z.ZodOptional<z.ZodString>;
        extractionsSitesUrl: z.ZodOptional<z.ZodString>;
        referenceOrgansUrl: z.ZodOptional<z.ZodString>;
        organData: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            icon: z.ZodString;
            cards: z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                alt: z.ZodOptional<z.ZodString>;
                fileUrl: z.ZodString;
                sourceDataUrl: z.ZodString;
                fullscreenUrl: z.ZodOptional<z.ZodString>;
                crosswalkUrl: z.ZodOptional<z.ZodString>;
                files: z.ZodArray<z.ZodObject<{
                    label: z.ZodString;
                    url: z.ZodString;
                }, z.core.$strip>>;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;

/**
 * Data viewer component
 */
declare class DataViewerComponent {
    /** Release versions to include in the data viewer*/
    readonly releaseVersionData: _angular_core.InputSignal<{
        version: string;
        label: string;
        date: string;
        organData: {
            label: string;
            icon: string;
            cards: {
                label: string;
                fileUrl: string;
                sourceDataUrl: string;
                files: {
                    label: string;
                    url: string;
                }[];
                alt?: string | undefined;
                fullscreenUrl?: string | undefined;
                crosswalkUrl?: string | undefined;
            }[];
        }[];
        crosswalkUrl?: string | undefined;
        extractionsSitesUrl?: string | undefined;
        referenceOrgansUrl?: string | undefined;
    }[]>;
    /** Data viewer variant */
    readonly variant: _angular_core.InputSignal<"ftu" | "3d-organ">;
    /** Link to the HRA Organ Icons GitHub repository */
    readonly githubIconsUrl: _angular_core.InputSignal<string>;
    /** model signal for the release version */
    readonly releaseVersion: _angular_core.ModelSignal<string | undefined>;
    /** model signal for the organ */
    readonly organ: _angular_core.ModelSignal<string | undefined>;
    /** Current selected release version */
    protected readonly releaseVersion_: _angular_core.Signal<{
        version: string;
        label: string;
        date: string;
        organData: {
            label: string;
            icon: string;
            cards: {
                label: string;
                fileUrl: string;
                sourceDataUrl: string;
                files: {
                    label: string;
                    url: string;
                }[];
                alt?: string | undefined;
                fullscreenUrl?: string | undefined;
                crosswalkUrl?: string | undefined;
            }[];
        }[];
        crosswalkUrl?: string | undefined;
        extractionsSitesUrl?: string | undefined;
        referenceOrgansUrl?: string | undefined;
    }>;
    /** Current organ selected */
    protected readonly organ_: _angular_core.Signal<{
        label: string;
        icon: string;
        cards: {
            label: string;
            fileUrl: string;
            sourceDataUrl: string;
            files: {
                label: string;
                url: string;
            }[];
            alt?: string | undefined;
            fullscreenUrl?: string | undefined;
            crosswalkUrl?: string | undefined;
        }[];
    } | undefined>;
    /** constructor to set the release version and organ from the model from effect*/
    constructor();
    /**
     * Get a feature name for a card
     *
     * @param card Card data
     * @returns A feature name
     */
    getCardFeatureId(card: ViewerCard): string;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<DataViewerComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<DataViewerComponent, "hra-data-viewer", never, { "releaseVersionData": { "alias": "releaseVersionData"; "required": true; "isSignal": true; }; "variant": { "alias": "variant"; "required": true; "isSignal": true; }; "githubIconsUrl": { "alias": "githubIconsUrl"; "required": true; "isSignal": true; }; "releaseVersion": { "alias": "releaseVersion"; "required": false; "isSignal": true; }; "organ": { "alias": "organ"; "required": false; "isSignal": true; }; }, { "releaseVersion": "releaseVersionChange"; "organ": "organChange"; }, never, never, true, never>;
}

/** Content template definition for DataViewerComponent */
declare const DataViewerDef: ContentTemplateDef<DataViewerComponent>;

export { DataViewerComponent, DataViewerDef, DataViewerSchema, DataViewerVariantSchema, ReleaseVersionDataSchema, ViewerCardSchema, ViewerFileSchema, ViewerOrganDataSchema };
export type { DataViewer, DataViewerVariant, ReleaseVersionData, ViewerCard, ViewerFile, ViewerOrganData };

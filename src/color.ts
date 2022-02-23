import { contrastRatio, css3, IColor, matchToCSSSpec, normalBlendRGBA, RGBA } from './colors';

export * from './colors';

export type WCAGConformanceLevel = 'aaa' | 'aa' | 'a' | false;
export interface WCAGConformanceCriteria<AAA, AA = AAA, A = AA> {
    aaa: AAA;
    aa: AA;
    a: A;
}

export interface CompareResult {
    wcagConformance: WCAGConformanceLevel;
    rawPerceivableValues: {
        contrast: number;
    };
    wcagConformancePerPerceivable: {
        contrast: WCAGConformanceLevel;
    };
    wcagConformanceLevels: {
        /**
         * Contrast ratio for conformance to WCAG guidelines.
         *
         * NOTE
         * These contrast levels are incomplete.
         * A contrast ratio can have an AAA level of conformance with a contrast ratio lower than 7.
         * However, this depends on more than just the color values, therefore not taken into account.
         * See the WCAG2.1 (or newer) guidelines for more details.
         *
         * https://www.w3.org/TR/WCAG21
         */
        contrast: WCAGConformanceCriteria<7, 4.5, 3>;
    };
}

export class Color {

    private readonly rawColor: string;
    private readonly rawBase: undefined | Color;

    private readonly formattedColor: string;

    private readonly cssSpec: IColor;

    private readonly rgbaValues: [ number, number, number, number ];

    constructor(color: string, onTopOf?: Color | string) {
        this.rawColor = `${color}`;

        const cssSpec: IColor | null = matchToCSSSpec(css3, this.rawColor);
        if (!cssSpec) {
            throw new Error(`Did not recognize color input '${this.rawColor}'`);
        }
        this.cssSpec = cssSpec;

        const formattedColor: string | null = this.cssSpec.transformer(this.rawColor);
        if (!formattedColor) {
            throw new Error(`Failed to transform color '${this.rawColor}' into a valid ${this.cssSpec.name} format.`)
        }
        this.formattedColor = formattedColor;

        const rgbaValues: [ number, number, number, number ] | null = this.cssSpec.toRGBA(this.formattedColor);
        if (!rgbaValues) {
            throw new Error(`Failed to retrieve RGBA values from ${this.cssSpec.name} format of (${this.rawColor}).`)
        }
        this.rgbaValues = rgbaValues;

        if (onTopOf instanceof Color) {
            this.rawBase = onTopOf;
        } else if (typeof onTopOf === 'string') {
            this.rawBase = new Color(onTopOf);
        } else {
            this.rawBase = undefined;
        }
    }

    get raw(): string {
        return this.rawColor;
    }

    get formatted(): string {
        return this.formattedColor;
    }

    get chainedRgba(): [ RGBA, ...RGBA[] ] {
        if (this.rawBase) {
            return [ this.rgbaValues, ...this.rawBase.chainedRgba ];
        }

        return [ this.rgbaValues ];
    }

    get rgba(): [ number, number, number, number ] {
        return normalBlendRGBA(...this.chainedRgba);
    }

    compare(against: Color): CompareResult {
        // Excerpt from https://www.w3.org/TR/WCAG21
        // # Success Criterion 1.4.6 Contrast (Enhanced)
        // (Level AAA)
        // The visual presentation of text and images of text has a contrast ratio of at least 7:1, except for the following:
        //
        // ## Large Text
        // Large-scale text and images of large-scale text have a contrast ratio of at least 4.5:1;
        //
        // ## Incidental
        // Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement.
        //
        // ## Logotypes
        // Text that is part of a logo or brand name has no contrast requirement.
        //
        // # contrast ratio
        // (L1 + 0.05) / (L2 + 0.05), where
        //
        // L1 is the relative luminance of the lighter of the colors, and
        // L2 is the relative luminance of the darker of the colors.
        // NOTE
        // Contrast ratios can range from 1 to 21 (commonly written 1:1 to 21:1).
        //
        // # relative luminance
        // the relative brightness of any point in a colorspace, normalized to 0 for darkest black and 1 for lightest white
        //
        // NOTE
        // For the sRGB colorspace, the relative luminance of a color is defined as L = 0.2126 * R + 0.7152 * G + 0.0722 * B where R, G and B are defined as:
        //
        // if RsRGB <= 0.03928 then R = RsRGB/12.92 else R = ((RsRGB+0.055)/1.055) ^ 2.4
        // if GsRGB <= 0.03928 then G = GsRGB/12.92 else G = ((GsRGB+0.055)/1.055) ^ 2.4
        // if BsRGB <= 0.03928 then B = BsRGB/12.92 else B = ((BsRGB+0.055)/1.055) ^ 2.4
        // and RsRGB, GsRGB, and BsRGB are defined as:
        //
        // RsRGB = R8bit/255
        // GsRGB = G8bit/255
        // BsRGB = B8bit/255
        // The "^" character is the exponentiation operator. (Formula taken from [sRGB] and [IEC-4WD]).

        const contrast: number = contrastRatio(this.rgba, against.rgba);
        const wcagConformance: WCAGConformanceLevel = contrast >= 7 ? 'aaa' : contrast >= 4.5 ? 'aa' : contrast >= 3 ? 'a' : false;

        return {
            wcagConformance,
            rawPerceivableValues: {
                contrast,
            },
            wcagConformanceLevels: { contrast: { aaa: 7, aa: 4.5, a: 3 } },
            wcagConformancePerPerceivable: { contrast: wcagConformance },
        };


    }
}

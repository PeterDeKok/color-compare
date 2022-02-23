export type RGB = [ number, number, number ];
export type RGBA = [ ...RGB, number ];

export interface IColor {
    name: string;
    validator: (value: string) => boolean;
    transformer: (value: string) => null | string;
    toRGBA: (value: string) => null | RGBA;
    hex?: `#${string}`;
    rgb?: RGB;
    rgba?: RGBA;
}

export interface IColors {
    [key: string]: IColor;
}

export interface IColorsCSS1 extends IColors {
    hex: IColor;
    rgb: IColor;

    aqua: IColor;
    black: IColor;
    blue: IColor;
    fuchsia: IColor;
    gray: IColor;
    green: IColor;
    lime: IColor;
    maroon: IColor;
    navy: IColor;
    olive: IColor;
    purple: IColor;
    red: IColor;
    silver: IColor;
    teal: IColor;
    white: IColor;
    yellow: IColor;
}

export interface IColorsCSS2 extends IColorsCSS1 {
    orange: IColor;
}

export interface IColorsCSS3 extends IColorsCSS2 {
    rgba: IColor;
    hsl: IColor;
    hsla: IColor;

    transparent: IColor;

    aliceblue: IColor;
    antiquewhite: IColor;
    aquamarine: IColor;
    azure: IColor;
    beige: IColor;
    bisque: IColor;
    blanchedalmond: IColor;
    blueviolet: IColor;
    brown: IColor;
    burlywood: IColor;
    cadetblue: IColor;
    chartreuse: IColor;
    chocolate: IColor;
    coral: IColor;
    cornflowerblue: IColor;
    cornsilk: IColor;
    crimson: IColor;
    cyan: IColor;
    darkblue: IColor;
    darkcyan: IColor;
    darkgoldenrod: IColor;
    darkgray: IColor;
    darkgreen: IColor;
    darkgrey: IColor;
    darkkhaki: IColor;
    darkmagenta: IColor;
    darkolivegreen: IColor;
    darkorange: IColor;
    darkorchid: IColor;
    darkred: IColor;
    darksalmon: IColor;
    darkseagreen: IColor;
    darkslateblue: IColor;
    darkslategray: IColor;
    darkslategrey: IColor;
    darkturquoise: IColor;
    darkviolet: IColor;
    deeppink: IColor;
    deepskyblue: IColor;
    dimgray: IColor;
    dimgrey: IColor;
    dodgerblue: IColor;
    firebrick: IColor;
    floralwhite: IColor;
    forestgreen: IColor;
    gainsboro: IColor;
    ghostwhite: IColor;
    gold: IColor;
    goldenrod: IColor;
    greenyellow: IColor;
    grey: IColor;
    honeydew: IColor;
    hotpink: IColor;
    indianred: IColor;
    indigo: IColor;
    ivory: IColor;
    khaki: IColor;
    lavender: IColor;
    lavenderblush: IColor;
    lawngreen: IColor;
    lemonchiffon: IColor;
    lightblue: IColor;
    lightcoral: IColor;
    lightcyan: IColor;
    lightgoldenrodyellow: IColor;
    lightgray: IColor;
    lightgreen: IColor;
    lightgrey: IColor;
    lightpink: IColor;
    lightsalmon: IColor;
    lightseagreen: IColor;
    lightskyblue: IColor;
    lightslategray: IColor;
    lightslategrey: IColor;
    lightsteelblue: IColor;
    lightyellow: IColor;
    limegreen: IColor;
    linen: IColor;
    magenta: IColor;
    mediumaquamarine: IColor;
    mediumblue: IColor;
    mediumorchid: IColor;
    mediumpurple: IColor;
    mediumseagreen: IColor;
    mediumslateblue: IColor;
    mediumspringgreen: IColor;
    mediumturquoise: IColor;
    mediumvioletred: IColor;
    midnightblue: IColor;
    mintcream: IColor;
    mistyrose: IColor;
    moccasin: IColor;
    navajowhite: IColor;
    oldlace: IColor;
    olivedrab: IColor;
    orangered: IColor;
    orchid: IColor;
    palegoldenrod: IColor;
    palegreen: IColor;
    paleturquoise: IColor;
    palevioletred: IColor;
    papayawhip: IColor;
    peachpuff: IColor;
    peru: IColor;
    pink: IColor;
    plum: IColor;
    powderblue: IColor;
    rosybrown: IColor;
    royalblue: IColor;
    saddlebrown: IColor;
    salmon: IColor;
    sandybrown: IColor;
    seagreen: IColor;
    seashell: IColor;
    sienna: IColor;
    skyblue: IColor;
    slateblue: IColor;
    slategray: IColor;
    slategrey: IColor;
    snow: IColor;
    springgreen: IColor;
    steelblue: IColor;
    tan: IColor;
    thistle: IColor;
    tomato: IColor;
    turquoise: IColor;
    violet: IColor;
    wheat: IColor;
    whitesmoke: IColor;
    yellowgreen: IColor;
}

// rgb() values will be 0-255 or 0-100%, however, any values outside that will just be clipped
const rgbRe = /^\s*rgb\(\s*(-?[0-9]+%?)\s*,\s*(-?[0-9]+%?)\s*,\s*(-?[0-9]+%?)\s*\)\s*$/;
const rgbaRe = /^\s*rgba\(\s*(-?[0-9]+%?)\s*,\s*(-?[0-9]+%?)\s*,\s*(-?[0-9]+%?)\s*,\s*(0|0?\.[0-9]+|1(?:\.0+)?)\s*\)\s*$/;
const hslRe = /^\s*hsl\(\s*(-?[0-9]+)\s*,\s*(-?[0-9]+%)\s*,\s*(-?[0-9]+%)\s*\)\s*$/;
const hslaRe = /^\s*hsla\(\s*(-?[0-9]+)\s*,\s*(-?[0-9]+%)\s*,\s*(-?[0-9]+%)\s*,\s*(0|0?\.[0-9]+|1(?:\.0+)?)\s*\)\s*$/;

function decimalToValueAndUnit(value: string): [ number, string ] {
    const match: null | RegExpMatchArray = value.match(/([0-9]+)\s*(%)?/);

    if (!match) {
        return [ 0, '' ];
    }

    return [ parseInt(match[1]), match[2] || '' ];
}

function clip(value: number, upper: number, lower: number = 0, cycle: boolean = false): number {
    const ensuredLower: number = Math.min(lower, upper);
    const ensuredUpper: number = Math.max(upper, lower);

    if (!cycle) {
        return Math.min(ensuredUpper, Math.max(ensuredLower, value));
    }

    const dMinMax: number = ensuredUpper - ensuredLower;

    if (value - ensuredLower < 0) {
        return value + Math.ceil((ensuredLower - value) / dMinMax) * dMinMax
    }

    return ((value - ensuredLower) % dMinMax + ensuredLower);
}

function hexToRgba(value: string): null | RGBA {
    const match = value.match(/^#?([0-9a-fA-F]{6})$/);

    if (!match) {
        return null;
    }

    const rv: string = match[1].slice(0, 2);
    const gv: string = match[1].slice(2, 4);
    const bv: string = match[1].slice(4, 6);

    const r = parseInt(rv, 16);
    const g = parseInt(gv, 16);
    const b = parseInt(bv, 16);

    return [ r, g, b, 1.0 ];
}

function hslaToRgba(h: number, s: number, l: number, alpha: number = 1.0): RGBA {
    const hc = clip(h, 360, 0, true);
    const sc = clip(s, 100) / 100;
    const lc = clip(l, 100) / 100;

    const k = (n: number) => (n + hc / 30) % 12;
    const a = sc * Math.min(lc, 1 - lc);
    const f = (n: number) => lc - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    return [ 255 * f(0), 255 * f(8), 255 * f(4), alpha ];
}

function keywordColorObject(keyword: string, units?: Pick<IColor, 'hex' | 'rgb' | 'rgba'>): IColor {
    let toRGBA: () => (RGBA | null) = (): null | RGBA => {
        return [ 0, 0, 0, 1.0 ];
    };

    if (units) {
        const rgba: undefined | RGBA = units.rgba;

        if (rgba) {
            toRGBA = () => rgba;
        }

        const rgb: undefined | RGB = units.rgb;

        if (rgb) {
            toRGBA = () => [ ...rgb, 1.0 ];
        }

        const hex: undefined | string = units.hex;

        if (hex) {
            toRGBA = () => hexToRgba(hex);
        }
    }


    return {
        ...(units || {}),
        name: keyword,
        validator: (value: string) => value === keyword,
        transformer: (value: string): string => value,
        toRGBA,
    };
}

const css1: IColorsCSS1 = {
    // https://www.w3.org/TR/CSS1/#color-units
    hex: {
        name: 'hex',
        validator: (value: string): boolean => /^\s*#?(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\s*$/.test(value),
        transformer: (value: string): null | string => {
            const match = value.match(/^\s*#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\s*/);

            if (!match) {
                return null;
            }

            if (match[1].length === 3) {
                return `#${match[1][0]}${match[1][0]}${match[1][1]}${match[1][1]}${match[1][2]}${match[1][2]}`;
            }

            return `#${match[1]}`;
        },
        toRGBA: (value: string): null | RGBA => hexToRgba(value)
    },
    rgb: {
        name: 'rgb',
        validator: (value: string): boolean => rgbRe.test(value),
        transformer: (value: string): null | string => {
            const match: null | RegExpMatchArray = value.match(rgbRe);

            if (!match) {
                return null;
            }

            const [ r, ru ]: [ number, string ] = decimalToValueAndUnit(match[1]);
            const [ g, gu ]: [ number, string ] = decimalToValueAndUnit(match[2]);
            const [ b, bu ]: [ number, string ] = decimalToValueAndUnit(match[3]);

            const rc = clip(r, ru === '%' ? 100 : 255);
            const gc = clip(g, gu === '%' ? 100 : 255);
            const bc = clip(b, bu === '%' ? 100 : 255);

            return `rgb(${rc}${ru},${gc}${gu},${bc}${bu})`;
        },
        toRGBA: (value: string): null | RGBA => {
            const match: null | RegExpMatchArray = value.match(rgbRe);

            if (!match) {
                return null;
            }

            const [ r, ru ]: [ number, string ] = decimalToValueAndUnit(match[1]);
            const [ g, gu ]: [ number, string ] = decimalToValueAndUnit(match[2]);
            const [ b, bu ]: [ number, string ] = decimalToValueAndUnit(match[3]);

            const rc = clip(r, ru === '%' ? 100 : 255);
            const gc = clip(g, gu === '%' ? 100 : 255);
            const bc = clip(b, bu === '%' ? 100 : 255);

            const ri = ru === '%' ? Math.round(255 * rc / 100) : r;
            const gi = gu === '%' ? Math.round(255 * gc / 100) : r;
            const bi = bu === '%' ? Math.round(255 * bc / 100) : r;

            return [ ri, gi, bi, 1.0 ];
        }
        // Add below to tests
        // em { color: rgb(255,0,0) }       /* integer range 0 - 255 */
        // em { color: rgb(300,0,0) }       /* clipped to rgb(255,0,0) */
        // em { color: rgb(255,-10,0) }     /* clipped to rgb(255,0,0) */
        // em { color: rgb(110%, 0%, 0%) }  /* clipped to rgb(100%,0%,0%) */
    },

    aqua: keywordColorObject('aqua'),
    black: keywordColorObject('black'),
    blue: keywordColorObject('blue'),
    fuchsia: keywordColorObject('fuchsia'),
    gray: keywordColorObject('gray'),
    green: keywordColorObject('green'),
    lime: keywordColorObject('lime'),
    maroon: keywordColorObject('maroon'),
    navy: keywordColorObject('navy'),
    olive: keywordColorObject('olive'),
    purple: keywordColorObject('purple'),
    red: keywordColorObject('red'),
    silver: keywordColorObject('silver'),
    teal: keywordColorObject('teal'),
    white: keywordColorObject('white'),
    yellow: keywordColorObject('yellow'),
};

const css2: IColorsCSS2 = {
    // https://www.w3.org/TR/CSS22/syndata.html#value-def-color
    hex: css1.hex,
    rgb: css1.rgb,

    // From CSS1, but CSS1 did not specify HEX values yet.
    aqua: keywordColorObject('aqua', { ...css1.aqua, hex: '#00ffff' }),
    black: keywordColorObject('black', { ...css1.black, hex: '#000000' }),
    blue: keywordColorObject('blue', { ...css1.blue, hex: '#0000ff' }),
    fuchsia: keywordColorObject('fuchsia', { ...css1.fuchsia, hex: '#ff00ff' }),
    gray: keywordColorObject('gray', { ...css1.gray, hex: '#808080' }),
    green: keywordColorObject('green', { ...css1.green, hex: '#008000' }),
    lime: keywordColorObject('lime', { ...css1.lime, hex: '#00ff00' }),
    maroon: keywordColorObject('maroon', { ...css1.maroon, hex: '#800000' }),
    navy: keywordColorObject('navy', { ...css1.navy, hex: '#000080' }),
    olive: keywordColorObject('olive', { ...css1.olive, hex: '#808000' }),
    purple: keywordColorObject('purple', { ...css1.purple, hex: '#800080' }),
    red: keywordColorObject('red', { ...css1.red, hex: '#ff0000' }),
    silver: keywordColorObject('silver', { ...css1.silver, hex: '#c0c0c0' }),
    teal: keywordColorObject('teal', { ...css1.teal, hex: '#008080' }),
    white: keywordColorObject('white', { ...css1.white, hex: '#ffffff' }),
    yellow: keywordColorObject('yellow', { ...css1.yellow, hex: '#ffff00' }),

    // Added in CSS2 spec
    orange: keywordColorObject('orange', { hex: '#ffa500' }),
};

const css3: IColorsCSS3 = {
    // Current Color and System Colors are part of the CSS3 spec,
    // but not in this list, as their values are not specifically defined.

    // From CSS2, but this time including RGB values for keyword values
    hex: css2.hex,
    rgb: css2.rgb,

    aqua: keywordColorObject('aqua', { ...css2.aqua, rgb: [0,255,255] }),
    black: keywordColorObject('black', { ...css2.black, rgb: [0,0,0] }),
    blue: keywordColorObject('blue', { ...css2.blue, rgb: [0,0,255] }),
    fuchsia: keywordColorObject('fuchsia', { ...css2.fuchsia, rgb: [255,0,255] }),
    gray: keywordColorObject('gray', { ...css2.gray, rgb: [128,128,128] }),
    green: keywordColorObject('green', { ...css2.green, rgb: [0,128,0] }),
    lime: keywordColorObject('lime', { ...css2.lime, rgb: [0,255,0] }),
    maroon: keywordColorObject('maroon', { ...css2.maroon, rgb: [128,0,0] }),
    navy: keywordColorObject('navy', { ...css2.navy, rgb: [0,0,128] }),
    olive: keywordColorObject('olive', { ...css2.olive, rgb: [128,128,0] }),
    orange: keywordColorObject('orange', { ...css2.orange, rgb: [255,165,0] }),
    purple: keywordColorObject('purple', { ...css2.purple, rgb: [128,0,128] }),
    red: keywordColorObject('red', { ...css2.red, rgb: [255,0,0] }),
    silver: keywordColorObject('silver', { ...css2.silver, rgb: [192,192,192] }),
    teal: keywordColorObject('teal', { ...css2.teal, rgb: [0,128,128] }),
    white: keywordColorObject('white', { ...css2.white, rgb: [255,255,255] }),
    yellow: keywordColorObject('yellow', { ...css2.yellow, rgb: [255,255,0] }),

    // Added in CSS3 spec
    rgba: {
        name: 'rgba',
        validator: (value: string): boolean => rgbaRe.test(value),
        transformer: (value: string): null | string => {
            const match: null | RegExpMatchArray = value.match(rgbaRe);

            if (!match) {
                return null;
            }

            const [ r, ru ]: [ number, string ] = decimalToValueAndUnit(match[1]);
            const [ g, gu ]: [ number, string ] = decimalToValueAndUnit(match[2]);
            const [ b, bu ]: [ number, string ] = decimalToValueAndUnit(match[3]);
            const a: number = parseFloat(match[4]);

            const rc = clip(r, ru === '%' ? 100 : 255);
            const gc = clip(g, gu === '%' ? 100 : 255);
            const bc = clip(b, bu === '%' ? 100 : 255);
            const ac = clip(a, 1);

            return `rgba(${rc}${ru},${gc}${gu},${bc}${bu},${ac})`;
        },
        toRGBA: (value: string): null | RGBA => {
            const match: null | RegExpMatchArray = value.match(rgbaRe);

            if (!match) {
                return null;
            }

            const [ r, ru ]: [ number, string ] = decimalToValueAndUnit(match[1]);
            const [ g, gu ]: [ number, string ] = decimalToValueAndUnit(match[2]);
            const [ b, bu ]: [ number, string ] = decimalToValueAndUnit(match[3]);
            const a: number = parseFloat(match[4]);

            const rc = clip(r, ru === '%' ? 100 : 255);
            const gc = clip(g, gu === '%' ? 100 : 255);
            const bc = clip(b, bu === '%' ? 100 : 255);
            const ac = clip(a, 1);

            const ri = ru === '%' ? Math.round(255 * rc / 100) : rc;
            const gi = gu === '%' ? Math.round(255 * gc / 100) : gc;
            const bi = bu === '%' ? Math.round(255 * bc / 100) : bc;

            return [ ri, gi, bi, ac ];
        }
    },
    hsl: {
        name: 'hsl',
        validator: (value: string): boolean => hslRe.test(value),
        transformer: (value: string): null | string => {
            const match: null | RegExpMatchArray = value.match(hslRe);

            if (!match) {
                return null;
            }

            const h: number = decimalToValueAndUnit(match[1])[0];
            const s: number = decimalToValueAndUnit(match[2])[0];
            const l: number = decimalToValueAndUnit(match[3])[0];

            const hc = clip(h, 360, 0, true);
            const sc = clip(s, 100);
            const lc = clip(l, 100);

            return `hsl(${hc},${sc}%,${lc}%)`;
        },
        toRGBA: (value: string): null | RGBA => {
            const match: null | RegExpMatchArray = value.match(hslRe);

            if (!match) {
                return null;
            }

            const h: number = decimalToValueAndUnit(match[1])[0];
            const s: number = decimalToValueAndUnit(match[2])[0];
            const l: number = decimalToValueAndUnit(match[3])[0];

            return hslaToRgba(h, s, l);
        },
    },
    hsla: {
        name: 'hsla',
        validator: (value: string): boolean => hslaRe.test(value),
        transformer: (value: string): null | string => {
            const match: null | RegExpMatchArray = value.match(hslaRe);

            if (!match) {
                return null;
            }

            const h: number = decimalToValueAndUnit(match[1])[0];
            const s: number = decimalToValueAndUnit(match[2])[0];
            const l: number = decimalToValueAndUnit(match[3])[0];
            const a: number = parseFloat(match[4]);

            const hc = clip(h, 360, 0, true);
            const sc = clip(s, 100);
            const lc = clip(l, 100);
            const ac = clip(a, 1);

            return `hsla(${hc},${sc}%,${lc}%,${ac})`;
        },
        toRGBA: (value: string): null | RGBA => {
            const match: null | RegExpMatchArray = value.match(hslaRe);

            if (!match) {
                return null;
            }

            const h: number = decimalToValueAndUnit(match[1])[0];
            const s: number = decimalToValueAndUnit(match[2])[0];
            const l: number = decimalToValueAndUnit(match[3])[0];
            const a: number = parseFloat(match[4]);

            return hslaToRgba(h, s, l, a);
        }
    },

    transparent: keywordColorObject('transparent', { rgba: [0,0,0,0] }),

    aliceblue: keywordColorObject('aliceblue', { hex: '#F0F8FF', rgb: [240,248,255] }),
    antiquewhite: keywordColorObject('antiquewhite', { hex: '#FAEBD7', rgb: [250,235,215] }),
    aquamarine: keywordColorObject('aquamarine', { hex: '#7FFFD4', rgb: [127,255,212] }),
    azure: keywordColorObject('azure', { hex: '#F0FFFF', rgb: [240,255,255] }),
    beige: keywordColorObject('beige', { hex: '#F5F5DC', rgb: [245,245,220] }),
    bisque: keywordColorObject('bisque', { hex: '#FFE4C4', rgb: [255,228,196] }),
    blanchedalmond: keywordColorObject('blanchedalmond', { hex: '#FFEBCD', rgb: [255,235,205] }),
    blueviolet: keywordColorObject('blueviolet', { hex: '#8A2BE2', rgb: [138,43,226] }),
    brown: keywordColorObject('brown', { hex: '#A52A2A', rgb: [165,42,42] }),
    burlywood: keywordColorObject('burlywood', { hex: '#DEB887', rgb: [222,184,135] }),
    cadetblue: keywordColorObject('cadetblue', { hex: '#5F9EA0', rgb: [95,158,160] }),
    chartreuse: keywordColorObject('chartreuse', { hex: '#7FFF00', rgb: [127,255,0] }),
    chocolate: keywordColorObject('chocolate', { hex: '#D2691E', rgb: [210,105,30] }),
    coral: keywordColorObject('coral', { hex: '#FF7F50', rgb: [255,127,80] }),
    cornflowerblue: keywordColorObject('cornflowerblue', { hex: '#6495ED', rgb: [100,149,237] }),
    cornsilk: keywordColorObject('cornsilk', { hex: '#FFF8DC', rgb: [255,248,220] }),
    crimson: keywordColorObject('crimson', { hex: '#DC143C', rgb: [220,20,60] }),
    cyan: keywordColorObject('cyan', { hex: '#00FFFF', rgb: [0,255,255] }),
    darkblue: keywordColorObject('darkblue', { hex: '#00008B', rgb: [0,0,139] }),
    darkcyan: keywordColorObject('darkcyan', { hex: '#008B8B', rgb: [0,139,139] }),
    darkgoldenrod: keywordColorObject('darkgoldenrod', { hex: '#B8860B', rgb: [184,134,11] }),
    darkgray: keywordColorObject('darkgray', { hex: '#A9A9A9', rgb: [169,169,169] }),
    darkgreen: keywordColorObject('darkgreen', { hex: '#006400', rgb: [0,100,0] }),
    darkgrey: keywordColorObject('darkgrey', { hex: '#A9A9A9', rgb: [169,169,169] }),
    darkkhaki: keywordColorObject('darkkhaki', { hex: '#BDB76B', rgb: [189,183,107] }),
    darkmagenta: keywordColorObject('darkmagenta', { hex: '#8B008B', rgb: [139,0,139] }),
    darkolivegreen: keywordColorObject('darkolivegreen', { hex: '#556B2F', rgb: [85,107,47] }),
    darkorange: keywordColorObject('darkorange', { hex: '#FF8C00', rgb: [255,140,0] }),
    darkorchid: keywordColorObject('darkorchid', { hex: '#9932CC', rgb: [153,50,204] }),
    darkred: keywordColorObject('darkred', { hex: '#8B0000', rgb: [139,0,0] }),
    darksalmon: keywordColorObject('darksalmon', { hex: '#E9967A', rgb: [233,150,122] }),
    darkseagreen: keywordColorObject('darkseagreen', { hex: '#8FBC8F', rgb: [143,188,143] }),
    darkslateblue: keywordColorObject('darkslateblue', { hex: '#483D8B', rgb: [72,61,139] }),
    darkslategray: keywordColorObject('darkslategray', { hex: '#2F4F4F', rgb: [47,79,79] }),
    darkslategrey: keywordColorObject('darkslategrey', { hex: '#2F4F4F', rgb: [47,79,79] }),
    darkturquoise: keywordColorObject('darkturquoise', { hex: '#00CED1', rgb: [0,206,209] }),
    darkviolet: keywordColorObject('darkviolet', { hex: '#9400D3', rgb: [148,0,211] }),
    deeppink: keywordColorObject('deeppink', { hex: '#FF1493', rgb: [255,20,147] }),
    deepskyblue: keywordColorObject('deepskyblue', { hex: '#00BFFF', rgb: [0,191,255] }),
    dimgray: keywordColorObject('dimgray', { hex: '#696969', rgb: [105,105,105] }),
    dimgrey: keywordColorObject('dimgrey', { hex: '#696969', rgb: [105,105,105] }),
    dodgerblue: keywordColorObject('dodgerblue', { hex: '#1E90FF', rgb: [30,144,255] }),
    firebrick: keywordColorObject('firebrick', { hex: '#B22222', rgb: [178,34,34] }),
    floralwhite: keywordColorObject('floralwhite', { hex: '#FFFAF0', rgb: [255,250,240] }),
    forestgreen: keywordColorObject('forestgreen', { hex: '#228B22', rgb: [34,139,34] }),
    gainsboro: keywordColorObject('gainsboro', { hex: '#DCDCDC', rgb: [220,220,220] }),
    ghostwhite: keywordColorObject('ghostwhite', { hex: '#F8F8FF', rgb: [248,248,255] }),
    gold: keywordColorObject('gold', { hex: '#FFD700', rgb: [255,215,0] }),
    goldenrod: keywordColorObject('goldenrod', { hex: '#DAA520', rgb: [218,165,32] }),
    greenyellow: keywordColorObject('greenyellow', { hex: '#ADFF2F', rgb: [173,255,47] }),
    grey: keywordColorObject('grey', { hex: '#808080', rgb: [128,128,128] }),
    honeydew: keywordColorObject('honeydew', { hex: '#F0FFF0', rgb: [240,255,240] }),
    hotpink: keywordColorObject('hotpink', { hex: '#FF69B4', rgb: [255,105,180] }),
    indianred: keywordColorObject('indianred', { hex: '#CD5C5C', rgb: [205,92,92] }),
    indigo: keywordColorObject('indigo', { hex: '#4B0082', rgb: [75,0,130] }),
    ivory: keywordColorObject('ivory', { hex: '#FFFFF0', rgb: [255,255,240] }),
    khaki: keywordColorObject('khaki', { hex: '#F0E68C', rgb: [240,230,140] }),
    lavender: keywordColorObject('lavender', { hex: '#E6E6FA', rgb: [230,230,250] }),
    lavenderblush: keywordColorObject('lavenderblush', { hex: '#FFF0F5', rgb: [255,240,245] }),
    lawngreen: keywordColorObject('lawngreen', { hex: '#7CFC00', rgb: [124,252,0] }),
    lemonchiffon: keywordColorObject('lemonchiffon', { hex: '#FFFACD', rgb: [255,250,205] }),
    lightblue: keywordColorObject('lightblue', { hex: '#ADD8E6', rgb: [173,216,230] }),
    lightcoral: keywordColorObject('lightcoral', { hex: '#F08080', rgb: [240,128,128] }),
    lightcyan: keywordColorObject('lightcyan', { hex: '#E0FFFF', rgb: [224,255,255] }),
    lightgoldenrodyellow: keywordColorObject('lightgoldenrodyellow', { hex: '#FAFAD2', rgb: [250,250,210] }),
    lightgray: keywordColorObject('lightgray', { hex: '#D3D3D3', rgb: [211,211,211] }),
    lightgreen: keywordColorObject('lightgreen', { hex: '#90EE90', rgb: [144,238,144] }),
    lightgrey: keywordColorObject('lightgrey', { hex: '#D3D3D3', rgb: [211,211,211] }),
    lightpink: keywordColorObject('lightpink', { hex: '#FFB6C1', rgb: [255,182,193] }),
    lightsalmon: keywordColorObject('lightsalmon', { hex: '#FFA07A', rgb: [255,160,122] }),
    lightseagreen: keywordColorObject('lightseagreen', { hex: '#20B2AA', rgb: [32,178,170] }),
    lightskyblue: keywordColorObject('lightskyblue', { hex: '#87CEFA', rgb: [135,206,250] }),
    lightslategray: keywordColorObject('lightslategray', { hex: '#778899', rgb: [119,136,153] }),
    lightslategrey: keywordColorObject('lightslategrey', { hex: '#778899', rgb: [119,136,153] }),
    lightsteelblue: keywordColorObject('lightsteelblue', { hex: '#B0C4DE', rgb: [176,196,222] }),
    lightyellow: keywordColorObject('lightyellow', { hex: '#FFFFE0', rgb: [255,255,224] }),
    limegreen: keywordColorObject('limegreen', { hex: '#32CD32', rgb: [50,205,50] }),
    linen: keywordColorObject('linen', { hex: '#FAF0E6', rgb: [250,240,230] }),
    magenta: keywordColorObject('magenta', { hex: '#FF00FF', rgb: [255,0,255] }),
    mediumaquamarine: keywordColorObject('mediumaquamarine', { hex: '#66CDAA', rgb: [102,205,170] }),
    mediumblue: keywordColorObject('mediumblue', { hex: '#0000CD', rgb: [0,0,205] }),
    mediumorchid: keywordColorObject('mediumorchid', { hex: '#BA55D3', rgb: [186,85,211] }),
    mediumpurple: keywordColorObject('mediumpurple', { hex: '#9370DB', rgb: [147,112,219] }),
    mediumseagreen: keywordColorObject('mediumseagreen', { hex: '#3CB371', rgb: [60,179,113] }),
    mediumslateblue: keywordColorObject('mediumslateblue', { hex: '#7B68EE', rgb: [123,104,238] }),
    mediumspringgreen: keywordColorObject('mediumspringgreen', { hex: '#00FA9A', rgb: [0,250,154] }),
    mediumturquoise: keywordColorObject('mediumturquoise', { hex: '#48D1CC', rgb: [72,209,204] }),
    mediumvioletred: keywordColorObject('mediumvioletred', { hex: '#C71585', rgb: [199,21,133] }),
    midnightblue: keywordColorObject('midnightblue', { hex: '#191970', rgb: [25,25,112] }),
    mintcream: keywordColorObject('mintcream', { hex: '#F5FFFA', rgb: [245,255,250] }),
    mistyrose: keywordColorObject('mistyrose', { hex: '#FFE4E1', rgb: [255,228,225] }),
    moccasin: keywordColorObject('moccasin', { hex: '#FFE4B5', rgb: [255,228,181] }),
    navajowhite: keywordColorObject('navajowhite', { hex: '#FFDEAD', rgb: [255,222,173] }),
    oldlace: keywordColorObject('oldlace', { hex: '#FDF5E6', rgb: [253,245,230] }),
    olivedrab: keywordColorObject('olivedrab', { hex: '#6B8E23', rgb: [107,142,35] }),
    orangered: keywordColorObject('orangered', { hex: '#FF4500', rgb: [255,69,0] }),
    orchid: keywordColorObject('orchid', { hex: '#DA70D6', rgb: [218,112,214] }),
    palegoldenrod: keywordColorObject('palegoldenrod', { hex: '#EEE8AA', rgb: [238,232,170] }),
    palegreen: keywordColorObject('palegreen', { hex: '#98FB98', rgb: [152,251,152] }),
    paleturquoise: keywordColorObject('paleturquoise', { hex: '#AFEEEE', rgb: [175,238,238] }),
    palevioletred: keywordColorObject('palevioletred', { hex: '#DB7093', rgb: [219,112,147] }),
    papayawhip: keywordColorObject('papayawhip', { hex: '#FFEFD5', rgb: [255,239,213] }),
    peachpuff: keywordColorObject('peachpuff', { hex: '#FFDAB9', rgb: [255,218,185] }),
    peru: keywordColorObject('peru', { hex: '#CD853F', rgb: [205,133,63] }),
    pink: keywordColorObject('pink', { hex: '#FFC0CB', rgb: [255,192,203] }),
    plum: keywordColorObject('plum', { hex: '#DDA0DD', rgb: [221,160,221] }),
    powderblue: keywordColorObject('powderblue', { hex: '#B0E0E6', rgb: [176,224,230] }),
    rosybrown: keywordColorObject('rosybrown', { hex: '#BC8F8F', rgb: [188,143,143] }),
    royalblue: keywordColorObject('royalblue', { hex: '#4169E1', rgb: [65,105,225] }),
    saddlebrown: keywordColorObject('saddlebrown', { hex: '#8B4513', rgb: [139,69,19] }),
    salmon: keywordColorObject('salmon', { hex: '#FA8072', rgb: [250,128,114] }),
    sandybrown: keywordColorObject('sandybrown', { hex: '#F4A460', rgb: [244,164,96] }),
    seagreen: keywordColorObject('seagreen', { hex: '#2E8B57', rgb: [46,139,87] }),
    seashell: keywordColorObject('seashell', { hex: '#FFF5EE', rgb: [255,245,238] }),
    sienna: keywordColorObject('sienna', { hex: '#A0522D', rgb: [160,82,45] }),
    skyblue: keywordColorObject('skyblue', { hex: '#87CEEB', rgb: [135,206,235] }),
    slateblue: keywordColorObject('slateblue', { hex: '#6A5ACD', rgb: [106,90,205] }),
    slategray: keywordColorObject('slategray', { hex: '#708090', rgb: [112,128,144] }),
    slategrey: keywordColorObject('slategrey', { hex: '#708090', rgb: [112,128,144] }),
    snow: keywordColorObject('snow', { hex: '#FFFAFA', rgb: [255,250,250] }),
    springgreen: keywordColorObject('springgreen', { hex: '#00FF7F', rgb: [0,255,127] }),
    steelblue: keywordColorObject('steelblue', { hex: '#4682B4', rgb: [70,130,180] }),
    tan: keywordColorObject('tan', { hex: '#D2B48C', rgb: [210,180,140] }),
    thistle: keywordColorObject('thistle', { hex: '#D8BFD8', rgb: [216,191,216] }),
    tomato: keywordColorObject('tomato', { hex: '#FF6347', rgb: [255,99,71] }),
    turquoise: keywordColorObject('turquoise', { hex: '#40E0D0', rgb: [64,224,208] }),
    violet: keywordColorObject('violet', { hex: '#EE82EE', rgb: [238,130,238] }),
    wheat: keywordColorObject('wheat', { hex: '#F5DEB3', rgb: [245,222,179] }),
    whitesmoke: keywordColorObject('whitesmoke', { hex: '#F5F5F5', rgb: [245,245,245] }),
    yellowgreen: keywordColorObject('yellowgreen', { hex: '#9ACD32', rgb: [154,205,50] }),
};

// CSS4 colors are still in a (late ??) proposal state. Not including (yet?)

export function matchToCSSSpec(spec: IColors, raw: string): null | IColor {
    for (const specName in spec) {
        if (spec[specName].validator(raw)) {
            return spec[specName];
        }
    }

    return null;
}

export function normalBlendRGBA(source: RGB | RGBA, ...backgrounds: Array<RGB | RGBA>): RGBA {
    // The mathematics of this are derived from the blending and compositing algorithms mentioned in the CSS spec.
    // https://www.w3.org/TR/compositing-1/

    // The blending function is considered 'normal' (i.e. pick source).
    // The compositing method is considered 'Source Over'.

    // αo x Co = αs x (1 - αb) x Cs + αs x αb x Cs + (1 - αs) x αb x Cb
    // αo = αs + αb x (1 – αs)


    const colorPool: Array<RGBA> = [ source, ...backgrounds ]
        .reverse()
        .map((value: RGB | RGBA) => [ value[0], value[1], value[2], value[3] || 1.0 ]);

    // process.stdout.write('normalBlendRGBA before filter\n');
    // process.stdout.write(colorPool.toString() + '\n');

    // Remove all values following (or leading, after the reversal...) a full alpha (=1) value.
    // As it will not merge into the color anyway.
    const firstFullAlpha = colorPool.findIndex((color: RGBA) => color[3] >= 1);
    if (firstFullAlpha > 0) {
        colorPool.splice(0, firstFullAlpha);
    }

    // process.stdout.write('normalBlendRGBA ' + colorPool.length + '\n');
    // process.stdout.write(colorPool.toString() + '\n');

    // The color properties of the initial background do not matter, as the alpha of 0.0 will ALWAYS cancel them out.
    let currentBackground: RGBA = [ 0, 0, 0, 0.0 ];
    let currentSource: RGBA | undefined;

    // Color propagation is done from the furthest most background back up all the way to the source.
    while (currentSource = colorPool.shift()) {
        // currentBackground = mix(currentSource, currentBackground);

        const [ rs, gs, bs, as ] = currentSource;
        const [ rb, gb, bb, ab ] = currentBackground;

        // process.stdout.write(`source: R[${rs}], G[${gs}], B[${bs}], A[${as}]\n`);
        // process.stdout.write(`backgr: R[${rb}], G[${gb}], B[${bb}], A[${ab}]\n`);

        const ro = as * (1 - ab) * rs + as * ab * rs + (1 - as) * ab * rb;
        const go = as * (1 - ab) * gs + as * ab * gs + (1 - as) * ab * gb;
        const bo = as * (1 - ab) * bs + as * ab * bs + (1 - as) * ab * bb;
        const ao = as + ab * (1 - as);
        // process.stdout.write(`compos: R[${ro}], G[${go}], B[${bo}], A[${ao}]\n`);

        currentBackground = [ ro, go, bo, ao ];
    }

    const rc = Math.round(clip(currentBackground[0] / currentBackground[3], 255));
    const gc = Math.round(clip(currentBackground[1] / currentBackground[3], 255));
    const bc = Math.round(clip(currentBackground[2] / currentBackground[3], 255));

    // process.stdout.write(`final : R[${rc}], G[${gc}], B[${bc}], A[${currentBackground[3]}]\n`);

    return [ rc, gc, bc, currentBackground[3] ];
}

export function relativeLuminance(source: RGB | RGBA): number {
    // Excerpt from https://www.w3.org/TR/WCAG21
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
    const RsRGB = source[0] / 255;
    const GsRGB = source[1] / 255;
    const BsRGB = source[2] / 255;

    const R = RsRGB <= 0.03928 ? RsRGB / 12.92 :  Math.pow((RsRGB + 0.055) / 1.055, 2.4);
    const G = GsRGB <= 0.03928 ? GsRGB / 12.92 :  Math.pow((GsRGB + 0.055) / 1.055, 2.4);
    const B = BsRGB <= 0.03928 ? BsRGB / 12.92 :  Math.pow((BsRGB + 0.055) / 1.055, 2.4);

    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

export function contrastRatioFromLuminance(luminance1: number, luminance2: number): number {
    // Excerpt from https://www.w3.org/TR/WCAG21
    // # contrast ratio
    // (L1 + 0.05) / (L2 + 0.05), where
    //
    // L1 is the relative luminance of the lighter of the colors, and
    // L2 is the relative luminance of the darker of the colors.
    // NOTE
    // Contrast ratios can range from 1 to 21 (commonly written 1:1 to 21:1).
    const L1 = Math.max(luminance1, luminance2);
    const L2 = Math.min(luminance1, luminance2);

    return (L1 + 0.05) / (L2 + 0.05);
}

export function contrastRatio(rgb8bit1: RGB | RGBA, rgb8bit2: RGB | RGBA): number {
    return contrastRatioFromLuminance(relativeLuminance(rgb8bit1), relativeLuminance(rgb8bit2));
}

export {
    css1,
    css2,
    css3,
}

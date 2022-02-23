import 'jest';
import { Color } from './color';

describe('Color class', () => {

    describe('recognized formats', () => {
        const colors: string[] = [
            '#ffffff',
            '#ffffff',
            'rgb(255, 255, 255)',
            'rgba(255, 255, 255, 1)',
            'rgba(255, 255, 255, 1)',
            'hsl(360, 100%, 100%)',
            'hsla(360, 100%, 100%, 1)',
        ];

        it.each(colors)('should construct with the %p color value', (color: string) => {
            expect(() => new Color(color)).not.toThrow();
        });
    });

    describe('invalid formats', () => {
        const colors: string[] = [
            '#ffffffff',
            `${undefined}`,
            `${null}`,
        ];

        it.each(colors)('should NOT construct with the %p color value', (color: string) => {
            expect(() => new Color(color)).toThrow(`Did not recognize color input '${color}'`);
        });
    })

    // TODO test failures of unrecognized colors (e.g. '#ffffffff', 'undefined', or completely irrelevant crap)

    describe('rgba values', () => {

        it('should convert rgba to rgba', () => {
            expect(new Color('rgba(255, 255, 255, 1)').rgba).toStrictEqual([ 255, 255, 255, 1 ]);
            expect(new Color('rgba(255, 128, 0, 1)').rgba).toStrictEqual([ 255, 128, 0, 1 ]);
            expect(new Color('rgba(255, 128, 0, .5)').rgba).toStrictEqual([ 255, 128, 0, .5 ]);
        });

    })

    describe('merging colors', () => {

        it('should pick the top color if it has no alpha channel (=1)', () => {
            expect(new Color('green', new Color('red')).rgba).toStrictEqual([ 0, 128, 0, 1 ]);
        });

        it('should pick an equal blend if the top color has a half alpha channel (=.5)', () => {
            expect(new Color('rgba(0, 128, 0, .5)', new Color('rgba(255, 0, 0, 1)')).rgba).toStrictEqual([ 128, 64, 0, 1 ]);
        });

        it('should have a non 1 total alpha if both fore and background have a non 1 alpha channel', () => {
            expect(new Color('rgba(0, 128, 0, .5)', new Color('rgba(255, 0, 0, .5)')).rgba).toStrictEqual([ 43, 85, 0, 0.75 ]);
        });

    });

    describe('contrast wcag conformance', () => {

        it('should succeed for black on white', () => {
            const result = new Color('#000000').compare(new Color('#ffffff'));

            expect(result).toHaveProperty('wcagConformance', 'aaa');
            expect(result).toHaveProperty('wcagConformancePerPerceivable.contrast', 'aaa');
            expect(result.rawPerceivableValues.contrast).toStrictEqual(21);
        });

        it('should fail for black on black', () => {
            const result = new Color('#000000').compare(new Color('#000000'));

            expect(result).toHaveProperty('wcagConformance', false);
            expect(result).toHaveProperty('wcagConformancePerPerceivable.contrast', false);
            expect(result.rawPerceivableValues.contrast).toStrictEqual(1.00);
        });

        it('should fail for yellow on white', () => {
            const result = new Color('#ffff00').compare(new Color('#ffffff'));

            expect(result).toHaveProperty('wcagConformance', false);
            expect(result).toHaveProperty('wcagConformancePerPerceivable.contrast', false);
            expect(result.rawPerceivableValues.contrast).toBeCloseTo(1.00);
        });

        it('should succeed for red on green', () => {
            const result = new Color('#ff0000').compare(new Color('#00ff00'));

            expect(result).toHaveProperty('wcagConformance', 'aaa');
            expect(result).toHaveProperty('wcagConformancePerPerceivable.contrast', 'aaa');
            expect(result.rawPerceivableValues.contrast).toBeCloseTo(8.00);
        });

        it('should be just acceptable for gray on yellow', () => {
            const result = new Color('#898989').compare(new Color('#ffff00'));

            expect(result).toHaveProperty('wcagConformance', 'a');
            expect(result).toHaveProperty('wcagConformancePerPerceivable.contrast', 'a');
            expect(result.rawPerceivableValues.contrast).toBeCloseTo(3.02);
        });

    });

});

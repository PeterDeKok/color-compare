import * as path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/color.ts'),
            name: 'ColorCompare',
            fileName: (format) => `color-compare.${format}.js`,
        },
        outDir: 'lib',
        emptyOutDir: false,
    },
});

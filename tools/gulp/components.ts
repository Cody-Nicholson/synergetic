/* Components Build - Adapted from Angular material2 () */

import { task, watch, src, dest } from 'gulp';
import * as path from 'path';

import {
    DIST_COMPONENTS_ROOT, PROJECT_ROOT, COMPONENTS_DIR, HTML_MINIFIER_OPTIONS, LESS_INDEX_DIR, LICENSE_BANNER
} from './constants';
import {
    tsBuildTask, execNodeTask, copyTask, sequenceTask,
    triggerLivereload, lessBuildTask
} from './helpers';

// No typings for these.
const inlineResources = require('./inline-resources');
const gulpRollup = require('gulp-better-rollup');
const gulpMinifyCss = require('gulp-clean-css');
const gulpMinifyHtml = require('gulp-htmlmin');
const gulpIf = require('gulp-if');
const nodeResolve = require('rollup-plugin-node-resolve');

// NOTE: there are two build "modes" in this file, based on which tsconfig is used.
// When `tsconfig.json` is used, we are outputting ES6 modules and a UMD bundle. This is used
// for serving and for release.
//
// When `tsconfig-spec.json` is used, we are outputting CommonJS modules. This is used
// for unit tests (karma).

/** Path to the tsconfig used for ESM output. */
const tsconfigPath = path.relative(PROJECT_ROOT, path.join(COMPONENTS_DIR, 'tsconfig.json'));

/** [Watch task] Rebuilds (ESM output) whenever ts, scss, or html sources change. */
task(':watch:components', () => {
    watch(path.join(COMPONENTS_DIR, '**/*.ts'), ['build:components', triggerLivereload]);
    watch(path.join(COMPONENTS_DIR, '**/*.scss'), ['build:components', triggerLivereload]);
    watch(path.join(COMPONENTS_DIR, '**/*.html'), ['build:components', triggerLivereload]);
});

/** Builds component typescript only (ESM output). */
task(':build:components:ts', tsBuildTask(COMPONENTS_DIR, 'tsconfig-srcs.json'));

/** Builds components typescript for tests (CJS output). */
task(':build:components:spec', tsBuildTask(COMPONENTS_DIR));

/** Copies assets (html, markdown) to build output. */
task(':build:components:assets', copyTask([
    path.join(COMPONENTS_DIR, '**/*.!(ts|config.ts|service.ts|spec.ts|interfaces.ts|directive.ts|component.ts|module.ts)'),
    //path.join(PROJECT_ROOT, 'README.md')
], DIST_COMPONENTS_ROOT));

/** Minifies the HTML and CSS assets in the distribution folder. */
task(':build:components:assets:minify', () => {
    return src('**/*.+(html|css)', { cwd: DIST_COMPONENTS_ROOT })
        .pipe(gulpIf(/.css$/, gulpMinifyCss(), gulpMinifyHtml(HTML_MINIFIER_OPTIONS)))
        .pipe(dest(DIST_COMPONENTS_ROOT));
});

/** Builds scss into css. */
//task(':build:components:scss', sassBuildTask(DIST_COMPONENTS_ROOT, COMPONENTS_DIR));

task(':build:components:less', lessBuildTask(LESS_INDEX_DIR, DIST_COMPONENTS_ROOT));

/** Builds the UMD bundle for all of Angular Material. */
task(':build:components:rollup', () => {
    const globals: { [name: string]: string } = {
        // Angular dependencies
        '@angular/core': 'ng.core',
        '@angular/common': 'ng.common',
        '@angular/forms': 'ng.forms',
        '@angular/http': 'ng.http',
        '@angular/router': 'ng.router',
        // Rxjs dependencies
        'rxjs/Observable': 'Rx',
        'rxjs/ReplaySubject': 'Rx',
        'rxjs/add/operator/map': 'Rx.Observable.prototype',
        'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
        'rxjs/add/observable/fromEvent': 'Rx.Observable',
        'rxjs/add/observable/of': 'Rx.Observable',
        // D3 dependencies
        'd3-timer': 'd3-timer',
        'd3-selection': 'd3-selection',
        'd3-shape': 'd3-shape',
        'd3-color': 'd3-color',
        'd3-scale': 'd3-scale',
        'd3-hierarchy': 'd3-hierarchy',
        'd3-transition': 'd3-transition',
        'd3-interpolate': 'd3-interpolate',
    };

    const rollupOptions = {
        context: 'this',
        external: Object.keys(globals),
        /* plugins: [nodeResolve({ //needed to load d3 in
             jsnext: true,
             main: true,
             skip: ['@angular'],
         })]*/
    };

    const rollupGenerateOptions = {
        // Keep the moduleId empty because we don't want to force developers to a specific moduleId.
        moduleName: 'ng.synergetic',
        format: 'umd',
        sourceMap: false,
        globals,
        banner: LICENSE_BANNER,
        dest: 'ng-synergetic.umd.js'
    };

    return src(path.join(DIST_COMPONENTS_ROOT, 'index.js'))
        .pipe(gulpRollup(rollupOptions, rollupGenerateOptions))
        .pipe(dest(path.join(DIST_COMPONENTS_ROOT, 'bundles')));
});

/** Builds components with resources (html, css) inlined into the built JS (ESM output). */
task(':build:components:inline', sequenceTask(
    [':build:components:ts', ':build:components:less', ':build:components:assets'],
    ':inline-resources',
));

/** Builds components with minified HTML and CSS inlined into the built JS. */
task(':build:components:inline:release', sequenceTask(
    [':build:components:ts', ':build:components:less', ':build:components:assets'],
    ':build:components:assets:minify',
    ':inline-resources'
));

/** Inlines resources (html, css) into the JS output (for either ESM or CJS output). */
task(':inline-resources', () => inlineResources(DIST_COMPONENTS_ROOT));

/** Builds components to ESM output and UMD bundle. */
task('build:components', sequenceTask(':build:components:inline', ':build:components:rollup'));
task('build:components:release', sequenceTask(
    ':build:components:inline:release', ':build:components:rollup'
));

/** Generates metadata.json files for all of the components. */
task(':build:components:ngc', ['build:components:release'], execNodeTask(
    '@angular/compiler-cli', 'ngc', ['-p', tsconfigPath]
));

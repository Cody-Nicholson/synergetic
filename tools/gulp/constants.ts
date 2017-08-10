import {join} from 'path';

export const VERSION = require('../../package.json').version;

export const PROJECT_ROOT = join(__dirname, '../..');
export const SOURCE_ROOT = join(PROJECT_ROOT);

// note: update tsconfig-srcs.json if this changes
export const DIST_ROOT = join(PROJECT_ROOT, 'dist');
export const DIST_COMPONENTS_ROOT = join(DIST_ROOT, '@synergetic/core');

export const HTML_MINIFIER_OPTIONS = {
    collapseWhitespace: true,
    removeComments: true,
    caseSensitive: true,
    removeAttributeQuotes: false
};

export const LICENSE_BANNER = `/**
  * @license @synergetic/core v${VERSION}
  * Copyright (c) 2017 Cody Nicholson
  */`;

export const NPM_VENDOR_FILES = [
    '@angular', 'core-js/client', 'rxjs', 'systemjs/dist', 'zone.js/dist'
];

export const COMPONENTS_DIR = join(SOURCE_ROOT, 'src/components');
export const LESS_INDEX_DIR = join(COMPONENTS_DIR, 'core/styles/index.less');


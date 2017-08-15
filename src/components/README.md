# @synergetic/core

Synergetic Component Library for Angular

## Getting Started

@synergetic/core is a library of Angular components containing common functionality and styles intended to be used as building blocks for webapps.

## Installation

Install `@synergetic/core` from `npm`

```shell
npm install @synergetic/core --save
```

You will need to add synergetic styles to your page

```
<!-- index.html -->
<link rel="stylesheet"
        href="node_modules/@synergetic/core/index.css">
```

Once installed modules can be imported into your NgModules

```js
import { RingModule } from '@synergetic/core';
...

@NgModule({
   ...
   imports: [RingModule, ... ],
    ... 
})
```

## SystemJS
To add synergetic to your SystemJS project (UMD Bundle)

Update `map` and `packages` with `@synergetic/core` in system.js config

```js
  let config = {
    map: {
      //...
      '@synergetic/core': 'node_modules/@synergetic/core',
      //...
    },
    packages: {
      //...
      '@synergetic/core':  { main: 'bundles/ng-synergetic.umd.js' },
      //...
    }
  };
```

## Library Dependencies

Standard Angular dependencies are needed (Library is tested on Angular ^4.2.6)

Other Peer Dependencies:

```js
{
    ...,
    "d3": "^4.7.4",
    ...
}
```

## API

Checkout the API Demo Site [reference](https://cody-nicholson.github.io/synergetic-api/)



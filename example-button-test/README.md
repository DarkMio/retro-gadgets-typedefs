# Example - Button Test

This is an example that use import in typescript.

Unlike single file project, in this example, files will be treated as modules,
the variables have `local` modifier before them, which hides the `update`
function.

It need to be configured to build correctly.

## Important Configuration in `tsconfig.json`

* "luaPlugins": [ { "name": "./del_local_before_update.js" } ]<br/>
  This is the plugin to strip `local` before `update` function.
* "luaLibImport": "inline"<br/>
  This configuration make sure no huge `lualib_bundle.lua` files.
  It is recommanded for small project. if you have a lot of files using
  the lualib, you can set it to "require". [More info](https://typescripttolua.github.io/docs/configuration)
* "noImplicitSelf": true<br/>
  With this configuration, you don't have to set ```this: void``` as the first param
  for every functions.[More info](https://typescripttolua.github.io/docs/the-self-parameter)

## Create new project based on this example

* set `"../typedefs/**/*.d.ts"` in the `tsconfig.json` to `typedefs` dir
* `npm install`
* `npm run dev`
* the `.ts` files under `src` dir, will be compiled to `.lua` under `build` dir
* copy all `.lua` files content into the game, name the scripts without `.lua` postfix

Try to use lua builtins, it is faster then javascript builtins, because it doesn't need a polyfill

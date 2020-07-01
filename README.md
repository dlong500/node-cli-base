# node-cli-base
## Boilerplate CLI app for testing or starting new projects

### To set up/configure the project
`yarn install`

### To perform a test run (w/ del v4.1.1):
1) Create a folder named "testdata" in the project's root folder (or somewhere else on the system).
2) Copy the testdata_template folder contents to the folder that was just created
3) Update the value of `dataPath` in `/src/base.js` to the full path of the folder just created (obviously use correct slash syntax depending on OS environment)
4) Run `yarn start`

#### Now install del v5.1.0 and then run the test again

### Expected output:
```
$ yarn start
yarn run v1.22.4
$ cross-env NODE_ENV=development node entry.js
Activating on-demand babel transpiling (using options in .babelrc)
The following folder does exist: c:/local/code/node-cli-base/testdata/test1
patternToDelete: c:/local/code/node-cli-base/testdata/test?/?
Files/Folders that would have been removed:
c:\local\code\node-cli-base\testdata\test1\0
c:\local\code\node-cli-base\testdata\test1\1
c:\local\code\node-cli-base\testdata\test1\2
c:\local\code\node-cli-base\testdata\test2\0
c:\local\code\node-cli-base\testdata\test2\1
c:\local\code\node-cli-base\testdata\test2\2
Done in 1.36s.
```

### The output is as expected with `del` v4.1.1, but v5.1.0 doesn't match any of the content and results in:
```
$ yarn start
yarn run v1.22.4
$ cross-env NODE_ENV=development node entry.js
Activating on-demand babel transpiling (using options in .babelrc)
The following folder does exist: c:/local/code/node-cli-base/testdata/test1
patternToDelete: c:/local/code/node-cli-base/testdata/test?/?
Files/Folders that would have been removed:

Done in 1.41s.
```

## Note that the behavior is the same on BOTH Windows and Linux, so this is NOT a Windows-specific issue
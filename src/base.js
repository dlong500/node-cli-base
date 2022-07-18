import path from 'path'
import del from 'del'
import slash from 'slash'
import fg from 'fast-glob'
import isGlob from 'is-glob'
import pm from 'picomatch'
import globParent from 'glob-parent'


// import pino from 'pino'
// import pinoms from 'pino-multi-stream'
// import childProcess from 'child_process'
// import { PassThrough } from 'stream'

// const logPath = `${process.cwd()}/log`
// const logThrough = new PassThrough()
// const prettyStream = pinoms.prettyStream()
// const streams = [
//   { stream: logThrough },
//   { stream: prettyStream }
// ]
// const logger = pinoms(pinoms.multistream(streams))

// const child = childProcess.spawn(process.execPath, [
//   require.resolve('pino-tee'),
//   'warn', `${logPath}/warn.log`,
//   'error', `${logPath}/error.log`,
//   'fatal', `${logPath}/fatal.log`
// ], {
//   cwd: __dirname,
//   env: process.env
// })

// logThrough.pipe(child.stdin)

// logger.info('hello world')
// logger.warn('test warning')
// logger.error('test error')
// logger.fatal('test fatal')

// const childlog = logger.child({ a: 'property' })
// childlog.info('hello child!')

import { folderExists, readFolder } from './lib/util'

const dataPath = 'c:\\local\\code\\node-cli-base\\testdata'
const dryRun = true

app()

async function app() {

  try {
    const pathToCheck = slash(path.posix.join(dataPath, 'test1'))
    await folderExists(pathToCheck)
    console.log('The following folder does exist:', pathToCheck)
  } catch(error) {
    console.log('Error while attempting to check if folder exists: ' + error.message)
  }

  try {
    const r = await readFolder(dataPath)
    console.log('r:', r)
  } catch(error) {
    console.log('Error while attempting to read folder: ' + error.message)
  }

  // below test assumes the following test data
  // <dataPath>/keep/
  // <dataPath>/keep/textfile.txt
  // <dataPath>/test1/0
  // <dataPath>/test1/1
  // <dataPath>/test1/2
  // <dataPath>/test1/10
  // <dataPath>/test1/11
  // <dataPath>/test1/12
  // <dataPath>/test2/0
  // <dataPath>/test2/1
  // <dataPath>/test2/2
  // <dataPath>/test2/10
  // <dataPath>/test2/11
  // <dataPath>/test2/12

  // The resulting action should be the deletion of precisely the following folders:
  // <dataPath>/test1/0
  // <dataPath>/test1/1
  // <dataPath>/test1/2
  // <dataPath>/test2/0
  // <dataPath>/test2/1
  // <dataPath>/test2/2

  try {
    // const patternToDelete = slash(path.posix.join(dataPath, 'test?', '?'))
    // const patternToDelete = slash(path.posix.join(dataPath, 'test@(?)', '?'))

    // const patternToDelete = slash(dataPath + '/' + '100-123@(?)_files' + '/@(0|1|2|3)')
    const patternToDelete = slash(dataPath + '/' + '@(100-123?_files)' + '/@(0|1|2|3)')
    console.log('patternToDelete:', patternToDelete)

    // const path = './somedirectory/'
    // let regex = /[.]txt$/
    // fs.readdirSync(path)
    //     .filter(f => regex.test(f))
    //     .map(f => fs.unlinkSync(path + f))

    const deletecontent = await del([patternToDelete], { force: true, dryRun: true, extglob: true, onlyFiles: false, caseSensitiveMatch: false })
    // const deletecontent = await del(patternToDelete, { dryRun: true })
    // const deletecontent = await del(['c:/local/code/node-cli-base/testdata/test?/1'], { dryRun: true, force: true, extglob: true })
    // const deletecontent = await del(['testing/folder?/file1.txt'], { dryRun: true })
    if (dryRun) {
      console.log('Files/Folders that would have been removed:\n' + deletecontent.join('\n'))
    } else {
      console.log('Files/Folders removed:\n' + deletecontent.join('\n'))
    }

    // const pattern = 'testing/folder@(?)/file?.txt'
    // const entries = await fg(pattern, { extglob: true, caseSensitiveMatch: false })
    // console.log('Files/Folders matching:\n' + entries.join('\n'))

    // console.log('parent of ' + pattern + ':', globParent(pattern))
    // // console.log('parent of path/to/*.js:', globParent('path/to/*.js'))
    // // console.log('parent of base/folder?/file1.txt:', globParent('base/folder?/file1.txt'))
    // // console.log('parent of base/?/file1.txt:', globParent('base/?/file1.txt'))
    // // console.log('parent of base/folder1/file?.txt:', globParent('base/folder1/file?.txt'))
    // // console.log('parent of base/fold/folder*/file1.txt:', globParent('base/fold/folder*/file1.txt'))
    // // console.log('parent of base/fold/folder1/file1.txt:', globParent('base/fold/folder1/file1.txt'))

    // console.log('is-glob-strict:', isGlob(pattern, { strict: true }))
    // console.log('is-glob-no-strict:', isGlob(pattern, { strict: false }))

    // const newpattern = 'bar?/foo?.js'
    // console.log('is-glob (' + newpattern + '):', isGlob(newpattern, { strict: true }))

    // console.log('is-glob: assets/?ss.css', isGlob('assets/?ss.css', { strict: false }))

    // console.log('pm.ismatch: testing/folder?/file1.txt', pm.isMatch('testing/folder1/file1.txt', 'testing/folder?/file1.txt'))

    return true
  } catch (error) {
    console.log('Problem while deleting: ' + error.message)
    return false
  }
}
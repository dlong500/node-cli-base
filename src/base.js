import path from 'path'
import del from 'del'
import slash from 'slash'

import { folderExists } from './lib/util'

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
    const patternToDelete = slash(path.posix.join(dataPath, 'test?', '?'))
    console.log('patternToDelete:', patternToDelete)
    const deletecontent = await del(patternToDelete, { force: true, dryRun: true, extglob: true, onlyFiles: false, caseSensitiveMatch: false })
    if (dryRun) {
      console.log('Files/Folders that would have been removed:\n' + deletecontent.join('\n'))
    } else {
      console.log('Files/Folders removed:\n' + deletecontent.join('\n'))
    }
    return true
  } catch (error) {
    console.log('Problem while deleting: ' + error.message)
    return false
  }
}
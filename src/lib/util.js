import { stat, readdir } from 'fs/promises'

export function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// only use this for making sure a folder needed for later operations is present so the app can abort
// for folder creation use ensureFolder, for immediate reads just try reading the folder and handle errors
export async function folderExists(path) {
  try {
    // can't currently use fs.access(path, fs.constants.R_OK) because nodejs doesn't check ACLs on Windows (at least as of v10.7)
    // instead we use fs.stat to actually read the folder and handle errors
    const result = await stat(path)
    // result contains stat object, but we don't need it for a basic existence check
    return true
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'EPERM') {
      return false
    } else {
      console.error('folderExists-error: (' + path + '): ', error.message)
      throw error
    }
  }
}


export async function readFolder(folder) {
  const payload = { status: 0, data: null, count: 0, message: '' }
  try {
  const dir = await readdir(folder)
  return { ...payload, status: 1, data: dir, count: dir.length }
  } catch(error) {
    if (error.code === 'ENOENT' || error.code === 'EPERM') {
      return { ...payload, message: 'Folder doesn\'t exist or can\'t be accessed (' + folder + ')'}
    } else {
      // dlog.error('readFolders-error: (' + folder + '): ', error.message)
      return { ...payload, message: 'Folder read error (' + folder + ') error ->' + error.message }
    }
  }
}

// try {
//   const files = await readdir(path);
//   for await (const file of files)
//     console.log(file);
// } catch (err) {
//   console.error(err);
// }
'use strict'

const path = require('path')
const vfs = require('vinyl-fs')
const zip = require('gulp-vinyl-zip')

const GitHubApi = require('github')
const github = new GitHubApi()

module.exports = async ({ owner, repo, token, dest, destTheme }) => {

  github.authenticate({ type: 'token', token })

  const { data: latestRelease } = await github.repos.getLatestRelease({ owner, repo })
  const nextVersion = extractVersion(latestRelease.name)
  const releasePackageName = `${repo}-${nextVersion}.zip`

  await zipTheme(releasePackageName, dest, destTheme)

  const { data: release } = await github.repos.createRelease({
    owner,
    repo,
    tag_name: nextVersion,
    name: nextVersion,
  })

  return github.repos.uploadAsset({
    owner,
    repo,
    id: release.id,
    filePath: path.join(dest, releasePackageName),
    name: releasePackageName,
  })
}

function extractVersion(releaseName) {
  const [v, currentVersionString] = (/v(\d+)/.exec(releaseName) || [])
  const currentVersionNumber = Number(currentVersionString)
  const nextVersion = `v${currentVersionNumber + 1}`

  return nextVersion
}

function zipTheme(assetName, dest, destTheme) {

  return new Promise((resolve, reject) => {

    vfs
      .src('**/*', { base: destTheme, cwd: destTheme })
      .pipe(zip.zip(assetName))
      .pipe(vfs.dest(dest))
      .on('error', reject)
      .on('end', resolve)
  })
}

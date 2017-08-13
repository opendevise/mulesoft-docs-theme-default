'use strict'

module.exports = (domains, domainName, otherVersions) => {
  const domain = domains.find((candidate) => candidate.domain === domainName)
  const pageVersions = []
  domain.versions.forEach((domainVersion) => {
    const domainVersionCopy = Object.assign({ missing: true }, domainVersion)
    domainVersionCopy.version = domainVersionCopy.version.replace(' (latest)', '')
    const pageVersion = otherVersions.find((candidate) => candidate.version === domainVersionCopy.version)
    pageVersions.push(pageVersion ? pageVersion : domainVersionCopy)
  })

  return pageVersions
}

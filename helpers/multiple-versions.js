'use strict'

module.exports = (domains, domainName) => {
  const domain = domains.find((candidate) => candidate.domain === domainName )
  return domain && domain.versions.length > 1
}

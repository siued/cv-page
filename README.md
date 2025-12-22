<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Deployment

### Build

The image is built from a Dockerfile and stored in the GitHub container registry ([ghcr.io](https://ghcr.io)). GHCR is free for public images.

### Google Artifact registry

Google Cloud Run doesn't allow using container images that are not hosted in Google registries. To avoid this, I set up a Remote artifact registry in GAR which serves as a proxy to GHCR. Very useful guide [here](https://alphasec.io/how-to-deploy-a-github-container-image-to-google-cloud-run/).

The image URL is  
`\<region>-docker.pkg.dev/\<project-id>/ghcr/\<github-username>/\<image-name>:\<tag>`. Note that `ghcr` is the name of the created GAR registry which points to `ghcr.io`.

GAR is paid if combined size of all artifacts exceeds 500Mb. It is set to only keep 1 most recent image to avoid fees.

### Service account

To push to Cloud Run using Github Actions, I needed a service account with sufficient permissions. These are:

- Cloud Run Service Agent
- Cloud Run Admin

The service account authenticates in GitHub actios using a JSON credentials file.

### Cloud Run deployment

The main branch is deployed as soon as the CI and build pipelines finish.

[Pricing](https://cloud.google.com/run/pricing?hl=en)

- CPU - First 180,000 vCPU-seconds free per month
- RAM - First 360,000 GiB-seconds free per month
- Requests - 2 million requests free per month

### Domain mapping

To map a Cloudflare domain to Cloud Run:

1. Add a custom domain in the Cloud Run service
2. Verify your domain (if not yet verified)
3. Add the A records (at least one) to your Cloudflare DNS with TTL: 1 min
4. Wait until Google provisions a SSL certificate (green checkmark next to your custom domain)
5. Delete the A record, and add a CNAME record pointing to `ghs.googlehosted.com`.
6. You're all set!

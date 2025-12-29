# CV page

This is my personal website.  
Instead of having an AI-generated frontend, I decided to create a clean API with my personal details and let the documentation serve as the frontend.

Currently this is still WIP. I am in the process of adding more data and endpoints.

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
# all tests
$ yarn test

# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## NestJS Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

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

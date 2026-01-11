<!-- this is rendered in CommonMark markdown format as the app description -->

# Welcome!

<!-- the image is added in raw HTML to allow text wrapping -->
<img src="/assets/favicon.ico" alt="My profile picture" align="right" width="35%" style="margin-left: 10%;">

This is my personal website.

Instead of having an AI-generated frontend, I decided to create a clean API with my personal details and let the documentation serve as the frontend.

This is a work-in-progress but it is fully functional. I am in the process of adding more endpoints and data.

---

## About Me

<details>
<summary>Click to expand</summary>

I am a high-achieving student and (mainly backend) developer. During my career and studies, I have fought and conquered many areas of software engineering. To show some of the mightiest foes I have slain:

- DevOps (Docker, k8s, Helm, Terraform)
- Backend (FastAPI, NestJS)
- Data Science (data analysis, ML)
- Databases (MongoDB, PostgreSQL)
- Frontend (React, Tailwind)
- Scientific publishing (MSc thesis published at ICSE conference)

For the full list, please see [my CV](#tag/cv/GET/cv/file).

Outside of work, I do also like having a life. "What do you do in your free time?", I hear you ask. Here is a short, non-exhaustive list of some hobbies.

- Video gaming
- DnD and other TTRPG games
- Board games
- 3D printing
- Homelabbing
- Chess

I hope, nay, I know that all of your burning questions about me must have been answered. However, should you find your curiosity unsatisfied, feel free to visit the [Contacts](#tag/contacts) section and use your preferred communication method to reach out!

</details>

## About this project

<details>
<summary>Click to expand</summary>

To make my website unique, I decided to take a different approach to frontend. In the wild west of service integration, I often notice that API documentation is incomplete, incorrect or missing. Hence, I decided to let the API speak for itself and have the API reference be the frontend.

I see this as an exercise in following API design conventions. The code is written such that it documents itself with built-in tooling from the NestJS framework using OpenAPI. I like the challenge of using nothing but the OpenAPI specification to display and describe everything. At the same time, this is an opportunity for me to learn and practice how to use OpenAPI and the NestJS integration and all of its features.

</details>

---

## API Documentation Providers

This API integrates with multiple OpenAPI-based documentation generators. The default is Scalar because it has a nice modern feel and works well, but others are available:

- [**Scalar**](/docs/scalar)
- [**Swagger**](/docs/swagger)
- [**Stoplight**](/docs/stoplight)
- [**Redocly**](/docs/redocly)
- [**RapiDoc**](/docs/rapidoc)

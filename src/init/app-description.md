<!-- this is rendered in CommonMark markdown format as the app description -->

# Welcome!

<!-- the image is added in raw HTML to allow text wrappign -->
<img src="/assets/favicon.ico" alt="My profile picture" align="right" width="45%" style="margin-left: 5%;">

This is my personal website.  
Instead of having an AI-generated frontend, I decided to create a clean API with my personal details and let the documentation serve as the frontend.

Currently this is still WIP. I am in the process of adding more data and endpoints.

## About Me

<details>
<summary>Click to expand</summary>

Here will be a summary of who I am as a person. Super easy to write, just put my entire personality and all my achievemnts into 4-5 lines.

</details>

## About this project

<details>
<summary>Click to expand</summary>

To make my website unique, I decided to take a different approach to frontend. In the wild west of service integration, I often notice that API documentation is incomplete, incorrect or missing. Hence, I decided to let the API speak for itself and have the API reference be the frontend.  
I see this as an exercise in following API design conventions. The code is written such that it documents itself with built-in tooling from the NestJS framework using OpenAPI. I like the challenge of using nothing but the OpenAPI specification to display and describe everything.  
At the same time, this is an opportunity for me to learn how to use OpenAPI and the NestJS integration and all of its features.

</details>

---

## API Documentation Providers

This API integrates with multiple OpenAPI-based documentation generators. The default is Scalar because it has a nice modern feel and works well, but others are available:

- [**Scalar**](/docs/scalar)
- [**Swagger**](/docs/swagger)
- [**Stoplight**](/docs/stoplight)
- [**Redocly**](/docs/redocly)
- [**RapiDoc**](/docs/rapidoc)

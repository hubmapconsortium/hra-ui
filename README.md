<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
<br>
[![Tests](https://github.com/hubmapconsortium/ccf-ui/actions/workflows/tests.yml/badge.svg?branch=develop)](https://github.com/hubmapconsortium/hra-ui/actions/workflows/ci.yml)
[![GitHub last commit](https://img.shields.io/github/last-commit/hubmapconsortium/hra-ui.svg)](https://github.com/hubmapconsortium/hra-ui/commits/develop)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=hubmapconsortium_hra-ui&metric=alert_status)](https://sonarcloud.io/project/overview?id=hubmapconsortium_hra-ui)

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/hubmapconsortium/hra-ui">
    <img src="./apps/cde-ui/src/assets/logo/hra_small.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Human Reference Atlas (HRA) User Interfaces</h3>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-hra-ui">About HRA UI</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About HRA UI

[![Product Name Screen Shot][product-screenshot]](https://apps.humanatlas.io/)

This repository contains all the Human Reference Atlas (HRA) User Interfaces.

For detailed information, please refer to the documentation for each app.

- [ASCT+B API](./apps/asctb-api/README.md) - Backend Server for ASCT+B Reporter.
- [ASCT+B Reporter](./apps/asctb-reporter/README.md) - Visualization tool for displaying flattened ASCT+B tables.
- [CCF Body UI Web Component](./apps/ccf-body-ui-wc/README.md) - A web component used in Exploration User Interface.
- [Exploration User Interface](./apps/ccf-eui/README.md) - An interactive tool for exploring and validating spatially registered tissue blocks and cell-type populations.
- [CCF Organ Info](./apps/ccf-organ-info/README.md) - User Interface for Organ Information.
- [Registration User Interfce](./apps/ccf-rui/README.md) - An interactive tool for registering tissue blocks spatially and annotating them semantically using ASCT+B Table terms.
- [Cell Distance Explorer](./apps/cde-ui/README.md) - Compute, visualize, and explore distance distributions between different cells, cell types, anatomical structures, and more.
- [Cell Distance Explorer Visualization Web Component](./apps/cde-visualization-wc/README.md) - A web component used in Cell Distance Explorer.
- [HRA Dashboards](./apps/dashboard-ui/README.md) - Explore usage statistics of atlas data and code.
- [FTU UI](./apps/ftu-ui/README.md) - Examine cell type abundance and biomarker expression values for functional tissue units (FTUs).
- [FTU UI Small Web Component](./apps/ftu-ui-small-wc/README.md) - A web component used in FTU Explorer.
- [Humanatlas](./apps/humanatlas.io/README.md) - 3D Multiscale Biomolecular Human Reference Atlas Construction, Visualization, and Usage.
- [Medical Illustration](./apps/medical-illustration/README.md) - A web component used in FTU Explorer.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Angular][Angular.io]][Angular-url]
- [![Typescript][Typescript.io]][Typescript-url]
- [![Nx][Nx.io]][Nx-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up follow these simple example steps.

### Prerequisites

- npm:
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/hubmapconsortium/hra-ui.git
   ```
2. Install NPM packages:
   ```sh
   npm install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

To serve any app use this command:

```sh
$ npx nx run app-name:serve
```

For example, if the app name is **cde-ui**, use the following command:

```sh
$ npx nx run cde-ui:serve
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/hubmapconsortium/hra-ui?style=for-the-badge
[contributors-url]: https://github.com/hubmapconsortium/hra-ui/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/hubmapconsortium/hra-ui?style=for-the-badge
[forks-url]: https://github.com/hubmapconsortium/hra-ui/network/members
[stars-shield]: https://img.shields.io/github/stars/hubmapconsortium/hra-ui?style=for-the-badge
[stars-url]: https://github.com/hubmapconsortium/hra-ui/stargazers
[issues-shield]: https://img.shields.io/github/issues/hubmapconsortium/hra-ui?style=for-the-badge
[issues-url]: https://github.com/hubmapconsortium/hra-ui/issues
[license-shield]: https://img.shields.io/github/license/hubmapconsortium/hra-ui?style=for-the-badge
[license-url]: https://github.com/hubmapconsortium/hra-ui/blob/main/LICENSE
[product-screenshot]: images/screenshot.png
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Typescript.io]: https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=for-the-badge&logoSize=amg
[Typescript-url]: https://www.typescriptlang.org/
[Nx.io]: https://img.shields.io/badge/nx-logo?style=for-the-badge&logo=nx&logoColor=white&labelColor=black&color=black
[Nx-url]: https://nx.dev/

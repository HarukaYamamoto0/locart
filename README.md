<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<div align="center">
  <a href="https://github.com/HarukaYamamoto0/locart">
    <img src="https://imgur.com/SDlY0FX.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Locart Server</h3>

  <p align="center">
    A powerful self-hosted image server!
    <br />
    <a href="https://github.com/HarukaYamamoto0/locart"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <!-- <a href="https://github.com/HarukaYamamoto0/locart">View Demo</a>
    ·
    --> <a href="https://github.com/HarukaYamamoto0/locart/issues/new?labels=bug&template=bug_report.md">Report Bug</a>
    ·
    <a href="https://github.com/HarukaYamamoto0/locart/issues/new?labels=enhancement&template=feature_request.md">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## About The Project

Locart is an image upload server similar to imgur, but it differs because you can host Locart on your own machine, a good example of this is that I am creating it from a cell phone (this is not because I want to ), I am creating it from scratch because there are not many simple and reliable alternatives to creating your own upload server, I will strive to make this project grow and improve over time.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

If you thought the project was cool, you've already given a star in the repository to help us, now below is the tutorial on how you can install Locart locally on your machine.

### Prerequisites

First of all, you need to have the basic tools for developing in NodeJs, which are:

- Code editor (can be Visual Studio Code)
- Nodejs
- Git
> I strongly recommend you install the `LTS` version of nodejs using [nvm](https://github.com/nvm-sh/nvm), it is a version manager for nodejs, it makes installation easier and allows you to use different versions of nodejs

### Installation

Now we will import the project to your local machine, and configure it

1. Clone the repo
   ```sh
   git clone https://github.com/HarukaYamamoto0/locart.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Open the `locart.config.json` file, and fill in the necessary fields
4. After that, just start Locart using:
   ```sh
   npm run start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

🚧🧑‍💻 Under construction... 🧑‍💻🚧

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Roadmap

The next commits will be more focused on the following tasks, but of course keep in mind that I won't necessarily go step by step.

- [x] create the base
- [x] create a working version
- [x] configure the project (settings files)
- [ ] create connection with the database
- [ ] create tests
- [ ] make a good file architecture
- [ ] create authentication system
- [ ] improve operation to be able to upload many files
- [ ] create a client
- [ ] Create a demo for users to test
- [ ] Then I think about the rest

See the [open issues](https://github.com/HarukaYamamoto0/locart/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community an incredible place to learn, inspire, and create. Any contribution you make will be **greatly appreciated**.

If you have a suggestion that could improve this, please fork the repository and create a pull request.
Don't forget to give the project a star! Thank you again!

1. Fork the Project
2. Create your Feature Branch (`git switch -c feature/AmazingFeature`)
3. Commit your Changes (`git commit`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

* [Jpawlowski for the incredibly readme template](https://github.com/othneildrew/Best-README-Template)
* [Rocketseat for the videos showing how to do it](https://youtu.be/MkkbUfcZUZM?si=0mV3_9I5Y_AN16rQ)
* [Flaticon by star logo](https://www.flaticon.com/br/icones-gratis/estrela)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

This project is under license. See the [LICENSE](./LICENSE) file for more details.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/HarukaYamamoto0/locart.svg?style=for-the-badge
[contributors-url]: https://github.com/HarukaYamamoto0/locart/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/HarukaYamamoto0/locart.svg?style=for-the-badge
[forks-url]: https://github.com/HarukaYamamoto0/locart/network/members
[stars-shield]: https://img.shields.io/github/stars/HarukaYamamoto0/locart.svg?style=for-the-badge
[stars-url]: https://github.com/HarukaYamamoto0/locart/stargazers
[issues-shield]: https://img.shields.io/github/issues/HarukaYamamoto0/locart.svg?style=for-the-badge
[issues-url]: https://github.com/HarukaYamamoto0/locart/issues
[license-shield]: https://img.shields.io/github/license/HarukaYamamoto0/locart.svg?style=for-the-badge
[license-url]: https://github.com/HarukaYamamoto0/locart/blob/master/LICENSE.txt

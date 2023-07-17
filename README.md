<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Rafal-Matras/tea-shop-be">
    <img src="./readme/Logo.jpg" alt="Logo" width="788" height="231">
  </a>

<h3 align="center">[BE] Tea-Shop</h3>

  <p align="center">
    Backend e-commerce.
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
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
    <li>
      <a href="#screen-shots">Screen shots</a>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![Product Name Screen Shot][product-screenshot]

The online store project was created to show my skills in writing code.
</br>
E-commerce is fully operational, everything is clickable
</br>
In the store, you can set up your account, thanks to which we will gain access to the customer panel, where we can view / change data, change settings and view purchase history
</br>
The store has a product search engine that searches by product name, from the list of matching products, after clicking on the product, we are redirected to the product.
</br>

<p align="right">(<a href="#top">back to top</a>)</p>


### Built With


[![Nest][Nest]][Nest-url]
[![Typescript][Typescript]][Typescript-url]
[![Typeorm][Typeorm]][Typeorm-url]
[![Jwt][Jwt]][Jwt-url]
[![Mysql][Mysql]][Mysql-url]
[![Passport][Passport]][Passport-url]
[![Nodemailer][Nodemailer]][Nodemailer-url]
[![Bcrypt][Bcrypt]][Bcrypt-url]


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
* node
  ```sh
  node@^16.15.1
  ```
* yarn
  ```sh
  yarn@^1.22.19
  ```

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/Rafal-Matras/tea-shop-be.git
   ```
2. Go to the project directory
   ```sh
   cd tea-shop-be
   ```
3. Install NPM packages
   ```sh
   yarn
   ```
4. Rename the file `src/config/config.example.ts` to `src/config/config.ts`
5. Complete the config file accordingly `src/config/config.ts`
 ```ts
  export const config = {
    dbHost: 'localhost',  // The ip address of the database
    dbPort: 3306,  // Port to the database
    dbDatabase: '',  // Database name
    dbUsername: '',  // Database username
    dbPassword: '',  // Database password
    dbSynchronize: true,  // Whether typeorm should synchronize the database recommended - false
    dbLogging: false,  // Displaying the executed sql in the console
    feUrl: 'https://head-hunter.pl', // Frontend url
    mailPassword: 'admin123',  // Smtp server password
    mailUsername: 'admin',  // Smtp server username
    mailHost:'localhost',  // Mail domain name
    mailPort:2500, // Mail port
    secretJwt:'',  // Security key jwt
  };
 ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- SCREEN SHOTS -->
## Screen shots

![Product Name Screen Shot][product-screenshot1]
![Product Name Screen Shot][product-screenshot2]
![Product Name Screen Shot][product-screenshot3]
![Product Name Screen Shot][product-screenshot4]
![Product Name Screen Shot][product-screenshot5]



<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Rafal-Matras/tea-shop-fe.svg?style=for-the-badge
[contributors-url]: https://github.com/Rafal-Matras/tea-shop-fe/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Rafal-Matras/tea-shop-fe.svg?style=for-the-badge
[forks-url]: https://github.com/Rafal-Matras/tea-shop-fe/network/members
[stars-shield]: https://img.shields.io/github/stars/Rafal-Matras/tea-shop-fe.svg?style=for-the-badge
[stars-url]: https://github.com/Rafal-Matras/tea-shop-fe/stargazers
[issues-shield]: https://img.shields.io/github/issues/Rafal-Matras/tea-shop-fe.svg?style=for-the-badge
[issues-url]: https://github.com/Rafal-Matras/tea-shop-fe/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/rafalmatras/
[product-screenshot]: readme/sklep.jpg
[product-screenshot1]: readme/screen1.jpg
[product-screenshot2]: readme/screen2.jpg
[product-screenshot3]: readme/screen3.jpg
[product-screenshot4]: readme/screen4.jpg
[product-screenshot5]: readme/screen5.jpg
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[Typescript]: https://img.shields.io/badge/typescript-20232A?style=for-the-badge&logo=typescript&logoColor=3178c6
[Typescript-url]: https://www.typescriptlang.org/
[Nest]: https://img.shields.io/badge/Nest-20232A?style=for-the-badge&logo=nestjs&logoColor=ea2845
[Nest-url]: https://nestjs.com/
[Typeorm]: https://img.shields.io/badge/type%20orm-20232A?style=for-the-badge&logo=typeorm&logoColor=ea2845
[Typeorm-url]: https://typeorm.io/
[Jwt]: https://img.shields.io/badge/jwt-20232A?style=for-the-badge&logo=JSONwebtokens&logoColor=fff
[Jwt-url]: https://jwt.io/
[Mysql]: https://img.shields.io/badge/mysql-20232A?style=for-the-badge&logo=mysql&logoColor=fff
[Mysql-url]: https://www.mysql.com/
[Passport]: https://img.shields.io/badge/passport-20232A?style=for-the-badge&logo=passport&logoColor=fff
[Passport-url]: https://www.passportjs.org/
[Nodemailer]: https://img.shields.io/badge/nodemailer-20232A?style=for-the-badge&logo=nodemailer&logoColor=fff
[Nodemailer-url]: https://nodemailer.com/about/
[Bcrypt]: https://img.shields.io/badge/bcrypt-20232A?style=for-the-badge&logo=bcrypt&logoColor=fff
[Bcrypt-url]: https://github.com/kelektiv/node.bcrypt.js

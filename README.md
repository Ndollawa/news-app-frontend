# News Aggregator Web Application

Welcome to the News Aggregator web application! This project is a news aggregator website that pulls articles from various sources and displays them in a clean and easy-to-read format.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The News Aggregator web application allows users to browse and search for articles from different news sources. Users can create an account, log in, and save their preferences and settings. The application provides a personalized news feed based on the user's preferred sources, categories, and authors. It also offers article search and filtering options, allowing users to find articles by keyword, date, category, and source. The website is designed to be mobile-responsive, ensuring a seamless experience across different devices.

## Features

- User authentication and registration: Create an account and log in to access personalized features.
- Personalized news feed: Customize the news feed by selecting preferred sources, categories, and authors.
- Article search and filtering: Search for articles by keyword and filter results by date, category, and source.
- Mobile-responsive design: Enjoy a seamless browsing experience on mobile devices.

## Technologies Used

- Laravel: PHP web application framework for backend development.
- React: JavaScript library for building user interfaces.
- MySQL: Relational database management system for storing user data and articles.
- HTML/CSS: Markup language and stylesheets for designing and styling the web pages.
- JavaScript: Programming language for client-side functionality.
- News APIs: Utilize various news APIs to retrieve articles from different sources.
- Redux & Redux Toolkit: For state management.
- Tailwind Css
- JWT 

## Installation

To set up the News Aggregator web application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/ndollawa/news-app-frontend.git`
2. Navigate to the project directory: `cd frontend`
3. Install dependencies:
   - Backend (Laravel): `composer install`
   -  Frontend (React): `npm install`
4. Set up the database:
   - Create a MySQL database and update the database configuration in the `.env` file.
   - Run database migrations: `php artisan migrate`

5. Configure environment variables: Update the `.env` file with the necessary configuration, such as API keys for news sources.
   - Set the following environment variables;
        - # NEWS APIs for test You can use yours also
            - NEWSAPI_API_KEY = b3ffafd36bef488c887445548e4e2d94 
            - NYT_API_KEY = gsgVbE7DrQ0GOTuELEd7YKg1UPKPmKLn
            - THEGUARDIAN_API_KEY = e162919e-7ca6-406d-a4f0-f456e31f85f3
        - RUN the following comands to pull or fetch news feeds every minute from specified sources
            -  php artisan fetch:newsApiData
            -  php artisan fetch:newyorkTimesApiData
            -  php artisan fetch:theGuardianApiData

6. Start the development server:
   - Backend (Laravel): `php artisan serve`
   - Frontend (React): `npm start`
## Usage
1. Access the News Aggregator web application by opening it in your browser: `http://localhost:3000`.
2. Register a new account or log in with your existing credentials.
3. Customize your news feed by selecting preferred sources, categories, and authors.
4. Search for articles using the search bar and apply filters as needed.
5. Browse the articles displayed in your personalized news feed
6. Enjoy reading the latest news from various sources in a clean and easy-to-read format.
## 
## 

## ScreenShots
![Home Page](screenshots/Screenshot(56).png)
![Dashboard 2](screenshots/Screenshot(55).png)
![Login Page](screenshots/Screenshot(53).png)
![Registration Page](screenshots/Screenshot(54).png)

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or bug fixes, please submit a pull request. For major changes, please open an issue first to discuss the changes.

## License

This project is licensed under the [MIT License](LICENSE).
# About the app

This weather forecasting web application was developed in react, written in typescript and all the styles were done in pure css.

The components are divided into header, dashboard and panel. In the first, a Header component is created which will contain the page header as well as a form that the user will use to submit the name of the city for which they want to see the forecast. The dashboard contains the components for the cards where the daily forecasts are represented, the component responsible for creating the chart and another that will be applied as a modal. Outside the subfolders are two files, Panel.tsx and Modal.tsx. The former is where the various modules will be applied. The second is a modal that will serve as a “popup” to warn the user of a possible error or while the application is loading.

The WeatherRequest.ts file is responsible for making the request to the API and processing the data.

Also stored in the project is a file called weatherdata.json where dummy data is stored to test the application. This data will be imported into the WeatherRequest.tsx file.

## Available Scripts

### `npm install`
Install all the required packages

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

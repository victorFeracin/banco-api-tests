# banco-api-tests

## Objective

This project performs automated API tests for [banco-api](https://github.com/victorFeracin/banco-api), validating its functionalities and contributing to the quality of its operations.

## Stack used

- **Language:** JavaScript (Node.js)
- **Test framework:** [Mocha](https://mochajs.org/)
- **HTTP requests library:** [Supertest](https://github.com/ladjs/supertest)
- **Assertions library:** [Chai](https://www.chaijs.com/)
- **Test reports:** [Mochawesome](https://github.com/adamgruber/mochawesome)
- **Environment variables management:** [dotenv](https://github.com/motdotla/dotenv)

## Directory structure

```
banco-api-tests/
├── fixtures/
│   ├── postLogin.json
│   ├── postTransferencias.json
├── helpers/
│   ├── authentication.js
├── test/               # Tests organized by functionality 
│   ├── login.test.js
│   └── transferencias.test.js
├── mochawesome-report/ # Automatically generated directory with the HTML test report
├── .env                # .env file used to configure the BASE_URL variable
├── .env.example        # .env sample to help the environment variable setup
├── .gitignore
├── package.json
└── README.md
```

## `.env` File format

Before running the tests, create a file named .env in the root folder of the project with the following content:

```
BASE_URL=http://localhost:3000
```

Replace `http://localhost:3000` with the URL where the API `banco-api` is running.

## Execution commands

Install the dependencies:

```bash
npm install
```

Run all tests:

```bash
npm test
```

Automatic HTML report generation::

- After running `npm test`, the report will be generated inside the `mochawesome-report/` folder.

Suggestion: to run the tests and automatically open the HTML report, add the following script to `package.json`:

```json
"scripts": {
  "test:report": "npm test && open mochawesome-report/mochawesome.html"
}
```

(On Windows, replace `open` with `start`.)

## Used Dependencies and Their Documentation

- [Mocha](https://mochajs.org/) - Test execution framework
- [Supertest](https://github.com/ladjs/supertest) - HTTP request library
- [Chai](https://www.chaijs.com/) - Assertion library
- [Mochawesome](https://github.com/adamgruber/mochawesome) - HTML report generation
- [dotenv](https://github.com/motdotla/dotenv) - Environment variables management

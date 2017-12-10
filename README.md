# Bears 17 Project

<h2 align="center">🔥 Are you a developer looking for your next job? 🔥</h2>

You need to prepare yourself for the interview to make sure that you are successful. The best way is to know the questions that may be coming and practice your answers before attending any interviews.

Our app helps (aspiring) developers to prepare for job interviews with questions asked by tech companies.

[User Stories](#user-stories) | [Tools Used](#tools-used-aka-tech-stack) | [Install & Build](#install-and-build) | [Contributors](#contributors)

## User Stories

### Minimum Viable Product

- [ ] As a user I can see a list of questions interviewers ask
- [ ] As a user I can see a list of posts other users posted answering the interview questions
- [ ] As a user I can see the name and avatar of the authors of the questions and answers and the date/time they submitted them
- [ ] As a user I can see the number of people who follow a question
- [ ] As a user I can click a button to share a question on Twitter and/or FaceBook
- [ ] As a user I can see a list of questions under any category
- [ ] As a user I can sort the answers by usefulness or by the date submitted
- [ ] As a user I can see the number of votes an answer received
- [ ] As a user I can login with my GitHub and/or Twitter and/or FaceBook account
- [ ] As an authenticated user I can post a question an interviewer asked
- [ ] As an authenticated user I can edit my own questions
- [ ] As an authenticated user I can answer my own question
- [ ] As an authenticated user I can edit my own answers
- [ ] As an authenticated user I can vote and remove my vote on answers
- [ ] As an authenticated user I can flag answers as spam or low quality
- [ ] As an authenticated user I can follow questions so I get notified when it receives new answers
- [ ] As an authenticated user I can unfollow a question so I don't get new notifications
- [ ] As an authenticated user I can see a dashboard with the questions I asked, questions and categories I followed
- [ ] As an authenticated user I can post a message on users' answers so I can suggest improvements

### Future Releases

- [ ] As a user I can search questions by companies and roles
- [ ] As a user I can search for technical questions by language
- [ ] As an authenticated user I can connect questions to companies and roles so other users know what to expect on their interview
- [ ] As an authenticated user I can request other users to answer my question
- [ ] As an authenticated user I can get a notification when another user request an answer to a question

## Tools Used aka Tech Stack

### Back End

- [Node.js](https://nodejs.org/en/) 8+
- [Koa.js](http://koajs.com/) web framework
- [GraphQL](http://graphql.org/) data query language (a REST alternative)
- [MongoDB](https://www.mongodb.com/) NoSQL database
- [ESLint](http://eslint.org/) linter with [Airbnb's base JS config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base)

### Front End

- [React.js](https://facebook.github.io/react/) library
- [Webpack](https://webpack.js.org/) module bundler
- [Babel.js](https://babeljs.io/) compiler
- [ESLint](http://eslint.org/) linter with [Airbnb's JS config](https://github.com/airbnb/javascript)
- [Sass](http://sass-lang.com/) preprocessor with PostCSS' [Autoprefixer](https://github.com/postcss/autoprefixer)

### Tests

- [Jest](https://facebook.github.io/jest/) test runner
- [Enzyme](http://airbnb.io/enzyme/) testing utilities for React

## Install and Build

#### Developer issues

If running on Windows, whilst building the app you might encounter a linebreak error message from ESLint.

To fix, simply add to bash the [following](https://gist.github.com/RadValentin/dd8b9d70448413301e9a274ed54661a5).

#### Clone this repo

``` bash
git clone https://github.com/chingu-voyage3/bears-17.git
cd bears-17
```

#### Install dependencies

``` bash
npm install
```

#### Create a `.env` file

You can find a `.env.example` file in the root directory as a starting point. You can copy the content of this file to `.env` and add your own values.

``` bash
touch .env
```

#### Start React app and API in parallel

``` bash
npm run dev
```

#### Start API dev server

``` bash
npm run dev:server
```

#### Start React app with hot reload

It builds HTML, CSS, and the JavaScript bundle, starts a dev server and refreshes the browser on every saved changes.

``` bash
npm run dev:client
```

#### Build production bundle

It builds production bundle, uglifies JS, minifies CSS.

``` bash
npm run build
```

#### Run tests

Run unit tests with Jest

``` bash
npm test
```

## Git Branches

#### `master` branch

The `master` branch is the main branch where the source code always reflects the current production release and is only updated from the `development` branch.

#### `development` branch

The `development` branch is the "integration" branch where the source code always reflects a state with the latest delivered development changes for the next release.

#### Developer branches

Developer branches are "feature", "bugfix" and "refactor" branches we merge back to the `development` branch.

## Contributors

Thanks to all the contributors for their time and effort:

- [Zsolt Meszaros](https://github.com/zsoltime)
- [Jamie Player](https://github.com/heyjp)
- [Olga Stefanishyna](https://github.com/OStefani)
- [Paulina Chalubinska](https://github.com/pchalubinska)

# Full Stack Open — Part 8

Solutions for [Full Stack Open, part 8: GraphQL](https://fullstackopen.com/en/part8).

Parts 0–5 are in [fullstack-open-part00-05](https://github.com/Kopfdreher/fullstack-open-part00-05), which also describes the course. Part 6 is in [fullstack-open-part06](https://github.com/Kopfdreher/fullstack-open-part06). Part 7 is in [fullstack-open-part07](https://github.com/Kopfdreher/fullstack-open-part07).

Earlier parts used REST. This part uses [GraphQL](https://graphql.org/): the client asks for the fields it needs in one query, and the server answers with exactly that shape. The library exercise is a GraphQL API built with [Apollo Server](https://www.apollographql.com/docs/apollo-server), and a React client that lists authors and books, adds books, edits an author’s birth year, logs in, filters by genre, and shows recommendations. Queries and mutations are covered by Node’s test runner; the browser flow is covered by Playwright.

| Directory | What it covers |
| --- | --- |
| `library-backend` | Apollo Server library API (authors, books, users, login) |
| `library-frontend` | React client for that API |
| `tests-chapter4` | Node tests for queries and mutations |
| `tests-chapter5` | Playwright tests for the library UI |

The backend is started from `library-backend` with `npm install` and `npm run dev` (port 4000). The frontend is started from `library-frontend` with `npm install` and `npm run dev`.

Backend tests: `cd tests-chapter4 && npm install && npm test`. They use an in-memory MongoDB and execute operations against the API.

End-to-end tests: `cd tests-chapter5 && npm install && npx playwright install chromium && npm test`. Playwright starts the backend and frontend itself. GitHub Actions workflows for both suites are under `.github/workflows/` and run on `workflow_dispatch`.

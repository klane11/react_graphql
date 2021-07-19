# Firstbase Frontend Coding Challenge

### Use Cases
* As a user I should be able to view the entire employee directory
* As a user I should be able to edit an employee
* As a user I should be able to search for employees with a search bar (client side)
* As a user I should be able to view all the information for a single employee


## Server and Client Instructions
* This is a monorepo containing both the Server and Client code
* Install all dependencies
1. `$ npm install`

* The server and client are started with single npm command:
2. `$ npm start`

* Testing code base:
3. `$ npm test`

GraphQL GraphiQL tool / documentation url:
https://localhost:8080/graphiql

Client url:
https://localhost:3000/directory


## Looking to the Future
* I believe it's good to keep your eye to the future of a project.
* These are a few enhancements I would focus on once having user feedback:
1. Adding pagination on Graphql queries when fetching list of all employees.
2. Frontend pagination when querying people to allow a user to easily navigate all employees.
3. Mobile responsiveness. We know our customers are on the go. Having a mobile responsive site is crutial for keeping clients happy.
4. Adjusting how the frontend "searches" for an employee. While we currently have all the employees' data and searching that array is easy, this is not ideal for many reasons.
    * The employee list could grow creating slower search results.
    * If server side pagination was introduced, we would no longer have all employee data to search from.
    * We could expand our search criteria. ex: ability to search by email
5. Add a theme component

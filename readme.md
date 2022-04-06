# Jenn's takehome project

## Getting started
I built this on Node v16.14.2, which is the latest LTS version as of when I started. I expect it would run on most any later version. I also expect it would run on earlier versions going back a while, as long as they support ES6 module imports with the `"type": "module"` package.json param.

That, said, you can get started by installing the dependencies and then running the start script. The api runs at http://localhost:3000
```bash
npm i
npm start
```

You can get more verbose debug logging by setting an env var `DEBUG=alto-api:*` but it's not required.

There are http request scripts in the file `alto-api.http`. Webstorm will recognize these as runnable scripts. There's also a postman collection, in case you don't have Webstorm. These are JWT bearer tokens, which will allow you to authenticate to the API. The Webstorm and postman scripts are already configured with bearer tokens.

```
Passenger p99, has a trip in progress and several past trips
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOiJwOTkiLCJpYXQiOjE1MTYyMzkwMjJ9.r8AtyqMhgQgWgp-2vCxC7Je4l5DLW5bXv_fS9ovxwPc

Passenger p40, has a past trip
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOiJwNDAiLCJpYXQiOjE1MTYyMzkwMjJ9.SDdwSHCxCOZu2FAAkDHXnpneqOQbLtlZ7fcT8-i4o74
```

## Notes

I generally followed a domain-driven hexagonal architecture. In short, hexagonal architecture (and other similiar architectures) proposes that the core logic of an application is isolated to itself. It then relies on (or is relied on by) adapters which are responsible for handling interation with other systems, such as databases, APIs, and API controllers. "Hexagon" is a by-product of how these things usually get drawn on a whiteboard. There's no significance to the shape, or the number 6.

The domains I identified were trips, drivers, vehicles, and maps. There's a concept of a passenger as well, and this would likely be a domain, but it's not represented in the sample designs. The core application logic is encapsulated in the various *Service classes. Each has a dataAdapter. Other adapters would make sense in a real app, such as a potential vehicleClientAdapter, to enable interacting with the vehicles directly.

There is a basic level of AuthN and AuthZ incorporated into the app. Authentication is done via the bearer tokens. Authorization is mostly in the form of restricting interaction to the passengers own trips, and in many cases by restricting it to only a currently in-progress trip. In a more complete app with more complex authorization requirements, it might make sense to separate that out.

## Limitations

* I did not implement any maps endpoints, because mapping is highly complex and assuming real-time location updates it would need a solution other than REST APIs anyway.
* I normally would like to include unit tests, but I feel I've already spent enough time on this. Encapsulating the application logic into the services goes a long way toward making those easy to implement. The data adapters should also have tests. The unit tests for the data adapters are the only ones that should need to rely on a database to function. The adapters can be mocked in tests for other components. And the route handlers themselves should be tested. That's a little tricky, and it might be easiest to do small refactor to define the handlers on their own, rather than as inline arrow functions in the route definitions.
* I wanted to generate swagger docs and a swagger UI for the API, but that's not as easy as I remember it being. Typescript would help a little bit, because it would be relatively easy to define the request/response body schemas as types.
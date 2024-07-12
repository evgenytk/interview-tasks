The task is solved and all criterias are met.

But there are some important concerns from my side according to the provided application. I really don’t like the structure and the chosen tools. If we consider it a production application, there is no way the app will be stable, robust and scalable. This boilerplate is only acceptable for small, no-changing service to perform small tasks. Otherwise, the project is meant to fail. So here are concerns:

- Missing types, TypeScript is must-have standard
- No DI management
- Old module management approach (via module.expors)
- Slow express framework (Fastify is faster analogue)
- Icnonsistent configurations across the app (again, DI)
- No linters and code consistency solutions
- Libraries in package JSON must be locked to exact version
- The naming is inconsistent - every model name should not be plural.
- Active records (which both mongoose and sequelize implements) is anti pattern, NOT suitable for large scaling applications
- No node.js version specification
- No way to start the app in dev environment
- There are warnings in console
- There is no logging solution, no request tracing, so it makes harder to debug production app, and exporting logs to systems like Grafana Loki or AWS Cloudwatch
- No error handling in case of unexpected error

These are just the basics. It is a must-have for building at least a standard node.js application.

I hope it is not a production app, but rather just a boilerplate downloaded from the common web resources, used just to make sure I know what the CRUD is :)

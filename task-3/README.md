## My thoughts

As I see, the task requirements are quite abstract. I can't provide the detailed solution, but I am gonna show you how I would be dealing with this task anyway.

Before handling system design and architecture we should consider several real-life factors:

- **Deadline;**
- **Business plans and goals;**
- **Developer’s experience.**

These are the aspects for Senior/Lead developer to consider before writing any code. Let’s break down each of them, I am gonna describe the why and how.

**Deadline** - perhaps one of the most unbeatable aspects when it comes to software implementation. If deadline is a top
priority, there is nothing to consider, but choose a simple and quick way of implementation. But here is a major thing a
business side must be aware of: such fast implementation way limits business growing because of software bottlenecks and
trade-offs that was made in favour of time-to-market delivery. If the project is planning to growth, it’s important to
allocate time and resources for improving existing software in technical terms. Also, it will make communication between
dev’s and business’s teams more clear and understandable.

**Business plans and goals** - this topic includes several factors such as expected load, amount of data to be
processed,
legal and political aspects, etc. It’s a very good case scenario having all these aspects defined. But the problem that
its never gonna happen. The reality is that no one know the future. We can make assumptions, but never strictly rely on
them. We can’t make ultimate 100% solution that covers everything. Instead, we should rationally analyse business plans
and goals, try to make the most appropriate decisions using the most of dev experience.

**Developer’s team experience** - it’s important to let developer work with technologies they know. It would be more
efficient to
let DevOps engineer to configure CI/CD pipeline instead of asking others who is less familiar with that topic. If
developer is really good with AWS, then it would be worth the effort implementing the system using AWS solutions. A good
developer team organisation make solution more robust, increate time-to-market delivery and reduce upcoming issues. So,
the final architecture decision should be made considering existing developers and their expertise in different topics.

It’s not possible to cover everything, especially in one text. There are variety of factors and each case should be
taken individually. So, coming back to the implementation of the SaaS, I will provide you with a bare minimum,
production-ready setup enough for minimal production-ready usage.

## Core Components

Before implementation, I need to decide core components of the system:

### Authorisation

We need to allow the application to scale and manage high-load. Also, following basic SOLID principles every service should have its own responsiblity. So it's worth the effort to introduce a central independent authentication mechanism to manage access across different platform and users, allowing to infinitely scale the SaaS's customers and free the actual SaaS from additional auth-related logic.

We can consider different solution. 
- The ideal would be implementing our own auth service, which allows us to largely scale it in terms of features; 
- Also we can consider some Open-Source solutions (like keycloak);
- In case of saving time and effort, we can consider SaaS solution from one of the popular providers (like Google, AWS, Auth0, etc.). But here is a catch! We should not vendor-lock on some exact provider so the provider must allow to export user data in order to move to another one (or implementing own solution) effortless. (there was a case in my previous company, when we had a need to transfer user's data, but it was impossible because of limitations of AWS Cognito platform. 

### Logging, monitoring and alerting

It’s important to have a clear vision of what’s going on in the system. In case of any issue, there should be clear way to debug the application, investigate the problem and also have an immediate reaction on technical incidents.

- If we use AWS infrastructure, it automatically handles logs and monitor resources
- In other cases, I would use a combination of Prometheus, Grafana, and Grafana Loki; But here is another catch! This monitoring application should not be deployed alongside with the main business applications. It should be placed on a dedicated server. In case if the business server fails, the monitoring application will also fail.

### DDOS protection

I guess it's crucial topic, considering the level of competition in such business area. So the base minimum setup is required. The core goal of DDOS protection is to hide real server IP address and delegate protection algorithms to proxy servers.

- I would use AWS, but I would be considering their solutions very carefully because of its high price. 
- The golden mean is having managed solution like CloudFlare. They offer basing protection for a very affordable price.
- In case of having large infrastructure, it would cost a lot for paying CloudFlare, so it's worth the effort to implement own DDOS protection solution.

## System Design & Architecture

Finally, let's answer the questions:
1. **Q: How can we design the system in a way that every Company will be able to serve games on their gaming site from their domain?** A: I assume that the SaaS has implementation of game business logic, payouts to customers, custom game preferences, service fees and pricing. So, in order to provide access to these functionalities, the SaaS should provide authorised API access and client libraries, so the customer will be able to run the games on its own platform, but re-use SaaS logic for actual gaming process.
2. **Q: What modification should be done to the users table at gPlatform to support this change?** A: First of all, drop the email unique constraint. There might me many users with the same email but connected to different platform. Instead, a user should have UUID as primary unique key and referenced column like "customer_id" or "platform_id" which specifies relation to each registered gaming platform on SaaS. But as I said before, a major part of user management should be moved to auth service.
3. **Q: Considering we have 1 backend cluster that serves all companies, how can we validate a user login on one gaming domain in such a way that it does not give access to a different gaming domain? (i.e. authenticating on site A, grants access to site A only)** A: I think it was already answered before. The SaaS should not be responsible for authorising access. It's main responsibility is to serve game logic, it should not decide how and to who give access. That's the job for the auth service.

For authentication purposes I would pick Keycloak open-source solution. The main reason is privacy and price. We don't want to expose customer's data to third-party services and make sure the information belongs to the business only. Also, managing third-party solutions is quite expensive, especially when it comes to SaaS when the need for authorisation is always in demand by growing amount of users.

I would deploy all the services (including SaaS and Auth service) at least on AWS ECS (analogue of Kubernetes) and configure autoscaling rules to balance the load and prevent fails in high-load period. The rule is flexible - we can allow infinitely scale the service according to given load. The only limitation is price, which must be strictly configured to prevent huge bills.

____

P.S. There are a lof of things left uncovered,but I think it’s enough for now. I hope you got better understanding of my expertise.

I am actually glad that the task requirements are abstract. It gives me an opportunity to apply my analytic experience. This is exactly what I am looking for. 

Oops, it seems like I have written the whole Medium-like article :)

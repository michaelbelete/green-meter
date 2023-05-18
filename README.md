# Green Meter

Green Meter is a **carbon calculator** designed to estimate your carbon footprint for flights and vehicle travel. The calculator uses real-time carbon emissions data from the [Carbon Interface API](https://docs.carboninterface.com/#/) to provide users with accurate estimates of their carbon emissions.

## Getting Started

To get started with Green Meter, you will need to set up your development environment and configure your environment variables.

### Prerequisites

Before you can set up Green Meter, you will need to have the following software installed on your machine:

- Node.js
- PostgreSQL

### Setup The Project

To install Green Meter, follow these steps:

1. Create `.env` file (copy `.env.example`)
2. Create postgres database (e.g. via https://www.elephantsql.com/)
3. Sign up to https://clerk.com/ and add your api keys to env file
4. Run `npm i`
5. Run `npm prisma db push`
6. Run `npm run dev`

## Technologies Used

- Next.js
- TypeScript
- Prisma
- NextAuth
- trpc

## Useful resources

This project uses the t3stack. You can read the documentation here https://create.t3.gg/en/introduction

We also recommend to learn about trpc (https://trpc.io/docs/) and tansack query (used by trpc under the hood) (https://tanstack.com/query/latest/docs/react/overview)

## Useful commands

npx prisma studio (starts the data browser) https://www.prisma.io/docs/concepts/components/prisma-studio

Sometimes the linter breaks and you get errors that shouldn't be there. When experiencing this you need to restart the `es-lint server` or `typescript server` in VS code:

`CMD` + `p`, then enter `> restart`

<img width="631" alt="image" src="https://github.com/simbacity/boilerplate/assets/98182227/2aedb802-29a2-4702-b634-312e366f5ec8">

## Contributing

Contributions to the project are welcome! To contribute:

1. Fork the repository to your own account.
2. Create a new branch for your feature or bug fix.
3. Make changes to your forked repository.
4. Submit a pull request to the main repository with a description of your changes.

## License

This project is licensed under the [MIT License](https://github.com/michaelbelete/green-meter/blob/master/LICENSE).

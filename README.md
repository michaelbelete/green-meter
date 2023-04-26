# Green Meter

Green Meter is a **carbon calculator** designed to estimate your carbon footprint for flights and vehicle travel. The calculator uses real-time carbon emissions data from the [Carbon Interface API](https://docs.carboninterface.com/#/) to provide users with accurate estimates of their carbon emissions.

## Getting Started

To get started with Green Meter, you will need to set up your development environment and configure your environment variables.

### Prerequisites

Before you can set up Green Meter, you will need to have the following software installed on your machine:

- Node.js
- PostgreSQL

### Installation

To install Green Meter, follow these steps:

1. Clone the repository to your local machine.

   ```bash
   git clone https://github.com/michaelbelete/green-meter.git
   ```

2. Install the project dependencies

   ```bash
   npm install
   ```

3. Create a PostgreSQL database and set the `DATABASE_URL` environment variable to the connection string for your database.
4. Set the necessary environment variables for the project. You can find the required variables in the `.env.example` file.
5. Setup the database and Seed it with airport information.

   ```bash
   npx prisma migrate dev

   // incase the seeding does not work automatically
   npx prisma db seed
   ```

6. Start the development server.

   ```bash
   npm run dev
   ```

## Technologies Used

- Next.js
- TypeScript
- Prisma
- NextAuth
- trpc

## Contributing

Contributions to the project are welcome! To contribute:

1. Fork the repository to your own account.
2. Create a new branch for your feature or bug fix.
3. Make changes to your forked repository.
4. Submit a pull request to the main repository with a description of your changes.

## License

This project is licensed under the [MIT License](https://github.com/michaelbelete/green-meter/blob/master/LICENSE).

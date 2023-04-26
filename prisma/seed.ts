import { PrismaClient } from "@prisma/client";
import airports from "./airports.json";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started 🚀🚀🚀");
  for (const airport of airports) {
    console.log(`Inserting ${airport.name} `);

    await prisma.airports.create({
      data: {
        iata_code: airport.iata_code,
        name: airport.name,
      },
    });
  }

  console.log(`Finished ✅`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });

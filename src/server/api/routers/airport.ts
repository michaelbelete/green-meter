import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// create a realtime procedure that search airports from prisma
export const airportRouter = createTRPCRouter({
  showRandomAirports: publicProcedure.query(async ({ ctx }) => {
    const airports = await ctx.prisma.airports.findMany({
      take: 5,
    });

    return airports;
  }),
  searchAirports: publicProcedure
    .input(
      z.object({
        name: z.string(),
        limit: z.number().default(10),
      })
    )
    .query(async ({ input, ctx }) => {
      const airports = await ctx.prisma.airports.findMany({
        take: input.limit,
        where: {
          name: {
            contains: input.name.toLowerCase(),
            mode: "insensitive",
          },
        },
      });
      return airports;
    }),
});

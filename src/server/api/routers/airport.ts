import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// create a realtime procedure that search airports from prisma
export const airportRouter = createTRPCRouter({
  searchAirports: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        limit: z.number().default(10),
      })
    )
    .query(async ({ input, ctx }) => {
      const airports = await ctx.prisma.airports.findMany({
        take: input.limit,
        where: {
          name: {
            contains: input.name,
          },
        },
      });

      return airports;
    }),
});

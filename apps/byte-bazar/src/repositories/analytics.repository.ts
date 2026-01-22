import { Prisma, prisma } from "@workspace/database";

export class AnalyticsRepository {
  async countTable(tableName: string) {
    return await prisma.$queryRaw`SELECT COUNT(*) FROM ${Prisma.raw(tableName)}`;
  }

  async getMonthlyStatsTable(tableName: string) {
    const rawData =
      await prisma.$queryRaw`SELECT DATE_TRUNC('month', "created_at") AS month,
        COUNT(*)::INT AS total
    FROM "${Prisma.raw(tableName)}"
    GROUP BY month
    ORDER BY month ASC
    `;
    return rawData.map((item) => ({
      month: new Intl.DateTimeFormat("es-ES", {
        month: "long",
        year: "numeric",
      }).format(item.month),
      total: item.total,
    }));
  }
}

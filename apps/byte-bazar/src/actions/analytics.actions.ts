"use server";

import { AnalyticsService } from "../services/analytics.service";

const analyticsService = () => {
  return new AnalyticsService();
};

export async function getCountProducts() {
  return await analyticsService().getCountProducts();
}

export async function getCountCategories() {
  return await analyticsService().getCountCategories();
}

export async function getCountBrands() {
  return await analyticsService().getCountBrands();
}

export async function getCountUsers() {
  return await analyticsService().getCountUsers();
}

export async function getCountOrders() {
  return await analyticsService().getCountOrders();
}

/* export async function getMonthlyStatsProducts() {
  return await analyticsService().getMonthlyStatsProducts();
}

export async function getMonthlyStatsCategories() {
  return await analyticsService().getMonthlyStatsCategories();
}

export async function getMonthlyStatsBrands() {
  return await analyticsService().getMonthlyStatsBrands();
}

export async function getMonthlyStatsUsers() {
  return await analyticsService().getMonthlyStatsUsers();
}

export async function getMonthlyStatsOrders() {
  return await analyticsService().getMonthlyStatsOrders();
} */

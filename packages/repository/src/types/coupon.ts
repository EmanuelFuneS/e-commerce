export interface Coupon {
  id: string;
  code: string;
  name: string;
  description: string;
  type: CouponType;
  value: number;
  minOrderAmount: number;
  maxDiscount: number;
  usageLimit: number;
  usageCount: number;
  userUsageLimit: number;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  couponUsages: CouponUsage[];

  createAt: Date;
  updateAt: Date;
}

export interface CouponUsage {
  id: string;
  couponId: string;
  userId: string;
  orderId: string;
  usedAt: Date;
}

export enum CouponType {
  PERCENTAGE,
  FIXED,
  SHIPPING,
}

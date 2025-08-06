export interface StockMovement {
  id: string;
  productId: string;
  type: StockMovementType;
  quantity: number;
  reason: string;
  reference: string;
  userId: string;
  createAt: Date;
}

export enum StockMovementType {
  IN,
  OUT,
  ADJUST,
}

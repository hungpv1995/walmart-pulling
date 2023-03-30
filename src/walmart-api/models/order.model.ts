import { WM_Error, WM_Meta } from './common.model';

export class GetOrdersRequest {
  sku?: string;
  customerOrderId?: string;
  purchaseOrderId?: string;
  status?: OrderStatus;
  createdStartDate?: string;
  createdEndDate?: string;
  fromExpectedShipDate?: string;
  toExpectedShipDate?: string;
  lastModifiedStartDate?: string;
  lastModifiedEndDate?: string;
  limit?: string;
  productInfo?: 'false' | 'true';
  shipNodeType?: ShipNodeType;
  replacementInfo?: 'false' | 'true';
  orderType?: OrderType;
}

export enum OrderStatus {
  Created = 'Created',
  Acknowledged = 'Acknowledged',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}

export enum ShipNodeType {
  SellerFulfilled = 'SellerFulfilled',
  WFSFulfilled = 'WFSFulfilled',
  _3PLFulfilled = '3PLFulfilled',
}

export enum OrderType {
  REGULAR = 'REGULAR',
  REPLACEMENT = 'REPLACEMENT',
}

export class GetOrdersResponse {
  list?: {
    errors?: WM_Error[];
    meta: WM_Meta;
    elements: {
      order: WM_Order[];
    };
  };
}

export class WM_Order {
  purchaseOrderId: string;
  customerOrderId: string;
  customerEmailId: string;
  orderType?: OrderType;
  originalCustomerOrderID?: string;
  orderDate: number;
  buyerId?: string;
  mart?: string;
  isGuest?: boolean;
  shippingInfo: ShippingInfo;
  orderLines: {
    orderLine: OrderLine[];
  };
  paymentTypes?: string[];
  orderSummary?: {
    totalAmount?: TotalAmount;
    orderSubTotals: {
      subTotalType?: string;
      totalAmount?: TotalAmount;
    }[];
  };
  pickupPersons?: any[];
  shipNode?: {
    type?: string;
    name?: string;
    id?: string;
  };
}

export class ShippingInfo {
  phone: string;
  estimatedDeliveryDate: number;
  estimatedShipDate: number;
  methodCode: MethodCode;
  postalAddress: PostalAddress;
}

export class PostalAddress {
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressType?: string;
}

export class OrderLine {
  lineNumber: string;
  item: LineItem;
  charges: {
    charge?: LineCharge[];
  };
  orderLineQuantity: {
    unitOfMeasurement: string;
    amount: string;
  };
  statusDate: number;
  orderLineStatuses: any;
  returnOrderId?: string;
  refund?: any;
  originalCarrierMethod?: string;
  referenceLineId?: string;
  fulfillment?: any;
  intentToCancel?: string;
  configId?: string;
  sellerOrderId?: string;
}

export class LineItem {
  productName: string;
  sku: string;
  imageUrl?: string;
  weight?: {
    value: string;
    unit: string;
  };
}

export class LineCharge {
  chargeType: string;
  chargeName: string;
  chargeAmount: {
    currency: string;
    amount: number;
  };
  tax?: {
    taxName: string;
    taxAmount: {
      currency: string;
      amount: number;
    };
  };
}

export enum MethodCode {
  Standard = 'Standard',
  Express = 'Express',
  OneDay = 'OneDay',
  Freight = 'Freight',
  WhiteGlove = 'WhiteGlove',
  Value = 'Value',
}

export class TotalAmount {
  currencyAmount: number;
  currencyUnit: string;
}

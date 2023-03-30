import { WM_Error } from './common.model';

export class WM_GetItemsRequest {
  nextCursor?: string;
  sku?: string;
  offset?: string;
  limit?: string;
  lifecycleStatus?: string;
  publishedStatus?: string;
  variantGroupId?: string;
}

export class WM_GetItemsReponse {
  errors?: WM_Error[];
  totalItems?: number;
  nextCursor?: string;
  ItemResponse: WM_Item[];
  additionalAttributes?: {
    nameValueAttribute?: WM_AdditionalAttribute[];
  };
}

export class WM_Item {
  mart?: string;
  sku: string;
  wpid?: string;
  upc?: string;
  gtin?: string;
  productName?: string;
  shelf?: string;
  productType?: string;
  price?: {
    currency: string;
    amount: number;
  };
  publishedStatus?: string;
  additionalAttributes?: {
    nameValueAttribute?: WM_AdditionalAttribute[];
  };
  unpublishedReasons?: {
    reason?: string[];
  };
  lifecycleStatus?: string;
  variantGroupId?: string;
  variantGroupInfo?: {
    isPrimary?: boolean;
    groupingAttributes?: any[];
    primary?: boolean;
  };
}

export class WM_AdditionalAttribute {
  name: string;
  type: string;
  isVariant?: boolean;
  variantResourceType?: string;
  value: WM_AdditionalAttributeValue[];
}

export class WM_AdditionalAttributeValue {
  value: string;
  group?: string;
  source?: string;
  rank?: number;
  isVariant?: boolean;
}

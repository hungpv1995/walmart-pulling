import { Injectable } from '@nestjs/common';
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  HttpStatusCode,
} from 'axios';
import { randomUUID } from 'crypto';
import { GetOrdersRequest } from './models/order.model';
import {
  WM_AllReportRequestParams,
  WM_ReportRequestParams,
  WM_CreateReportBody,
  WM_ReportResponse,
  WM_ReportStatusResponse,
} from './models/report.model';

@Injectable()
export class WalmartService {
  private readonly clientKey;
  private readonly clientSecret;
  private readonly apiKey;
  private readonly baseUrl = 'https://marketplace.walmartapis.com';
  private accessToken: string = null;

  constructor(clientKey: string, clientSecret: string) {
    this.clientKey = clientKey;
    this.clientSecret = clientSecret;
    this.apiKey = Buffer.from(
      `${this.clientKey}:${this.clientSecret}`,
    ).toString('base64');
  }

  private getUrl(path): string {
    return this.baseUrl + path;
  }

  private baseHeaders() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${this.apiKey}`,
      'WM_SVC.NAME': 'Walmart Marketplace',
      'WM_QOS.CORRELATION_ID': randomUUID(),
      'WM_SEC.ACCESS_TOKEN': this.accessToken,
    };
  }

  private async getAccessToken(): Promise<string> {
    try {
      const response = await axios.request({
        method: 'POST',
        headers: this.baseHeaders(),
        url: this.getUrl('/v3/token'),
        params: {
          grant_type: 'client_credentials',
        },
      });
      this.accessToken = response.data['access_token'];
      return response.data['access_token'];
    } catch (error) {
      // 429 - Retry
      if (error?.response?.status == HttpStatusCode.TooManyRequests) {
        await new Promise((resolve) => setTimeout(resolve, 10 * 1000));
        return this.getAccessToken();
      }

      throw new Error(error);
    }
  }

  private async callAPI(options: AxiosRequestConfig): Promise<any> {
    try {
      if (!this.accessToken) {
        await this.getAccessToken();
      }
      const response = await axios.request({
        ...options,
        headers: this.baseHeaders(),
      });
      return response?.data;
    } catch (error) {
      // 401 - Retry with new token
      if (error?.response?.status == HttpStatusCode.Unauthorized) {
        await this.getAccessToken();
        return this.callAPI(options);
      }

      // 429 - Retry
      if (
        error?.response?.status == HttpStatusCode.TooManyRequests &&
        options.method != 'POST' &&
        !options.url.includes('reports/requestReports')
      ) {
        await new Promise((resolve) => setTimeout(resolve, 10 * 1000));
        return this.callAPI(options);
      }

      throw new Error(error);
    }
  }

  async getItems(): Promise<any> {
    const url = this.getUrl('/v3/items');
    const data = await this.callAPI({ url, method: 'GET' });
    return data;
  }

  async getOrders(params: GetOrdersRequest): Promise<any> {
    const url = this.getUrl('/v3/orders');
    const data = await this.callAPI({ url, method: 'GET', params });
    return data;
  }

  async getOrdersByQuery(query: string): Promise<any> {
    const url = this.getUrl(`/v3/orders${query}`);
    const data = await this.callAPI({ url, method: 'GET' });
    return data;
  }

  async getOrdersWithoutPaging(params: GetOrdersRequest) {
    let orders = [];
    let query = '';
    do {
      const res = query
        ? await this.getOrdersByQuery(query)
        : await this.getOrders(params);

      if (res.list?.meta.totalCount) {
        orders = orders.concat(res.list.elements.order);
      }

      query = res?.list?.meta?.nextCursor;
    } while (query);

    return orders;
  }

  async getPromotionalPrices(sku: string): Promise<any> {
    const url = this.getUrl(`/v3/promo/sku/${sku}`);
    const data = await this.callAPI({ url, method: 'GET' });
    return data;
  }

  async getInventory(limit = '50', nextCursor?: string): Promise<any> {
    const url = this.getUrl(`/v3/inventories`);
    const params = {
      limit,
      nextCursor,
    };
    const data = await this.callAPI({ url, method: 'GET', params });
    return data;
  }

  async getAllReport(params: WM_AllReportRequestParams) {
    const url = this.getUrl(`/v3/reports/reportRequests`);
    const data = await this.callAPI({ url, method: 'GET', params });
    return data;
  }

  async createReport(
    params: WM_ReportRequestParams,
    body?: WM_CreateReportBody,
  ) {
    try {
      const url = this.getUrl(`/v3/reports/reportRequests`);
      const data = await this.callAPI({
        url,
        method: 'POST',
        params,
        data: body,
      });
      return data;
    } catch (error) {
      // 429 - Report is created before, return latest report
      if (String(error)?.includes('Request failed with status code 429')) {
        const data = await this.getAllReport(params);
        return data?.requests[0];
      }

      throw new Error(error);
    }
  }

  async getReportStatus(requestId: string): Promise<WM_ReportStatusResponse> {
    const url = this.getUrl(`/v3/reports/reportRequests/${requestId}`);
    const data = await this.callAPI({ url, method: 'GET' });
    return data;
  }

  async downloadReport(requestId: string): Promise<WM_ReportResponse> {
    const url = this.getUrl(`/v3/reports/downloadReport`);
    const data = await this.callAPI({
      url,
      method: 'GET',
      params: { requestId },
    });
    return data;
  }
}

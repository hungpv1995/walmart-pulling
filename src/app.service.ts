import { Injectable } from '@nestjs/common';
import { WalmartService } from './walmart-api/walmart.service';
import * as moment from 'moment';
import { GetOrdersRequest } from './walmart-api/models/order.model';

@Injectable()
export class AppService {
  private clientKey = '22116a55-ed0b-4d01-8ee7-a5313e26b995';
  private clientSecret =
    'AMpCruo74urrQYXQcvyNTd3xqK01hJYOYfp9TmvIzWok6zW6FM8PRIsfMcAdOjyVjcWsfnwmxdwYFfO1qXfqwG8';

  private readonly _walmart = new WalmartService(
    this.clientKey,
    this.clientSecret,
  );

  async getItems() {
    return this._walmart.getItems();
  }

  async getOrders(params: GetOrdersRequest) {
    return this._walmart.getOrders(params);
  }

  async getAllOrders(params: GetOrdersRequest) {
    return this._walmart.getOrdersWithoutPaging(params);
  }

  async getPromotionalPrices() {
    return this._walmart.getPromotionalPrices('6-79100-S');
  }

  async getInventories() {
    return this._walmart.getInventory();
  }

  /** REPORT */
  async getAllReport(reportType) {
    return this._walmart.getAllReport({ reportType });
  }

  async createReport(reportType: string) {
    return this._walmart.createReport({
      reportType: reportType,
      reportVersion: 'v1',
    });
  }

  async getReportStatus(requestId: string) {
    return this._walmart.getReportStatus(requestId);
  }

  async downloadReport(requestId: string) {
    return this._walmart.downloadReport(requestId);
  }
}

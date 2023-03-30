import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { GetOrdersRequest } from './walmart-api/models/order.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('items')
  async getItems() {
    return await this.appService.getItems();
  }

  @Get('orders')
  async getOrders(@Query() query: GetOrdersRequest) {
    return await this.appService.getOrders(query);
  }

  @Get('orders-all')
  async getAllOrders(@Query() query: GetOrdersRequest) {
    return await this.appService.getAllOrders(query);
  }

  @Get('promotional-prices')
  async getPromotionalPrices() {
    return await this.appService.getPromotionalPrices();
  }

  @Get('inventories')
  async getInventories() {
    return await this.appService.getInventories();
  }

  @Get('reports')
  async getAllReport(@Query() query: any) {
    return await this.appService.getAllReport(query.reportType);
  }

  @Post('report')
  async createReport(@Body() body: any) {
    return await this.appService.createReport(body.reportType);
  }

  @Get('report-status/:id')
  async getReportStatus(@Param('id') id: string) {
    return await this.appService.getReportStatus(id);
  }

  @Get('report-download/:id')
  async downloadReport(@Param('id') id: string) {
    return await this.appService.downloadReport(id);
  }
}

import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getBasicChartSvgReport, getHelloWorldReport, reportByIdOrder } from 'src/reports';

@Injectable()
export class StoreReportService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }
    constructor(
        private readonly printerService: PrinterService
    ) {super()}

    async getOrderByIdReport(orderId: number) {

        const order = await this.orders.findUnique({
            where: {
                order_id: orderId,
            },
            include: {
                customers: true,
                order_details: {
                    include: {
                        products: true,
                    },
                },
            },
        });
        if (!order) {
            throw new NotFoundException(`Order with ID ${orderId} not found`);
        }
        // console.log(JSON.stringify(order, null, 2));

        const docDefinition = reportByIdOrder({
            data: order as any,
        });

        const doc = this.printerService.createPdf(docDefinition)
        return doc;
    }

    async getSvgChart() {
        const docDefinition = await getBasicChartSvgReport();

        const doc = this.printerService.createPdf(docDefinition)
        return doc;
    }
}

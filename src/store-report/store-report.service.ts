import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from '../printer/printer.service';
import { getBasicChartSvgReport, reportByIdOrder, getStatisticsReport } from '../reports';

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

    async getStatistics() {
        const topCountries = await this.customers.groupBy({
            by: ['country'],
            _count: true,
            orderBy: {
                _count: {
                    country: 'desc',
                },
            },
            take: 10,
        });

        const topCountriesData = topCountries.map(({country, _count}) => ({
            country: country,
            customers: _count,
        }));
    
        // console.log(topCountries);
    
        // Llama a la función importada directamente
        const docDefinition = await getStatisticsReport({
            topCpuntries: topCountriesData,
        });
    
        const doc = this.printerService.createPdf(docDefinition);
        return doc;
    }
}

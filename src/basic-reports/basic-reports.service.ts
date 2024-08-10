import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { continents, PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getCountryReport, getEmploymentLetterByIdReport, getEmploymentLetterReport, getHelloWorldReport } from 'src/reports';


@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
        // console.log('Connected to the database');
    }
    constructor(
        private readonly printerService: PrinterService
    ) {
        super();
    }

    hello() {
        const docDefinition = getHelloWorldReport(
            {
                title: 'Hello World',
                description: 'This is a simple hello world report',
                name: 'John Doe'
            }
        );

        const doc = this.printerService.createPdf(docDefinition)
        return doc;
    }

    employmentLetter() {
        const docDefinition = getEmploymentLetterReport();

        const doc = this.printerService.createPdf(docDefinition)
        return doc;
    }

    async employmentLetterById( employeeId: number) {
        const employee = await this.employees.findUnique({
            where: { id: employeeId }
        });

        if (!employee)
            throw new NotFoundException(`Employee with ID ${employeeId} not found`);

        const docDefinition = getEmploymentLetterByIdReport({
            employerName: 'Juan Perez',
            employerPosition: 'CEO',
            employeeName: employee.name,
            employeePosition: employee.position,
            employeeStartDate: employee.start_date,
            employeeHours: employee.hours_per_day,
            employerWorkSchedule: employee.work_schedule,
            employerCompany: 'Tucan Code Corp'
        });

        const doc = this.printerService.createPdf(docDefinition)
        return doc;
    }

    async getCountries(continent:continents) {
        const countries = await this.countries.findMany({
            where:{
                local_name: {
                    not: null,
                },
                continent: {
                    equals: continent,
                },
            },
        });
        const docDefinition = getCountryReport({countries: countries});

        return this.printerService.createPdf(docDefinition)
    }

}

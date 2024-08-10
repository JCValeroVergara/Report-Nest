import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express'; // Import the Response type from 'express'
import { continents as Continent } from '@prisma/client';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  async hello (@Res() response: Response) {

    const pdfDoc = this.basicReportsService.hello();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hello World';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter')
  async employmentLetter (@Res() response: Response) {

    const pdfDoc = this.basicReportsService.employmentLetter();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment Letter';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter/:employeeId')
  async employmentLetterById (
    @Res() response: Response,
    @Param('employeeId') employeeId: string
  ) {

    const pdfDoc = await this.basicReportsService.employmentLetterById(+employeeId);

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment Letter';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
  
  
  //? COUNTRIES REPORT

  @Get('countries')
  async getCountriesReport (
    @Res() response: Response,
    @Query('continent') continent: string
  ) {

    const continentEnum = continent as Continent

    const pdfDoc = await this.basicReportsService.getCountries(continentEnum);

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Countries Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}

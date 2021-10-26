import { Body, Controller, Post } from "@nestjs/common";
import { FormDataRequest } from "nestjs-form-data";
import { ProductCreateDto } from "./dto/product-create.dto";

@Controller()
export class NestjsFormDataController {
  @Post('load')
  @FormDataRequest()
  getHello(@Body() testDto: ProductCreateDto): void {
    console.log(testDto);
  }
}
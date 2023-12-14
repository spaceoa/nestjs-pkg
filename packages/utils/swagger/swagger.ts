import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const setupSwagger = (app: INestApplication,options?:{title?:string,version?:string}) => {
	const config = new DocumentBuilder()
		.setTitle(options?.title)
		.setVersion(options?.version)
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('swagger', app, document);
}
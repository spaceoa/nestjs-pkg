import { Injectable } from "@nestjs/common";
import { ConfigService as CS } from "@nestjs/config";

@Injectable()
export class ConfigService<T extends any> {
	constructor(
		private readonly configService: CS,
	) { }

	get<K extends keyof T>(key: K): T[K] {
		return this.configService.get(key.toString());
	}
}
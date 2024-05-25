import { AppError } from "./app-error";

export class ServerError extends AppError {
	constructor() {
		super("Internal server error", 500);
	}
}

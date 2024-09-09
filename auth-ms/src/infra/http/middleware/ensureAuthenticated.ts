import AuthenticatedService from "@domain/service/AuthenticatedService";
import { NextFunction } from "express";

// interface tokenPayload {
//     iat: number;
//     exp: number;
//     sub: string;
//     userName: string;
// }

export default function ensureAuthenticated(authenticatedService: AuthenticatedService) {
	return async function (request: Request, response: Response, next: NextFunction): Promise<void> {

		// const authHeader = request.headers.authorization;

		// if (!authHeader) {
		// 	throw new AccessUnauthenticatedError();
		// }

		// // Bearer, token
		// const [, token] = authHeader.split(' ');

		// try {

		// 	const credential = await authenticatedService.authenticated(token);
		// 	const isAuthenticated = !credential;

		// 	if (!isAuthenticated) {
		// 		throw new AccessUnauthenticatedError();
		// 	}

		// 	// O token é válido, você pode definir a solicitação do usuário se necessário
		// 	// const decoded = verify(token, authConfig.jwt.secret);
		// 	// const { sub, userName } = decoded as tokenPayload;
		// 	// request.user = { id: sub, name: userName };

		// 	return next();
		// } catch (err) {
		// 	throw new AccessUnauthenticatedError();
		// }
  	};
}
import InternalServerErrorError from "@common/error/InternalServerErrorError";
import { StringUtils } from "@common/utils";
import authConfig from "@config/auth";
import { sign, verify } from "jsonwebtoken";

export interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
    login: string;
}

class Token {

    value: string;

    constructor(readonly userId: string, readonly login: string) {
        
        this.checkUserId();
        this.checkLogin();
        this.generate();
    }

    public static verify(token: string): TokenPayload {

        const decoded = verify(token, authConfig.jwt.secret);
        return decoded as TokenPayload;
    }

    private checkUserId(): void {
        if (StringUtils.isNull(this.userId) || StringUtils.isEmpty(this.userId)) {
            throw new InternalServerErrorError("UserId cannot be empty to generate token");
        }
    }

    private checkLogin(): void {
        if (StringUtils.isNull(this.login) || StringUtils.isEmpty(this.login)) {
            throw new InternalServerErrorError("Login cannot be empty to generate token");
        }
    }

    private generate(): void {

        const { secret, expiresIn } = authConfig.jwt;

		this.value = sign(
			{
				login: this.login
			},
			secret,
			{
				subject: this.userId,
				expiresIn: expiresIn,
			}
		);
    }
}

export default Token;
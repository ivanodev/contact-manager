import ConflictError from "@common/error/ConflictError";
import InternalServerErrorError from "@common/error/InternalServerErrorError";
import { StringUtils } from "@common/utils";
import { compare, hash } from 'bcryptjs';


class Token {

    value: string;

    private constructor(readonly userId: string) {
        
        this.checkUserId();
    }

    public static async generateToken(userId: string): Promise<string> {
        const token = new Token(userId);
        await token.generate();
        return token.value;
    }

    public static async verify(userId: string, token: string): Promise<void> {

        const match = await compare(userId, token);

        if (!match) {
            throw new ConflictError("Token invalid");
        }
    }

    private checkUserId(): void {
        if (StringUtils.isNull(this.userId) || StringUtils.isEmpty(this.userId)) {
            throw new InternalServerErrorError("UserId cannot be empty to generate token");
        }
    }

    private async generate(): Promise<void> {

        const saltRounds = 8;
        this.value = await hash(this.userId, saltRounds);
    }
}

export default Token;
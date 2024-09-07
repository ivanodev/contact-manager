class StringUtils {

    static isNull(value: String | null | undefined): boolean {

        return !value;
    }

    static isEmpty(value: String | null | undefined): boolean {
        return !value || value.trim().length === 0;
    }
}

export default StringUtils;
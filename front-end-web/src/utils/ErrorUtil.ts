import axios from "axios";

const getAxiosErrorMessage = (e: any) => {

    if (axios.isAxiosError(e) && e.response) {
        const { response } = e;
        const { data } = response;
        const { message, error, details } = data as any;

        if (data.code === 403 || data.code === 401) {
            return error ? error : details ? details : message;
        }
        return details ? details : message ? message : error;
    }
}

export {
    getAxiosErrorMessage
};

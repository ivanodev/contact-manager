import axios from 'axios';

import LocalStorageUtils from "../utils/LocalStorageUtils";

function getToken(): string {

  return LocalStorageUtils.getAuthToken() as string;
}


const auth_ms = axios.create({
    baseURL: "http://localhost:4000/anodos/contact-manager/auths",
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
    timeout: 5000 
});

const contact_ms = axios.create({
    baseURL: "http://localhost:4001/anodos/contact-manager/contacts",
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-access-token': getToken() as string,
        'Authorization': `Bearer ${getToken()}`,
    },
    timeout: 5000
});

const request_header = (): object => {

    return {
        'Content-Type': 'application/json; charset=utf-8',
        'timeout': '5000',
        'x-access-token': getToken(),
        'Authorization': `Bearer ${getToken()}`,
    }
}

export {
    auth_ms,
    contact_ms,
    request_header
};

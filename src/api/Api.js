import * as axios from "axios";

export default class Api {
    constructor() {
        this.api_token = null;
        this.client = null;
        this.api_url = "http://localhost:8080/";
    }

    init = () => {
        //   this.api_token = getCookie("ACCESS_TOKEN");

        let headers = {
            Accept: "application/json",
        };

        //   if (this.api_token) {
        //     headers.Authorization = `Bearer ${this.api_token}`;
        //   }

        this.client = axios.create({
            baseURL: this.api_url,
            timeout: 31000,
            headers: headers,
        });

        return this.client;
    };

    getUser = (id) => {
        return this.init().get("users/" + id)
    }

    getContacts = (id) => {
        return this.init().get("contacts/" + id)
    }

    deleteContact = (id) => {
        return this.init().delete("contacts/" + id)
    }
}  
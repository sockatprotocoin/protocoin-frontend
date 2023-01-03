import * as axios from "axios";
import {getCookie} from "../util/cookieUtil";

export default class Api {
    constructor() {
        this.api_token = null;
        this.client = null;
        this.api_url = "http://localhost:8080/";
    }

    init = () => {
        this.api_token = getCookie("access_token");

        let headers = {
            Accept: "application/json"
        };

        if (this.api_token) {
            headers.Authorization = `Bearer ${this.api_token}`;
        }

        this.client = axios.create({
            baseURL: this.api_url,
            timeout: 31000,
            headers: headers
        });

        return this.client;
    };

    login = (user) => {
        return this.init().post("login?username=" + user.username +"&password=" + user.password)
    }

    getUser = (id) => {
        return this.init().get("user/" + id)
    }

    getUsersFiltered = (stringFilter) => {
        return this.init().get("user?stringFilter=" + stringFilter)
    }

    getContacts = () => {
        return this.init().get("user/contact")
    }

    deleteContact = (idContact) => {
        return this.init().delete("user/contact/" + idContact)
    }

    getBlockchain = () => {
        return this.init().get("blockchain")
    }

    postTransaction = (fee, transactions) => {
        let transactionsValues = Object.values(transactions)
        return this.init().post('transaction', transactionsValues)
    }

    addUser = (user) => {
        return this.init().post('user', user)
    }

    inviteUser = (userId) => {
        return this.init().post('invitation/invite/'+userId)
    }

    getInvitations = () => {
        return this.init().get('invitation/received')
    }

    acceptInvitation = (invitationId) => {
        return this.init().get('invitation/' + invitationId + '/accept')
    }

    getBalance = () => {
        return this.init().get('user/balance')
    }
}
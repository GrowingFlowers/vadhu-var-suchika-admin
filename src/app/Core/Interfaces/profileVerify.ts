export interface verifier{

    firstName?: string,
    lastName?: string,
    mobileNumber?: string,
    otp?: string,
    type?: string,
    agentMobileNumber?:string
    addressVO?: {
        address1?: string,
        address2?: string,
        area?: string,
        city?: string,
        contact1?: string,
        contact2?: string,
        destrict?: string,
        pinCode?: string,
        country?: string,
        state?: string,
        taluka?: string,
        type?: string
    }
}


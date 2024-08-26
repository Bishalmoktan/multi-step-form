export interface ICountriesData {
    country_name: string;
    country_short_name: string;
    country_phone_code: string;
}

export interface IStatesData {
    state_name: string;
}

export interface IPersonalDetails {
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
}

export interface IAddressDetails {
    country: string;
    state: string;
    district: string;
    city: string;
}

export interface IProfileDetails {
    img: string;
}
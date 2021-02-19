export interface Item {
    hlpi_name: string;
    year: string;
    hlpi: string;
    nzhec: string;
    nzhec_name: string;
    nzhec_short: string;
    level: string;
    nzhec1: string;
    nzhec1_name: string;
    nzhec1_short: string;
    weight: string;
    exp_pw: string;
    eqv_exp_pw: string;
}

export interface StateType{
    list: Item[];
    errorMessage: string;
}
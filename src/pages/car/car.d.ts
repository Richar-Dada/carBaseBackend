export interface FormType {
    carType: string,
    regDate: string,
    licenceAddress: string,
    gearBox: string,
    effluentStandard: string,
    outputVolume: number,
    mileage: number,
    price: number,
    description?: string,
    thumbnail: string,
    images: string
}

export interface CarInfoType {
    id?: number,
    carType?: string
    regDate?: string,
    licenceAddress?: string,
    gearBox?: string,
    effluentStandard?: string,
    outputVolume?: number,
    mileage?: number,
    price?: number,
    description?: string,
    thumbnail?: string,
    images?: string,
    render?: React.ReactDOM
}
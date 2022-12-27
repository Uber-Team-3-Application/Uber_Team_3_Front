
export interface Driver{
    id?:number;
    name:string;
    surname:string;
    profilePicture:string;
    telephoneNumber:string;
    email:string;
    address:string;
    password?:string;
    blocked?:boolean;
}

export interface DriverActivityDTO{
    active:boolean;
}

export interface DriverEditBasicInfoRequest{
    id?:number;
    driverId:number;
    name:string;
    surname:string;
    profilePicture:string;
    telephoneNumber:string;
    email:string;
    address:string;
}

export interface DriverEditVehicleRequest{
    id?:number;
    driverId?:number;
    vModel:string;
    vRegistrationPlate:string;
    vNumberOfSeats:number;
    vIsBabyAccessible:boolean;
    vIsPetAccessible:boolean;

}
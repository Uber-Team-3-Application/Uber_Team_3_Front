import { Route } from "./Location";

export interface PanicDTO{
    id?:number;
    user:PanicUserDTO;
    ride:PanicRideDTO;
    time:Date;
    reason:string;
}


export interface PaginatedPanic{
    totalCount:number;
    results:PanicDTO[];
}

export interface PanicRideDTO{
    id?:number;
    startTime:Date;
    endTime:Date;
    totalCost:number;
    passengers:UserDTO[];
    locations:Route[];
}
export interface UserDTO{
    id?:number;
    email:string;
}

export interface PanicUserDTO{

    name:string;
    surname:string;
    profilePicture?:string;
    telephoneNumber:string;
    email:string;
    address:string;
}
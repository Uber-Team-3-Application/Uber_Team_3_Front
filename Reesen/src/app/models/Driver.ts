
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

export interface WorkingHours{
    id?:number;
    start?:Date;
    end?:Date;
}
export interface PaginatedDriver{
    totalCount: number;
    results:Driver[];
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
    vmodel:string;
    vregistrationPlate:string;
    vnumberOfSeats:number;
    visBabyAccessible:boolean;
    visPetAccessible:boolean;
    vtype:string;

}


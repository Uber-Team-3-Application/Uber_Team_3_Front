
export interface Location{
    id?:number,
    address:string,
    latitude:number,
    longitude:number,
}

export interface VehicleLocationWithAvailibility{
    id?:number,
    available: boolean,
    address:string,
    latitude:number,
    longitude:number,
}

export interface Route {
  id?:number,
  departure:Location,
  destination:Location
}

import {Location, Route} from "./Location";
import {Driver} from "./Driver";
import {Passenger} from "./Passenger";
import {Rejection} from "./Rejection";

export interface Ride {
  id:number,
  startTime:string,
  endTime: string,
  totalCost : number,
  driver : Driver,
  passengers : Passenger[],
  estimatedTimeInMinutes: number,
  vehicleType : string,
  babyTransport : boolean,
  petTransport :boolean,
  rejection?: Rejection,
  locations: Route[];
}

export interface RideInfoBody{
    locations: Location[],
    vehicleType: string,
    babyTransport: boolean,
    petTransport: boolean,
}

export interface RideInfo{
    estimatedTimeInMinutes:number,
    estimatedCost: number,

}

export interface RidePaginated {
  totalCount : number;
  results : Ride[]
}

import {Location, Route} from "./Location";
import {Driver} from "./Driver";
import {Passenger} from "./Passenger";
import {Rejection} from "./Rejection";
import {Review, RideReview} from "./Review";
import {User, UserRestrict} from "./User";


export interface Ride {
  id:number;
  startTime:string;
  endTime: string;
  totalCost : number;
  driver : Driver;
  passengers : Passenger[];
  estimatedTimeInMinutes: number;
  vehicleType : string;
  babyTransport : boolean;
  petTransport :boolean;
  rejection?: Rejection;
  locations: Route[];
  reviews?: Review[];
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

//=====SORTERS=====//

export const sortRideByPriceAscending = (a: Ride, b: Ride) => {
  if (a.totalCost > b.totalCost)
    return 1;
  if (a.totalCost < b.totalCost)
    return -1;
  return 0;
}

export const sortRideByPriceDescending = (a: Ride, b: Ride) => {
  if (a.totalCost > b.totalCost)
    return -1;
  if (a.totalCost < b.totalCost)
    return 1;
  return 0;
}

export const sortRideByDateAscending = (a: Ride, b: Ride) => {
  if (a.startTime > b.startTime)
    return 1;
  if (a.startTime < b.startTime)
    return -1;
  return 0;
}

export const sortRideByDateDescending = (a: Ride, b: Ride) => {
  if (a.startTime > b.startTime)
    return -1;
  if (a.startTime < b.startTime)
    return 1;
  return 0;
}

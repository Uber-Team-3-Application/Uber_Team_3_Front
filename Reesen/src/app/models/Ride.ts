import {Location, Route} from "./Location";
import {Driver} from "./Driver";
import {Passenger} from "./Passenger";
import {Rejection} from "./Rejection";
import {User, UserRestrict} from "./User";



export interface Ride {
  status: string;
  id:number;
  startTime:string;
  endTime: string;
  totalCost : number;
  driver : UserRestrict;
  passengers : UserRestrict[];
  estimatedTimeInMinutes: number;
  vehicleType : string;
  babyTransport : boolean;
  petTransport :boolean;
  rejection?: Rejection;
  locations: Route[];
  reviews?: Review[];
}

export interface Review{
  id?:number;
  vehicleReview: SingleReview;
  driverReview: SingleReview;
}
export interface SingleReview{
  id?: number;
  rating: number;
  comment: string;
  passenger: User;
}

export interface RideSimulationDTO {
  id: number;
  routeJSON: string;
  rideStatus: number;
  vehicle: VehicleSimulationDTO;
}
export interface VehicleSimulationDTO{
  id: number;
  licensePlateNumber: string;
  latitude: number;
  longitude: number;
}

export interface RideInfoBody{
    locations: Route[],
    vehicleType: string,
    babyTransport: boolean,
    petTransport: boolean,
}

export interface CreateRideDTO{
  passengers: UserRestrict[],
  locations: Route[]
  vehicleType: string,
  babyTransport: boolean,
  petTransport: boolean,
  scheduledTime: Date;
}

export interface RideInfo{
    estimatedTimeInMinutes:number,
    estimatedCost: number,

}

export interface RidePaginated {
  totalCount : number;
  results : Ride[];


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

export const sortRideByStartStationAscending = (a: Ride, b: Ride) => {
  if (a.locations.at(0).departure.address > b.locations.at(0).departure.address)
    return 1;
  if (a.locations.at(0).departure.address < b.locations.at(0).departure.address)
    return -1;
  return 0;

}


export const sortRideByStartStationDescending = (a: Ride, b: Ride) => {
  if (a.locations.at(0).departure.address > b.locations.at(0).departure.address)
    return -1;
  if (a.locations.at(0).departure.address < b.locations.at(0).departure.address)
    return 1;
  return 0;

}

export const sortRideByEndStationAscending = (a: Ride, b:Ride) => {
  if (a.locations.at(a.locations.length-1).destination.address >
    b.locations.at(b.locations.length-1).destination.address)
    return 1;
  if (a.locations.at(a.locations.length-1).destination.address <
    b.locations.at(b.locations.length-1).destination.address)
    return -1;
  return 0;
}

export const sortRideByEndStationDescending = (a: Ride, b:Ride) => {
  if (a.locations.at(a.locations.length-1).destination.address >
    b.locations.at(b.locations.length-1).destination.address)
    return -1;
  if (a.locations.at(a.locations.length-1).destination.address <
    b.locations.at(b.locations.length-1).destination.address)
    return 1;
  return 0;
}


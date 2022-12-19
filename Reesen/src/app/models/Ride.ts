import { Location } from "./Location";

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
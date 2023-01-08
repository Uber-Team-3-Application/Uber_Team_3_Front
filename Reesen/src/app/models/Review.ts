import {User, UserRestrict} from "./User";
import {Passenger} from "./Passenger";

export interface RideReview {
  vehicleReview : Review,
  driverReview : Review
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


export interface Driver{
    id?:number;
    name:string;
    surname:string;
    profilePicture:string;
    telephoneNumber:string;
    email:string;
    password?:string;
    isBlocked?:boolean;
    isActive?:boolean;
    address:string;
}
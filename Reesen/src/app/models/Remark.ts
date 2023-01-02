export interface Remark{
    id?:number;
    date?: Date;
    message: string;    
}

export interface PageRemark{
    totalCount: number;
    results: Remark[];
}
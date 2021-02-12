import { IDonate } from '../interface/donate.interface';

export class Donate implements IDonate{
    constructor(public id: number,
        public email:string,
        public amount: number){}
    
}
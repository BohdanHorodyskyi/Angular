import { IHelping } from '../interface/helping.interface';

export class Helping implements IHelping{
    constructor(public id: number,
        public description: string,
        public image: string,
        public place: string){
}
}
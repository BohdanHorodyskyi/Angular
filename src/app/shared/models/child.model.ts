import { IChild } from '../interface/child.interface';

export class Child implements IChild{
    constructor(public id: number,
                public place: string,
                public name: string,
                public description: string,
                public image: string){
       }
}
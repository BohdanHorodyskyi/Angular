import { IEvent } from '../interface/event.interface';


export class Event implements IEvent{
    constructor (public id:number,
                  public title: string,
                  public date: string,
                  public image: string) { }
}

import { IStory } from '../interface/story.interface';


export class Story implements IStory{
    constructor (public id:number,
                  public title: string,
                  public date: string,
                  public image?: string) { }
}
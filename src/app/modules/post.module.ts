export class PostModule {
  constructor(
    public id: number,
    public text: string,
    public _links: any,
    public isPost: boolean,
    public isJobOffer: boolean,
    public skills: string
  ) {}
}

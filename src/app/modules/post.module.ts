export class PostModule {
  constructor(
    public id: number,
    public text: string,
    public _links: any,
    public type: 'post' | 'jobOffer'
  ) {}
}

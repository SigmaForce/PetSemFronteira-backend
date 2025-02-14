export default class Animal {
  constructor(
    readonly name: string,
    readonly species: string,
    readonly gender: string,
    readonly age: number,
    readonly size: string,
    readonly status: string,
    readonly description: string,
    readonly user_id: string,
    readonly breed?: string,
    readonly image_url?: string,
    readonly location?: string,
    readonly animalId?: string
  ) {}
}

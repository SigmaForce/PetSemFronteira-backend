export default class User {
  constructor(
    readonly nickName: string,
    readonly email: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly birthDate: Date,
    readonly password: string,
    readonly phone: string,
    readonly role: "ADMIN" | "USER" | "ONG",
    readonly status?: boolean,
    readonly description?: string,
    readonly image_url?: string,
    readonly userId?: string
  ) {}
}

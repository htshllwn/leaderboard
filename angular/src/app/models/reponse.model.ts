export class Reponse<T> {
    status: Boolean;
    message: String;
    data?: T;
    error?: any;
}

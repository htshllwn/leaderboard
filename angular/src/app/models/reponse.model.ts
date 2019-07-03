export class BackendReponse<T> {
    status: Boolean;
    message: String;
    data?: T;
    error?: any;
}

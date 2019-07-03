import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BackendReponse } from '../models/reponse.model';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  apiBase = environment.apiBase;
  
  constructor(
    private http: HttpClient
  ) { }

  fetchAllPlayers(): Observable<BackendReponse<Player[]>> {
    return this.http.get<BackendReponse<Player[]>>(this.apiBase + '/api/player');
  }

}

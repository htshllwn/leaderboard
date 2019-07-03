import { Component, OnInit } from '@angular/core';
import { PlayerService } from './services/player.service';
import { BackendReponse } from './models/reponse.model';
import { Player } from './models/player.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular';
  observable$: Observable<BackendReponse<Player[]>>;
  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit() {

  }

  onBtnClick() {
    this.playerService.fetchAllPlayers().subscribe(v => console.log(v));
    this.observable$ = this.playerService.fetchAllPlayers();
    console.log(this.observable$);
  }
}

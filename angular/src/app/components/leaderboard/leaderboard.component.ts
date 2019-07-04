import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { Observable } from 'rxjs';
import { BackendReponse } from 'src/app/models/reponse.model';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  displayedColumns: string[] = ['player_name', 'score'];
  leaderboard$: Observable<BackendReponse<Player[]>>;

  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.leaderboard$ = this.playerService.fetchPlayersScore();
  }

}

import { Player } from './player.model';
import { Task } from './task.model';
import { Medal } from './medal.model';

export class Score {
    _id: String;
    date: Date;
    player: Player;
    task: Task;
    score: Number;
    medal: Medal;
    comments: String;
    description: String;
}

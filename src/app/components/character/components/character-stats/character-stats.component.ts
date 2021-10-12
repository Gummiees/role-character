import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from '@shared/models/character.model';
import { Statistic } from '@shared/models/statistic.model';
import { LoadersService } from '@shared/services/loaders.service';
import { MessageService } from '@shared/services/message.service';
import { DialogService } from '@shared/services/dialog.service';
import { UserService } from '@shared/services/user.service';
import { Subscription, throwError } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { CharacterService } from '../../services/character.service';
import { CharacterStatsService } from './character-stats.service';
import firebase from 'firebase/compat/app';
import { BasicDialogModel } from '@shared/models/dialog.model';
import { CommonService } from '@shared/services/common.service';
import { AddStatDialogComponent } from '../character-info/add-stat-dialog/add-stat-dialog.component';

@Component({
  selector: 'app-character-stats',
  templateUrl: './character-stats.component.html'
})
export class CharacterStatsComponent implements OnDestroy {
  statistics: Statistic[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    public loadersService: LoadersService,
    private statisticService: CharacterStatsService,
    private commonService: CommonService,
    private userService: UserService,
    private characterService: CharacterService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private router: Router
  ) {
    this.subscribeToStatistics();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  isDisabled(): boolean {
    return this.loadersService.statisticsLoading;
  }

  addStat() {
    this.dialogService
      .openGenericDialog(AddStatDialogComponent)
      .pipe(first())
      .subscribe((stat: Statistic) => {
        if (!this.commonService.isNullOrUndefined(stat)) {
          this.createStat(stat);
        }
      });
  }

  public async onDelete(stat: Statistic) {
    const dialogModel: BasicDialogModel = {
      body: 'Are you sure you want to delete the stat?'
    };
    this.dialogService
      .openDialog(dialogModel)
      .pipe(first())
      .subscribe(() => this.delete(stat));
  }

  private async subscribeToStatistics() {
    const user: firebase.User | null = await this.userService.user;
    if (user) {
      const character: Character | null = await this.characterService.character;
      if (character) {
        this.loadersService.statisticsLoading = true;
        const sub: Subscription = this.statisticService
          .listStats(character, user)
          .pipe(
            catchError((err) => {
              this.loadersService.statisticsLoading = false;
              return throwError(err);
            })
          )
          .subscribe((statistics: Statistic[]) => {
            this.statistics = statistics;
            this.loadersService.statisticsLoading = false;
          });
        this.subscriptions.push(sub);
      } else {
        this.messageService.showLocalError('You must have a character');
        this.router.navigate(['/create']);
      }
    } else {
      this.messageService.showLocalError('You must be logged in');
    }
  }

  private async createStat(stat: Statistic) {
    this.loadersService.statisticsLoading = true;
    try {
      const character: Character | null = await this.characterService.character;
      if (character) {
        await this.statisticService.createStat(character, stat);
        this.messageService.showOk('Stat added successfully');
      } else {
        this.messageService.showLocalError('You must have a character to add a stat');
        this.router.navigate(['/create']);
      }
    } catch (e: any) {
      console.error(e);
      this.messageService.showLocalError(e);
    } finally {
      this.loadersService.statisticsLoading = false;
    }
  }

  private async delete(stat: Statistic) {
    this.loadersService.statisticsLoading = true;
    try {
      const character: Character | null = await this.characterService.character;
      if (character) {
        await this.statisticService.deleteStat(character, stat);
        this.messageService.showOk('Stat deleted successfully');
      } else {
        this.messageService.showLocalError('You must have a character to delete a stat');
        this.router.navigate(['/create']);
      }
    } catch (e: any) {
      console.error(e);
      this.messageService.showLocalError(e);
    } finally {
      this.loadersService.statisticsLoading = false;
    }
  }
}

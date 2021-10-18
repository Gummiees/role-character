import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from '@shared/models/character.model';
import { BasicDialogModel } from '@shared/models/dialog.model';
import { Statistic } from '@shared/models/statistic.model';
import { CommonService } from '@shared/services/common.service';
import { DialogService } from '@shared/services/dialog.service';
import { LoadersService } from '@shared/services/loaders.service';
import { MessageService } from '@shared/services/message.service';
import { UserService } from '@shared/services/user.service';
import firebase from 'firebase/compat/app';
import { Subscription, throwError } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { CharacterService } from '../../services/character.service';
import { AddStatDialogComponent } from '../character-info/add-stat-dialog/add-stat-dialog.component';
import { CharacterStatsService } from './character-stats.service';

@Component({
  selector: 'app-character-stats',
  templateUrl: './character-stats.component.html'
})
export class CharacterStatsComponent implements OnDestroy {
  statistics: Statistic[] = [];
  public editingStatistics: { [s: string]: boolean } = {};
  private savedStatistics: Statistic[] = [];
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

  buttonsDisabled(): boolean {
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

  public canSave(stat: Statistic): boolean {
    return this.isChanged(stat) && this.statisticIsCorrect(stat);
  }

  public onUndo(statistic: Statistic) {
    const oldStat: Statistic | undefined = this.savedStatistics.find(
      (stat) => stat.id === statistic.id
    );
    if (oldStat) {
      statistic.abv = oldStat.abv;
      statistic.total = oldStat.total;
      statistic.current = oldStat.current;
    }
    if (statistic.id) {
      delete this.editingStatistics[statistic.id];
    }
  }

  public async onSave(stat: Statistic) {
    if (this.canSave(stat)) {
      this.loadersService.statisticsLoading = true;
      try {
        const character: Character | null = await this.characterService.character;
        if (character) {
          await this.statisticService.updateStat(character, stat);
          if (stat.id) {
            delete this.editingStatistics[stat.id];
          }
          this.messageService.showOk('Stat saved successfully');
        } else {
          this.messageService.showLocalError('You must have a character');
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

  public isChanged(stat: Statistic): boolean {
    return this.statisticHasValue(stat) && this.statisticIsDifferent(stat);
  }

  public isEditing(statistic: Statistic): boolean {
    if (!this.isChanged(statistic)) {
      return false;
    }
    if (!statistic.id) {
      return false;
    }
    return this.editingStatistics[statistic.id];
  }

  public onFocus(statistic: Statistic) {
    if (statistic.id) {
      this.editingStatistics[statistic.id] = true;
    }
  }

  private statisticHasValue(statistic: Statistic): boolean {
    return (
      !this.commonService.isNullOrUndefined(statistic.id) &&
      !this.commonService.isNullOrEmpty(statistic.abv) &&
      !this.commonService.isNullOrUndefined(statistic.total) &&
      !this.commonService.isNullOrUndefined(statistic.current)
    );
  }

  private statisticIsCorrect(statistic: Statistic): boolean {
    return statistic.total >= 0 && statistic.current >= 0 && statistic.current <= statistic.total;
  }

  private statisticIsDifferent(statistic: Statistic): boolean {
    const oldStat: Statistic | undefined = this.savedStatistics.find(
      (stat) => stat.id === statistic.id
    );
    if (!oldStat) {
      return false;
    }
    return (
      oldStat.abv !== statistic.abv ||
      oldStat.total !== statistic.total ||
      oldStat.current !== statistic.current
    );
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
              this.messageService.showError(err);
              return throwError(err);
            })
          )
          .subscribe((statistics: Statistic[]) => {
            this.statistics = statistics;
            this.savedStatistics = JSON.parse(JSON.stringify(statistics));
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

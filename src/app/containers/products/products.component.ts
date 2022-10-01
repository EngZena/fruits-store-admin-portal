import * as fromApp from '@store/app.reducer';
import * as paginationFunctions from '../../core/services/utils';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FruitType, FruitsModel } from '@core/models/FruitsModel';
import { Subscription, forkJoin } from 'rxjs';

import { Store } from '@ngrx/store';
import { SummerFruitsService } from '@core/services/apis/SummerFruits.service';
import { WinterFruitsService } from '@core/services/apis/WinterFruits.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  summerFruitsArray: FruitsModel[] = [];
  winterFruitsArray: FruitsModel[] = [];
  isLoading: boolean = false;
  errorMessage: String = '';
  private errorSummerSub: Subscription = new Subscription();
  private errorWinterSub: Subscription = new Subscription();
  currentSummerPage: number = 1;
  currentWinterPage: number = 1;
  summerFruitsPage: FruitsModel[] = [];
  winterFruitsPage: FruitsModel[] = [];
  summerFruits = FruitType.summerFruits;
  winterFruits = FruitType.winterFruits;

  constructor(
    private summerFruitsService: SummerFruitsService,
    private winterFruitsService: WinterFruitsService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.errorSummerSub = this.summerFruitsService.requestError.subscribe(
      errorMessageService => {
        this.errorMessage = errorMessageService;
      }
    );
    this.errorWinterSub = this.winterFruitsService.requestError.subscribe(
      errorMessageService => {
        this.errorMessage = errorMessageService;
      }
    );
    this.isLoading = true;

    let value$ = this.loadData();
    value$.subscribe(() => {
      this.isLoading = false;
    });
  }

  loadData() {
    return forkJoin(
      this.summerFruitsService.getSummerFruits(),
      this.winterFruitsService.getWinterFruits()
    ).pipe(
      map(([summerFruits, winterFruits]) => {
        this.summerFruitsArray = summerFruits;
        this.summerFruitsPage = paginationFunctions.pagination(
          this.summerFruitsArray,
          4,
          1
        );
        this.winterFruitsArray = winterFruits;
        this.winterFruitsPage = paginationFunctions.pagination(
          this.winterFruitsArray,
          4,
          1
        );
      })
    );
  }

  NextPage(currentPage: number, fullArray: FruitsModel[], season: string) {
    const result = paginationFunctions.NextPage(currentPage, fullArray);
    season === 'winter'
      ? (this.winterFruitsPage = result!.arrayData)
      : (this.summerFruitsPage = result!.arrayData);
    season === 'winter'
      ? (this.currentWinterPage = result!.pageNumber)
      : (this.currentSummerPage = result!.pageNumber);
  }

  PreviousPage(currentPage: number, fullArray: FruitsModel[], season: string) {
    const result = paginationFunctions.PreviousPage(currentPage, fullArray);
    season === 'winter'
      ? (this.winterFruitsPage = result!.arrayData)
      : (this.summerFruitsPage = result!.arrayData);
    season === 'winter'
      ? (this.currentWinterPage = result!.pageNumber)
      : (this.currentSummerPage = result!.pageNumber);
  }

  ngOnDestroy(): void {
    this.errorSummerSub.unsubscribe();
    this.errorWinterSub.unsubscribe();
  }
}

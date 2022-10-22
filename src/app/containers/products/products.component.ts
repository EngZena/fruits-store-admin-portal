import * as fromApp from '@store/app.reducer';
import * as fromProductsActions from '@containers/products/store/products.actions';
import * as paginationFunctions from '../../core/services/utils';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FruitModel, FruitType, ProductModel } from '@core/models/FruitModel';
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
  summerFruitsArray: FruitModel[] = [];
  winterFruitsArray: FruitModel[] = [];
  isLoading: boolean = false;
  errorMessage: String = '';
  private errorSummerSub: Subscription = new Subscription();
  private errorWinterSub: Subscription = new Subscription();
  currentSummerPage: number = 1;
  currentWinterPage: number = 1;
  summerFruitsPage: FruitModel[] = [];
  winterFruitsPage: FruitModel[] = [];
  summerFruits = FruitType.summerFruits;
  winterFruits = FruitType.winterFruits;
  allFruits: ProductModel[] = [];

  constructor(
    private summerFruitsService: SummerFruitsService,
    private winterFruitsService: WinterFruitsService,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
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
        this.setAllFruits(summerFruits, FruitType.summerFruits);
        this.setAllFruits(winterFruits, FruitType.winterFruits);
        this.store.dispatch(
          new fromProductsActions.InitializeProducts(this.allFruits)
        );
      })
    );
  }

  setAllFruits(array: FruitModel[], type: FruitType) {
    array.forEach(element => {
      this.allFruits.push({
        id: element.id,
        name: element.name,
        imageName: element.image,
        image: element.image,
        price: element.price,
        fruitType: type,
      });
    });
  }

  NextPage(currentPage: number, fullArray: FruitModel[], season: string) {
    const result = paginationFunctions.NextPage(currentPage, fullArray);
    season === 'winter'
      ? (this.winterFruitsPage = result!.arrayData)
      : (this.summerFruitsPage = result!.arrayData);
    season === 'winter'
      ? (this.currentWinterPage = result!.pageNumber)
      : (this.currentSummerPage = result!.pageNumber);
  }

  PreviousPage(currentPage: number, fullArray: FruitModel[], season: string) {
    const result = paginationFunctions.PreviousPage(currentPage, fullArray);
    season === 'winter'
      ? (this.winterFruitsPage = result!.arrayData)
      : (this.summerFruitsPage = result!.arrayData);
    season === 'winter'
      ? (this.currentWinterPage = result!.pageNumber)
      : (this.currentSummerPage = result!.pageNumber);
  }

  addNewProduct() {
    this.router.navigate(['add-new-product'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.errorSummerSub.unsubscribe();
    this.errorWinterSub.unsubscribe();
  }
}

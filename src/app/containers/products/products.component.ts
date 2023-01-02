import * as fromApp from '@store/app.reducer';
import * as fromProductsActions from '@containers/products/store/products.actions';
import * as paginationFunctions from '../../core/services/utils';
import * as serviceUtils from '@core/services/utils/service.utils';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FruitModel, FruitType, ProductModel } from '@core/models/FruitModel';
import { Observable, Subscription, forkJoin, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { FruitsImagesService } from '@core/services/apis/fruitsImages.service';
import { Store } from '@ngrx/store';
import { SummerFruitsService } from '@core/services/apis/SummerFruits.service';
import { WinterFruitsService } from '@core/services/apis/WinterFruits.service';

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
  summerFruitsPages: number = 4;
  winterFruitsPages: number = 4;
  firstRender: boolean = true;
  emptyProducts: Observable<boolean> = of(false);
  noProducts: boolean = true;
  initialDataLength = 0;
  index = 0;
  constructor(
    private summerFruitsService: SummerFruitsService,
    private winterFruitsService: WinterFruitsService,
    private fruitsImagesService: FruitsImagesService,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store
      .select('products')
      .pipe(take(1))
      .subscribe(data => {
        if (!data.hasLoaded) {
          this.isLoading = true;
          let value$ = this.loadData();
          value$.subscribe(() => {
            if (this.allFruits.length > 0) {
              this.store.dispatch(
                new fromProductsActions.InitializeProducts(this.allFruits)
              );
            }
          });
        }
      });

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
    this.store.select('products').subscribe(data => {
      if (
        serviceUtils.isEmptyArray(data.summerFruits) &&
        serviceUtils.isEmptyArray(data.winterFruits) &&
        this.noProducts
      ) {
        this.emptyProducts = of(true);
        this.noProducts = false;
      } else {
        this.emptyProducts = of(false);
        this.noProducts = true;
      }
      this.summerFruitsArray = data.summerFruits;
      this.winterFruitsArray = data.winterFruits;
      this.summerFruitsPages = paginationFunctions.getTotalNumberOfPages(
        data.summerFruits.length
      );
      this.winterFruitsPages = paginationFunctions.getTotalNumberOfPages(
        data.winterFruits.length
      );
      this.summerFruitsPage = paginationFunctions.pagination(
        this.summerFruitsArray,
        4,
        1
      );
      this.winterFruitsPage = paginationFunctions.pagination(
        this.winterFruitsArray,
        4,
        1
      );
      this.currentWinterPage = 1;
      this.currentSummerPage = 1;
    });
  }

  loadData() {
    return forkJoin(
      this.summerFruitsService.getSummerFruits(),
      this.winterFruitsService.getWinterFruits()
    ).pipe(
      map(([summerFruits, winterFruits]) => {
        this.initialDataLength = summerFruits.length + winterFruits.length;
        this.setAllFruits(summerFruits, FruitType.summerFruits);
        this.setAllFruits(winterFruits, FruitType.winterFruits);
      })
    );
  }

  initializeData() {
    this.summerFruitsArray = this.allFruits.filter(
      fruit => fruit.fruitType === FruitType.summerFruits
    );
    this.summerFruitsPage = paginationFunctions.pagination(
      this.summerFruitsArray,
      4,
      1
    );
    this.winterFruitsArray = this.allFruits.filter(
      fruit => fruit.fruitType === FruitType.winterFruits
    );
    this.winterFruitsPage = paginationFunctions.pagination(
      this.winterFruitsArray,
      4,
      1
    );
    this.store.dispatch(
      new fromProductsActions.InitializeProducts(this.allFruits)
    );
    this.isLoading = false;
  }

  setAllFruits(array: FruitModel[], type: FruitType) {
    /**
     * The best behavior is to execute navigation from the backend side and retrieve only four products per type;
     *  however, because this option does not exist, all functions will be executed in the frontend side,
     *  causing the app to be slow on initialization due to the presence of images.
     */
    array.forEach(element => {
      this.fruitsImagesService
        .getFruitImage(element.image.split('.')[0])
        .subscribe((data: any) => {
          this.index++;
          this.allFruits = [
            ...this.allFruits,
            {
              id: this.index.toString(),
              name: element.name,
              imageName: element.image,
              image: data[0],
              price: element.price,
              fruitType: type,
            },
          ];
          if (this.initialDataLength === this.index) {
            this.initializeData();
          }
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

  deleteProductById(productId: string) {
    this.store.dispatch(new fromProductsActions.DeleteProductById(productId));
  }

  editProductById(productId: string) {
    this.router.navigate([`edit-product/${productId}`], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy(): void {
    this.errorSummerSub.unsubscribe();
    this.errorWinterSub.unsubscribe();
  }
}

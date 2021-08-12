import {Component, OnChanges, OnInit} from '@angular/core';
import {first, map, startWith} from 'rxjs/operators';

import {User} from 'src/app/_models/user';
import {AuthenticationService} from 'src/app/_services/authentication.service';
import {UserService} from 'src/app/_services/user.service';
import {Article} from '../_models/articles';
import {ArticleService} from '../_services/article.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DialogDataExampleDialogComponent} from '../dialog-data-example-dialog/dialog-data-example-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit, OnChanges {
    loading = false;
    user: any;
    userFromApi!: User;

    clothes: Article[] | undefined = undefined;

    private type: string | null = null;
    private sex: string | null = null;
    public sizes: String[] = [];
    public colors: String[] = [];
    public min = "";
    public max = "";
    public order = "";
    public brand = "";

    myControl = new FormControl();
    options: string[] = ['Polo Ralph Lauren', 'Lacoste', 'Nike', 'Adidas', 'H&M', 'Zara'];
    filteredOptions: Observable<string[]> | undefined;

    constructor(
        private _sanitizer: DomSanitizer,
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private articleService: ArticleService,
        private route: ActivatedRoute,
        private router: Router,
        public dialog: MatDialog
    ) {
        this.user = JSON.parse(localStorage.getItem('user')!);
        console.log(this.user)
    }

    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );

        let path = this.router.url.split('#')[0].split('?')[0];

        if (path[0] == "/")
            path = path.slice(1);

        if (path.length > 0) {
            switch (path.split("/")[0].toLowerCase()) {
                case "uomo":
                    this.sex = "M";
                    break;
                case "donna":
                    this.sex = "F";
                    break;
                case "bambino":
                    this.sex = "B";
                    break;
            }
            if (this.sex != null
                && path.split("/").length > 1
                && path.split("/")[1].length > 0) {
                this.type = path.split("/")[1].toLowerCase();
            }
        }



        this.articleService.notMine(this.user.userId).pipe(first()).subscribe((art) => {
            this.loading = false;
            console.log(art)
            this.clothes = art.filter(article =>
                article.venduto === false
                && article.prezzo != null
            ).map(article => {
                article.image = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + article.picture)
                return article;
            })
        });
    }

    ngOnChanges() {
        this.getFilteredClothes();
    }

    openDialog(value: Article) {
        this.dialog.open(DialogDataExampleDialogComponent, {
            data: value,
        }).afterClosed().subscribe(() => {console.log("ciao");this.getFilteredClothes()});
    }


    setBrandWithEvent(event: any) {
        this.brand = (event.target as HTMLInputElement).value;
    }

    setMinWithEvent(event: any) {
        this.min = (event.target as HTMLInputElement).value;
    }

    setMaxWithEvent(event: any) {
        this.max = (event.target as HTMLInputElement).value;
    }

    filterSex(a: Article) {
        return this.sex == null || a.sesso == this.sex;
    }

    filterType(a: Article) {
        return this.type == null || a.tipo == this.type;
    }

    filterSizes(article: Article): boolean {
        if (this.sizes == null || this.sizes.length == 0) {
            return true;
        } else if (this.sizes.length == 1) {
            return article.taglia == this.sizes[0];
        } else {
            return article.taglia != null && this.sizes.indexOf(article.taglia) != -1;
        }
    }

    filterColor(article: Article): boolean {
        if (this.colors == null || this.colors.length == 0) {
            return true;
        } else if (this.colors.length == 1) {
            return article.colore == this.colors[0];
        } else {
            return article.colore != null && this.colors.indexOf(article.colore) != -1;
        }
    }

    filterBrand(article: Article): boolean {
        if (this.brand == null || this.brand.length == 0) {
            return true;
        } else {
            return article.marca == this.brand;
        }
    }

    filterMin(article: Article): boolean {
        if (this.min == null || isNaN(parseFloat(this.min))) {
            return true;
        } else {
            return article.prezzo == null || article.prezzo >= parseFloat(this.min);
        }
    }

    filterMax(article: Article): boolean {
        if (this.max == null || isNaN(parseFloat(this.max))) {
            return true;
        } else {
            return article.prezzo == null ||article.prezzo <= parseFloat(this.max);
        }
    }

    sortClothes(articles: Article[]): Article[] {
        if (this.order == "ASC") {
            return articles.sort((a, b) => this.sortPrices(a, b, true));
        } else if (this.order == "DESC") {
            return articles.sort((a, b) => this.sortPrices(a, b, false));
        } else {
            return articles;
        }
    }

    getFilteredClothes(): Article[] {
        if (this.clothes == null) return [];

        return this.sortClothes(
            [...this.clothes]
                .filter(a => this.filterSex(a))
                .filter(a => this.filterType(a))
                .filter(a => this.filterBrand(a))
                .filter(a => this.filterSizes(a))
                .filter(a => this.filterColor(a))
                .filter(a => this.filterMin(a))
                .filter(a => this.filterMax(a))
        );
    }

    sortPrices(a: any, b: any, ascending: any) {
        if (a === b || a.prezzo == b.prezzo) {
            return 0;
        } else if (a.prezzo == null) {
            return 1;
        } else if (b.prezzo == null) {
            return 1;
        } else if (ascending) {
            return a.prezzo < b.prezzo ? -1 : 1
        } else {
            return a.prezzo < b.prezzo ? 1 : -1
        }
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }
}

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
import { TaglieService } from '../_services/taglie.service';
import { ColorsService } from '../_services/colors.service';
import { TipiService } from '../_services/tipi.service';
import { MarcheService } from '../_services/marche.service';
import { Path } from '../_models/path';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit, OnChanges {
    loading = false;
    public user: any;
    userFromApi!: User;
    taglie : any;
    tipi:any
    marche:any;
    colori:any;
    clothes: Article[] | undefined = undefined;
    done=false;
    public type: string | null = null;
    private sex: string | null = null;
    public sizes: String[] = [];
    public colors: String[] = [];
    public brands: String[] = [];
    public min = "";
    public max = "";
    public order = "";
    public brand = "";
    public tipo :any;
    sesso: any;
    myControl = new FormControl();
    myControlTipo = new FormControl();
    filteredBrand: Observable<string[]> | undefined;
    filteredTipo: Observable<string[]> | undefined;

    constructor(
        public _sanitizer: DomSanitizer,
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private articleService: ArticleService,
        private route: ActivatedRoute,
        private tipoService : TipiService,
        private marcheService : MarcheService,
        private taglieService : TaglieService,
        private colorService : ColorsService,
        private router: Router,
        public dialog: MatDialog
    ) {
        this.user = JSON.parse(localStorage.getItem('user')!);
        this.userService.getById(this.user.userId).pipe(first()).subscribe((res)=>{
            console.log(res)
            this.user = res
        })
    }

    ngOnInit() {
        this.taglie = this.taglieService.getall().taglie;
        this.colori = this.colorService.getall().colori;
        this.marche = this.marcheService.getall().marche;
        this.tipi = this.tipoService.getall().tipi;
        
        this.reload(this.user.sesso)
    }
    add(){
        this.router.navigateByUrl("/addClothes");
    }
    reload(sesso:any){
        console.log(sesso)
        if(sesso != null && sesso!=undefined){
            if(this.user.userId !=undefined){
                this.articleService.notMineAndSex(this.user.userId,sesso).pipe(first()).subscribe((art) => {
                    this.loading = true;
                    this.done = false;
                    this.clothes = art.filter(article =>
                        article.venduto === false
                        && article.prezzo != null
                    )
                    this.loading = false
                    this.router.navigateByUrl(Path.Home);
                });
            }
            else{
                this.articleService.notMineAndSex(this.user.id,sesso).pipe(first()).subscribe((art) => {
                    this.loading = true;
                    this.done = false;
                    this.clothes = art.filter(article =>
                        article.venduto === false
                        && article.prezzo != null
                    )
                    this.loading = false
                    this.router.navigateByUrl(Path.Home);
                });
            }
        }
        else{
            if(this.user.userId != undefined){
                this.articleService.notMine(this.user.userId).pipe(first()).subscribe((art) => {
                    this.loading = true;
                    this.done = false;
                    this.clothes = art.filter(article =>
                        article.venduto === false
                        && article.prezzo != null
                    )
                    this.loading = false
                    this.router.navigateByUrl(Path.Home);
                });
            }
            else{
                this.articleService.notMine(this.user.id).pipe(first()).subscribe((art) => {
                    this.loading = true;
                    this.done = false;
                    this.clothes = art.filter(article =>
                        article.venduto === false
                        && article.prezzo != null
                    )
                    this.loading = false
                    this.router.navigateByUrl(Path.Home);
                });
            }
        }

    }
    ngOnChanges() {
        this.getFilteredClothes();
    }

    openDialog(value: Article) {
        this.dialog.open(DialogDataExampleDialogComponent, {
            data: value,
        }).afterClosed().subscribe(() => {this.getFilteredClothes()});
    }

    setBrandWithEvent(event: any) {
        this.brand = (event.target as HTMLInputElement).value;
    }
    setTipoWithEvent(event: any) {
        this.tipo = (event.target as HTMLInputElement).value;
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

    filterType(article: Article): boolean {
        if (this.type == null || this.type.length == 0) {
            return true;
        } else if (this.type.length == 1) {
            return article.tipo == this.type[0];
        } else {
            return article.tipo != null && this.type.indexOf(article.tipo) != -1;
        }
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
        if (this.brands == null || this.brands.length == 0) {
            return true;
        } else if (this.brands.length == 1) {
            return article.marca == this.brands[0];
        } else {
            return article.marca != null && this.brands.indexOf(article.marca) != -1;
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

        return this.marche.filter((marche: string) => marche.toLowerCase().includes(filterValue));
    }
}

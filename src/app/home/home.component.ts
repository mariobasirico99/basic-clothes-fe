import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { Article } from '../_models/articles';
import { ArticleService } from '../_services/article.service';
import { DomSanitizer } from '@angular/platform-browser';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    tagliah: string[]=[];
    help = {
        marca: null,
        taglia: this.tagliah,
        colore: null,
        prezzo: null
    };
    clothesFiltered: Article[] = [];
    loading = false;
    user: User;
    userFromApi!: User;
    articles: Article[] = [];
    constructor(
        private _sanitizer: DomSanitizer,
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private articleService: ArticleService,
    ) {
        this.user = this.authenticationService.userValue;
        console.log(this.user)
    }

    ngOnInit() {
        this.articleService.getAll().pipe(first()).subscribe((art) => {
            this.loading = false;
            this.articles = art;
            console.log(art);
            this.articles.map(article => {
                console.log(article)
                article.image=this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + article.picture);
            })
            this.clothesFiltered = this.articles;
        });
    }

    filter() {
        this.clothesFiltered = this.articles;

        if(this.help.taglia.length > 0){
            this.clothesFiltered = this.clothesFiltered.filter(article => this.help.taglia.includes(article.taglia!));
        }

        if(this.help.marca != null){
            this.clothesFiltered = this.clothesFiltered.filter(article => article.marca == this.help.marca);
        }

        if(this.help.colore != null){
            this.clothesFiltered = this.clothesFiltered.filter(article => article.colore == this.help.colore);
        }

        if(this.help.prezzo != null){
            this.clothesFiltered = this.clothesFiltered.filter(article => article.prezzo == this.help.prezzo);
        }
    }

    changeTaglia(taglia: string) {
        this.help.taglia.push(taglia);
        console.log(this.help.taglia);
    }

    changeMarca(marca: null) {
        this.help.marca = marca;
    }

    changeColor(color: null) {
        this.help.colore = color;
    }
    changePrezzo(prezzo: null) {
        this.help.prezzo = prezzo;
    }
}

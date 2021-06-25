import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { Article } from '../_models/articles';
import { ArticleService } from '../_services/article.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    help = {
        marca: null,
        taglia: null,
        colore: null,
        prezzo: null
    };
    clothesFiltered = {};
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
        });
    }

    filter() {
        this.clothesFiltered = this.articles.filter(article => {
            if(this.help.colore!=null && article.colore == this.help.colore) {
                this.clothesFiltered = article;
            }
        
        })
    }

    changeTaglia(taglia: null) {
        this.help.taglia = taglia;

    }

    changeMarca(marca) {
        this.help.marca = marca;
    }

    changeColor(color) {
        this.help.colore = color;
    }
    changePrezzo(prezzo) {
        this.help.prezzo = prezzo;
    }
}

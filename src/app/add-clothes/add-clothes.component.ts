import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ArticleService } from '../_services/article.service';
import { ColorsService } from '../_services/colors.service';
import { MarcheService } from '../_services/marche.service';
import { SessoService } from '../_services/sesso.service';
import { TaglieService } from '../_services/taglie.service';
import { TipiService } from '../_services/tipi.service';

@Component({
  selector: 'app-add-clothes',
  templateUrl: './add-clothes.component.html',
  styleUrls: ['./add-clothes.component.css']
})
export class AddClothesComponent implements OnInit {
  form:any;
  loading = false;
  colori:any;
  col:any;
  taglie : any;
  tagl:any;
  marche:any;
  mar:any;
  sessi : any;
  sex:any;
  tipi : any;
  tip:any;
  submitted = false;
  selectedFile: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string | undefined;
  imageName: any;
  error = ""
  user:any;
  imgFile: string="";
  constructor(
    private formBuilder: FormBuilder,
    private taglieService : TaglieService,
    private coloriService : ColorsService,
    private marcheService : MarcheService,
    private tipiService : TipiService,
    private sexService : SessoService,
    private articleService : ArticleService,
    private router : Router
    ) {
      this.user = JSON.parse(localStorage.getItem('user')!);
     }

  ngOnInit(): void {
    this.colori = this.coloriService.getall().colori;
    this.taglie = this.taglieService.getall().taglie;
    this.sessi = this.sexService.getall().all;
    this.tipi = this.tipiService.getall().tipi;
    this.marche = this.marcheService.getall().marche;
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      colore: ['', Validators.required],
      prezzo: [0,Validators.required],
      marca: ['',Validators.required],
      taglia: ['',Validators.required],
      tipo: ['',Validators.required],
      sesso: ['',Validators.required],
      imgSrc:[''],
      id_utente:[this.user.userId],
      file : ['',Validators.required],
    });
  }
  get f() {
    return this.form!.controls;
  }
  goBack(){
    this.router.navigateByUrl("/");
  }
  
  onSubmit() {
    this.loading = true
    this.articleService.add(this.form.value).pipe(first()).subscribe((res)=>{
      const uploadImageData = new FormData();
      uploadImageData.append('imageValue', this.selectedFile);

      this.articleService.upload(uploadImageData,res.id!).pipe(first()).subscribe({
        next: () => {
          this.router.navigateByUrl("/");
          this.loading = false;
        },
        error: (error) => {
          this.router.navigateByUrl("/");
          this.loading = false;
        },
      })
    })
    
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    
  }
  public onFileChanged(event:any) {
    this.selectedFile = event.target.files[0];
  }

}

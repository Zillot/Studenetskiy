import { ActivatedRoute } from '@angular/router';
import { LanguageDTO } from 'src/models/LanguageDTO';
import { AllService } from 'src/services/allService';

export class BasePage {
  public isBusy: boolean = false;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected allService: AllService) {

    this.activatedRoute.paramMap.subscribe( paramMap => {
      lang = paramMap.get('lang');

      if (lang) {
        localStorage.setItem('lang', lang);
        this.allService.router.navigateByUrl(this.allService.router.url.replace("/" + lang, ""));
      }
    });
  
    if (!this.language) {
      var lang = localStorage.getItem('lang');

      this.setLanguage(lang);
    }
  }
  

  //>>>>>>>> LANGUGE
  public static languages: LanguageDTO[] = [];
  public get languages(): LanguageDTO[] {
    return BasePage.languages;
  }
  
  private static languageObj: LanguageDTO;

  public get language(): LanguageDTO {
    return BasePage.languageObj;
  }
  public set language(value: LanguageDTO) {
    BasePage.languageObj = value;
  }

  public setLanguage(key) {
    if (!key) {
      key = "ru";
    }
    
    this.allService.translateService.use(key);
    localStorage.setItem('lang', key);
  }
  //>>>>>>>> LANGUGE

  
  //>>>>>>>> ELSE
  public getFromQuery(key: string): string {
    return this.activatedRoute.snapshot.queryParamMap.get(key);
  }

  public defError(error) {
    this.isBusy = false;
    this.allService.errorDialogService.showUnknownErrorDialog(error.error.response.message);
  }
  //<<<<<<<< ELSE
}

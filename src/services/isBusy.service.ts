import { Injectable } from '@angular/core';
import { pipe, MonoTypeOperatorFunction, throwError } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';
import { doneIcon, dotsIcon, failIcon } from '../views/_components/icon/icons';
import { ResponseDTO } from 'src/models/ResponseDTO';
import { TranslateService } from '@ngx-translate/core';

export type isBusyColor = "white" | "black";
export class TextCollection
{
  done: string;
  fail: string;

  constructor() {
    this.done = "Done!";
    this.fail = "Fail!";
  }
};

declare var $: any;

@Injectable({ providedIn: 'root' })
export class IsBusyService {
  constructor(public translateService: TranslateService) { }

  private static readonly PauseForDoneStateOnScreenWhenReusable: number = 1700;
  private static readonly HideAnimationDuration: number = 600;

  static IsBusyDotsIcon_WhiteColor: isBusyColor = "white";
  static IsBusyDotsIcon_BlackColor: isBusyColor = "black";

  //fully automated button flow for isBusy
  public isBusyOnButton<R>(buttonId: string, reusable: boolean, text?: TextCollection, dotsColor?: isBusyColor): MonoTypeOperatorFunction<R> {
    let button: HTMLElement = this.getButton(buttonId);
    dotsColor = dotsColor == null ? IsBusyService.IsBusyDotsIcon_WhiteColor : dotsColor;

    let isBusy = null;

    return pipe(
      res => {
        isBusy = this.runIsBusy(button, dotsColor);

        return res;
      },
      catchError(ex => {
        this.stopIsBusyInidcatorManualyWithObject(button, isBusy, reusable, <ResponseDTO<any>>{ type: "error"}, text)
        return throwError(ex);
      }),
      map((result: R) => {
        this.stopIsBusyInidcatorManualyWithObject(button, isBusy, reusable, <any>result, text)
        return result;
      }),
    );
  };

  //start isBusy with never ending loading
  public startEndlessIsBusyOnButton<R>(buttonId: string, text?: TextCollection, dotsColor?: isBusyColor): MonoTypeOperatorFunction<R> {
    let button: HTMLElement = this.getButton(buttonId);
    dotsColor = dotsColor == null ? IsBusyService.IsBusyDotsIcon_WhiteColor : dotsColor;

    let isBusy = null;

    return pipe(
      res => {
        isBusy = this.runIsBusy(button, dotsColor);

        return res;
      },
      catchError(ex => {
        this.stopIsBusyInidcatorManualyWithObject(button, isBusy, true, <ResponseDTO<any>>{ type: "success" }, text)
        return throwError(ex);
      }),
      map((x: R) => { return x; }),
    );
  };

  //stop isBusy of specific button
  public stopEndlessIsBusyOnButton<R>(buttonId: string, reusable: boolean, text?: TextCollection): MonoTypeOperatorFunction<R> {
    return pipe(
      catchError(ex => {
        this.stopIsBusyInidcatorManualy(buttonId, reusable, <ResponseDTO<any>>{ type: "success" }, text);
        return throwError(ex);
      }),
      map((result: R) => {
        this.stopIsBusyInidcatorManualy(buttonId, reusable, <any>result, text);
        return result;
      })
    );
  };

  //fully automated local isBusy
  public isBusyLocal<R>(elementId: string): MonoTypeOperatorFunction<R> {
    let element: HTMLElement = this.getElement(elementId);

    return pipe(
      res => {
        this.initializeIsBusyToStartingPosition(element);

        setTimeout(() => {
          element.style.opacity = '1';
        }, 0);

        return res;
      },
      catchError(ex => {
        this.hideLocalIsBusy(element);
        return throwError(ex);
      }),
      map((result: R) => {
        this.hideLocalIsBusy(element);
        return result;
      }),
    );
  };

  //start isBusy with never ending loading
  public startEndlessIsBusyLocal<R>(elementId: string): MonoTypeOperatorFunction<R> {
    let element: HTMLElement = this.getElement(elementId);

    return pipe(
      res => {
        this.initializeIsBusyToStartingPosition(element);

        setTimeout(() => {
          element.style.opacity = '1';
        }, 0);

        return res;
      },
      map((x: R) => { return x; }),
    );
  };

  //stop specific isBusy
  public stopEndlessIsBusyLocal<R>(elementId: string): MonoTypeOperatorFunction<R> {
    let element: HTMLElement = this.getElement(elementId);

    return pipe(
      catchError(ex => {
        this.hideLocalIsBusy(element);
        return throwError(ex);
      }),
      map((result: R) => {
        this.hideLocalIsBusy(element);
        return result;
      })
    );
  };

  //start isBusy manualy instead of network request
  public startIsBusyInidcatorManualy(buttonId: string, dotsColor?: isBusyColor) {
    let button: HTMLElement = this.getButton(buttonId);
    dotsColor = dotsColor == null ? IsBusyService.IsBusyDotsIcon_WhiteColor : dotsColor;

    this.runIsBusy(button, dotsColor);
  }

  //stop isBusy manualy instead of network request
  public stopIsBusyInidcatorManualy(buttonId: string, reusable: boolean, result: ResponseDTO<any>, text: TextCollection) {
    if (result == null) {
      result = <ResponseDTO<any>>{ type: "success" };
    }

    let button: HTMLElement = this.getButton(buttonId);
    let isBusy = <HTMLElement>Array.from(button.children).find(x => x.classList.contains("isBusyLocal"));

    this.stopIsBusyInidcatorManualyWithObject(button, isBusy, reusable, null, text);
  }

  //wait until animation done before call success
  public joinAnimations<R>(): MonoTypeOperatorFunction<R> {
    return pipe(
      delay(IsBusyService.PauseForDoneStateOnScreenWhenReusable),
      map((x: R) => { return x; }),
    );
  }

  public initializeIsBusyToStartingPosition(element: HTMLElement) {
    element.style.opacity = '0';
    element.style.pointerEvents = "all";
    element.style.transition = "opacity ease-in-out 0.3s";
    element.style.transitionDelay = "0.3s";
    element.hidden = false;
  }

  public hideLocalIsBusy(element: HTMLElement) {
    element.style.opacity = '0';
    element.style.pointerEvents = "none";

    setTimeout(() => {
      element.hidden = true;
    }, 500);
  }

  //private
  private stopIsBusyInidcatorManualyWithObject(button: HTMLElement, isBusy: HTMLElement, reusable: boolean, result: ResponseDTO<any>, text?: TextCollection) {
    if (isBusy == null) {
      return;
    }

    this.translateService.get(["Done!", "Fail!"]).subscribe(x => {
      if (text == null) {
        text = {
          done: x["Done!"],
          fail: x["Fail!"],
        }
      }

      if (result.type == "success" || result.type == null) {
        //DONE
        this.setButtonToFinalState(isBusy, button, text.done, doneIcon.data, reusable);
      }
      else {
        //FAIL
        this.setButtonToFinalState(isBusy, button, text.fail, failIcon.data, true);
      }
    });
  }

  private runIsBusy(button: HTMLElement, dotsColor: isBusyColor): HTMLElement {
    //hide original button text
    button.classList.add('removeText');

    //create isBusy 
    let isBusy = this.getHTMLElement(
      dotsIcon.data,
      [
        "isBusy",
        "isBusy-" + dotsColor
      ]);

    button.appendChild(isBusy);

    return isBusy;
  }

  private setButtonToFinalState(isBusy: HTMLElement, button: HTMLElement, text: string, svg: string, reusable: boolean): void {
    setTimeout(() => {
      //remove background and hide isBusy 
      button.classList.add("removeBackground");
      isBusy.classList.add("hide");

      //create done/fail 
      let isBusyFinaly = this.getHTMLElement(
        text + svg,
        ["isBusyFinaly"]);

      button.appendChild(isBusyFinaly);

      if (reusable) {
        this.startIsBusyOnButton(button, isBusy, isBusyFinaly);
      }
    }, 200);
  }

  private startIsBusyOnButton(button: HTMLElement, isBusy: HTMLElement, isBusyFinaly: HTMLElement): void {
    //start hide animation on loadingDone object after some time on screen and remove all blockers on button
    setTimeout(() => {
      isBusy.remove();

      isBusyFinaly.classList.add("hide");
      button.classList.remove("removeBackground");
      button.classList.remove("removeText");

      //clean DOM object after all animation done
      setTimeout(() => {
        isBusyFinaly.remove();
      }, IsBusyService.HideAnimationDuration);
    }, IsBusyService.PauseForDoneStateOnScreenWhenReusable);
  }

  private getHTMLElement(html: string, classList: string[]): HTMLElement {
    let element = document.createElement("div");

    element.innerHTML = html;

    classList.forEach(item => {
      element.classList.add(item);
    });

    return element;
  }

  public getButton(id: string) {
    return $(id)[0];
  }

  public getElement(id: string) {
    return $(id + " .isBusyLocal")[0];
  }
}

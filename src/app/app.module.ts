import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view'; // 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from 'src/views/home/home.component';
import { FooterComponent } from 'src/views/_components/footer/footer.component';
import { IconsRegistry } from 'src/views/_components/icon/icons.registry';
import { AllIconsArray } from 'src/views/_components/icon/icons';
import { HeaderComponent } from 'src/views/_components/header/header.component';
import { CheckboxComponent } from 'src/views/_components/controls/checkbox/checkbox.component';
import { DatePickerComponent } from 'src/views/_components/controls/datePicker/datePicker.component';
import { FilePickerComponent } from 'src/views/_components/controls/filePicker/filePicker.component';
import { InputComponent } from 'src/views/_components/controls/input/input.component';
import { ListPickerComponent } from 'src/views/_components/controls/listPicker/listPicker.component';
import { PaginatorComponent } from 'src/views/_components/controls/paginator/paginator.component';
import { RadioComponent } from 'src/views/_components/controls/radio/radio.component';
import { SwitchComponent } from 'src/views/_components/controls/switch/switch.component';
import { TextAreaComponent } from 'src/views/_components/controls/textArea/textArea.component';
import { MaterialModule } from './material.module';
import { NgxMaskModule } from 'ngx-mask'
import { NgxFileHelpersModule } from 'ngx-file-helpers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PortalModule } from '@angular/cdk/portal';
import { IconsComponent } from 'src/views/_components/icon/icons.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PriceRangeComponent } from 'src/views/_components/controls/priceRange/priceRange.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CaruselComponent } from 'src/views/_components/controls/carusel/carusel.component';
import { CookieService } from 'ngx-cookie-service';
import { IsBusyComponent } from 'src/views/_components/isBusy/isBusy.component';
import { ErrorDialogComponent } from 'src/views/_components/errorDialog/errorDialog.component';
import { ConfirmDialogComponent } from 'src/views/_components/confirmDialog/confirmDialog.component';
import { CustomListPickerComponent } from 'src/views/_components/controls/customListPicker/customListPicker.component';
import { DropdownComponent } from 'src/views/_components/controls/customListPicker/dropdown.component';

@NgModule({
  declarations: [
    AppComponent,

    FooterComponent,
    HeaderComponent,
    ErrorDialogComponent,
    ConfirmDialogComponent,
    
    HomeComponent,

    FilePickerComponent,
    DatePickerComponent,
    InputComponent,
    TextAreaComponent,
    DropdownComponent,
    ListPickerComponent,
    CustomListPickerComponent,
    PaginatorComponent,
    CheckboxComponent,
    RadioComponent,
    SwitchComponent,
    IconsComponent,
    PriceRangeComponent,
    CaruselComponent,
    IsBusyComponent
  ],
  imports: [
    NgxMaskModule.forRoot(),
    DragDropModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgImageFullscreenViewModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PortalModule,
    NgxFileHelpersModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private iconsRegistry: IconsRegistry) {
      this.iconsRegistry.registryIcons(AllIconsArray);
  }
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

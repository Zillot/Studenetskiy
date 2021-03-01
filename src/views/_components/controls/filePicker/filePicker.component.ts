import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ShowAndHideByHeight } from 'src/helpers/animations';
import { FilePickerDirective, ReadFile, ReadMode } from 'ngx-file-helpers';
import { Observable, of } from 'rxjs';

declare var $: any;

@Component({
  selector: 'pnFilePicker',
  templateUrl: './filePicker.component.html',
  styleUrls: ['./filePicker.component.scss'],
  animations: [ShowAndHideByHeight]
})
export class FilePickerComponent implements OnInit {
  @Input() placeholder: any;
  @Input() notEditUrl: any;

  @Input() file: File;
  @Output() fileChange = new EventEmitter<File>();

  @Input() inputModel: string;
  @Output() inputModelChange = new EventEmitter<string>();
  
  public readMode = ReadMode.dataURL;
  public picked: ReadFile;
  public isHover: boolean;
  public status: string;
  
  @ViewChild('filePicker')
  private filePicker: FilePickerDirective;
  
  constructor(
  ) { }

  public ngOnInit(): void {
    $("#dragZoneBtn").on('dragenter focus click', function() {
      if (event.target === this) {
        $("#dragZone").addClass('is-active');
      }
    });
    
    $("#dragZoneBtn").on('dragleave blur drop', function() {
      if (event.target === this) {
        $("#dragZone").removeClass('is-active');
      }
    });
  }

  onReadStart(fileCount: number) {
    this.status = `Загрузка...`;
  }

  onReadEnd(fileCount: number) {
    this.inputModelChange.emit(this.inputModel);

    this.status = "";
    this.filePicker.reset();
  }

  onFilePicked(readFile: ReadFile) {
    let base64 = this.resizeImage(readFile.content);

    this.picked = readFile;
    this.inputModel = base64;
    this.inputModelChange.emit(this.inputModel);

    this.dataURItoBlob(readFile).subscribe((blob) => {
      let imageBlob: Blob = blob;
      let imageName: string = name + "." + this.picked.type;
      let imageFile: File = new File([imageBlob], imageName, {
          type: "image/" + this.picked.type
      });

      this.inputModel = base64;
      this.inputModelChange.emit(this.inputModel);
      
      this.file = imageFile;
      this.fileChange.emit(imageFile);
    });
  }

  dataURItoBlob(readFile: ReadFile): Observable<Blob> {
    const byteString: string = window.atob(readFile.content.split(",")[1]);
    const arrayBuffer: ArrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array: Uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    return of(new Blob([int8Array], { type: "image/" + readFile.type }));
  }

  resizeImage(base64Str) {
    var img = new Image();
    img.src = base64Str;
    var canvas = document.createElement('canvas');
    var MAX_WIDTH = 2000;
    var MAX_HEIGHT = 2000;
    var width = img.width;
    var height = img.height;

    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    }

    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    
    return canvas.toDataURL();
  }
}

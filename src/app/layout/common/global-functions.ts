import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTANTS } from './constants';
import { HttpHeaders } from "@angular/common/http";
// import { SnotifyService } from 'ng-snotify';
import { DOCUMENT } from '@angular/common';
import * as _ from 'lodash';

declare let $: any;

@Injectable()
export class GlobalFunctions {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _router: Router,
    // private _sNotifyService: SnotifyService
  ) {
  }

  //Header Functions
  // lOGIN NO HOI TYARE
  getHeader(): any {
    return {
      headers: new HttpHeaders({
        'content-Type': 'application/json'
      })
    };
  }

  // INPUT TYPE FILE HOI TYARE
  getFileAuthorizationHeader(): any {
    return {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('accessToken')
      })
    };
  }

  // INPUT TYPE FILE VAGAR NU HOI TYARE
  getAuthorizationHeader(): any {
    return {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('accessToken')
        // 'token': localStorage.getItem('accessToken'),
      })
    };
  }

  copyObject(dataObj: any): any {
    return JSON.parse(JSON.stringify(dataObj));
  }

  convertArrToJSON(arr: any, field: any): any {
    const obj: any = {};
    _.each(arr, (dataObj: any, index: any) => {
      if (index !== undefined && dataObj[field] && dataObj[field] !== undefined) {
        obj[dataObj[field]] = dataObj;
      }
    });
    return obj;
  }

  successErrorHandling(response: any, that: any, messageVariable: any): any {
    // this._sNotifyService.clear();
    let messageText = '';
    messageText = response.message || CONSTANTS.message.INTERNAL_ERROR;
    if (response.code === CONSTANTS.errorCodes.UNAUTHORIZED ||
      response.code === CONSTANTS.errorCodes.TOKEN_EXPIRED ||
      response.code === CONSTANTS.errorCodes.TOKEN_REQUIRED) {
      localStorage.removeItem('accessToken');
      // this._sNotifyService.error(messageText, 'Oops..!');
      // window.location.href = '/login';
      this._router.navigate(['/login'], { queryParams: { redirectURL: this._router.url } });
    } else {
      // this._sNotifyService.error(messageText, 'Oops..!');
    }
    if (messageVariable) {
      messageVariable = messageText;
    }
  }

  errorHanding(errorResponse: any, that: any, messageVariable: any, isSingleErrorReturn: boolean = false): any {
    // let error = errorResponse.json();
    const error = errorResponse.error;
    // this._sNotifyService.clear();

    let messageText = '';
    messageText = errorResponse.message || CONSTANTS.message.INTERNAL_ERROR;
    if (error) {
      if (error.detail) {
        messageText = error.detail;
      } else if (error.error) {
        messageText = error.error;
      } else if (error.Message) {
        messageText = error.Message;
      }
    }
    if (errorResponse.status === CONSTANTS.errorCodes.UNAUTHORIZED ||
      errorResponse.status === CONSTANTS.errorCodes.TOKEN_EXPIRED ||
      errorResponse.status === CONSTANTS.errorCodes.TOKEN_REQUIRED) {
      localStorage.removeItem('accessToken');
      // this._sNotifyService.error(messageText, 'Oops..!');
      // window.location.href = '/login';
      this._router.navigate(['/login'], { queryParams: { redirectURL: this._router.url } });
    } else if (errorResponse.status === CONSTANTS.errorCodes.ERROR_CODE_VALIDATION_FAILED ||
      errorResponse.status === CONSTANTS.errorCodes.ALREADY_EXISTS) {
      if (error.error && Object.keys(error.error).length) {
        messageText = '';
        _.each(error.error, (message: any, key: any) => {
          messageText = messageText + ' ' + message;
          if (isSingleErrorReturn) {
            if (messageVariable) {
              messageVariable = messageText;
            }
            that.message.error = messageText;
            $('#' + key).focus();
            return;
          }
        });
        // this._sNotifyService.error(messageText, 'Oops..!');
      }
    } else if (errorResponse.status === CONSTANTS.errorCodes.BAD_REQUEST ||
      errorResponse.status === CONSTANTS.errorCodes.NOT_FOUND_HTTP_EXCEPTION ||
      errorResponse.status === CONSTANTS.errorCodes.PERMISSION_DENIED ||
      errorResponse.status === CONSTANTS.errorCodes.METHOD_NOT_FOUND ||
      // errorResponse.status === CONSTANTS.errorCodes.ALREADY_EXISTS ||
      errorResponse.status === CONSTANTS.errorCodes.DATABASE_INITIALIZATION_FAIL ||
      errorResponse.status === CONSTANTS.errorCodes.INVALID_DOMAIN) {
      // this._sNotifyService.error(messageText, 'Oops..!');
    } else {
      // this._sNotifyService.error(messageText, 'Oops..!');
    }
    if (!messageVariable) {
      if (that.message && that.message) {
        that.message.error = messageText;
      }
    } else {
      messageVariable = messageText;
    }
    if (that.isLoading) {
      that.isLoading = false;
    }
  }

  loadAccordion(): void {
    if ($('.title_tab')) {
      $('.title_tab.active').next('.inner_content').slideDown();
      $('.title_tab').on('click', (e: any) => {
        if (e && e.target) {
          e.preventDefault();
          if ($(e.target).hasClass('active')) {
            $(e.target).removeClass('active');
            $(e.target).next().stop().slideUp(500);
            $(e.target).next().find('p').removeClass('show');
          } else {
            $(e.target).addClass('active');
            $(e.target).next().stop().slideDown(500);
            $(e.target).parent().siblings().children('.title_tab').removeClass('active');
            $(e.target).parent().siblings().children('.inner_content').slideUp(500);
            $(e.target).parent().siblings().children('.inner_content').find('p').removeClass('show');
            $(e.target).next().find('p').addClass('show');
          }
        }
      });
    }
  }

  loadTabsJs(): void {
    $('.teb-holder button').click(function (e: any) {
      const tab_id: any = $(e.target).attr('data-tab');
      $('.teb-holder button').removeClass('active');
      $('.tab-main').removeClass('active');
      $(e.target).addClass('active');
      $("#" + tab_id).addClass('active');
    });
  }

  promptForVideo(): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      // make file input element in memory
      const fileInput: HTMLInputElement = this.document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'video/*';
      fileInput.setAttribute('capture', 'camera');
      // fileInput['capture'] = 'camera';
      fileInput.addEventListener('error', event => {
        reject(event.error);
      });
      fileInput.addEventListener('change', event => {
        if (fileInput && fileInput.files)
          resolve(fileInput.files[0]);
      });
      // prompt for video file
      fileInput.click();
    });
  }

  generateThumbnail(videoFile: Blob): any {
    const video: HTMLVideoElement = this.document.createElement('video');
    const canvas: HTMLCanvasElement = this.document.createElement('canvas');
    const context: CanvasRenderingContext2D | any = canvas.getContext('2d');
    return new Promise<string>((resolve, reject) => {
      canvas.addEventListener('error', reject);
      video.addEventListener('error', reject);
      video.addEventListener('canplay', event => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        resolve(canvas.toDataURL());
      });
      if (videoFile.type) {
        video.setAttribute('type', videoFile.type);
      }
      video.preload = 'auto';
      video.src = window.URL.createObjectURL(videoFile);
      video.load();
    });
  }

  dataURItoBlob(dataURI: string): any {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = unescape(dataURI.split(',')[1]);
    }

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  async getThumbnail(file: Blob | any): Promise<Blob> {
    let base64String = await this.generateThumbnail(file);
    let blob = this.dataURItoBlob(base64String);
    return new File([blob], `${file?.name.split('.')[0]}.jpeg`, { type: "image/jpeg" });
  }

  base64ToImage(base64String: string, imageName: string = ''): any {
    let blob = this.dataURItoBlob(base64String);
    let name = (imageName && imageName != '') ? imageName : new Date().valueOf();
    return new File([blob], name + '.jpeg', { type: "image/jpeg" });
  }

  removeIdsFromLocalStorage(): void {
    localStorage.removeItem('eId');
    localStorage.removeItem('oOId');
    localStorage.removeItem('nId');
    localStorage.removeItem('lsId');
  }

}

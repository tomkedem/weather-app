import { ErrorHandler, Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

  constructor() {}

  handleError(error: any): void {
    // Log error to console
    console.error('An error tomer occurred:', error);    
    
  }
}

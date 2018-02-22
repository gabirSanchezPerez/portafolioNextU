import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  
  constructor(private _session: String) { }

  set session(value){
    this._session = value;
  }

  get session(){
    return this._session
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO } from 'src/models/ResponseDTO';
import { ReviewDTO } from 'src/models/ReviewDTO';
import { Review } from './urlConfig';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
    constructor(
        private http: HttpClient
    ) {
    }

    public getAll(): Observable<ResponseDTO<ReviewDTO[]>> {
        return this.http.get<ResponseDTO<ReviewDTO[]>>(Review.get);
    }

    public create(model): Observable<ResponseDTO<ReviewDTO>> {
        return this.http.post<ResponseDTO<ReviewDTO>>(Review.create, model);
    }
}
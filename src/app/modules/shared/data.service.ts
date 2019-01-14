import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Data} from './data.interface';
import {Subject} from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class DataService {

    data: Data[];
    updated = new Subject();
    updateNotification = this.updated.asObservable();


    constructor(private http: HttpClient) {
    }

    getData() {
        // Creating a subject so we can cache data.
        const subject = new Subject();
        if (this.data) {
            // Sending data in next even cycle, to let this function return observable first.
            setTimeout(() => {
                // Returing cached data.
                subject.next(this.data);
                subject.complete();
            }, 0);
        } else {
            // Making API call.
            const obs = this.http.get('./assets/data/data.json');
            obs.subscribe((d: Data[]) => {
                // Adding data to cache before returning it.
                this.data = d;
                subject.next(this.data);
                subject.complete();
            }, err => {
                subject.error(err);
                subject.complete();
            });
        }

        return subject.asObservable();
    }

    getById(id) {
        id = parseInt(id, 10);
        // Creating a subject so we can cache data.
        const subject = new Subject();

        // Lets code in setTimeout, so we can return observable first.
        setTimeout(async () => {
            // If data is not initialized, initialize now.
            if (!this.data) {
                try {
                    await this.getData().toPromise();
                } catch (e) {
                    subject.error(e);
                    subject.complete();
                    return;
                }
            }

            // Search in data.
            const found = this.data.filter(d => d.id === id);
            if (found.length > 0) {
                // Send found record.
                subject.next(found[0]);
            } else {
                // Unable to find record by id.
                subject.error('Not Found');
            }
            subject.complete();
        }, 0);


        return subject.asObservable();
    }

    add(data) {
        // Sinple add function.
        if (!this.data) {
            this.data = []; // Initialize data if not already initialized.
        }
        // Adding data to array.
        this.data.push(data);
        // Sending an update notification.
        this.updated.next(this.data);
        return true;
    }

    update(data) {
        if (!this.data) {
            // Return if data is not already cached.
            return false;
        }

        // Lets find the record.
        const found = this.data.filter(d => d.id === data.id);
        if (found.length === 0) {
            // Return if record is not found.
            return false;
        }

        // Updating record.
        Object.keys(found[0]).forEach(key => found[0][key] = data[key]);

        // Sending an update notification.
        this.updated.next(this.data);
        return true;
    }

    delete(data) {
        if (!this.data) {
            // Return if record is not found.
            return false;
        }
        // Remove the record.
        this.data = this.data.filter(d => d.id !== data.id);

        // Sending an update notification.
        this.updated.next(this.data);
        return true;
    }


}

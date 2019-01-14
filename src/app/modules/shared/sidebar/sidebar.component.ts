import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {Data} from '../data.interface';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
    data: Data[];
    subscription;

    constructor(private dataService: DataService) {
    }

    ngOnInit() {
        // Get Data
        this.getData();
    }

    ngOnDestroy() {
        // As we never call complete on this subject
        // we need to manually unsubscribe it.
        this.subscription.unsubscribe();
    }

    getData() {
        this.dataService.getData().subscribe((data: Data[]) => {
            this.data = data;
            this.data.sort((a, b) => {
                return (a.id - b.id) ? 1 : -1;
            });
        }, err => {
            alert('Error fetching data');
        });

        // Subscribing to data update events.
        this.subscription = this.dataService.updateNotification.subscribe((data: Data[]) => {
            this.data = data;
            this.data.sort((a, b) => {
                return (a.id - b.id > 0) ? 1 : -1;
            });
        });
    }

}

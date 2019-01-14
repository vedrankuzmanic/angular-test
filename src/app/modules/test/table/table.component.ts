import {Component, OnInit, ViewChild} from '@angular/core';
import {Data} from '../../shared/data.interface';
import {DataService} from '../../shared/data.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    // Initializing object.
    data: Data = {
        id: null,
        title: '',
        text: '',
        color: ''
    };
    subscription;
    editMode = false;
    @ViewChild('form') form: NgForm;

    constructor(private dataService: DataService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.params
            .subscribe(
                (params: Params) => {
                    if (params.id) {
                        // Getting data by id.
                        this.getData(params.id);
                        // Setting component mode to edit.
                        this.editMode = true;
                    }
                }
            );
        // Lets fetch data from dataService.
    }

    getData(id) {
        this.dataService.getById(id).subscribe((data: Data) => {
            // Data recieved.
            // Making a copy.
            this.data = Object.assign({}, data);
        }, err => {
            // Error occured while getting data
            alert('Error occured while getting data');
        });
    }

    async addOrUpdateData() {
        // All fields are required.
        if (this.form.valid) {
            if (this.editMode) {
                // Update record
                this.dataService.update(this.data);
            } else {
                try {
                    const found = await this.dataService.getById(this.data.id).toPromise();
                    alert('Duplicate id not allowed.');
                } catch (e) {
                    // If getById fail, add new record.
                    // Add record
                    this.dataService.add(this.data);
                    // Navigate to URL.
                    this.router.navigate(['/', this.data.id]);
                }
            }
        } else {
            // Alret that all fields are required.
            // Todo: alert in not very UI friendly, replace with something else.
            alert('All fields are required');
        }
    }

    deleteData() {
        // Todo: JS confirm is not very UI friendly, replace with something more fancy.
        const response = confirm('Delete record?');
        if (response) {
            this.dataService.delete(this.data);
            this.router.navigate(['/']);
        }

    }

}

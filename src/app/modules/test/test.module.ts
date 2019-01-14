import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './table/table.component';
import {TestRoutingModule} from './test-routing.module';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [TableComponent],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        TestRoutingModule
    ]
})
export class TestModule {
}

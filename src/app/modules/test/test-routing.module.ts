import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TableComponent} from './table/table.component';
import {CommonModule} from '@angular/common';

const routes: Routes = [
    {
        path: '',
        component: TableComponent
    },
    {
        path: ':id',
        component: TableComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class TestRoutingModule {
}

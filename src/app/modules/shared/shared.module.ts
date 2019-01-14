import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar/sidebar.component';
import {CardComponent} from './card/card.component';
import {DataService} from './data.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [SidebarComponent, CardComponent],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule
    ],
    exports: [
        RouterModule,
        SidebarComponent,
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [DataService]
        };
    }
}

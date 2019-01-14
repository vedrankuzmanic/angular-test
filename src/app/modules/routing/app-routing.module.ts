import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainComponent} from '../../layouts/main/main.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        loadChildren: '../test/test.module#TestModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

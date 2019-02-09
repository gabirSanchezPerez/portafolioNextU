import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { SearchComponent } from "./search/search.component";

const routes: Routes = [
    { path: "", redirectTo: "/search", pathMatch: "full" },
    { path: "search", component: SearchComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

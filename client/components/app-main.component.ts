import {Component} from "@angular/core";
import {ThemeComponent} from "../components/layout/theme.component";
import {SidebarComponent} from "../components/layout/sidebar.component";
import {NavbarComponent} from "../components/layout/navbar.component";
import {FooterComponent} from "../components/layout/footer.component";


@Component({
    selector: 'app-main',
    template: require('../components/app-main.component.html')

})
export class AppMainComponent {
    // constructor(){
    //     console.log("yesssssss")
    // }
}

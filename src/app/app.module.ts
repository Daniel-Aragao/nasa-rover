import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { MenuComponent } from './components/menu/menu.component';
import { OutputComponent } from './components/output/output.component';
import { RoverComponent } from './components/board/rover/rover.component';

@NgModule({
  declarations: [AppComponent, BoardComponent, MenuComponent, OutputComponent, RoverComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

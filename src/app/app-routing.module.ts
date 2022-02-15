import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCardsComponent } from './modules/pages/book-cards/book-cards.component';
import { LoginComponent } from './modules/pages/login/login.component';
import { CourseInfoComponent } from './shared/components/course-info/course-info.component';
import { FileUploadComponent } from './shared/components/file-upload/file-upload.component';
import { ValidatorFormComponent } from './shared/validator-form/validator-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'course-info', component:CourseInfoComponent },
  { path: 'valid-test', component:ValidatorFormComponent },
  { path: 'file-upload', component:FileUploadComponent },
  { path: 'book', component:BookCardsComponent },
  { path: 'login', component:LoginComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

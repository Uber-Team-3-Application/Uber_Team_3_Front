import { OnInit, Component } from '@angular/core';
import { UserService } from '../../unregistered-user/user.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.css']
})
export class UsersInfoComponent implements OnInit{

  users: User[];
  selectedShowNumber: number = 3;
  tableSizes = [3, 5, 15, 25, 50];
  search: string;
  totalEntries: number = 0;
  selectedPage: number = 1;
  page:number = 1;
  constructor(private userService: UserService, private router: Router){
    
  }

  ngOnInit(): void {
    
    this.fetchUsers(this.selectedPage);
    this.userService.getTotalNumberOfUsers()
          .subscribe(
            (total) => {this.totalEntries = total;}
          );
  
  }

  fetchUsers(selPage: number): void{
    this.userService.getUsers(selPage - 1, this.selectedShowNumber)
        .subscribe(
          users => {this.users = users.results; console.log(this.users)}
        );
  }

  onSearchChange(): void{
    
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.fetchUsers(this.page);
  }

  onTableSizeChange(event: any): void {
    this.selectedShowNumber = event.target.value;
    this.page = 1;
    this.fetchUsers(this.page);
  }

  changeTotalUsersPerPage(): void{
    console.log(this.selectedShowNumber);
    this.userService.getUsers(0, this.selectedShowNumber)
    .subscribe(
      (users) => {this.users = users.results; console.log(this.users)}
    );
  }

  displayUserInfo(user: User):void{
    this.router.navigate(['users/' + user.id + '/' + user.role])
  }

}

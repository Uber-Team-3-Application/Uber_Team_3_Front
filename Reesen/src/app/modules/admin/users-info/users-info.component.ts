import { OnInit, Component } from '@angular/core';
import { UserService } from '../../unregistered-user/user.service';
import { User } from 'src/app/models/User';

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
  selectedPage: number = 0;
  page:number = 1;
  constructor(private userService: UserService){
    
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
    this.fetchUsers(this.page);
  }

  changeTotalUsersPerPage(): void{
    this.userService.getUsers(0, this.selectedShowNumber)
    .subscribe(
      (users) => {this.users = users.results; console.log(this.users)}
    );
  }


}

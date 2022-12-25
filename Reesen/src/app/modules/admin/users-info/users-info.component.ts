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
  selectedShowNumber: number = 5;
  search: string;
  totalEntries: number = 0;
  selectedPage: number = 0;
  constructor(private userService: UserService){
    
  }

  ngOnInit(): void {
    
    this.userService.getUsers(this.selectedPage, this.selectedShowNumber)
        .subscribe(
          (users) => {this.users = users.results; console.log(this.users)}
        );

    this.userService.getTotalNumberOfUsers()
          .subscribe(
            (total) => (this.totalEntries = total)
          );
  
  }

  onSearchChange(): void{
    
  }

  changeTotalUsersPerPage(): void{
    this.userService.getUsers(0, this.selectedShowNumber)
    .subscribe(
      (users) => {this.users = users.results; console.log(this.users)}
    );
  }


}

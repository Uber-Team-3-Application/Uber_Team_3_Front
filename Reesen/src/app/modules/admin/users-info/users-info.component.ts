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
  sortDirection: number = -1;
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

  sortTable(column): void {
    this.sortDirection = this.sortDirection * (-1);
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("userTable");
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[column];
        y = rows[i + 1].getElementsByTagName("TD")[column];
        //check if the two rows should switch place:
        if(this.sortDirection === 1){
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }else{
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }
  


}

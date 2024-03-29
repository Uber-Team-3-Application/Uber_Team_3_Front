import { OnInit, Component } from '@angular/core';
import { UserService } from '../../unregistered-user/user.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { DriverService } from '../../driver/services/driver.service';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.css']
})
export class UsersInfoComponent implements OnInit{

  users: User[];
  selectedShowNumber = 3;
  tableSizes = [3, 5, 15, 25, 50];
  search: string;
  totalEntries = 0;
  selectedPage = 1;
  page = 1;
  sortDirection = -1;
  totalRequests = 0;
  hasLoaded = false;
  constructor(private userService: UserService, private router: Router,
              private driverService: DriverService){

  }

  ngOnInit(): void {
    this.hasLoaded = false;

    this.fetchUsers(this.selectedPage);
    this.userService.getTotalNumberOfUsers()
      .subscribe(
        (total) => {this.totalEntries = total;}
      );
    this.driverService.getTotalEditRequests()
      .subscribe(
        (total) =>{this.totalRequests = total;}
      )
  }

  fetchUsers(selPage: number): void{
    this.userService.getUsers(selPage - 1, this.selectedShowNumber)
      .subscribe(
        users => {this.users = users.results; console.log(this.users);this.hasLoaded = true;}
      );
  }

  onSearchChange(): void{
    let input, filter, table, tr;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("userTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (let i = 0; i < this.users.length; i++) {

      if (this.userContains(this.users[i], filter)) {
        tr[i + 1].style.display = "";
      }
      else {
        tr[i + 1].style.display = "none";
      }
    }


  }
  userContains(user: User, text: string): boolean{

    if (user.id.toString().toUpperCase().includes(text)) return true;
    if (user.name.toUpperCase().includes(text)) return true;
    if (user.surname.toUpperCase().includes(text)) return true;
    if (user.telephoneNumber.toUpperCase().includes(text)) return true;
    if (user.email.toUpperCase().includes(text)) return true;
    if (user.address.toUpperCase().includes(text)) return true;
    let userBlocked = user.blocked + "";
    if (userBlocked.toUpperCase().includes(text)) return true;
    if (user.role.toUpperCase().includes(text)) return true;

    return false;
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

  displayUserInfo(user: User): void{
    this.router.navigate(['users/' + user.id + '/' + user.role]);
  }

  sortTable(column: number) : void {
    this.sortDirection = this.sortDirection * (-1);
    let table, rows, switching, i, x, y, shouldSwitch;
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


  showDriverEditRequests(): void {
    if(this.totalRequests == 0) {alert("No requests to show!");return;}
    this.router.navigate(['users/edit-requests']);

  }


}

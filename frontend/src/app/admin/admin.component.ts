import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Cabin } from '../models/cabin';
import { CabinService } from '../services/cabin.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private cabinService: CabinService) { }

  ngOnInit(): void {

    this.userService.getOwners().subscribe((owners: User[])=>{
      this.activeOwners = owners
    })

    this.userService.getTourists().subscribe((tourists: User[])=>{
      this.activeTourists = tourists
    })

    this.userService.getAllRequests().subscribe((requests: User[])=>{
      this.registrationRequests = requests
      this.cabinService.getAllCabins().subscribe((cabins: Cabin[]) => {
        this.cabins = cabins;
        this.error = false
        this.message = ""
        this.selectedTab = "requests"
      })
    })
  }

  logout() {
    localStorage.removeItem('logged');
    this.router.navigate(['/admin-login']);
  }

  selectedTab: string = 'requests'
  error: boolean = false
  message: string = ''
  adminPic: string = 'assets/admin.jpg';

  selectTab(tab: string): void {
    this.error = false;
    this.message = '';
    this.selectedTab = tab;
  }
  
  activeOwners: User[] = []
  activeTourists: User[] = []
  registrationRequests: User[] = []

  selectedUser: User = new User;
  editFirstname: string = ""
  editLastname: string = ""
  editAddress: string = ""
  editPhoneNumber: string = ""
  editMail: string = ""
  editCardNumber: string = ""
  editProfilePic: string = ""
  editProfilePicFile: File | null = null

  cabins: Cabin [] = []
  
  editOwner(username: string) {
    this.selectedTab = 'editOwner';

    this.userService.getUser(username).subscribe((user: User) => {
      this.selectedUser = user
      this.editFirstname = user.firstname
      this.editLastname = user.lastname
      this.editAddress = user.address
      this.editPhoneNumber = user.phoneNumber
      this.editMail = user.mail
      this.editCardNumber = user.cardNumber
    })
  }

  editTourist(username: string) {
    this.selectedTab = 'editTourist';

    this.userService.getUser(username).subscribe((user: User) => {
      this.selectedUser = user
      this.editFirstname = user.firstname
      this.editLastname = user.lastname
      this.editAddress = user.address
      this.editPhoneNumber = user.phoneNumber
      this.editMail = user.mail
      this.editCardNumber = user.cardNumber
    })
  }

  updateProfile() {

    this.error = false
    this.message = ''

    if(this.editFirstname == this.selectedUser.firstname && this.editLastname == this.selectedUser.lastname && 
      this.editAddress == this.selectedUser.address && this.editPhoneNumber == this.selectedUser.phoneNumber && 
      this.editMail == this.selectedUser.mail && this.editCardNumber == this.selectedUser.cardNumber){
      return
    }

    // check if all fields are entered
    if(this.editFirstname=="" || this.editLastname=="" || 
        this.editAddress=="" || this.editPhoneNumber=="" || this.editMail=="" || this.editCardNumber==""){
      this.error = true
      this.message = "Enter all fields"
      return
    }

    // check for phone number with regex
    let numberRegex = /^(06)\d{7,8}$|^0\d{8,9}$/
    if(!numberRegex.test(this.editPhoneNumber)){
      this.error = true
      this.message = "Wrong phone number format"
      return
    }

    // This regex checks for a valid email format
    let mailRegex = /^\w{1,}@\w{1,}\.\w{2,3}$/
    if(!mailRegex.test(this.editMail)){
      this.error = true
      this.message = "Wrong email format"
      return
    }

    // This regex checks for valid card numbers
    let dinersRegex = /^(300|301|302|303)\d{12}$|^(36|38)\d{13}$/
    let masterCardRegex = /^(51|52|53|54|55)\d{14}$/
    let visaRegex = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/
    if(!dinersRegex.test(this.editCardNumber) && !masterCardRegex.test(this.editCardNumber) && !visaRegex.test(this.editCardNumber)){
      this.error = true
      this.message = "Wrong card number format"
      return
    }

    this.userService.updateAccountDetailsAndPicture(this.selectedUser.username, this.editFirstname, this.editLastname, this.editAddress, this.editPhoneNumber, 
      this.editMail, this.editCardNumber, this.editProfilePic).subscribe((resp: any)=>{
        if(resp.message == 'ok'){
          alert('Account details updated successfully')
          this.ngOnInit();
        }
        else if(resp.message == 'error'){
          alert("Error updating account details")
        }
        else{
          alert('Error')
        }
    })
  }

  acceptRequest(username: string){
    this.userService.acceptRequest(username).subscribe((resp: any)=>{
      if(resp.message == 'ok'){
        alert("Request accepted!")
      }
      else{
        alert("ERROR!")
      }

      this.ngOnInit()
    })
  }
  
  declineRequest(username: string){
    this.userService.declineRequest(username).subscribe((resp: any)=>{
      if(resp.message == 'ok'){
        alert("Request denied!")
      }
      else{
        alert("ERROR!")
      }

      this.ngOnInit()
    })
  }

  deactivateUser(username: string) {
    this.userService.deactivateUser(username).subscribe((resp: any) => {
      if (resp.message == 'ok') {
        alert("User deactivated!")
      } else {
        alert("ERROR!")
      }

      this.ngOnInit()
    })
  }
  onFileSelected(event: any){
    this.message = ""
    this.editProfilePic = ""
    this.editProfilePicFile = null
    const file = event.target.files[0]

    if(file){
      const isValidType = file.type == 'image/jpeg' || file.type == 'image/png'
      if(!isValidType){
        this.error = true
        this.message = "Only png and jpg files are allowed"
        return
      }

      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = (e: any)=>{
        const img = new Image()
        img.src = e.target.result

        img.onload = ()=>{
          const width = img.width
          const height = img.height

          if(width < 100 || width > 300 || height < 100 || height > 300){
            this.error = true
            this.message = "Dimesions of the image must be between 100x100px and 300x300px"
            return
          }
          else{
            this.editProfilePicFile = file
            this.editProfilePic = reader.result as string
          }
        }
      }
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-owner',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './owner.component.html',
  styleUrl: './owner.component.css'
})
export class OwnerComponent implements OnInit {
  
  constructor(private router: Router, private userService: UserService) {}

  user: User = new User;
  username: string = ""
  
  ngOnInit(): void {

    this.username = localStorage.getItem('logged') || '';
    this.selectedTab = 'details';

    this.error = false
    this.message = ''
    this.oldPassword = ''
    this.newPassword = ''
    this.confirmPassword = ''

    this.userService.getUser(this.username).subscribe((user: User)=>{
      this.user = user
      this.firstname = this.user.firstname;
      this.lastname = user.lastname;
      this.address = user.address;
      this.phoneNumber = user.phoneNumber;
      this.mail = user.mail;
      this.cardNumber = user.cardNumber;
    })
  }

  logout() {
    localStorage.removeItem('logged');
    this.router.navigate(['/login']);
  }

  selectedTab: string = 'details'

  firstname: string = ''
  lastname: string = ''
  address: string = ''
  phoneNumber: string = ''
  mail: string = ''
  cardNumber: string = ''

  databasePassword: string = ''
  oldPassword: string = ''
  newPassword: string = ''
  confirmPassword: string = ''

  selectTab(tab: string): void {
    this.error = false;
    this.message = '';
    this.selectedTab = tab;
  }

  error: boolean = false
  message: string = ''

  profilePic: string = ""
  profilePicFile: File | null = null

  updateProfile() {

    this.error = false
    this.message = ''

    if(this.firstname == this.user.firstname && this.lastname == this.user.lastname && 
      this.address == this.user.address && this.phoneNumber == this.user.phoneNumber && 
      this.mail == this.user.mail && this.cardNumber == this.user.cardNumber){
      return
    }

    //provera da li su uneti svi podaci
    if(this.firstname=="" || this.lastname=="" || 
        this.address=="" || this.phoneNumber=="" || this.mail=="" || this.cardNumber==""){
      this.error = true
      this.message = "Enter all fields"
      return
    }

    // check for phone number with regex
    let numberRegex = /^(06)\d{7,8}$|^0\d{8,9}$/
    if(!numberRegex.test(this.phoneNumber)){
      this.error = true
      this.message = "Wrong phone number format"
      return
    }

    // This regex checks for a valid email format
    let mailRegex = /^\w{1,}@\w{1,}\.\w{2,3}$/
    if(!mailRegex.test(this.mail)){
      this.error = true
      this.message = "Wrong email format"
      return
    }

    // This regex checks for valid card numbers
    let dinersRegex = /^(300|301|302|303)\d{12}$|^(36|38)\d{13}$/
    let masterCardRegex = /^(51|52|53|54|55)\d{14}$/
    let visaRegex = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/
    if(!dinersRegex.test(this.cardNumber) && !masterCardRegex.test(this.cardNumber) && !visaRegex.test(this.cardNumber)){
      this.error = true
      this.message = "Wrong card number format"
      return
    }

    this.userService.updateAccountDetails(this.username, this.firstname, this.lastname, this.address, this.phoneNumber, 
      this.mail, this.cardNumber).subscribe((resp: any)=>{
        if(resp.message == 'ok'){
          alert('Account details updated successfully')
          this.ngOnInit()
        }
        else if(resp.message == 'error'){
          alert("Error updating account details")
        }
        else{
          alert('Error')
        }
    })
  }

  updatePassword() {

    this.error = false
    this.message = ''

    if(this.oldPassword == '' || this.newPassword == '' || this.confirmPassword == ''){
      this.error = true
      this.message = "Enter all fields"
      return
    }

    if(this.newPassword != this.confirmPassword){
      this.error = true
      this.message = "Passwords do not match"
      return
    }

    let passwordRegex1 = /^.{6,10}$/
    if(!passwordRegex1.test(this.newPassword)){
      this.error = true
      this.message = "Password must be between 6 and 10 characters."
      return
    }
    let passwordRegex2 = /[A-Z]{1,}/
    if(!passwordRegex2.test(this.newPassword)){
      this.error = true
      this.message = "Password must contain at least one uppercase letter."
      return
    }
    let passwordRegex3 = /[a-z]{3,}/
    if(!passwordRegex3.test(this.newPassword)){
      this.error = true
      this.message = "Password must contain at least three lowercase letters."
      return
    }
    let passwordRegex4 = /\W{1,}/
    if(!passwordRegex4.test(this.newPassword)){
      this.error = true
      this.message = "Password must contain at least one special character."
      return
    }
    let passwordRegex5 = /\d{1,}/
    if(!passwordRegex5.test(this.newPassword)){
      this.error = true
      this.message = "Password must contain at least one number."
      return
    }
    let passwordRegex6 = /^[a-z]|^[A-Z]/
    if(!passwordRegex6.test(this.newPassword)){
      this.error = true
      this.message = "Password must start with a letter."
      return
    }
    
    this.userService.updatePassword(this.username, this.oldPassword, this.newPassword).subscribe((resp: any)=>{
      if(resp.message == 'ok'){
        alert('Password changed successfully')
        localStorage.removeItem('logged');
        this.router.navigate(['/login']);
      } else if(resp.message == 'exact'){
        alert("Passwords cannot be the same")
      } else{
        alert('Wrong current password')
      }
    })
  }

  onFileSelected(event: any){
    this.message = ""
    this.profilePic = ""
    this.profilePicFile = null
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
            this.profilePicFile = file
            this.profilePic = reader.result as string
          }
        }
      }
    }
  }

  uploadProfilePic() {

    this.error = false
    this.message = ''

    if(!this.profilePicFile){
      this.error = true
      this.message = "Select a profile picture"
      return
    }

    this.userService.updateProfilePicture(this.username, this.profilePic).subscribe((resp: any)=>{
      if(resp.message == 'ok'){
        alert('Profile picture updated successfully')
        this.ngOnInit()
      }
      else{
        alert('Error updating profile picture')
      }
    })
  }
}

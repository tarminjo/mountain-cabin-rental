import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {}

  username: string = ""
  password: string = ""
  type: string = ""
  firstname: string = ""
  lastname: string = ""
  sex: string = ""
  address: string = ""
  phoneNumber: string = ""
  mail: string = ""
  profilePicFile: File | null = null
  profilePic: string = ""
  cardNumber: string = ""

  cardType: string = ""

  message: string = ""
  error: boolean = false

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

  cardNumberCheck(){
    let dinersRegex = /^(300|301|302|303)\d{12}$|^(36|38)\d{13}$/
    let masterCardRegex = /^(51|52|53|54|55)\d{14}$/
    let visaRegex = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/

    if(dinersRegex.test(this.cardNumber)){
      this.cardType = "diners"
    }
    else if(masterCardRegex.test(this.cardNumber)){
      this.cardType = "master"
    }
    else if(visaRegex.test(this.cardNumber)){
      this.cardType = "visa"
    }
    else{this.cardType = ""}
  }

  refresh(){
    this.username= ""
    this.password = ""
    this.type = ""
    this.firstname = ""
    this.lastname = ""
    this.sex = ""
    this.address = ""
    this.phoneNumber = ""
    this.mail = ""
    this.profilePicFile = null
    this.profilePic = ""
    this.cardNumber = ""
    this.cardType = ""
  }

  register(){
    //provera da li su uneti svi podaci
    if(this.username=="" || this.password=="" || this.type=="" || this.firstname=="" || this.lastname=="" || 
        this.sex=="" || this.address=="" || this.phoneNumber=="" || this.mail=="" || this.cardNumber==""){
      this.error = true
      this.message = "Enter all fields"
      return
    }

    //check for password with several regexes
    let passwordRegex1 = /^.{6,10}$/
    if(!passwordRegex1.test(this.password)){
      this.error = true
      this.message = "Password must be between 6 and 10 characters."
      return
    }
    let passwordRegex2 = /[A-Z]{1,}/
    if(!passwordRegex2.test(this.password)){
      this.error = true
      this.message = "Password must contain at least one uppercase letter."
      return
    }
    let passwordRegex3 = /[a-z]{3,}/
    if(!passwordRegex3.test(this.password)){
      this.error = true
      this.message = "Password must contain at least three lowercase letters."
      return
    }
    let passwordRegex4 = /\W{1,}/
    if(!passwordRegex4.test(this.password)){
      this.error = true
      this.message = "Password must contain at least one special character."
      return
    }
    let passwordRegex5 = /\d{1,}/
    if(!passwordRegex5.test(this.password)){
      this.error = true
      this.message = "Password must contain at least one number."
      return
    }
    let passwordRegex6 = /^[a-z]|^[A-Z]/
    if(!passwordRegex6.test(this.password)){
      this.error = true
      this.message = "Password must start with a letter."
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

    // Check if a profile picture is selected, if not, set a default profile picture
    if(this.profilePicFile == null){
      this.profilePic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAAD1BMVEXk5ueutLfc3+C2u77KztDI56RRAAAE"+
        "HElEQVR42u2dAW4iQQwEGdv/f/MxBJFbAshDUNT2VCkvKHX3DhvYPQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyGFnwsImJ3huKcLdxw13j0D"+
        "ZD6an8Rh3hB1M+XiNR+DraiqDo2uqSuNx2pipagXfN14WYxnfM123VC3r2i9c5uNtNuuixfgNW4XLfPySfZbrulaEK1lBbC1WkCr+2hUH+jtXZCvrClt5V9jKu8J"+
        "W3hW2Vs5Xn6fleeuBK06nz11ha3GwmK0ED1xxlH9VQoq4UEKKmHWFLYkS9iriDBbRkglWn2jNYBGtdz8T8hnxKTbGIFpCi9UlWpfFIlpiwWpwQbwGi2hpBWsMPxXnW"+
        "xYTr9TC8j2M8Q0Tv3CDlB4qtbB4D48t5HooJat0Dw8tpIcSNxxayIpxgNESk1V3tHzcwcJLySo7Wsd9R5acrLILf9x3ZOnJqrrwD2RxORS6GCILWZwdkrL4fqmGLJK1"+
        "gSxDFslC1gsay+KctYEsPhsiq48sbtHscPOP28risqoes/hXmLqsqvt+t/DIUpNVdt/5ypH4aBWWZXxNUni0Ck8WX+2WHq3KLeTnKMKHh9ot/L+HtFAqWqWvhfzsV3fi"+
        "i887jyqQnfj6weLxKpKr1SFY52gRLLVo9QgWj7FTi1aDM9YNHr0ptPGdXPG4YKGN7xUsHnGuUsRmJeS1DCpF7FfCC7xKhpcUlbHV1xUvVuOVfTVsdXc1be3+a+gleIHt"+
        "CoGrN6rIG90zWDBXC4QTqzwWzlqt6KKBeWxZl+/XwIMuR9WSLmb9o1vvM1TI+vblz9tHqB4ICz8oc5+eEPUUOxMWYWFoAvh77GQHKOKjlYoz/sX4H/8iIrZfsIuk6ec1v"+
        "vu1cXq6WVpjK2UPPK3jGxxUzd7xtOPJfiZqfBpvWMn8vYV1vNedm5spfGUzha9Epv4Mj8r35z+w6Jvco383VBv+r/qZKuK18B9BdImpKqTLYkhQQJeKqgK65qwrofzFCDF"+
        "VZ1z1Kzcmp0r23KU0Vupd1Gug7NffdGOlFy7pWGmFSz1WSuESvQhKXhYLVFCmiiUqqFHFMhV8+aM7XKkNV6G5ej1czJWUraKu7mzhSuzxgDVO7SJHiNKubrZwpbZb5V2dMV"+
        "zJZauFq2mLzzhSttq4unyqrvh0tR/0sNVksK4YrkRmq9FgfeEMlsRsNSvhxK3oc8p/UriI/Uo4CUq4gHElzBMEa4Fg3fO4se5pPAhWHjeClScIVh43gpXGg2Dlcc5YCxiH9z"+
        "xBsBYwZOUJWpjGnWDlceOQlSdoYZ6ghXnckJXHmKw8wWTlcT5E53FjspCluvC7TNYYwb4jS/RyuM3FcAxn3//ycmjuPvb4+4CsjTgBAAAAAAAAAAAAAAAAAACAOv8A23lyPr"+
        "J8+hEAAAAASUVORK5CYII="
    }

    this.userService.register(this.username, this.password, this.type, this.firstname, this.lastname, 
      this.sex, this.address, this.phoneNumber, this.mail, this.profilePic, this.cardNumber, 0).subscribe((resp: any)=>{
        if(resp.message == 'ok'){
          alert('Registration request sent')
          this.refresh()
        }
        else if(resp.message == 'error'){
          alert("Registration failed. Username or email already exists.")
        }
        else{
          alert('Error')
        }
      })
    }
}

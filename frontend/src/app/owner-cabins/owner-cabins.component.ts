import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { CabinService } from '../services/cabin.service';
import { User } from '../models/user';
import { Cabin } from '../models/cabin';

@Component({
  selector: 'app-owner-cabins',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './owner-cabins.component.html',
  styleUrl: './owner-cabins.component.css'
})
export class OwnerCabinsComponent implements OnInit {

  constructor(private router: Router, private userService: UserService,
    private cabinService: CabinService
  ) {}
    
  user: User = new User;
  username: string = localStorage.getItem("logged") || ""
  selectedTab: string = "cabins"

  ngOnInit(): void {

    this.username = localStorage.getItem('logged') || '';
    this.selectedTab = 'cabins';

    this.error = false
    this.message = ""

    this.editName = ""
    this.editLocation = ""
    this.editServices = ""
    this.editPhoneNumber = ""
    this.editWinterPrice = 0
    this.editSummerPrice = 0
    this.editCoordinates = ""

    this.selectedImageFiles = []
    this.selectedImagePreviews = []

    this.userService.getUser(this.username).subscribe((user: User)=>{
          this.user = user
    })

    this.cabinService.getMyCabins(this.username).subscribe((myCabins: Cabin[])=>{
      this.cabins = myCabins
    })
  }

  error: boolean = false
  message: string = ""

  cabins: Cabin [] = []

  selectTab(tab: string): void {

    this.editName = ""
    this.editLocation = ""
    this.editServices = ""
    this.editPhoneNumber = ""
    this.editWinterPrice = 0
    this.editSummerPrice = 0
    this.editCoordinates = ""

    this.error = false;
    this.message = '';
    this.selectedTab = tab;
  }
    
  logout() {
    localStorage.removeItem('logged');
    this.router.navigate(['/login']);
  }

  // variables for creating cabin
  name: string = ""
  location: string = ""
  services: string = ""
  phoneNumber: string = ""
  winterPrice: number = 0
  summerPrice: number = 0
  coordinates: string = ""

  // variabled for editing cabin
  editName: string = ""
  editLocation: string = ""
  editServices: string = ""
  editPhoneNumber: string = ""
  editWinterPrice: number = 0
  editSummerPrice: number = 0
  editCoordinates: string = ""

  selectedCabin: Cabin = new Cabin;

  enterEditCabin(cabin: Cabin) {
    this.selectedCabin = cabin
  
    this.editName = cabin.name;
    this.editLocation = cabin.location;
    this.editServices = cabin.services;
    this.editPhoneNumber = cabin.phoneNumber;
    this.editWinterPrice = cabin.winterPrice;
    this.editSummerPrice = cabin.summerPrice;
    this.editCoordinates = cabin.coordinates;

    this.selectedTab = 'edit'
  }

  updateCabin(id: number) {

    this.error = false
    this.message = ''

    if (this.editName === this.selectedCabin.name && this.editLocation === this.selectedCabin.location &&
      this.editServices === this.selectedCabin.services && this.editPhoneNumber === this.selectedCabin.phoneNumber &&
      this.editWinterPrice === this.selectedCabin.winterPrice && this.editSummerPrice === this.selectedCabin.summerPrice &&
      this.editCoordinates === this.selectedCabin.coordinates) {
      return
    }

    if (this.editName === "" || this.editLocation === "" || this.editServices === "" ||
      this.editPhoneNumber === "" || this.editWinterPrice <= 0 || this.editSummerPrice <= 0) {

      this.error = true
      this.message = "All fields must be filled!"
      return
    }

    let numberRegex = /^(06)\d{7,8}$|^0\d{8,9}$/
    if(!numberRegex.test(this.editPhoneNumber)){
      this.error = true
      this.message = "Wrong phone number format"
      return
    }

    this.cabinService.updateCabin(id, this.editName, this.editLocation, this.editServices,
      this.editPhoneNumber, this.editWinterPrice, this.editSummerPrice, this.editCoordinates).subscribe((resp: any) => {
      if (resp.message == 'ok') {
      alert("Cabin updated!")
      } else {
      alert("ERROR!")
      }
      this.ngOnInit()
    })
  }

  deleteCabin(id: number){
    this.cabinService.deleteCabin(id).subscribe((resp: any) => {
      if (resp.message == 'ok') {
        alert("Cabin deleted!")
      } else {
        alert("ERROR!")
      }
      this.ngOnInit()
    })
  }

  createCabin(){

    this.error = false
    this.message = ""
    if (this.name === "" || this.location === "" || this.services === "" ||
      this.phoneNumber === "" || this.winterPrice <= 0 || this.summerPrice <= 0 || this.coordinates === "") {

      this.error = true
      this.message = "All fields must be filled!"
      return
    }

    let numberRegex = /^(06)\d{7,8}$|^0\d{8,9}$/
    if(!numberRegex.test(this.phoneNumber)){

      this.error = true
      this.message = "Wrong phone number format"
      return
    }

    console.log(this.selectedImageFiles)

    this.cabinService.createCabin(this.username, this.name, this.location, this.services, this.phoneNumber, 
      this.winterPrice, this.summerPrice, this.coordinates, this.selectedImagePreviews).subscribe((resp: any) => {
      if (resp.message == 'ok') {
        alert("Cabin created!")
      } else {
        alert("ERROR!")
      }
      this.ngOnInit()
    })
  }

  // variables for profile picture
  selectedImageFiles: File[] = [];
  selectedImagePreviews: string[] = []; 

  onFileSelected(event: any): void {
  this.message = "";
  this.error = false;
  this.selectedImageFiles = [];
  this.selectedImagePreviews = [];

  const files: File[] = Array.from(event.target.files);

  if (files.length === 0) return;

  for (let file of files) {
    const isValidType = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isValidType) {
      this.error = true;
      this.message = "Only PNG and JPG files are allowed.";
      files.pop();
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.selectedImageFiles.push(file);
      this.selectedImagePreviews.push(reader.result as string);
    };
  }
}

removeImage(index: number): void {
  this.selectedImageFiles.splice(index, 1);
  this.selectedImagePreviews.splice(index, 1);
}

onJsonFileSelected(event: any): void {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e: any) => {
    try {
      const cabinData = JSON.parse(e.target.result);

      this.name = cabinData.name || '';
      this.location = cabinData.location || '';
      this.services = cabinData.services || '';
      this.winterPrice = cabinData.winterPrice || 0;
      this.summerPrice = cabinData.summerPrice || 0;
      this.phoneNumber = cabinData.phoneNumber || '';
      this.coordinates = cabinData.coordinates || '';
    } catch (error) {
      this.error = true;
      this.message = "Invalid JSON file.";
    }
  };
  reader.readAsText(file);
}
}

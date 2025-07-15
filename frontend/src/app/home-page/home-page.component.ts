import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    // this.userService.getOwnerNumber().subscribe((num: number)=>{
    //   this.ownerNumber = num
    // })

    // this.userService.getDecoratorNumber().subscribe((num: number)=>{
    //   this.decoratorNumber=num
    // })

    // this.userService.getAllCompanies().subscribe((companies: Company[])=>{
    //   this.listOfCompanies = companies
    // })

    // //deo za ukupan broj uredjenih basti
    // this.userService.getNumOfDoneGardens().subscribe((jobs: Job[])=>{
    //   this.gardenNumber = jobs.length
    // })

    // //Deo za ukupan broj poslova u poslednjih 24 sata
    // this.userService.getNumOfJobsLast24Hours().subscribe((jobs: Job[])=>{
    //   this.numberOfJobsLast24Hours = jobs.length
    // })

    // //Deo za ukupan broj poslova u poslednjih 7 dana
    // this.userService.getNumOfJobsLast7Days().subscribe((jobs: Job[])=>{
    //   this.numberOfJobsLast7Days = jobs.length
    // })
    // //Deo za ukupan broj poslova u poslednjih 30 dana
    // this.userService.getNumOfJobsLast30Days().subscribe((jobs: Job[])=>{
    //   this.numberOfJobsLast30Days = jobs.length
    // })



    // this.nameParam = ""
    // this.addressParam = ""

  }

  //listOfCompanies: Company[] = []

  // ownerNumber: number
  // decoratorNumber: number
  // gardenNumber: number
  // numberOfJobsLast24Hours: number
  // numberOfJobsLast7Days: number
  // numberOfJobsLast30Days: number

  nameParam: string = ""
  addressParam: string = ""

  // search(){
  //   this.userService.searchCompany(this.nameParam, this.addressParam).subscribe((companies: Company[])=>{
  //     this.listOfCompanies = companies
  //   })
  // }

  // cancelSearch(){
  //   this.ngOnInit()
  // }
  
  // sortAscedingName(){
  //   this.listOfCompanies.sort((a, b)=>(a.name).localeCompare(b.name))
  // }

  // sortDescedingName(){
  //   this.listOfCompanies.sort((a, b)=>(b.name).localeCompare(a.name))
  // }

  // sortAscedingAddress(){
  //   this.listOfCompanies.sort((a, b)=>(a.address).localeCompare(b.address))
  // }

  // sortDescedingAddress(){
  //   this.listOfCompanies.sort((a, b)=>(b.address).localeCompare(a.address))
  // }
}

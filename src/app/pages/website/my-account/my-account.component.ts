import { CommonModule } from '@angular/common';
import { Component, OnInit ,AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-my-account',
  imports: [CommonModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent implements OnInit , AfterViewInit {
  ngAfterViewInit(): void {
    
  }
  ngOnInit(): void {
    this.accountjs()
  }
  
  accountjs(){
    const choisesEl = document.querySelectorAll(".choise");
const thisEl = document.querySelectorAll(".this");
const Dashboard = document.querySelector(".dashboard");
const order = document.querySelector(".order");
const update = document.querySelector(".update");
const address = document.querySelector(".address");
const changePassword = document.querySelector(".change-password");
const change = document.querySelector(".Change");
const logout = document.querySelector(".logout");

const yes = document.querySelector(".yes");
const no = document.querySelector(".no");

choisesEl.forEach(ele=>{
    ele.addEventListener("click",(event)=>{
        choisesEl.forEach(removeactive=>{
            removeactive.classList.remove("active")
        })
        if ((event.target as HTMLElement).classList.contains("Dashboard")) {
            thisEl.forEach(removeactive=>{
                removeactive.classList.remove("active")
            })
            if (Dashboard) {
                Dashboard.classList.add("active");
            }
        }
        if ((event.target as HTMLElement).classList.contains("Orders")) {
            thisEl.forEach(removeactive=>{
                removeactive.classList.remove("active")
            })
            if (order) {
                order.classList.add("active");
            }
        }
        if ((event.target as HTMLElement).classList.contains("Update")) {
            thisEl.forEach(removeactive=>{
                removeactive.classList.remove("active")
            })
            if (update) {
                update.classList.add("active");
            }
        }
        if ((event.target as HTMLElement).classList.contains("Address")) {
            thisEl.forEach(removeactive=>{
                removeactive.classList.remove("active")
            })
            if (address) {
                address.classList.add("active");
            }
        }
        if ((event.target as HTMLElement).classList.contains("Change")) {
            thisEl.forEach(removeactive=>{
                removeactive.classList.remove("active")
            })
            if (changePassword) {
                changePassword.classList.add("active");
            }
        }
        if ((event.target as HTMLElement).classList.contains("Logout")) {
            thisEl.forEach(removeactive=>{
                removeactive.classList.remove("active")
            })
            if (logout) {
                logout.classList.add("active");
            }
            if (yes) {
                yes.addEventListener("click", (event) => {
                    event.preventDefault();
                    window.close();
                });
            }
            if (no) {
                no.addEventListener("click",()=>{
                    thisEl.forEach(removeactive=>{
                        removeactive.classList.remove("active")
                    })
                    choisesEl.forEach(removeactive=>{
                        removeactive.classList.remove("active")
                    })
                    if (changePassword) {
                        changePassword.classList.add("active");
                    }
                    if (change) {
                        change.classList.add("active");
                    }
                });
            }
        }
    ele.classList.add("active")
    })
})

  }
}

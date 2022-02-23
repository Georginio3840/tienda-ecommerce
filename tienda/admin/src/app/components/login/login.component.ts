import { Component, OnInit } from '@angular/core';
declare  var jQuerry:any;
declare var $:any;
declare var iziToast:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:any={};
  constructor() { 


  }

  ngOnInit(): void {
  }

  login(loginForm:any){
 if(loginForm.valid){
   console.log(this.user);
  alert('Si es valido')

 }else{
   iziToast.show({
     title:'ERROR',
     titleColor:'#FF0000',
     color:'#FF',
     clase:'text-danger',
     position:'topRight',
     message:'Los datos del formulario no son validos'
   })
 }
    
  }

}

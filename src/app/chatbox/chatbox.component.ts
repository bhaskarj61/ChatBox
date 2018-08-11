import { ChatboxService } from './../chatbox.service';
import { Subscriber } from '../../../node_modules/rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  channelName;
  constructor(private chatBox:ChatboxService) { }
// add service call here
  addService(){
    this.chatBox.setData().subscribe(res=>{
      console.log(res);
    },
  err=>{
    console.log(err)
  })
  }
  //add channel called 
  addChannel(){
      this.chatBox.addChannel(this.channelName).subscribe(res=>{
        console.log(res);
      },
    err=>{
      console.log(err)
    })
  }
  messages="";
  //send message to twilio
  sendMessage(){
    if(this.messages==""){
      return;
    }
    else{
      this.chatBox.sendMessage(this.messages).subscribe(res=>{
        console.log(res);
      },
    err=>{
      console.log(err);
    })
    }
  }
  name=localStorage.getItem('name');
  allMessages=[];
  index;
  totalMessages:number;
  //View all messages
  viewMessage(){
    console.log(this.name+"viewName");
       this.chatBox.viewMessages().subscribe(res=>{
        this.allMessages=res.messages
        for(this.index=0;this.index++;this.index=this.allMessages.length)
        {
          this.allMessages[this.index]+=this.name;
          console.log(this.allMessages[this.index]+"forloop")
        }
      },
    err=>{
      console.log(err);
    })
    
}

//Search Channel
channel:string="";
foundChannel="";
channelArray:any=[];
foundChannelId="";
arrayLen;
searchChannel(){
  this.chatBox.searchChannel().subscribe(res=>{
  
    for(let index=0;index<res.channels.length;index++)
     {
         this.channelArray.push(res.channels[index].unique_name)
         this.arrayLen=this.channelArray.length;
    for(let index=0;index<this.arrayLen;index++){
      if(this.channelArray[index]==this.channel)
      {
        this.foundChannel=this.channel;
        this.foundChannelId=res.channels[index].sid;
        break;
      }
      else{
      this.foundChannel="channel not found";
      }
    }
  }
  },
err=>{
  console.log();
})
}

//joining a new channel
joinChannel(){
  console.log(this.foundChannelId);
  this.chatBox.getChannelId(this.foundChannelId);
  this.viewMessage();
  this.chatBox.joinChannel(this.foundChannelId).subscribe(res=>{
    console.log(res);
  },err=>{
    console.log(err);
  })
}

//display all channel
length;
channelArr=[];
Display() {
  this.chatBox.DisplayAllChannel().subscribe(res => 
          { 
            console.log(res.channels.length)
            this.length = res.channels.length;
            for ( let i = 0; i < this.length; i++){ 
            this.channelArr[i] = res.channels[i].unique_name;} 
            }),
            err => {
              console.log(err);
            }
     } 

//messages load on init
  ngOnInit() {
    this.viewMessage();
  }
}


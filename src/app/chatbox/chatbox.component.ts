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
    this.chatBox.sendMessage(this.messages).subscribe(res=>{
      console.log(res);
    },
  err=>{
    console.log(err);
  })
  }
  email=localStorage.getItem('email');
  allMessages=[];
  totalMessages:number;
  //View all messages
  viewMessage(){
       this.chatBox.viewMessages().subscribe(res=>{
        this.allMessages=res.messages
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
    // console.log("RES value"+(res.channels[1].unique_name));
    // console.log("len"+res.channels.length);
    for(let index=0;index<res.channels.length;index++){
        // console.log("array "+(res.channels[index].sid));     
         this.channelArray.push(res.channels[index].unique_name)
        //  console.log("channel array: "+ this.channelArray);
    // console.log("channel name: "+this.channel);
     this.arrayLen=this.channelArray.length;
    for(let index=0;index<this.arrayLen;index++){
     // console.log("in array: "+this.channelArray[index]+"    index  "+index);
      if(this.channelArray[index]==this.channel)
      {
        // console.log("channel fopund");
        this.foundChannel=this.channel;
        this.foundChannelId=res.channels[index].sid;
        break;
      }
      else{
      // console.log("not found");
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
  this.chatBox.joinChannel(this.foundChannelId).subscribe(res=>{
    console.log(res);
  },err=>{
    console.log(err);
  })
}

//messages load on init
  ngOnInit() {
    this.viewMessage();
  }
}


import { ChatboxService } from './../chatbox.service';
import { Subscriber } from '../../../node_modules/rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  channelName = "";
  channelArray = [];
  userName: string = localStorage.getItem("email");

  constructor(private chatBox: ChatboxService, private router: Router) { }
  // add service call here
  addService() {
    this.chatBox.setData().subscribe(res => {
      console.log(res);
    },
      err => {
        console.log(err)
      })
  }
  //add channel called 
  addChannel() {
    this.chatBox.addChannel(this.channelName).subscribe(res => {
      console.log(res);
      alert(this.channelName + " " + "Successfully Created")

    },
      err => {
        alert("already exist")
        console.log(err)
      })
    this.channelName = "";
  }
  //send message to twilio
  messages = "";
  sendMessage() {
    if (this.messages == "") {
      return;
    }
    else {
      this.chatBox.sendMessage(this.messages).subscribe(res => {
        console.log(res);
        this.messages = "";
      },
        err => {
          console.log(err);
        })
    }
  }


  //View all messages
  allMessages = [];
  date;
  totalMessages: number;
  // Messages refreshing after 1 set
  setint = setInterval(() => {
    this.chatBox.viewMessages().subscribe(res => {
      this.allMessages = res.messages;
      //adding user email address to messages
      this.allMessages.forEach(message => {
        message.body += ('(' + message.from + ')')
        this.date = message.date_updated;
      });
      // console.log(this.allMessages)
    },
      err => {
        console.log(err);
      })
  }, 1000);

  //logout
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    console.log("logout")
    this.router.navigate(["/"]);
  }


  //Search Channel
  //regExSearch
  searchMyChannel = [];
  channel: string = "";
  foundChannel = "general";
  foundChannelId = "";
  arrayLen;
  reg: any;
  allFoundChannel = [];
  searchChannel() {
    if (this.channel.length < 3) {
      return;
    }
    this.channelArr.length = 0;
    this.chatBox.searchChannel().subscribe(res => {
      this.reg = new RegExp(this.channel, "i")
      console.log(this.reg)

      this.channelArr.length = 0;
      for (let index = 0; index < res.channels.length; index++) {
        if (this.reg.test(res.channels[index].unique_name)) {
          let a: string = res.channels[index].unique_name;
          this.channelArr.push(a)
        }
      }

    },
      err => {
        console.log();
      })
  }


  //joining a new channel
  joinChannel() {
    console.log(this.foundChannelId);
    this.chatBox.getChannelId(this.foundChannelId);
    this.chatBox.joinChannel(this.foundChannelId).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }

  //display all channel
  length;
  channelArr = [];
  // Display() {
  //   this.chatBox.DisplayAllChannel().subscribe(res => {
  //     // console.log(res.channels.length)
  //     this.length = res.channels.length;
  //     for (let i = 0; i < this.length; i++) {
  //       this.channelArr[i] = res.channels[i].channel_sid;
  //     }
  //   }),
  //     err => {
  //       console.log(err);
  //     }
  // }

  //join display channels
  joinChannelArray = [];
  foundJoinChannel;
  joinDisplayChannel(joinNewChannel) {
    this.joinChannelArray.length = 0;
    // console.log("search channel " + joinNewChannel)
    this.chatBox.searchChannel().subscribe(res => {
      for (let index = 0; index < res.channels.length; index++) {
        this.joinChannelArray.push(res.channels[index].unique_name)
        // console.log(this.joinChannelArray);

        // this.arrayLen = this.joinChannelArray.length;
        for (let index = 0; index < this.joinChannelArray.length; index++) {
          if (this.joinChannelArray[index] == joinNewChannel) {
            this.foundJoinChannel = joinNewChannel;
            this.user = this.foundJoinChannel;
            this.foundChannelId = res.channels[index].sid;
            this.joinChannel();
            break;
          }
          else {
            this.foundChannel = "channel not found";
          }
        }
      }
    }),
      err => {
        console.log(err)
      }
    // console.log(this.foundChannelId)
  }

  //display user channels
  ChannelId = [];
  ChannelName = [];
  setChannelInt;
  flag = 0;
  user: string = 'general';
  displaySuscribedChannel() {
    this.setChannelInt = setInterval(() => {
      this.chatBox.RetrieveUser().subscribe(res => {
        this.chatBox.IsSubscribed(res.sid).subscribe(res => {
          // console.log(res);
          this.flag = 1;
          this.length = res.channels.length;
          for (let i = 0; i < this.length; i++) {
            this.ChannelId[i] = res.channels[i].channel_sid;
            // console.log(this.ChannelId);
          }
          for (let i = 0; i < this.length; i++) {
            this.chatBox.RetrieveChannelName(this.ChannelId[i]).subscribe(res => {
              this.ChannelName[i] = res.unique_name;
              // console.log(this.ChannelName[i]);
            }),
              err => {
                console.log(err);
              }


          }
        }),
          err => {
            console.log(err);
          }
      }),
        err => {
          console.log(err);
        }
    }, 2000);
  }

  //check


  ngOnInit() {

  }
}


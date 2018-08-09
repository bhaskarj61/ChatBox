import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { setRootDomAdapter } from '../../node_modules/@angular/platform-browser/src/dom/dom_adapter';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MapOperator } from '../../node_modules/rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ChatboxService {
  httpOpt = {
    headers: new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization':'Basic QUM0NDJjY2UwYzNkN2U0OGEwOWU4ZGVhMGYyZDIzM2I1MTo2ZmExZGZkOGJhMTQ4OTI4NjRjNDBlNDNjMjRiNzAwNQ=='
    })
  }
  constructor(private http:HttpClient) { }
//create new service
  setData():Observable<any> {
    return this.http.post<any>('https://chat.twilio.com/v2/Services','FriendlyName=newService',this.httpOpt);
  }
  //create new channel
  addChannel(channelName:string):Observable<any> {
    return this.http.post("https://chat.twilio.com/v2/Services/IS5d2e0aa7ae0e4945b35703395df8825b/Channels","FriendlyName=myChaBox&UniqueName="+channelName,this.httpOpt);
 }
//searching all channel in the service
searchChannel():Observable<any>{ 
  return  this.http.get("https://chat.twilio.com/v2/Services/"+this.serviceId+"/Channels",this.httpOpt).pipe(map(data=>data)); 
}

myChannelId:string="CH666f142509eb44e59d6e06714b955a2c";
 identity:string=localStorage.getItem('email');
 serviceId:string='IS5d2e0aa7ae0e4945b35703395df8825b'


//joining a channel
  joinChannel(channelId):Observable<any>{
    // this.myChannelId=channelId;
    return this.http.post("https://chat.twilio.com/v2/Services/"+this.serviceId+"/Channels/"+channelId+"/Members","ChannelSid="+channelId+"&Identity="+this.identity+"&ServiceSid="+this.serviceId,this.httpOpt); 
  }

sendMessage(messages):Observable<any>{
  return this.http.post("https://chat.twilio.com/v2/Services/"+this.serviceId+"/Channels/"+this.myChannelId+"/Messages","ChannelSid="+this.myChannelId+"&ServiceSid="+this.serviceId+"&Body="+messages+"&From="+this.identity,this.httpOpt); 
}

viewMessages():Observable<any>{
  return this.http.get("https://chat.twilio.com/v2/Services/IS5d2e0aa7ae0e4945b35703395df8825b/Channels/"+this.myChannelId+"/Messages",this.httpOpt).pipe(map(data=>data));
}
}


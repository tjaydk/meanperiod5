MEAN PERIOD 5 QUESTIONS
=========================

####Name attributes of HTTP protocol makes it difficult to use for real time systems.
The http protocol works with request/response sets, as a request is sent to the server it will respond with data via a response. When the transaction is finished the connection is terminated and afterwards the client and the server dont know anything about each other in such. This makes difficult to have a realtime system like a chat server as you would need the server and the client to 'communicate'. So in order to get a real time system to work with the HTTP you can use polling, long-polling or websockets.

####Explain polling and long-polling strategies, their pros and cons.
Not every webbrowser supports the new websockets so in order to make e.g. a chat system work you can use polling and long-polling.

#####Polling: 
Works by sending request to the server frequently to see if data is available for the client.
#####Long Polling: 
Works kinda similar to the polling, but it sends fewer request as the server waits with the response until there is data to send.
#####Pros with polling:
It checks frequently for data on the server
#####Cons with polling:
It checks frequently for data on the server - alot of 'heavy load' request for the server.
The server reponse with an empty response if no data is available
#####Pros with long-polling:
Fewer request to the server
#####Cons with long-polling:
Can terminate just as data is available on the server
Makes the server vunerable for hacks like appending scripts to infinite iframe

#####Pros in general: 
As a lot of browser dont support websockets polling and long-polling is one of the ways to imitate a socket connection.
#####Cons  in general: 
Polling and Long-Polling is very heavy on the server as every request sent to the server contains alot of data like the header.
There can be different interpretations on how long a open request can be held open, so it can be terminated even in the middle of retrieving data from the server. This is mostly a issue with long-polling.


####What is HTTP streaming, SSE (Server sent events)?
Server Sent Events is a uni directional communication where the server can send data to the client, but as new technologies like websockets are available which offers bi directional communication the SSE is not that commonly used. The good thing about SSE is that it works on the HTTP protocol and does not need any 3rd party to handle the connection.
SSE can be used e.g. with updates where no user response is needed etc.

####What is WebSocket protocol, how is it different from HTTP communication, what advantages it has over HTTP?
A websocket protocol works over TCP transmission control protocol which creates a connection between the to end parties for real time full-duplex(two way) communication. The initial request is made over HTTP with an update request trying to update to a WEBSOCKET/TCP connection. As a normal HTTP works with request/response format and then ends the communication it will be heavy and slow as a new connection has to be created with small intervals. The Websocket is an initial connection that is held open.

####Explain what the WebSocket Protocol brings to the Web-world.
This creates a great platform for realtime communications between parties on the web which can make it possible to make online games, chat services etc. It will give us a great new alternative to the Ajax technology that has been used for the last few years

####Explain and demonstrate the process of WebSocket communication - From connecting client to server, through sending messages, to closing connection.
#####Example of standard websocket connection:
```
// Create a socket instance
var socket = new WebSocket('ws://localhost:8080');
// Open the socket
socket.onopen = function(event) {	
	// Send an initial message
	socket.send('I am the client and I\'m listening!');	
	// Listen for messages
	socket.onmessage = function(event) {
		console.log('Client received a message',event);
	};
	// Listen for socket closes
	socket.onclose = function(event) {
		console.log('Client notified socket has closed',event);
	};
	// To close the socket....
	//socket.close()
};
```

####What's the advantage of using libraries like Socket.IO, Sock.JS, WS, over pure WebSocket libraries in the backend and standard APIs on frontend? Which problems do they solve?
As you cant be sure if the browser the user uses supports websockets its better to use a package that takes care of this issue. I have used socket.IO which checks if websocket communication is available, if its not supported by the browser it will then shift to long polling for the communication. This insures that the system works on nearly all browsers.

####What is Backend as a Service, Database as a Service, why would you consider using Firebase in your projects?
Backend as a service: is an prewritten backend that you can use easily and thereby you dont need to write alot of code to do your backend. 
Database as a service: as with the prewritten backend you can have a cloud database that is already setup - so you dont need to create a server yourself to deploy your database to.
Both these options are provided with Firebase which you can easily use by creating a user and then via their cdn module integrate to your frontend.
It is very easy to setup and get a fast application to work, it has OAuth authentication and other nice features which makes it pretty usefull for your production. It communicates over SSL and is therefor 'pretty' secure.


####Explain the pros & cons of using a Backend as a Service Provider like Firebase.
#####PROS: 
- Easy to use and free up until a certain limit
- You can have a quick application up and running only having to deal with the frontend
- Cloud storage
- Not need for deploying application backend to expensive services
#####CONS:
- If Firebase is down your application is down
- If Firebase server is compromised your data will be so too
- The structure of their database can be somewhat of an herdle


####Explain and demonstrate “three-way data binding” using Firebase and Angular
Angular builds on a two way data binding where you can change data from the model and the view and using the {{}} expression you can have synchronised data between the two. Firebase can work in collaboration with Angular using the AngularFirebase module which offers a three way data binding, now you can change and synchronise the data between all three parts.

[See FirebaseThreewayOriginal](https://github.com/tjaydk/meanperiod5/tree/master/Websocket)

####Explain and demonstrate the difference between the simple chat system in your own WebSocket + Node.js backend vs. Firebase.
#####Own chat: [See websocket](https://github.com/tjaydk/meanperiod5/tree/master/FirebaseThreeWayOriginal)
#####Chat via Firebase: [See FirebaseThreewayOriginal](https://github.com/tjaydk/meanperiod5/tree/master/Websocket)
As you can see we have the whole backend via Express setup with our own chat system - and via socket.io we create the socket connection for communication. We can then store the data in a MongoDB for persistence. 
The threewaydatabinding chat is only the angular frontend and all backend and persistence is done via Firebase.

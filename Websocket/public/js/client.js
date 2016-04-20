angular.module("app", [
        'firebase',
        'ngAnimate',
        'btford.socket-io'
    ])

    .controller("chatController", function (socket) {
        var scope = this;
        socket.connect();
        scope.tester = "Messageboard";
        scope.messageList = [];
        scope.userList = [];


        //FIREBASE
        //=========================
        var myDataRef = new Firebase('https://blazing-heat-7967.firebaseio.com/'); //CHANGE URL TO YOUR FIREBASE APP

        scope.sendFirebaseMessage = function () {
            //myDataRef.set('User ' + scope.username + ' says ' + scope.message); // U can change the values to write an object in the Firebase DB
            myDataRef.push({username: scope.username, msg: scope.message}); // THIS CAN BE USED TO PUSH LISTS

            scope.message = "";
        };

        //TO RECIEVE MESSAGES
        myDataRef.on('child_added', function (snapshot) {
            var message = snapshot.val();
            scope.messageList.push(message);

            setTimeout(function () {
                var element = document.getElementById('msgBoard');
                element.scrollTop = element.scrollHeight;
            }, 100);
        });


        socket.on('init', function (msg) {
            //SET COOKIE EXPIRE TIME
            var date = new Date();
            var expireDate = new Date(date.getTime() + 1000 * 60 * 30); // SET TIME
            scope.username = msg.username;

            scope.userList = msg.users;
            document.cookie = "Username=" + msg.username + "; expires=" + expireDate.toUTCString() + ", path=/";
        });

        socket.on('msg', function (msg) {
            scope.messageList.push(msg);

            setTimeout(function () {
                var element = document.getElementById('msgBoard');
                element.scrollTop = element.scrollHeight;
            }, 100);
        });

        socket.on('userlist', function (users) {
            scope.userList = users;
        });

        scope.sendMessage = function () {
            socket.emit('sendMsg', {msg: scope.message});
            scope.message = "";
        };

        scope.changeUsername = function () {
            socket.emit('changeUsername', {username: scope.username})
        };


    })
    .factory("socket", ['socketFactory', function (socketFactory) {
        return socketFactory();
    }]);
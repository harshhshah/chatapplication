var express =require('express');
var app=express();
var server=require('http').Server(app);
var io=require('socket.io')(server);
var path=require('path');
var ip=require('ip');
var port=8080;
var mongo=require('mongodb').MongoClient;

mongo.connect('mongodb://localhost:27017',function(err,abc)
{
    if(err)
    {
        throw err;
    }
    console.log('connected to mongo');
    var db = abc.db('chatdb');


io.on('connection',function(socket){
    console.log('user connected');
    let chat = db.collection('chats');
    socket.on('disconnect',function(){
        console.log('server disconnected');
    });
    
    sendstatus=function(s){
        socket.emit('status',s);
    }
    chat.find().limit(100).sort({_id:1}).toArray(function(req,res){
        if(err){
            throw err;
        }
        socket.emit('output',res);
    });
    socket.on('input',function(data){
        var name=data.name;
        var message=data.message;
        if(name == '' || message == ''){
            sendstatus('please enter a name and messaage');
        }
        else{
            chat.insert({name : name,meassage : message},function(){
                socket.emit('output',[data]);
                sendstatus({meassage : 'message sent', clear : true});
            });
        }
    });
    socket.on('clear',function(data){
        chat.remove({},function(){
            socket.emit('cleared');
        })
    })
})
})
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});
server.listen(port,function(){
    console.log("the server is listening at http://"+ip.address()+":"+port);
});


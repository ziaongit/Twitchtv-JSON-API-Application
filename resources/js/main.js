$(function(){

    var streamsUsers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
    $.getJSON('https://api.twitch.tv/kraken/streams/freecodecamp?client_id=5ue27sf350l1tb5ik0d10vpshjt5ro')
    .done(function(data){
        if(data.stream === null) {
            $('#freeCodeCamp').html(' is OFFLINE!');
        }else {
            $('#freeCodeCamp').html(' is ONLINE!');
        }
    });

    for(var i =0; i < streamsUsers.length; i++) {
        $.ajax({
            type: 'GET',
            url: 'https://api.twitch.tv/kraken/channels/'+ streamsUsers[i],
            headers: { 
                'client-ID': '5ue27sf350l1tb5ik0d10vpshjt5ro' 
            },
            success: function(data){
                $.getJSON('https://api.twitch.tv/kraken/streams/'+ data.name +'?client_id=5ue27sf350l1tb5ik0d10vpshjt5ro')
                .done(function(dataResul){
                    
                    var name = dataResul._links.self.slice(37);

                    if(dataResul.stream === null) {
                        console.log(data)
                        $('#channelInfo').append(`
                        <div class="row justify-content-start">
                            <div class="col-10 offset-md-1 mb-2">
                                <div class="card card-danger">
                                    <div class="card-block">
                                        <div class="row">
                                            <div class="col-md-2 col-sm-2 logo">
                                                <img src="`+ data.logo+`" onerror="this.src='../resources/images/none.png'">
                                            </div>
                                            <div class="col-md-4 col-sm-4 name">
                                                <h3 class="card-title"><a target='_blank' href="https://www.twitch.tv/`+ name+`">`+ name+`</a></h3>
                                            </div>
                                            <div class="col-md-3 col-sm-3 status">
                                                <p class="card-text">Offline</p>
                                            </div>
                                            <div class="col-md-3 col-sm-3 stream">
                                                <p>N/A</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `);

                    }else {
                        $('#channelInfo').append(`
                            <div class="row justify-content-start">
                                <div class="col-10 offset-md-1 mb-2">
                                    <div class="card card-success">
                                        <div class="card-block">
                                            <div class="row">
                                                <div class="col-md-2 col-sm-2 logo">
                                                    <img src="`+ data.logo+`" onerror="this.src='../resources/images/none.png'">
                                                </div>
                                                <div class="col-md-4 col-sm-4 name">
                                                    <h3 class="card-title"><a target='_blank' href="https://www.twitch.tv/`+ name+`">`+ name+`</a></h3>
                                                </div>
                                                <div class="col-md-3 col-sm-3 status">
                                                    <p class="card-text">Online</p>
                                                </div>
                                                <div class="col-md-3 col-sm-3 stream">
                                                    <p>`+ dataResul.stream.game+`</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `);
                        $('#users').append(`
                        <li><a target="_blank" href="https://www.twitch.tv/`+ name+`">`+name +` is online</a></li>
                        `);
                    }
                });
            },
            error: function(err){
                $('#channelInfo').append(`
                        <div class="row justify-content-start">
                            <div class="col-10 offset-md-1 mb-2">
                                <div class="card card-danger">
                                    <div class="card-block">
                                        <div class="row">
                                            <div class="col-md-2 col-sm-2 logo">
                                                <img src="../resources/images/none.png">
                                            </div>
                                            <div class="col-md-4 col-sm-4 name">
                                                <h3 class="card-title">Invalid user</h3>
                                            </div>
                                            <div class="col-md-3 col-sm-3 status">
                                                <p class="card-text">Not Found</p>
                                            </div>
                                            <div class="col-md-3 col-sm-3 stream">
                                                <p>N/A</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `);
            }
        
        });
    };


});
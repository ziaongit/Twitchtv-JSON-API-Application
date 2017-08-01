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
                    console.log(dataResul);
                    
                    var name = dataResul._links.self.slice(37);

                    if(dataResul.stream === null) {
                        $('#channelInfo').append(`
                        <li>
                            <img alt="Channel Logo" src="`+ data.logo+`" onerror="this.src='../resources/images/none.png'">
                            <div class="info">
                                <h2 class="title">`+ name+`</h2>
                                <div class="alert alert-warning col-md-8 col-sm-12">
                                    <strong>Sorry!!</strong> This channel is currently not streaming.
                                </div>
                            </div>
                            <div class="status">
                                <ul>
                                    <li class="status-circle status-ofline" style="width:33%;"><a target='_blank' href="https://www.twitch.tv/`+name+`"><span class="fa fa-circle" aria-hidden="true"></span></a></li>
                                    <li class="followers" style="width:33%;"><a title = "Followers: Offline" href="#followers"><span class="fa fa-heart" aria-hidden="true"></span></a></li>
                                    <li class="viewers" style="width:34%;"><a title = "Viewers: Offline" href="#viewers"><span class="fa fa-eye" aria-hidden="true"></span></a></li>
                                </ul>
                            </div>
                        </li>
                        `);

                    }else {
                        $('#channelInfo').append(`
                            <li>
                                <img alt="Channel Logo" src="`+ data.logo+`" onerror="this.src='../resources/images/none.png'">
                                <div class="info">
                                    <h2 class="title">`+ name+`</h2>
                                    <p class="desc">Game: `+ dataResul.stream.game+`</p>
                                    <p class="desc">Status: `+ dataResul.stream.channel.status+`</p>
                                </div>
                                <div class="status">
                                    <ul>
                                        <li class="status-circle status-online" style="width:33%;"><a target='_blank' href="https://www.twitch.tv/`+name+`"><span class="fa fa-circle" aria-hidden="true"></span></a></li>
                                        <li class="followers" style="width:33%;"><a title = "Followers: `+dataResul.stream.channel.followers+`" href="#followers"><span class="fa fa-heart" aria-hidden="true"></span></a></li>
                                        <li class="viewers" style="width:34%;"><a title = "Viewers: `+dataResul.stream.channel.views+`" href="#viewers"><span class="fa fa-eye" aria-hidden="true"></span></a></li>
                                    </ul>
                                </div>
                            </li>
                        `);
                        $('#users').append(`
                        <li><a target="_blank" href="https://www.twitch.tv/`+ name+`">`+name +` is online</a></li>
                        `);
                    }
                });
            },
            error: function(err){
                $('#channelInfo').append(`
                    <li>
                                <img alt="Channel Logo" src="../resources/images/none.png" onerror="this.src='../resources/images/none.png'">
                                <div class="info">
                                    <h2 class="title">Invalid user</h2>
                                        <div class="alert alert-warning col-md-8 col-sm-12">
                                        <strong>Sorry!!</strong> This channel is currently not streaming.
                                    </div>
                                </div>
                                <div class="status">
                                    <ul>
                                        <li class="status-circle status-ofline" style="width:33%;"><a target='_blank' href="#statusCircle"><span class="fa fa-circle" aria-hidden="true"></span></a></li>
                                        <li class="followers" style="width:33%;"><a title = "Followers: Offline" href="#followers"><span class="fa fa-heart" aria-hidden="true"></span></a></li>
                                        <li class="viewers" style="width:34%;"><a title = "Viewers: Offline" href="#viewers"><span class="fa fa-eye" aria-hidden="true"></span></a></li>
                                    </ul>
                                </div>
                            </li>
                        `);
            }
        
        });
    };


});
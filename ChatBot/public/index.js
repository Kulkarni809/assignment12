$(()=>{
    var socket = io.connect();
    $msg = $('#msgbox')
    $msgFrom = $('#sendMsg').submit((e)=>{
        e.preventDefault();
        if($msg.val()===''){
            return false;
        }
        socket.emit('sendMsg',$msg.val());
        socket.on('newMsg',(res)=>{
            $('#chat-screen').append(`<div class="card">
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted text-right">You</h6>
                    <p class="card-text float-right">${$msg.val()}</p>
                    </div>
                </div>`
            );
                $('#chat-screen').append(`<div class="card">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted text-left">Bot</h6>
                        <p class="card-text float-left">${res.msg}</p>
                    </div>
                </div>`
            );
            $msg.val('');
        })
        socket.on('searchApi',(res)=>{
            $.ajax({
                url: "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b75da00e12d54774a2d362adddcc9bef&q="+$msg.val(),
                type: 'GET',
                success: function (data) {
                    if($msg.val()!==''){
                        $('#chat-screen').append(`<div class="card">
                            <div class="card-body">
                                <h6 class="card-subtitle mb-2 text-muted text-right">You</h6>
                                <p class="card-text float-right">${$msg.val()}</p>
                                </div>
                            </div>`
                        );
                        $('#chat-screen').append(`<div class="card">
                                <div class="card-body">
                                    <h6 class="card-subtitle mb-2 text-muted text-left">Bot</h6>
                                    <p>${data.response.docs[0].snippet}</p>
                                    <p class="card-text float-left">${data.response.docs[0].lead_paragraph}</p>
                                </div>
                            </div>`
                        );
                    }
                    $msg.val('');
                },
                dataType: "json"
            })
        })
    })

    
})
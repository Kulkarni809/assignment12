$.getJSON( "shubham-3-video.json", function( data ) {
    console.log(data);
    var row = '<h4>What\'s Hot!</h4><hr /><div class="row">'
    data.whats_hot_videos ? data.whats_hot_videos.forEach((element,i) => {
        i<=3?row+=`<div class="col-md-3 col-sm-6 p-3"><div class="card"><img class="card-img-top" src="${element.thumbnails.default.url}"><div class="card-body"><h5 class="card-title">${element.channelTitle}</h5><p class="card-text">${element.description}</p><a href="#" class="btn btn-sm btn-primary">Button</a></div></div></div>`:null;
    }):null;
    row += '</div>'
    $('#whats-hot-div').append(row);
    var rowdata = '<h4>Recommended for you!</h4><hr /><div class="row">'
    data.recommended_videos ? data.recommended_videos.forEach((element,i) => {
        i<=3?rowdata+=`<div class="col-md-3 col-sm-6 p-3"><div class="card"><video src="${element.link}" controls></video><div class="card-body"><h5 class="card-title">${element.title}</h5><p class="card-text scroll-div">${element.description}</p><a href="#" class="btn btn-sm btn-primary">Button</a></div></div></div>`:null;
    }):null
    rowdata += '</div>';
    $('#recommnded-div').append(rowdata);
});
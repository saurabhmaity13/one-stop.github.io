function PL_results(){
        var date = new Date(); // M-D-YYYY
		var d = date.getDate();
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		var dateString = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/competitions/PL/matches?dateFrom=2020-09-12&dateTo='+dateString,
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {
        // do something with the response, e.g. isolate the id of a linked resource
        let output = " ";
        for(var i=0;i<(response['matches'].length);i++){
            output += `
                <div class="col-sm-12 col-md-6 col-lg-4" style="padding-top:10px;text-align:center;border: 1px solid #d8ff00;background-color:rgba(0,0,0,.05)">
                    <div class="row">
                        <div class="col-5">
                        <p>${response['matches'][i]['homeTeam']['name']} (H)</p>
                        </div>
                        <div class="col-2">
                        <p>V/S</p>
                        </div>
                        <div class="col-5">
                        <p>${response['matches'][i]['awayTeam']['name']} (A)</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-5">
                        <p>${response['matches'][i]['score']['fullTime']['homeTeam']}</p>
                        </div>
                        <div class="col-2">
                        <p>-<p>
                        </div>
                        <div class="col-5">
                        <p>${response['matches'][i]['score']['fullTime']['awayTeam']}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                        <p>${moment(response['matches'][i]['utcDate'],).tz('Asia/Kolkata').calendar()}</p>
                        </div>
                        <div class="col-12">
                        <p>${response['matches'][i]['status']}</p>
                        </div>
                    </div>
                </div>
                `;
            $("#results_data").html(output);
        
        }
    
        console.log(response);
        });
}
 
function PL_fixture(){
        var date = new Date(); // M-D-YYYY
		var d = date.getDate();
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		var datefrom = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        var date = new Date(); // M-D-YYYY
		var d = date.getDate()+7;
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		var dateto = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/competitions/PL/matches?dateFrom='+datefrom+'&dateTo='+dateto,
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {
        // do something with the response, e.g. isolate the id of a linked resource
        let output = " ";
        if(response['count']!=0){
            for(var i=0;i<(response['matches'].length);i++){
            
            output += `
                <div class="col-sm-12 col-md-6 col-lg-4" style="padding-top:10px;text-align:center;border: 1px solid #d8ff00;background-color:rgba(0,0,0,.05)">
                    <div class="row">
                        <div class="col-5">
                        <p>${response['matches'][i]['homeTeam']['name']} (H)</p>
                        </div>
                        <div class="col-2">
                        <p>V/S</p>
                        </div>
                        <div class="col-5">
                        <p>${response['matches'][i]['awayTeam']['name']} (A)</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                        <p>${moment(response['matches'][i]['utcDate'],).tz('Asia/Kolkata').calendar()}</p>
                        </div>
                        <div class="col-12">
                        <p>${response['matches'][i]['status']}</p>
                        </div>
                    </div>
                </div>
                `;
            $("#fix_data").html(output);
        
        }
        }
        else{
            output+=`<div class="col" style="padding-top:10px;text-align:center;border: 1px solid #d8ff00;background-color:rgba(0,0,0,.05)">
                    <div class="row">
                        <div class="col-12">
                        <h6>No fixtures today. Check again tomorrow</h6>
                        </div>
                    </div>
                    </div>`;
                $("#fix_data").html(output);
        }
    
        console.log(response);
        });
}
        
function PL_stand(){
    $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/competitions/PL/standings',
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {
        // do something with the response, e.g. isolate the id of a linked resource
        for(var i=0;i<20;i++){
            var x= tbval.insertRow();
        
            x.insertCell(0);
            tbval.rows[i+1].cells[0].innerHTML=response['standings'][0]['table'][i]['position'];
            tbval.rows[i+1].cells[0].style.align="center";
            
            x.insertCell(1);
            
            tbval.rows[i+1].cells[1].innerHTML=`<div class="logo" style="border-radius: 50px;background-color: white;width: 50px;"><img src="${response['standings'][0]['table'][i]['team']['crestUrl']}"style="width:50px;object-fit: cover;padding:10px"></div>`;
        
            x.insertCell(2);
            tbval.rows[i+1].cells[2].innerHTML=response['standings'][0]['table'][i]['team']['name'];
            
            x.insertCell(3);
            tbval.rows[i+1].cells[3].innerHTML=response['standings'][0]['table'][i]['playedGames'];
            
            x.insertCell(4);
            tbval.rows[i+1].cells[4].innerHTML=response['standings'][0]['table'][i]['won'];
            
            x.insertCell(5);
            tbval.rows[i+1].cells[5].innerHTML=response['standings'][0]['table'][i]['draw'];
            
            x.insertCell(6);
            tbval.rows[i+1].cells[6].innerHTML=response['standings'][0]['table'][i]['lost'];
            
            x.insertCell(7);
            tbval.rows[i+1].cells[7].innerHTML=response['standings'][0]['table'][i]['goalsFor'];
            
            x.insertCell(8);
            tbval.rows[i+1].cells[8].innerHTML=response['standings'][0]['table'][i]['goalsAgainst'];
            
            x.insertCell(9);
            tbval.rows[i+1].cells[9].innerHTML=response['standings'][0]['table'][i]['goalDifference'];
            
            x.insertCell(10);
            tbval.rows[i+1].cells[10].innerHTML=response['standings'][0]['table'][i]['points'];
        
        }
    
        console.log(response);
        });
}

function BL1_results(){
        var date = new Date(); // M-D-YYYY
		var d = date.getDate();
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		var dateString = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/competitions/BL1/matches?dateFrom=2020-09-18&dateTo='+dateString,
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {onload
        // do something with the response, e.g. isolate the id of a linked resource
        let output = " ";
        for(var i=0;i<(response['matches'].length);i++){
            output += `
                <div class="col-sm-12 col-md-6 col-lg-4" style="padding-top:10px;text-align:center;border: 1px solid #d8ff00;background-color:rgba(0,0,0,.05)">
                    <div class="row">
                        <div class="col-5">
                        <p>${response['matches'][i]['homeTeam']['name']} (H)</p>
                        </div>
                        <div class="col-2">
                        <p>V/S</p>
                        </div>
                        <div class="col-5">
                        <p>${response['matches'][i]['awayTeam']['name']} (A)</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-5">
                        <p>${response['matches'][i]['score']['fullTime']['homeTeam']}</p>
                        </div>
                        <div class="col-2">
                        <p>-<p>
                        </div>
                        <div class="col-5">
                        <p>${response['matches'][i]['score']['fullTime']['awayTeam']}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                        <p>${moment(response['matches'][i]['utcDate'],).tz('Asia/Kolkata').calendar()}</p>
                        </div>
                        <div class="col-12">
                        <p>${response['matches'][i]['status']}</p>
                        </div>
                    </div>
                </div>
                `;
            $("#results_data").html(output);
        
        }
    
        console.log(response);
        });
}

function BL1_fixture(){
        var date = new Date(); // M-D-YYYY
		var d = date.getDate();
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		var datefrom = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        var date = new Date(); // M-D-YYYY
		var d = date.getDate()+7;
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		var dateto = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/competitions/BL1/matches?dateFrom='+datefrom+'&dateTo='+dateto,
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {
        // do something with the response, e.g. isolate the id of a linked resource
        let output = " ";
        if(response['count']!=0){
            for(var i=0;i<(response['matches'].length);i++){
            
            output += `
                <div class="col-sm-12 col-md-6 col-lg-4" style="padding-top:10px;text-align:center;border: 1px solid #d8ff00;background-color:rgba(0,0,0,.05)">
                    <div class="row">
                        <div class="col-5">
                        <p>${response['matches'][i]['homeTeam']['name']} (H)</p>
                        </div>
                        <div class="col-2">
                        <p>V/S</p>
                        </div>
                        <div class="col-5">
                        <p>${response['matches'][i]['awayTeam']['name']} (A)</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                        <p>${moment(response['matches'][i]['utcDate'],).tz('Asia/Kolkata').calendar()}</p>
                        </div>
                        <div class="col-12">
                        <p>${response['matches'][i]['status']}</p>
                        </div>
                    </div>
                </div>
                `;
            $("#fix_data").html(output);
        
        }
        }
        else{
            output+=`<div class="col" style="padding-top:10px;text-align:center;border: 1px solid #d8ff00;background-color:rgba(0,0,0,.05)">
                    <div class="row">
                        <div class="col-12">
                        <h6>No fixtures today. Check again tomorrow</h6>
                        </div>
                    </div>
                    </div>`;
                $("#fix_data").html(output);
        }
    
        console.log(response);
        });
}

function BL1_stand(){
    $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/competitions/BL1/standings',
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {
        // do something with the response, e.g. isolate the id of a linked resource
        for(var i=0;i<18;i++){
            var x= tbval.insertRow();
        
            x.insertCell(0);
            tbval.rows[i+1].cells[0].innerHTML=response['standings'][0]['table'][i]['position'];
            tbval.rows[i+1].cells[0].style.align="center";
            
            x.insertCell(1);
            
            tbval.rows[i+1].cells[1].innerHTML=`<div class="logo" style="border-radius: 50px;background-color: white;width: 50px;"><img src="${response['standings'][0]['table'][i]['team']['crestUrl']}"style="width:50px;object-fit: cover;padding:10px"></div>`;
        
            x.insertCell(2);
            tbval.rows[i+1].cells[2].innerHTML=response['standings'][0]['table'][i]['team']['name'];
            
            x.insertCell(3);
            tbval.rows[i+1].cells[3].innerHTML=response['standings'][0]['table'][i]['playedGames'];
            
            x.insertCell(4);
            tbval.rows[i+1].cells[4].innerHTML=response['standings'][0]['table'][i]['won'];
            
            x.insertCell(5);
            tbval.rows[i+1].cells[5].innerHTML=response['standings'][0]['table'][i]['draw'];
            
            x.insertCell(6);
            tbval.rows[i+1].cells[6].innerHTML=response['standings'][0]['table'][i]['lost'];
            
            x.insertCell(7);
            tbval.rows[i+1].cells[7].innerHTML=response['standings'][0]['table'][i]['goalsFor'];
            
            x.insertCell(8);
            tbval.rows[i+1].cells[8].innerHTML=response['standings'][0]['table'][i]['goalsAgainst'];
            
            x.insertCell(9);
            tbval.rows[i+1].cells[9].innerHTML=response['standings'][0]['table'][i]['goalDifference'];
            
            x.insertCell(10);
            tbval.rows[i+1].cells[10].innerHTML=response['standings'][0]['table'][i]['points'];
        
        }
    
        console.log(response);
        });
}

function SA_results(){
        var date = new Date(); // M-D-YYYY
		var d = date.getDate();
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		var dateString = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/competitions/SA/matches?dateFrom=2020-09-20&dateTo='+dateString,
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {onload
        // do something with the response, e.g. isolate the id of a linked resource
        let output = " ";
        for(var i=0;i<(response['matches'].length);i++){
            output += `
                <div class="col-sm-12 col-md-6 col-lg-4" style="padding-top:10px;text-align:center;border: 1px solid #d8ff00;background-color:rgba(0,0,0,.05)">
                    <div class="row">
                        <div class="col-5">
                        <p>${response['matches'][i]['homeTeam']['name']} (H)</p>
                        </div>
                        <div class="col-2">
                        <p>V/S</p>
                        </div>
                        <div class="col-5">
                        <p>${response['matches'][i]['awayTeam']['name']} (A)</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-5">
                        <p>${response['matches'][i]['score']['fullTime']['homeTeam']}</p>
                        </div>
                        <div class="col-2">
                        <p>-<p>
                        </div>
                        <div class="col-5">
                        <p>${response['matches'][i]['score']['fullTime']['awayTeam']}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                        <p>${moment(response['matches'][i]['utcDate'],).tz('Asia/Kolkata').calendar()}</p>
                        </div>
                        <div class="col-12">
                        <p>${response['matches'][i]['status']}</p>
                        </div>
                    </div>
                </div>
                `;
            $("#results_data").html(output);
        
        }
    
        console.log(response);
        });
}

function SA_fixture(){
        var date = new Date(); // M-D-YYYY
		var d = date.getDate();
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		var datefrom = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        var date = new Date(); // M-D-YYYY
		var d = date.getDate()+7;
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		var dateto = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/competitions/SA/matches?dateFrom='+datefrom+'&dateTo='+dateto,
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {
        // do something with the response, e.g. isolate the id of a linked resource
        let output = " ";
        if(response['count']!=0){
            for(var i=0;i<(response['matches'].length);i++){
            
            output += `
                <div class="col-sm-12 col-md-6 col-lg-4" style="padding-top:10px;text-align:center;border: 1px solid #d8ff00;background-color:rgba(0,0,0,.05)">
                    <div class="row">
                        <div class="col-5">
                        <p>${response['matches'][i]['homeTeam']['name']} (H)</p>
                        </div>
                        <div class="col-2">
                        <p>V/S</p>
                        </div>
                        <div class="col-5">
                        <p>${response['matches'][i]['awayTeam']['name']} (A)</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                        <p>${moment(response['matches'][i]['utcDate'],).tz('Asia/Kolkata').calendar()}</p>
                        </div>
                        <div class="col-12">
                        <p>${response['matches'][i]['status']}</p>
                        </div>
                    </div>
                </div>
                `;
            $("#fix_data").html(output);
        
        }
        }
        else{
            output+=`<div class="col" style="padding-top:10px;text-align:center;border: 1px solid #d8ff00;background-color:rgba(0,0,0,.05)">
                    <div class="row">
                        <div class="col-12">
                        <h6>No fixtures today. Check again tomorrow</h6>
                        </div>
                    </div>
                    </div>`;
                $("#fix_data").html(output);
        }
    
        console.log(response);
        });
}

function SA_stand(){
    $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/competitions/SA/standings',
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {
        // do something with the response, e.g. isolate the id of a linked resource
        for(var i=0;i<20;i++){
            var x= tbval.insertRow();
        
            x.insertCell(0);
            tbval.rows[i+1].cells[0].innerHTML=response['standings'][0]['table'][i]['position'];
            tbval.rows[i+1].cells[0].style.align="center";
            
            x.insertCell(1);
            
            tbval.rows[i+1].cells[1].innerHTML=`<div class="logo" style="border-radius: 50px;background-color: white;width: 50px;"><img src="${response['standings'][0]['table'][i]['team']['crestUrl']}"style="width:50px;object-fit: cover;padding:10px"></div>`;
        
            x.insertCell(2);
            tbval.rows[i+1].cells[2].innerHTML=response['standings'][0]['table'][i]['team']['name'];
            
            x.insertCell(3);
            tbval.rows[i+1].cells[3].innerHTML=response['standings'][0]['table'][i]['playedGames'];
            
            x.insertCell(4);
            tbval.rows[i+1].cells[4].innerHTML=response['standings'][0]['table'][i]['won'];
            
            x.insertCell(5);
            tbval.rows[i+1].cells[5].innerHTML=response['standings'][0]['table'][i]['draw'];
            
            x.insertCell(6);
            tbval.rows[i+1].cells[6].innerHTML=response['standings'][0]['table'][i]['lost'];
            
            x.insertCell(7);
            tbval.rows[i+1].cells[7].innerHTML=response['standings'][0]['table'][i]['goalsFor'];
            
            x.insertCell(8);
            tbval.rows[i+1].cells[8].innerHTML=response['standings'][0]['table'][i]['goalsAgainst'];
            
            x.insertCell(9);
            tbval.rows[i+1].cells[9].innerHTML=response['standings'][0]['table'][i]['goalDifference'];
            
            x.insertCell(10);
            tbval.rows[i+1].cells[10].innerHTML=response['standings'][0]['table'][i]['points'];
        
        }
    
        console.log(response);
        });
}

function FL1_results(){
        var date = new Date(); // M-D-YYYY
		var d = date.getDate();
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		var dateString = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/competitions/FL1/matches?dateFrom=2020-08-22&dateTo='+dateString,
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {onload
        // do something with the response, e.g. isolate the id of a linked resource
        let output = " ";
        for(var i=0;i<(response['matches'].length);i++){
            output += `
                <div class="col-sm-12 col-md-6 col-lg-4" style="padding-top:10px;text-align:center;border: 1px solid #d8ff00;background-color:rgba(0,0,0,.05)">
                    <div class="row">
                        <div class="col-5">
                        <p>${response['matches'][i]['homeTeam']['name']} (H)</p>
                        </div>
                        <div class="col-2">
                        <p>V/S</p>
                        </div>
                        <div class="col-5">
                        <p>${response['matches'][i]['awayTeam']['name']} (A)</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-5">
                        <p>${response['matches'][i]['score']['fullTime']['homeTeam']}</p>
                        </div>
                        <div class="col-2">
                        <p>-<p>
                        </div>
                        <div class="col-5">
                        <p>${response['matches'][i]['score']['fullTime']['awayTeam']}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                        <p>${moment(response['matches'][i]['utcDate'],).tz('Asia/Kolkata').calendar()}</p>
                        </div>
                        <div class="col-12">
                        <p>${response['matches'][i]['status']}</p>
                        </div>
                    </div>
                </div>
                `;
            $("#results_data").html(output);
        
        }
    
        console.log(response);
        });
}

function FL1_fixture(){
        var date = new Date(); // M-D-YYYY
		var d = date.getDate();
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		var datefrom = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        var date = new Date(); // M-D-YYYY
		var d = date.getDate()+6;
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		var dateto = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/competitions/FL1/matches?dateFrom='+datefrom+'&dateTo='+dateto,
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {
        // do something with the response, e.g. isolate the id of a linked resource
        let output = " ";
        if(response['count']!=0){
            for(var i=0;i<(response['matches'].length);i++){
            
            output += `
                <div class="col-sm-12 col-md-6 col-lg-4" style="padding-top:10px;text-align:center;border: 1px solid #d8ff00;background-color:rgba(0,0,0,.05)">
                    <div class="row">
                        <div class="col-5">
                        <p>${response['matches'][i]['homeTeam']['name']} (H)</p>
                        </div>
                        <div class="col-2">
                        <p>V/S</p>
                        </div>
                        <div class="col-5">
                        <p>${response['matches'][i]['awayTeam']['name']} (A)</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                        <p>${moment(response['matches'][i]['utcDate'],).tz('Asia/Kolkata').calendar()}</p>
                        </div>
                        <div class="col-12">
                        <p>${response['matches'][i]['status']}</p>
                        </div>
                    </div>
                </div>
                `;
            $("#fix_data").html(output);
        
        }
        }
        else{
            output+=`<div class="col" style="padding-top:10px;text-align:center;border: 1px solid #d8ff00;background-color:rgba(0,0,0,.05)">
                    <div class="row">
                        <div class="col-12">
                        <h6>No fixtures today. Check again tomorrow</h6>
                        </div>
                    </div>
                    </div>`;
                $("#fix_data").html(output);
        }
    
        console.log(response);
        });
}

function FL1_stand(){
    $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/competitions/FL1/standings',
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {
        // do something with the response, e.g. isolate the id of a linked resource
        for(var i=0;i<20;i++){
            var x= tbval.insertRow();
        
            x.insertCell(0);
            tbval.rows[i+1].cells[0].innerHTML=response['standings'][0]['table'][i]['position'];
            tbval.rows[i+1].cells[0].style.align="center";
            
            x.insertCell(1);
            
            tbval.rows[i+1].cells[1].innerHTML=`<div class="logo" style="border-radius: 50px;background-color: white;width: 50px;"><img src="${response['standings'][0]['table'][i]['team']['crestUrl']}"style="width:50px;object-fit: cover;padding:10px"></div>`;
        
            x.insertCell(2);
            tbval.rows[i+1].cells[2].innerHTML=response['standings'][0]['table'][i]['team']['name'];
            
            x.insertCell(3);
            tbval.rows[i+1].cells[3].innerHTML=response['standings'][0]['table'][i]['playedGames'];
            
            x.insertCell(4);
            tbval.rows[i+1].cells[4].innerHTML=response['standings'][0]['table'][i]['won'];
            
            x.insertCell(5);
            tbval.rows[i+1].cells[5].innerHTML=response['standings'][0]['table'][i]['draw'];
            
            x.insertCell(6);
            tbval.rows[i+1].cells[6].innerHTML=response['standings'][0]['table'][i]['lost'];
            
            x.insertCell(7);
            tbval.rows[i+1].cells[7].innerHTML=response['standings'][0]['table'][i]['goalsFor'];
            
            x.insertCell(8);
            tbval.rows[i+1].cells[8].innerHTML=response['standings'][0]['table'][i]['goalsAgainst'];
            
            x.insertCell(9);
            tbval.rows[i+1].cells[9].innerHTML=response['standings'][0]['table'][i]['goalDifference'];
            
            x.insertCell(10);
            tbval.rows[i+1].cells[10].innerHTML=response['standings'][0]['table'][i]['points'];
        
        }
    
        console.log(response);
        });
}

function PD_results(){
        var date = new Date(); // M-D-YYYY
		var d = date.getDate();
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		var dateString = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/competitions/PD/matches?dateFrom=2020-09-13&dateTo='+dateString,
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {onload
        // do something with the response, e.g. isolate the id of a linked resource
        let output = " ";
        for(var i=0;i<(response['matches'].length);i++){
            output += `
                <div class="col-sm-12 col-md-6 col-lg-4" style="padding-top:10px;text-align:center;border: 1px solid #d8ff00;background-color:rgba(0,0,0,.05)">
                    <div class="row">
                        <div class="col-5">
                        <p>${response['matches'][i]['homeTeam']['name']} (H)</p>
                        </div>
                        <div class="col-2">
                        <p>V/S</p>
                        </div>
                        <div class="col-5">
                        <p>${response['matches'][i]['awayTeam']['name']} (A)</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-5">
                        <p>${response['matches'][i]['score']['fullTime']['homeTeam']}</p>
                        </div>
                        <div class="col-2">
                        <p>-<p>
                        </div>
                        <div class="col-5">
                        <p>${response['matches'][i]['score']['fullTime']['awayTeam']}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                        <p>${moment(response['matches'][i]['utcDate'],).tz('Asia/Kolkata').calendar()}</p>
                        </div>
                        <div class="col-12">
                        <p>${response['matches'][i]['status']}</p>
                        </div>
                    </div>
                </div>
                `;
            $("#results_data").html(output);
        
        }
    
        console.log(response);
        });
}

function PD_fixture(){
        var date = new Date(); // M-D-YYYY
		var d = date.getDate();
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		var datefrom = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        var date = new Date(); // M-D-YYYY
		var d = date.getDate()+7;
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		var dateto = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/competitions/PD/matches?dateFrom='+datefrom+'&dateTo='+dateto,
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {
        // do something with the response, e.g. isolate the id of a linked resource
        let output = " ";
        if(response['count']!=0){
            for(var i=0;i<(response['matches'].length);i++){
            
            output += `
                <div class="col-sm-12 col-md-6 col-lg-4" style="padding-top:10px;text-align:center;border: 1px solid #d8ff00;background-color:rgba(0,0,0,.05)">
                    <div class="row">
                        <div class="col-5">
                        <p>${response['matches'][i]['homeTeam']['name']} (H)</p>
                        </div>
                        <div class="col-2">
                        <p>V/S</p>
                        </div>
                        <div class="col-5">
                        <p>${response['matches'][i]['awayTeam']['name']} (A)</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                        <p>${moment(response['matches'][i]['utcDate'],).tz('Asia/Kolkata').calendar()}</p>
                        </div>
                        <div class="col-12">
                        <p>${response['matches'][i]['status']}</p>
                        </div>
                    </div>
                </div>
                `;
            $("#fix_data").html(output);
        
        }
        }
        else{
            output+=`<div class="col" style="padding-top:10px;text-align:center;border: 1px solid #d8ff00;background-color:rgba(0,0,0,.05)">
                    <div class="row">
                        <div class="col-12">
                        <h6>No fixtures today. Check again tomorrow</h6>
                        </div>
                    </div>
                    </div>`;
                $("#fix_data").html(output);
        }
        console.log(response);
        });
}

function PD_stand(){
    $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/competitions/PD/standings',
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {
        // do something with the response, e.g. isolate the id of a linked resource
        for(var i=0;i<20;i++){
            var x= tbval.insertRow();
        
            x.insertCell(0);
            tbval.rows[i+1].cells[0].innerHTML=response['standings'][0]['table'][i]['position'];
            tbval.rows[i+1].cells[0].style.align="center";
            
            x.insertCell(1);
            
            tbval.rows[i+1].cells[1].innerHTML=`<div class="logo" style="border-radius: 50px;background-color: white;width: 50px;"><img src="${response['standings'][0]['table'][i]['team']['crestUrl']}"style="width:50px;object-fit: cover;padding:10px"></div>`;
        
            x.insertCell(2);
            tbval.rows[i+1].cells[2].innerHTML=response['standings'][0]['table'][i]['team']['name'];
            
            x.insertCell(3);
            tbval.rows[i+1].cells[3].innerHTML=response['standings'][0]['table'][i]['playedGames'];
            
            x.insertCell(4);
            tbval.rows[i+1].cells[4].innerHTML=response['standings'][0]['table'][i]['won'];
            
            x.insertCell(5);
            tbval.rows[i+1].cells[5].innerHTML=response['standings'][0]['table'][i]['draw'];
            
            x.insertCell(6);
            tbval.rows[i+1].cells[6].innerHTML=response['standings'][0]['table'][i]['lost'];
            
            x.insertCell(7);
            tbval.rows[i+1].cells[7].innerHTML=response['standings'][0]['table'][i]['goalsFor'];
            
            x.insertCell(8);
            tbval.rows[i+1].cells[8].innerHTML=response['standings'][0]['table'][i]['goalsAgainst'];
            
            x.insertCell(9);
            tbval.rows[i+1].cells[9].innerHTML=response['standings'][0]['table'][i]['goalDifference'];
            
            x.insertCell(10);
            tbval.rows[i+1].cells[10].innerHTML=response['standings'][0]['table'][i]['points'];
        
        }
    
        console.log(response);
        });
}

function DED_results(){
        var date = new Date(); // M-D-YYYY
		var d = date.getDate();
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		var dateString = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/competitions/DED/matches?dateFrom=2020-09-12&dateTo='+dateString,
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {onload
        // do something with the response, e.g. isolate the id of a linked resource
        let output = " ";
        for(var i=0;i<(response['matches'].length);i++){
            output += `
                <div class="col-sm-12 col-md-6 col-lg-4" style="padding-top:10px;text-align:center;border: 1px solid #d8ff00;background-color:rgba(0,0,0,.05)">
                    <div class="row">
                        <div class="col-5">
                        <p>${response['matches'][i]['homeTeam']['name']} (H)</p>
                        </div>
                        <div class="col-2">
                        <p>V/S</p>
                        </div>
                        <div class="col-5">
                        <p>${response['matches'][i]['awayTeam']['name']} (A)</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-5">
                        <p>${response['matches'][i]['score']['fullTime']['homeTeam']}</p>
                        </div>
                        <div class="col-2">
                        <p>-<p>
                        </div>
                        <div class="col-5">
                        <p>${response['matches'][i]['score']['fullTime']['awayTeam']}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                        <p>${moment(response['matches'][i]['utcDate'],).tz('Asia/Kolkata').calendar()}</p>
                        </div>
                        <div class="col-12">
                        <p>${response['matches'][i]['status']}</p>
                        </div>
                    </div>
                </div>
                `;
            $("#results_data").html(output);
        
        }
    
        console.log(response);
        });
}

function DED_fixture(){
        var date = new Date(); // M-D-YYYY
		var d = date.getDate();
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		var datefrom = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        var date = new Date(); // M-D-YYYY
		var d = date.getDate()+7;
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		var dateto = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/competitions/DED/matches?dateFrom='+datefrom+'&dateTo='+dateto,
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {
        // do something with the response, e.g. isolate the id of a linked resource
        let output = " ";
        if(response['count']!=0){
            for(var i=0;i<(response['matches'].length);i++){
            
            output += `
                <div class="col-sm-12 col-md-6 col-lg-4" style="padding-top:10px;text-align:center;border: 1px solid #d8ff00;background-color:rgba(0,0,0,.05)">
                    <div class="row">
                        <div class="col-5">
                        <p>${response['matches'][i]['homeTeam']['name']} (H)</p>
                        </div>
                        <div class="col-2">
                        <p>V/S</p>
                        </div>
                        <div class="col-5">
                        <p>${response['matches'][i]['awayTeam']['name']} (A)</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                        <p>${moment(response['matches'][i]['utcDate'],).tz('Asia/Kolkata').calendar()}</p>
                        </div>
                        <div class="col-12">
                        <p>${response['matches'][i]['status']}</p>
                        </div>
                    </div>
                </div>
                `;
            $("#fix_data").html(output);
        
        }
        }
        else{
            output+=`<div class="col" style="padding-top:10px;text-align:center;border: 1px solid #d8ff00;background-color:rgba(0,0,0,.05)">
                    <div class="row">
                        <div class="col-12">
                        <h6>No fixtures today. Check again tomorrow</h6>
                        </div>
                    </div>
                    </div>`;
                $("#fix_data").html(output);
        }
    
        console.log(response);
        });
}

function DED_stand(){
    $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/competitions/DED/standings',
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {
        // do something with the response, e.g. isolate the id of a linked resource
        for(var i=0;i<18;i++){
            var x= tbval.insertRow();
        
            x.insertCell(0);
            tbval.rows[i+1].cells[0].innerHTML=response['standings'][0]['table'][i]['position'];
            tbval.rows[i+1].cells[0].style.align="center";
            
            x.insertCell(1);
            
            tbval.rows[i+1].cells[1].innerHTML=`<div class="logo" style="border-radius: 50px;background-color: white;width: 50px;"><img src="${response['standings'][0]['table'][i]['team']['crestUrl']}"style="width:50px;object-fit: cover;padding:10px"></div>`;
        
            x.insertCell(2);
            tbval.rows[i+1].cells[2].innerHTML=response['standings'][0]['table'][i]['team']['name'];
            
            x.insertCell(3);
            tbval.rows[i+1].cells[3].innerHTML=response['standings'][0]['table'][i]['playedGames'];
            
            x.insertCell(4);
            tbval.rows[i+1].cells[4].innerHTML=response['standings'][0]['table'][i]['won'];
            
            x.insertCell(5);
            tbval.rows[i+1].cells[5].innerHTML=response['standings'][0]['table'][i]['draw'];
            
            x.insertCell(6);
            tbval.rows[i+1].cells[6].innerHTML=response['standings'][0]['table'][i]['lost'];
            
            x.insertCell(7);
            tbval.rows[i+1].cells[7].innerHTML=response['standings'][0]['table'][i]['goalsFor'];
            
            x.insertCell(8);
            tbval.rows[i+1].cells[8].innerHTML=response['standings'][0]['table'][i]['goalsAgainst'];
            
            x.insertCell(9);
            tbval.rows[i+1].cells[9].innerHTML=response['standings'][0]['table'][i]['goalDifference'];
            
            x.insertCell(10);
            tbval.rows[i+1].cells[10].innerHTML=response['standings'][0]['table'][i]['points'];
        
        }
    
        console.log(response);
        });
}

function livescores(){
        var date = new Date(); // M-D-YYYY
		var d = date.getDate();
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		var dateString = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/matches?status=LIVE',
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {
        // do something with the response, e.g. isolate the id of a linked resource
        let output = " ";
        if(response['count']!=0){
            for(var i=0;i<(response['matches'].length);i++){
            output += `
                <div class="col-sm-12 col-md-6 col-lg-4" style="padding-top:10px;text-align:center;border: 1px solid #d8ff00;background-color:rgba(0,0,0,.05)">
                    <div class="row">
                        <div class="col-12">
                        <p>${response['matches'][i]['competition']['name']}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-5">
                        <p>${response['matches'][i]['homeTeam']['name']} (H)</p>
                        </div>
                        <div class="col-2">
                        <p>V/S</p>
                        </div>
                        <div class="col-5">
                        <p>${response['matches'][i]['awayTeam']['name']} (A)</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-5">
                        <p>${response['matches'][i]['score']['fullTime']['homeTeam']}</p>
                        </div>
                        <div class="col-2">
                        <p>-</p>
                        </div>
                        <div class="col-5">
                        <p>${response['matches'][i]['score']['fullTime']['awayTeam']}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                        <p>${moment(response['matches'][i]['utcDate'],).tz('Asia/Kolkata').calendar()}</p>
                        </div>
                        <div class="col-12">
                        <p>${response['matches'][i]['status']}</p>
                        </div>
                    </div>
                </div>
                `;
            $("#fix_data").html(output);
        }
        
        
        }else{
            output+=`<div class="col" style="padding-top:10px;text-align:center;border: 1px solid #d8ff00;background-color:rgba(0,0,0,.05)">
                    <div class="row">
                        <div class="col-12">
                        <h6>No Live matches going on right now. Check out the fixtures of respective leagues.</h6>
                        </div>
                    </div>
                    </div>`;
                $("#fix_data").html(output);
            }
    
        console.log(response);
        });
}

function PL_goalscorer(){
    $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/competitions/PL/scorers?limit=5',
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {
        // do something with the response, e.g. isolate the id of a linked resource
        for(var i=0;i<5;i++){
            var x= tbvalue.insertRow();
        
            x.insertCell(0);
            tbvalue.rows[i+1].cells[0].innerHTML=i+1;
            tbvalue.rows[i+1].cells[0].style.align="center";
            
            x.insertCell(1);
            
            tbvalue.rows[i+1].cells[1].innerHTML=response['scorers'][i]['player']['name'];
        
            x.insertCell(2);
            tbvalue.rows[i+1].cells[2].innerHTML=response['scorers'][i]['numberOfGoals'];
            
            x.insertCell(3);
            
            tbvalue.rows[i+1].cells[3].innerHTML=response['scorers'][i]['team']['name'];
        
        }
        console.log(response);
        });
}

function BL1_goalscorer(){
    $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/competitions/BL1/scorers?limit=5',
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {
        // do something with the response, e.g. isolate the id of a linked resource
        for(var i=0;i<5;i++){
             var x= tbvalue.insertRow();
        
            x.insertCell(0);
            tbvalue.rows[i+1].cells[0].innerHTML=i+1;
            tbvalue.rows[i+1].cells[0].style.align="center";
            
            x.insertCell(1);
            
            tbvalue.rows[i+1].cells[1].innerHTML=response['scorers'][i]['player']['name'];
        
            x.insertCell(2);
            tbvalue.rows[i+1].cells[2].innerHTML=response['scorers'][i]['numberOfGoals'];
            
            x.insertCell(3);
            
            tbvalue.rows[i+1].cells[3].innerHTML=response['scorers'][i]['team']['name'];
        
        }
        console.log(response);
        });
}

function SA_goalscorer(){
    $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/competitions/SA/scorers?limit=5',
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {
        // do something with the response, e.g. isolate the id of a linked resource
        for(var i=0;i<5;i++){
             var x= tbvalue.insertRow();
        
            x.insertCell(0);
            tbvalue.rows[i+1].cells[0].innerHTML=i+1;
            tbvalue.rows[i+1].cells[0].style.align="center";
            
            x.insertCell(1);
            
            tbvalue.rows[i+1].cells[1].innerHTML=response['scorers'][i]['player']['name'];
        
            x.insertCell(2);
            tbvalue.rows[i+1].cells[2].innerHTML=response['scorers'][i]['numberOfGoals'];
            
            x.insertCell(3);
            
            tbvalue.rows[i+1].cells[3].innerHTML=response['scorers'][i]['team']['name'];
        
        }
        console.log(response);
        });
}

function FL1_goalscorer(){
    $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/competitions/FL1/scorers?limit=5',
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {
        // do something with the response, e.g. isolate the id of a linked resource
        for(var i=0;i<5;i++){
             var x= tbvalue.insertRow();
        
            x.insertCell(0);
            tbvalue.rows[i+1].cells[0].innerHTML=i+1;
            tbvalue.rows[i+1].cells[0].style.align="center";
            
            x.insertCell(1);
            
            tbvalue.rows[i+1].cells[1].innerHTML=response['scorers'][i]['player']['name'];
        
            x.insertCell(2);
            tbvalue.rows[i+1].cells[2].innerHTML=response['scorers'][i]['numberOfGoals'];
            
            x.insertCell(3);
            
            tbvalue.rows[i+1].cells[3].innerHTML=response['scorers'][i]['team']['name'];
        
        }
        console.log(response);
        });
}

function PD_goalscorer(){
    $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/competitions/PD/scorers?limit=5',
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {
        // do something with the response, e.g. isolate the id of a linked resource
        for(var i=0;i<5;i++){
             var x= tbvalue.insertRow();
        
            x.insertCell(0);
            tbvalue.rows[i+1].cells[0].innerHTML=i+1;
            tbvalue.rows[i+1].cells[0].style.align="center";
            
            x.insertCell(1);
            
            tbvalue.rows[i+1].cells[1].innerHTML=response['scorers'][i]['player']['name'];
        
            x.insertCell(2);
            tbvalue.rows[i+1].cells[2].innerHTML=response['scorers'][i]['numberOfGoals'];
            
            x.insertCell(3);
            
            tbvalue.rows[i+1].cells[3].innerHTML=response['scorers'][i]['team']['name'];
        
        }
        console.log(response);
        });
}

function DED_goalscorer(){
    $.ajax({
        headers: { 'X-Auth-Token': '9334c8572b2d4286a38896e125b52a48' },
        url: 'https://api.football-data.org/v2/competitions/DED/scorers?limit=5',
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {
        // do something with the response, e.g. isolate the id of a linked resource
        for(var i=0;i<5;i++){
             var x= tbvalue.insertRow();
        
            x.insertCell(0);
            tbvalue.rows[i+1].cells[0].innerHTML=i+1;
            tbvalue.rows[i+1].cells[0].style.align="center";
            
            x.insertCell(1);
            
            tbvalue.rows[i+1].cells[1].innerHTML=response['scorers'][i]['player']['name'];
        
            x.insertCell(2);
            tbvalue.rows[i+1].cells[2].innerHTML=response['scorers'][i]['numberOfGoals'];
            
            x.insertCell(3);
            
            tbvalue.rows[i+1].cells[3].innerHTML=response['scorers'][i]['team']['name'];
        
        }
        console.log(response);
        });
}

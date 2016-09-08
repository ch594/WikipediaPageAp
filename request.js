function MyReq(url, params){
	var default_endpoint = 'https://en.wikipedia.org/w/api.php';
	this.endpoint = typeof url !== 'undefined' ? url : default_endpoint;
	this.params = typeof params === 'object' ? params : {};
	this.query_string = "";
}

MyReq.prototype.addParams = function(key, value){
	this.params[key] = value;
}

MyReq.prototype.clearParams = function(key, value){
	this.params = {};
}


MyReq.prototype.constructUrl = function(){
	
	this.query_string = this.endpoint + "?";
	var str = [];
	for(var key in this.params){
		if(this.params.hasOwnProperty(key)){
			str.push(encodeURIComponent(key) + "=" + encodeURIComponent(this.params[key]));
		}
	}
	
	this.query_string += str.join("&");
}

MyReq.prototype.doRequest = function(callback){
	var xhr = new XMLHttpRequest();
	var method = "GET";
	xhr.open(method, this.query_string, true);
	
	xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
        }
    };
	xhr.send();
}

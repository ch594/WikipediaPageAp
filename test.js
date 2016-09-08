(function(){
	var request = new MyReq();
	request.addParams("format", "json");
	request.addParams("action", "query");
	request.addParams("generator", "random");
	request.addParams("grnnamespace", "0");
	request.addParams("prop", "links");
	request.addParams("pllimit", "max");
	request.addParams("maxlag", "5");
	request.addParams("origin", "*");
	request.constructUrl();
	
	var click_count = 0;
	var desired_title = "";
	
	function generateRequestUrl(title){
		request.clearParams();
		request.addParams("format", "json");
		request.addParams("action", "query");
		request.addParams("titles", title);
		request.addParams("prop", "links");
		request.addParams("pllimit", "max");
		request.addParams("maxlag", "5");
		request.addParams("origin", "*");
		request.constructUrl();
	}
	
	
	function generateLinks(link_obj){
		var link_array = [];
		var title = "";
		var page_id = 0;
		var pages = link_obj.query.pages;
		for(var first in pages){
			link_array = pages[first].links;
			title = pages[first].title;
			page_id = pages[first].pageid;
		}
		var num_links = document.getElementsByClassName("result").length;
		if(num_links > 0){
			removeLinks();
		}
		var result_text = document.getElementsByClassName("result-list")[0];
		link_array.forEach(function(curr, index){
			var result_element = createSingleResult(decodeURIComponent(curr.title));
			result_text.appendChild(result_element);
			result_element.addEventListener('mousedown', function(){
				
				if(curr.title === desired_title){
					removeLinks();
					finishedMessage()
				}
				else{
					generateRequestUrl(curr.title);
					request.doRequest(generateLinks);
					incrementAndUpdateCount();
					document.body.scrollTop = document.documentElement.scrollTop = 0;
					
				}
			});
		});
		
		addTitle(title);
		
	}
	
	function removeLinks(){
		var result_list = document.getElementsByClassName("result-list")[0];
		while (result_list.firstChild) {
			result_list.removeChild(result_list.firstChild);
		}
	}
	
	function addTitle(title){
		var title_element = document.getElementsByClassName('result-page')[0];
		title_element.style.display = "block";
		var title_text_element = document.getElementById("curr-page-title");
		title_text_element.innerHTML = "Current Page: " + decodeURIComponent(title);
	}
	
	function createSingleResult(title){
		var new_div = document.createElement('div');
		new_div.className = "result";
		var newp = document.createElement('p');
		newp.className = "list-text";
		newp.innerHTML = title;
		new_div.appendChild(newp);
		return new_div;
	}
	
	function incrementAndUpdateCount(){
		click_count++;
		var page_count = document.getElementById("page-clicked-count");
		page_count.innerHTML = "Current Count: " + click_count;
		
	}
	
	function finishedMessage(){
		var page_goal_reached = document.getElementById("page-goal-reached");
		page_goal_reached.style.display = "block";
		
		var result_str = "You have reached the destination page. It took ";
		result_str += click_count + " tries";
		page_goal_reached.innerHTML = result_str;
	}
	window.onload = function(){
		
		var generate_btn = document.getElementById("generate-btn");
		generate_btn.addEventListener('mousedown', function(){
			request.doRequest(generateLinks);
			this.disabled = true;
			var input_text = document.getElementById("desired-val-text");
			desired_title = input_text.value;
			
		});
		
		var text_inp = document.getElementById("desired-val-text");
		text_inp.addEventListener('focus', function(){
			this.value = this.value === "" ? "" : "";
		});
		
		text_inp.addEventListener('blur', function(){
			this.value = this.value === "" ? "Philosophy" : this.value;
		});
	}
})();
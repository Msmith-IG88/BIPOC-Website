var newPostButton = document.getElementById("new-post-button");

newPostButton.addEventListener("click", function(event) {
    var background = document.getElementById("modal-background");
    background.classList.toggle("hide");

    var modal = document.getElementById("add-community-modal");
    modal.classList.toggle("hide");
});

var cancelButton = document.getElementById("modal-cancel-button");

cancelButton.addEventListener("click", function() {
    document.getElementById("post-name-input").value = "";
    document.getElementById("post-description-input").value = "";
    document.getElementById("post-link-input").value = "";

    document.getElementById("modal-post-Resource").checked = false;
    document.getElementById("modal-post-Event").checked = false;
    document.getElementById("modal-post-Opportunity").checked = false;


    var background = document.getElementById("modal-background");
    background.classList.toggle("hide");

    var modal = document.getElementById("add-community-modal");
    modal.classList.toggle("hide");
});

var acceptButton = document.getElementById("modal-accept-button");
acceptButton.addEventListener("click",function(){

	var inputName=document.getElementById("person-name-input").value;
	var inputSumm= document.getElementById("person-image-input").value;
	var gettype=document.querySelectorAll('input[name="modal-post"]');
	var x=0;
	var y=-1;
	while(x<3){
		if(gettype[x].checked==true){
			y=x;
		}
		x++;
	}
	
	var inputType=gettype[y].value;
	
	var inputLink=document.getElementById("person-link-input").value;
	if(y!=-1){		
		makePost(inputName,inputSumm,inputType,inputLink);}

});

function makePost(name, summ, type, link){
	var request = new XMLHttpRequest();
	var requestURLcomm = '/Community';
	request.open('POST',requestURLcomm);

	var homepost={
		postName: name,
		postSummary: summ,
		postType: type,
		resourceURL: link
	};

	var requestBody=JSON.stringify(homepost);

	request.setRequestHeader('Content-Type','application/json');
	request.addEventListener('load',function(event) {
		if(event.target.status!==200){
			var message=event.target.response;
			alert("Error making post in database: " + message);

		}
		else{
			var posthtml=Handlebars.templates.post(homepost);
			var postsSection=document.getElementById('posts');
			postsSection.insertAdjacentHTML('beforeend', posthtml);
		
		}

	});
	request.send(requestBody);}


var filterButton = document.getElementById("filter-button");

var posts = document.getElementsByClassName("post");

var postType = document.getElementsByClassName("post-type");

var filterChoices = document.getElementById("filter-feature");

var selectedPostText = "";

filterChoices.addEventListener("change", function() {
    selectedPostText = filterChoices.value;
});

filterButton.addEventListener("click", function() {

    for(i = postType.length; i > 0; i--) {
        var postTextContent = postType[i-1].textContent;
        
        if( !(postTextContent.includes(selectedPostText)) )
        {
            posts[i-1].classList.add("hidePost");
        }
        else if(postTextContent.includes(selectedPostText))
        {
            posts[i-1].classList.remove("hidePost");
        }
    }

});

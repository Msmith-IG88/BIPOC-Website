var newPostButton = document.getElementById("new-post-button");

newPostButton.addEventListener("click", function(event) {
    var background = document.getElementById("modal-background");
    background.classList.toggle("hide");

    var modal = document.getElementById("add-person-modal");
    modal.classList.toggle("hide");
});

var acceptButton = document.getElementById("modal-accept-button");

var cancelButton = document.getElementById("modal-cancel-button");

cancelButton.addEventListener("click", function() {
    document.getElementById("person-image-input").value = "";
    document.getElementById("person-name-input").value = "";
    document.getElementById("person-role-input").value = "";
    document.getElementById("person-bio-input").value = "";
    document.getElementById("person-link-input").value = "";

    document.getElementById("modal-tag-Instagram").checked = false;
    document.getElementById("modal-tag-YouTuber").checked = false;
    document.getElementById("modal-tag-Entrepeneur").checked = false;
    document.getElementById("modal-tag-Historical").checked = false;
    document.getElementById("modal-tag-Educator").checked = false;
    document.getElementById("modal-tag-Professional").checked = false;
    document.getElementById("modal-tag-Leader").checked = false;

    document.getElementById("modal-tag-STEMAdvocate").checked = false;
    
    document.getElementById("modal-tag-[Delete]").checked = false;

    var background = document.getElementById("modal-background");
    background.classList.toggle("hide");

    var modal = document.getElementById("add-person-modal");
    modal.classList.toggle("hide");
});


acceptButton.addEventListener("click",function(){

	var inputName=document.getElementById("person-name-input").value;
	var inputImg= document.getElementById("person-image-input").value;
	var inputRole=document.getElementById("person-role-input").value;
	var inputBio=document.getElementById("person-bio-input").value;
	var inputLink=document.getElementById("person-link-input").value;
	var inTag=document.querySelectorAll('input[name="modal-tag"]');
	var inputTag=[9];
	var x=0;
	var y=0;
	while(x<9){
		if(inTag[x].checked==true){
			inputTag[y]=inTag[x].value;
			y++;}
		x++;}

	var namelist=document.getElementsByClassName('feature-name');
	x=0;
	var z=-1;
	while(x<namelist.length){
		if(inputName!=namelist[x].textContent){
			x++;}
		else{
			y=-1;
			z=x;
			x=namelist.length;}


	}
	if(inTag[8].checked==true && z!=-1){
		deletePost(inputName,namelist[z]);}
	else{
		if(y==-1){
			updatePost(inputName,inputBio,inputImg,inputLink,inputRole,inputTag);}
		else{
			makePost(inputName,inputBio,inputImg,inputLink,inputRole,inputTag);}
	}

});






//toRequest is a person object sent to the server as a request with a flag if the post is getting updated or created
function makePost(name, bio, photoURL, platformlink, role, tags){
	var request = new XMLHttpRequest();
	var requestURLpeople = '/';
	request.open('POST',requestURLpeople);

	var homepost={
		name: name,
		bio: bio,
		imgURL: photoURL,
		platformURL: platformlink,
		role: role,
		tag: tags


	};
	var toRequest=homepost;
	toRequest.update='N';
	var requestBody=JSON.stringify(toRequest);

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
		
   			var background = document.getElementById("modal-background");
	  		background.classList.toggle("hide");

    			var modal = document.getElementById("add-person-modal");
  			modal.classList.toggle("hide");
		}

	});
	request.send(requestBody);}




//person=person to be updated
//rest are the new items the values are being changed into
function updatePost(name, bio, photoURL, platformlink, role, tags){
	var request = new XMLHttpRequest();
	var requestURLpeople = '/';
	request.open('POST',requestURLpeople);

	var toRequest={
		name: name,
		bio: bio,
		imgURL: photoURL,
		platformURL: platformlink,
		role: role,
		tag: tags,
		update: 'Y'
	};


	var requestBody=JSON.stringify(toRequest);
	request.setRequestHeader('Content-Type','application/json');
	request.addEventListener('load',function(event) {
		if(event.target.status!==200){
			var message=event.target.response;
			alert("Error updating post in database: " + message);

		}
		else{
   			var background = document.getElementById("modal-background");
	  		background.classList.toggle("hide");

    			var modal = document.getElementById("add-person-modal");
  			modal.classList.toggle("hide");
			
		}


	});
	request.send(requestBody);}


function deletePost(name,del){
	var request=new XMLHttpRequest();
	var requestURLpeople = '/';
	request.open('DELETE',requestURLpeople);

	var todelete={
		name: name,
		message: 'has been deleted'
	};
	var requestBody = JSON.stringify(todelete);

	request.setRequestHeader('Content-Type','application/json');
	request.addEventListener('load',function(event){
		if(event.target.status!=200){
			var message=event.target.response;
			alert("Error updating post in database: " + message);
		}
		else{
			
			del.remove();


		}
	});
	request.send(requestBody);}



/Filter Code
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


 


















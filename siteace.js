Websites = new Mongo.Collection("websites");

if (Meteor.isClient) {

	
	/////
	// template helpers 
	/////

	// helper function that returns all available websites
	Template.website_list.helpers({
		websites:function(){
			return Websites.find({},{sort:{votes: -1}});
		}		
	});


	/////
	// template events 
	/////

	Template.website_item.events({
		"click .js-upvote":function(event){
			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Up voting website with id "+website_id);
			// put the code in here to add a vote to a website!
			//console.log("eventt: " + Websites.findOne({_id:website_id}).votes);
			var votes = (Websites.findOne({_id:website_id}).votes)+1;
			Websites.update({_id:website_id},
							{$set: {votes:votes}});
			
			
			return false;// prevent the button from reloading the page
		}, 
		"click .js-downvote":function(event){

			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Down voting website with id "+website_id);

			// put the code in here to remove a vote from a website!
			var votes = (Websites.findOne({_id:website_id}).votes)-1;
			Websites.update({_id:website_id},
							{$set: {votes:votes}});
			return false;// prevent the button from reloading the page
		}
	})

	Template.website_form.events({
		"click .js-toggle-website-form":function(event){
			$("#website_form").toggle('slow');
		}, 
		"submit .js-save-website-form":function(event){
			var url, title, description, votes;
			// here is an example of how to get the url out of the form:
			url = event.target.url.value;
			title = event.target.title.value;
			votes = 0;
			description = event.target.description.value;
			console.log("url: " + url + ", title: " + title + ", description: " + description);
			//  put your website saving code in here!	
			if (Meteor.user()) {
				Websites.insert({
					url: url,
					title: title,
					votes: votes,
					description: description,
					createdOn: new Date() //,
					//createdBy:Meteor.user()._id
				});
			}
			return false;// stop the form submit from reloading the page

		}
	});
}


if (Meteor.isServer) {
	// start up function that creates entries in the Websites databases.
  Meteor.startup(function () {
    // code to run on server at startup
    if (!Websites.findOne()){
    	console.log("No websites yet. Creating starter data.");
    	  Websites.insert({
    		title:"Goldsmiths Computing Department", 
			votes: 0,
    		url:"http://www.gold.ac.uk/computing/", 
    		description:"This is where this course was developed.", 
    		createdOn:new Date()
    	});
    	 Websites.insert({
    		title:"University of London", 
			votes: 0,
    		url:"http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route", 
    		description:"University of London International Programme.", 
    		createdOn:new Date()
    	});
    	 Websites.insert({
    		title:"Coursera", 
			votes: 1,
    		url:"http://www.coursera.org", 
    		description:"Universal access to the world’s best education.", 
    		createdOn:new Date()
    	});
    	Websites.insert({
    		title:"Google", 
			votes: 0,
    		url:"http://www.google.com", 
    		description:"Popular search engine.", 
    		createdOn:new Date()
    	});
    }
  });
}

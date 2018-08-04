$(document).ready(function(){ 
	
	/* Universities Listing 
	   ======================*/
	var country_url = '';

	$("#country-selection-tables").change(function() {

		$(".show-more").css("display", "block");

		/* to use the specific url of each country */
		switch(document.getElementById("country-selection-tables").value.toLowerCase()){
	 		case "zimbabwe":
		 		country_url = 'http://universities.hipolabs.com/search?country=zimbabwe';
		 		break;
		 	case "india":
		 		country_url = 'http://universities.hipolabs.com/search?country=india';
		 		break;
		 	case "united kingdom":
		 		country_url = 'http://universities.hipolabs.com/search?country=united%20kingdom';
		 		break;
	 	}
		$.ajax({
 		url: 'https://cors-anywhere.herokuapp.com/'+country_url,
 		type: "get",
 		dataType: "json",
 		success: function(data) {
 			$("#uniTable td").remove();
 			var html='';

	 		/* populating the graphs and charts's vaiables with data from online */
	 		$.each(data, function(entryIndex, entry){
	 			if (entry.country.toLowerCase() == document.getElementById("country-selection-tables").value.toLowerCase()) {
	 				html+= '<tr>';
	 				html+= '<td>'+ entry.name + '</td>';
	 				html+= '<td><a href="'+ entry.web_pages[0] + '" target="blank"><i class="ion-md-open icon-small"></i></a></td>';
	 				html+= '</tr>';
	 			}
	 		});

	 		$("#uniTable").append(html);
 		}
 	});
	});
	

	/* show more option */	

	$(".show-more button").on("click", function() {
	    var $this = $(this); 
	    var $content = $this.parent().prev("div.content");
	    var linkText = $this.text().toUpperCase();    
	    
	    if(linkText === "SHOW MORE"){
	        linkText = "Show less";
	        $content.switchClass("hideContent", "showContent", 400);
	    } else {
	        linkText = "Show more";
	        $content.switchClass("showContent", "hideContent", 400);
	    };

	    $this.text(linkText);
	});

	/* Add/ Remove Sticky Navigation */ 

	$('.js--features').waypoint(function(direction){
		if (direction == "down") {
			$('nav').addClass('sticky');
		} else {
			$('nav').removeClass('sticky');
		}
	}, {
		offset: '60px;' 
	});

	/* Scroll to section on click event */

	$('.js--scroll-to-countries').click(function(){
		$('html, body').animate({scrollTop: $('.js--section-countries').offset().top}, 1500);
	});

	$('.js--scroll-to-start').click(function(){
		$('html, body').animate({scrollTop: $('.js--features').offset().top}, 1000);
	});

	/* CSS Tricks: Smooth Scrolling to elements with ID */

	$(function() {
		$('a[href*=#]:not([href=#])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 1000);
					return false;
				}
			}
		});
	});

	/* Add Animations on scroll */

	$('.js--wp-1').waypoint(function(direction) {
		$('.js--wp-1').addClass('animated fadeIn');
	}, {
		offset: '50%'
	});
	$('.js--wp-2').waypoint(function(direction) {
		$('.js--wp-2').addClass('animated fadeInUp');
	}, {
		offset: '50%'
	});
	$('.js--wp-3').waypoint(function(direction) {
		$('.js--wp-3').addClass('animated fadeIn');
	}, {
		offset: '60%'
	});
	$('.js--wp-4').waypoint(function(direction) {
		$('.js--wp-4').addClass('animated pulse');
	}, {
		offset: '50%'
	});

	/* Mobile Navigation */
	$('.js--nav-icon').click(function() {
		var nav = $('.js--main-nav');
		var icon = $('.js--nav-icon i')

		nav.slideToggle(200);
		/* switch from hamburger to cross icon */
		if (icon.hasClass('ion-md-reorder')){
			icon.addClass('ion-md-close');
			icon.removeClass('ion-md-reorder');
		} else {
			icon.addClass('ion-md-reorder');
			icon.removeClass('ion-md-close');
		}
	});

	/* Searching in a universities table */

	$("#userInput").keyup(function() {
		var userInput, table, tableRow, tableData;
		userInput = document.getElementById("userInput");
		var filter = userInput.value.toLowerCase();
		table = document.getElementById("uniTable");
		tableRow = table.getElementsByTagName("tr");

		for (var i = 0; i < tableRow.length; i++) {
			tableData = tableRow[i].getElementsByTagName("td")[0];
			if (tableData) {
				if (tableData.innerHTML.toLowerCase().indexOf(filter) > -1) {
					tableRow[i].style.display = "";
				} else {
					tableRow[i].style.display = "none";
				}
			}       
		}
	});


	/* Graphs and charts 
	   ====================*/

	 var ISO = '';		/* this global ISO variable will be used to update the urls when a user picks a different country */
	 var bar_type ='';	/* this global bar_type var will be used to set different bar to different countries */

	 $("#country-selection-charts").change(function(){

	 	$(".stats-row").css("display", "block");
	 	$(".remove").empty();	/* this makes sure that the previously filled canvases/charts are cleared to display new data the user selected */

	 	switch(document.getElementById("country-selection-charts").value.toLowerCase()){
	 		case "zimbabwe":
		 		ISO = 'ZWE';
		 		bar_type ='line';
		 		break;
		 	case "india":
		 		ISO = 'IND';
		 		bar_type ='bar';
		 		break;
		 	case "uk":
		 		ISO = 'GBR';
		 		bar_type ='horizontalBar';
		 		break;
	 	}


	 	/* need to store urls into variables so that i can pass them into an array */
	 	// $(".stats-row").css("display", "none",);
		var link1 = 'https://cors-anywhere.herokuapp.com/http://api.worldbank.org/v2/countries/'+ISO+'/indicators/SE.TER.ENRL?format=json&date=2009:2015';
		var link2 = 'https://cors-anywhere.herokuapp.com/http://api.worldbank.org/v2/countries/'+ISO+'/indicators/UIS.FOSEP.56.F600?format=json&date=2009:2015';
		var link3 = 'https://cors-anywhere.herokuapp.com/http://api.worldbank.org/v2/countries/'+ISO+'/indicators/UIS.FOSEP.56.F140?format=json&date=2009:2015';
		var link4 = 'https://cors-anywhere.herokuapp.com/http://api.worldbank.org/v2/countries/'+ISO+'/indicators/UIS.FOSEP.56.F500?format=json&date=2009:2015'; 
		var link5 = 'https://cors-anywhere.herokuapp.com/http://api.worldbank.org/v2/countries/'+ISO+'/indicators/UIS.FOSEP.56.F700?format=json&date=2009:2015'; 
		var link6 = 'https://cors-anywhere.herokuapp.com/http://api.worldbank.org/v2/countries/'+ISO+'/indicators/UIS.FOSEP.56.F200?format=json&date=2009:2015';
		var link7 = 'https://cors-anywhere.herokuapp.com/http://api.worldbank.org/v2/countries/'+ISO+'/indicators/UIS.FOSEP.56.FUK?format=json&date=2009:2015';
		var link8  = 'https://cors-anywhere.herokuapp.com/http://api.worldbank.org/v2/countries/'+ISO+'/indicators/UIS.FOSEP.56.F140?format=json&date=2009:2015';
		var link9 = 'https://cors-anywhere.herokuapp.com/http://api.worldbank.org/v2/countries/'+ISO+'/indicators/UIS.FOSEP.56.F800?format=json&date=2009:2015';
		var link10= 'https://cors-anywhere.herokuapp.com/http://api.worldbank.org/v2/countries/'+ISO+'/indicators/UIS.FOSEP.56.F300?format=json&date=2009:2015';
		var links = [link1, link2, link3, link4, link5, link6, link7, link8, link9, link10];
	
			// $(".stats-row").show();
		
		/* i need a loop to be able to pupulate the graphs using one functions instead of writing 1 different functions for earch graph */
		for (var counter = 0; counter < links.length; counter++){
			function loadAPI(counter) {
				console.log(links[counter]);
				$.ajax({
				url: links[counter],
				type: "get",
				dataType: "json",
					success: function(data) {
						var yearValues = '';
						$.each(data[1], function(entryIndex, entry){
							yearValues += entry.value+' ';
						});
						yearValues +=',';
			   			/* to trim the last comma to make a format of an array. */
			   			var trim = yearValues.replace(' ,','');
			   			var myData = trim.split(" ");

			   			/* displaying data in charts and graphs */
			   			/* the code below helps to prepare the charts for new data. 
			   			/* without it the charts would overlap since i was able to use only one function to make all charts */

			   			var canva = '<canvas class="stats-chart" id="chart'+counter+'"></canvas>';
			   			var currentId = '#remove'+counter;
	 					$(currentId).append(canva);
									   			
						var config = {	   			
			   				type: bar_type,
			   				data: {
			   					labels: ["2009", "2010", "2011", "2012", "2013", "2014", "2015"],
			   					datasets: [{
			   						label: 'Enrollment in All Programs',
			   						data: [myData[6], myData[5], myData[4], myData[3],myData[2],myData[1], myData[0]],
			   						backgroundColor: ['rgba(255, 99, 132, 0.7)', 'rgba(54, 162, 235, 0.7)', 'rgba(255, 206, 86, 0.7)',	'rgba(75, 192, 192, 0.7)',	'rgba(153, 102, 255, 0.7)',	'rgba(255, 159, 64, 0.7)','rgba(255, 159, 255, 0.7)'],
			   						borderColor:     ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)','rgba(255, 159, 255, 1)'],
			   						borderWidth: 1,
			   					}]
			   				},
			   				options: {
			   					title:{
			   						display:true,
			   						text:document.getElementById("chart-title"+counter).innerHTML,	
			   						fontSize:30,
			   					},
			   					legend:{
			   						position: "none",
			   					},
			   					scales: {
			   						yAxes: [{
			   							ticks: {
			   								beginAtZero:true
			   							}
			   						}]
			   					}
			   				}
			   			}
					        var ctx = document.getElementById("chart"+counter).getContext("2d");
					        var myChart = new Chart(ctx, config);
					        myChart.update();			   	
			   		}
		   		});
			}
			loadAPI(counter);
		}
	});

	$(window).scroll(function() {scrollFunction()});

	function scrollFunction() {
	    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
	        document.getElementById("myBtn").style.display = "block";
	    } else {
	        document.getElementById("myBtn").style.display = "none";
	    }
	}

	/* takes the user to the top upon the button click */
	$("#myBtn").click(function() {
	    document.body.scrollTop = 0;
	    document.documentElement.scrollTop = 0;
	});

});






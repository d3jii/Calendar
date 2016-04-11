//[GetLastMonthDay]
	/*
	[info]
	Gets last day of month
	[/info]
	*/
function get_last_month_day(month,year){
	month++;
	if(month == 11){
		year++;
		month = 0;
	}

	return new Date(year,month,0).getDate();
		
}
//[/GetLastMonthDay]

//[commentName]
	/*
	[info]
	
	[/info]
	*/
function generate_month_days(month,last_day,year){
	var result = [];
	var day_;
	for(var i = 1; i <= last_day; i++){
		day_ = new Date(year,month,i).getDay() - 1; //monday becomes day 0
		if(day_ < 0){
			day_ = 6; //sunday becomes day 6
		}
		result.push({date:i,day:day_});
	}
	return result;
}
//[/commentName]


//[BuildCalendarForPassedYear]
	/*
	[info]
	
	[/info]
	*/
function build_calendar(year){
	var month_names = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	var week_day_names = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
	var custom_images = ["images/demo2/1.jpg", "images/demo2/2.jpg", "images/demo2/3.jpg", "images/demo2/4.jpg", "images/demo2/5.jpg", "images/demo2/6.jpg", "images/demo2/7.jpg", "images/demo2/8.jpg", "images/demo2/9.jpg", "images/demo2/10.jpg", "images/demo2/11.jpg", "images/demo2/12.jpg"];
	var month_days = [];
	var month_name,last_month_day;

	var mnl = month_names.length;
	for(var x = 0; x < mnl; x++){
		month_name = month_names[x];
		last_month_day = get_last_month_day(x,year);
		month_days[x] = generate_month_days(x,last_month_day,year);


	}
	return {
		year:year,
		custom_images:custom_images,
		month_days:month_days,
		month_names:month_names,
		week_day_names:week_day_names
	}
}
//[/BuildCalendarForPassedYear]


//[commentName]
	/*
	[info]
	
	[/info]
	*/
function render_calendar(calendar){
	var month_days,months,days;
	month_days = calendar.month_days;
	months = calendar.month_names;
	days = calendar.week_day_names;
	var rendered,rendered_array = [];

	function month_days_foreach(_month_days_,i){
		rendered = {};
		rendered[months[i]] = {month_name:months[i],year:calendar.year,image_src:calendar.custom_images[i]};
		var container = [];
		var outer = [];
		//month_days = month_days[0]; //just a test;
		mdl = _month_days_.length;
		row_fill_flag = -1;
		for(var x = 0; x < mdl; x++){
			var month_day = _month_days_[x]; 

			if(row_fill_flag < 0){
				row_fill_flag = month_day.day;
			}

			//container[row_fill_flag] = days[month_day.day] + "("+ (x + 1) +")"; 
			container[row_fill_flag] = {day:(x + 1),name_short:days[month_day.day].substr(0,3)}; 
			row_fill_flag++;

		}

		//normalize container
		for(var x = 0; x < 7; x++){
			if(container[x]) {
				break;
			}
			else{
				container[x] = {name_short:""};
			} 
		} 
		while(container.length % 7 != 0){
			container.push({name_short:""});
		}

		container_rows = [];
		while(container.length){
			container_rows.push(container.splice(0,7));
		}

		rendered[months[i]].calendar_object = container_rows;
		rendered_array[i] = rendered[months[i]]; 
	}
	month_days.forEach(month_days_foreach); 



  var template = $('#template').html();
  Mustache.parse(template);   // optional, speeds up future uses
  var mrendered = Mustache.render(template, {rendered: rendered_array});
  $('#bb-bookblock').append(mrendered);
	return rendered_array;

}
//[/commentName]
var x = build_calendar(new Date().getFullYear());
var y = render_calendar(x);


Page.init();
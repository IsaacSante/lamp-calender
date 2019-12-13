// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

    "use strict";
    

    let myClickDay;
    let myClickMonth;


    // Create the defaults once
    var pluginName = "simpleCalendar",
        defaults = {
            months: ['january','february','march','april','may','june','july','august','september','october','november','december'], //string of months starting from january
            days: ['sunday','monday','tuesday','wenesday','thursday','friday','saturday'], //string of days starting from sunday
            minDate : "YYYY-MM-DD", // minimum date
            maxDate : "YYYY-MM-DD", // maximum date
            insertEvent: true, // can insert events
            displayEvent: true, // display existing event
            fixedStartDay: true, // Week begin always by monday
            event: [], //List of event
            insertCallback : function(){} // Callback when an event is added to the calendar
        };

    // The actual plugin constructor
    function Plugin ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.currentDate = new Date();
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {
            var container = $(this.element);
            var todayDate = this.currentDate;

            var calendar = $('<div class="calendar"></div>');
            var header = $('<header>'+
                           '<h2 class="month"></h2>'+
                           '<a class="btn btn-prev" href="#"><</a>'+
                           '<a class="btn btn-next" href="#">></a>'+
				            '</header>');

            this.updateHeader(todayDate,header);
            calendar.append(header);

            this.buildCalendar(todayDate,calendar);
            container.append(calendar);

            this.bindEvents();
        },

        //Update the current month header
        updateHeader: function (date, header) {
            header.find('.month').html(this.settings.months[date.getMonth()]);
        },

        //Build calendar of a month from date
        buildCalendar: function (fromDate, calendar) {
            var plugin = this;

            calendar.find('table').remove();

            var body = $('<table></table>');
            var thead = $('<thead></thead>');
            var tbody = $('<tbody></tbody>');

            //Header day in a week ( (1 to 8) % 7 to start the week by monday)
            for(var i=1; i<=this.settings.days.length; i++) {
                thead.append($('<td>'+this.settings.days[i%7].substring(0,3)+'</td>'));
            }

            //setting current year and month
            var y = fromDate.getFullYear(), m = fromDate.getMonth();

            //first day of the month
            var firstDay = new Date(y, m, 1);
            //If not monday set to previous monday
            while(firstDay.getDay() != 1){
                firstDay.setDate(firstDay.getDate()-1);
            }
            //last day of the month
            var lastDay = new Date(y, m + 1, 0);
            //If not sunday set to next sunday
            while(lastDay.getDay() != 0){
                lastDay.setDate(lastDay.getDate()+1);
            }

            //For firstDay to lastDay
            for(var day = firstDay; day <= lastDay; day.setDate(day.getDate())) {
                var tr = $('<tr></tr>');
                //For each row
                for(var i = 0; i<7; i++) {
                    var td = $('<td><a href="#" class="day">'+day.getDate()+'</a></td>');
                    //if today is this day
                    if(day.toDateString() === (new Date).toDateString()){
                        td.find(".day").addClass("today");
                    }
                    //if day is not in this month
                    if(day.getMonth() != fromDate.getMonth()){
                       td.find(".day").addClass("wrong-month");
                    }
                    //Binding day event
                    td.on('click', function(e) {
                        console.log($(this).text());
                        console.log($('.month').text());
                        myClickDay = $(this).text();
                        myClickMonth = $('.month').text();
                        
                        $('.my-fancy-element').text(myClickMonth  + '  ' + myClickDay );
                        plugin.fillUp($(plugin.element),e.pageX,e.pageY);
                             
                        $.ajax({
                                 type: "GET",
                                 url: "http://localhost:9000/notes/" + myClickMonth + "/" + myClickDay,
                                dataType: 'application/json',
                                complete: function(data){
                                    console.log(data);
                                    console.log(JSON.stringify(data))
                                    console.log(data['responseText']); //winner winner chicken dinner
                                    console.log(data['response'] + "MOTHERFUCKER"); 
                                    var reText = data['responseText'];
                                    //here your parse reText, and send the parsed var in addToCont
                                    addToCont(reText);
                                },
                             });

                    });

                    tr.append(td);
                    day.setDate(day.getDate() + 1);
                }
                tbody.append(tr);

            }

            body.append(thead);
            body.append(tbody);

            function addToCont(rText) {
                 $('.gotmonth').append("<p>" +rText+ "</p>");
                 console.log("twice + " + rText);
            }
            
    
            var eventContainer = $('<div  class="event-container"> <p contenteditable ="true" id="myText"> date selected: <span class="my-fancy-element"></span></p> <span class= "gotmonth"> </span> <a href="#" id="save"> Save Changes</a>  </div>');
            
            calendar.append(body);
            calendar.append(eventContainer);
            console.log("HEYIMREMBERINGGGGGG",$( "#save" ));
            // $( "#save" ).on('click', function(e) {
            //     e.preventDefault();
            //     alert( "Handler for .click() called." );
            //   });
        },
        //Init global events listeners
        bindEvents: function () {
            var plugin = this;

            $( "#save" ).on('click', function(e) {
                e.preventDefault();
                $.ajax({
                    type: "POST",
                    url: "http://localhost:9000/notes/" + myClickMonth + "/" + myClickDay,
                   dataType: 'application/json',
                   data: { text: $("#myText" ).text() }
                   
                });
              });

            //Click previous month
            $('.btn-prev').click(function(){
                plugin.currentDate.setMonth(plugin.currentDate.getMonth()-1);
                plugin.buildCalendar(plugin.currentDate, $('.calendar'));
                plugin.updateHeader(plugin.currentDate, $('.calendar header'));
            });

            //Click next month
            $('.btn-next').click(function(){
                plugin.currentDate.setMonth(plugin.currentDate.getMonth()+1);
                plugin.buildCalendar(plugin.currentDate, $('.calendar'));
                plugin.updateHeader(plugin.currentDate, $('.calendar header'));
            });
        },
        //Small effect to fillup a container
        fillUp : function (elem,x,y){
            var plugin = this;
            var elemOffset = elem.offset();

//Isaac Notes i added the contenteditable html tag//
// document.getElementById('filler').innerHTML = "something important";//
//also tried the document get tag but nothing happened.//

							//first line creates the filler div
            var filler = $('<div class="filler" style=""> </div>');
						//something about its position//
            filler.css("left", x-elemOffset.left);
            filler.css("top", y-elemOffset.top);
					//calls the calender class
					// append = adds the filler fucntion to variable
            $('.calendar').append(filler);

						//filler animation
            filler.animate({
                width: "100%",
                height: "100%"
            }, 500, function() {
                $('.event-container').show();
                filler.show();
            });
        },
        //Small effect to empty a container
        empty : function (elem,x,y){
            var elemOffset = elem.offset();

            var filler = $('.filler');
            filler.css("width", "300%");
            filler.css("height", "300%");

            filler.show();
            $('.event-container').show();
						  // $('.event-container').show("<p> HEY FUCKER</p>");
					// var note = $('<div contenteditable="true" class="note" style=""> <p> "FUCK YEAH" </P> </div>');
					// $('.event-container').append(note);
            filler.animate({
                width: "0%",
                height: "0%"
            }, 500, function() {
								  // $('.event-container').append("<p> HEY FUCKER</p>");
                filler.remove();
            });
        }
    });
		// document.getElementsByClassName("eventContainer").innerText = "text";
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {
        return this.each(function() {
                if ( !$.data( this, "plugin_" + pluginName ) ) {
                        $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
                }
        });
    };

})( jQuery, window, document );

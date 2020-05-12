/*js version 2020-4-30 10pm update*/ 

document.onreadystatechange = function () {

	//const mask = $('.bv-loading-mask')

	let state = document.readyState;

  	if ( state == "complete") {

  		app()

  	}
}



const startDate = '.event-startDate'
const endDate = '.event-endDate'
const grouptext = '.bv-events-group-text'
let grouptextword;

let card,eventlist;
let dateFormat;
let _groupscope,
	_grouptextscope,
	_containerscope;

let key = []
let visibleCard, groupedCard;


function formatingDate(object){

	let locale = checkLocale()

	object.each(function(){

		let $this = $(this)

		let $startDate = $this.find(startDate)
		let $endDate = $this.find(endDate)

		let _startDate = dateFormalizing($startDate.attr('data-time'),dateFormat,locale)
		let _endDate = dateFormalizing($endDate.attr('data-time'),dateFormat,locale)

		$startDate.text(_startDate)
		$endDate.text(_endDate)

		let monthclass = dateFormalizing($startDate.attr('data-time'),"MMMYYYY",locale)
		$this.attr('data-months',monthclass)

		$this.find('.bv-card-open-time').addClass('formalized')

		$this.addClass('visible')

	})

}



function setUpItem(){

	card = $('.bv-card')
	dateFormat = 'HH:mm ddd, DD/MM/YYYY';
	eventlist = $('.bv-events-list-container');

	_groupscope = '<div class="bv-events-group"/>'
	_grouptextscope = '<div class="bv-events-group-text" />'
	_containerscope = '<div class="bv-cards-container" />'

	grouptextword = $(grouptext).attr('data-text')
	$(grouptext).text("")
	//console.log("grouptextword=",grouptextword)

	//visibleCard = $('.bv-card.visible')	
	//groupedCard = $('.bv-card.grouped')


}


function resetSelector(){


	//console.log('resetSelector!')

	var type_val = typeinst.getVal()
	var topic_val = topicinst.getVal()

	var isemptyed = ( type_val == [" "] && topic_val == [" "] )

	if (!isemptyed){

		typeinst.setVal([' '],true);
		topicinst.setVal([' '],true);

	}else{ 

		return false
	}

	
}

function resetCalendar(){

	isTypes == true || isTopics == true

}


function ungroupEvents(){

	//console.log('do ungroup events')
	let group = $('.bv-events-group')
	//console.log(group)

	group.each(function(){
		let $this = $(this)
		$this.find('.bv-events-group-text').remove() //remove every txt in group
		let groupedcard = $this.find('.bv-card')
		groupedcard.unwrap().unwrap()
	})

	let cards = eventlist.find('.bv-card')
	
	//rewrap global group
	cards.wrapAll(_containerscope)

	let globalgrouptxt = eventlist.find('.bv-events-group-text')
	let globalgroup = eventlist.find('.bv-events-group')

	//console.log("$(txt)=",globalgrouptxt)

	if( globalgrouptxt.length<0 ){ 

		globalgroup.prepend(_grouptextscope)

	}

	let wraptarget = eventlist.find('.bv-cards-container, .bv-events-group-text')
	wraptarget.wrapAll(_groupscope)
	globalgrouptxt.show().text("")

	eventlist.removeClass('events-grouped')

}


function groupEventsByMonth(objects){


	let hasgrouped = eventlist.hasClass('events-grouped');

	if(hasgrouped){

		ungroupEvents()

	}

	//firstgroup
	//console.log('filtered card=',objects)

	//get obj month val
	let months = objects.map(function(idx,obj){ 

		//console.log(idx,obj)

		return $(obj).attr('data-months')

	});

	//count different month
	months = Array.from(new Set(months))

	//console.log("months=",months)
	card.unwrap().unwrap()

	for(var i=0;i<months.length;i++){

		let group = objects.filter(function(idx,item){
			return $(item).attr('data-months') == months[i]
		})

		group.wrapAll(_containerscope)
		let groupwrap = group.closest('.bv-cards-container')
		groupwrap.wrap(_groupscope)
		let eventgroup = groupwrap.closest('.bv-events-group')
		eventgroup.prepend(_grouptextscope)
		let grouptext = eventgroup.find('.bv-events-group-text')


		let txt = `Events on ${months[i].replace(/(\d{3})/g, ', $1')}`;

		grouptext.text(txt)

		//console.log("group=",group,txt)

	}

	let globalgrouptxt = objects.closest('.bv-events-list-container').find('>.bv-events-group-text')
	globalgrouptxt.hide()

	eventlist.addClass('events-grouped')

	

}

function updateCardsBySelector(types,topics){
	
	let valid = (types != undefined &&  topics !== undefined  ) ? true : false

	if( valid ){

		console.log('in "updateCardsBySelector" selected:',types,'or',topics)

		let none = (types == "" &&  topics == "" ) ? true : false
		let empty = (types == " " &&  topics == " " ) ? true : false

		console.log("empty=",empty,"none=",none)

		if(!empty && !none){

			let globalgrouptxt = eventlist.find('.bv-events-group-text')
			globalgrouptxt.show().text("")

			let typesarr = types.map(function(type){return ','+type+','})
			let topicsarr = topics.map(function(topic){return ','+topic+','})

			card.removeClass('visible').hide()

			card.each(function(){

				let isTypes = false;
				let isTopics = false;
				let show = true;

				let $this = $(this)
				let cardtypes = $this.attr('data-ev-type')
				let cardtopics = $this.attr('data-ev-topic')
				
				if( typesarr.length != 0){

					for(var i=0;i<typesarr.length;i++){

						let match = cardtypes.includes(typesarr[i]) 

						//console.log("typematch=",match,[i],'> selected:{',typesarr[i],'},in card:{',cardtypes,'}')	

						if( match == true ){
							isTypes = true
						}

					}

				}else{

					isTypes = true

				}

				if( topicsarr.length != 0){
	 
					for(var i=0;i<topicsarr.length;i++){

						
						let match = cardtopics.includes(topicsarr[i]) 
						//console.log("topicmatch=",match,[i],'> selected:{',topicsarr[i],'},in card:{',cardtopics,'}')	

						
						if( match == true ){
							isTopics = true
						}

						////console.log("topic match=",match)

					}
				}else{

					isTypes = true

				}

				////console.log(isTypes,isTopics)

				
				show = (isTypes == true || isTopics == true) ? true : false

				if( show == true ){

					$this.addClass('visible').show()

				}

				////console.log("show=",show)

			})

			$(grouptext).text("")

		}else{

			$(grouptext).text("")
			card.addClass('visible').show()

		}

	}

	return false;

}


function updateCardsByCalendar(date){

	let datevalid = false
	let globalgrouptxt = $('.bv-events-list-container').find('.bv-events-group-text')

	if ( date != undefined ){

		datevalid = (date.startDate != null && date.endDate !=null)?true:false

	}


	if(datevalid){

		let utc_st = moment.utc(date.startDate)
		let utc_et = moment.utc(date.endDate)

		card.removeClass('visible').hide()
		let truecard = card.filter(function(idx,item){
			let card_startDate = moment.utc($(item).find(startDate).attr('data-time'))
			let card_endDate = moment.utc($(item).find(endDate).attr('data-time'))
			let isStartDateMatched = moment(card_startDate).isBetween(utc_st, utc_et, null, '[]')
			let isEndDateMatched = moment(card_endDate).isBetween(utc_st, utc_et, null, '[]')
			return isStartDateMatched == true
		})
		if( truecard.length > 0){
			groupEventsByMonth(truecard)
			truecard.addClass('visible').show()
		}else{

			//console.log("this data rage it has no upcoming events")

			//this data rage it has no upcoming events
			let hasgrouped = eventlist.hasClass('events-grouped');
			if(hasgrouped){ ungroupEvents() }

			let eventgroup = eventlist.find('.bv-events-group')
			globalgrouptxt = eventlist.find('.bv-events-group-text')

			//console.log("globalgrouptxt.length",globalgrouptxt)

			globalgrouptxt.text(grouptextword).show()

			//card.removeClass('visible').hide()

		}


	}else{

		card.addClass('visible').show()
		globalgrouptxt.text("")

	}

}



function handleResult(_value,_type){

		switch(_type){
			case "TYPE":
				key.type = _value
			break;
			case "TOPIC":
				key.topic = _value
			break;
			case "DATE":
				key.date = _value
			break;
		}

		updateCardsBySelector(key.type,key.topic)

		if( key.date != undefined ){

				let hasgrouped = eventlist.hasClass('events-grouped');
				//console.log("hasgrouped=",hasgrouped)
				if(hasgrouped){
					ungroupEvents()
				}

			//if calendar selector has value, empty selector
				//if one of selectors' value is not [" "] -> resetSelector
				//if both 2 selectors has [" "] value -> do nothing
			if( key.date.startDate != null && key.date.endDate != null){

				updateCardsByCalendar(key.date)
			}
			
		}
}

function initInputs(){

	const selector = $('select')
	const date = $('input#EVENT_DATE')

	const formSelect = '.form-select'
	const headerText = '.form-text'

	let _width = date.width()
	let dateObj = {}

	mobiscroll.settings = {
	    theme: 'bootstrap'
	};

	//select settings
	selector.each(function(){

		var $this = $(this)
		var _anchor = $this.closest(formSelect)
		var _width = _anchor.width() - 2
		var _headerText = _anchor.find(headerText).text();
		var _row = $this.find('option').length > 3 ? 5 : 3
		var _largerow = $this.find('option').length < 7 ? $this.find('option').length : 7
		var _defaul_value = $this.find('option:selected').text();
		var _placeholder = _defaul_value;

		var _datatype = $this.attr('id').split('_')[1]

		////console.log("_placeholder=",_placeholder)
		let tempselect = []
		

		$this.mobiscroll().select({
	        closeOnOverlayTap:false,
	        showOverlay: true,
	        showLabel:false,
	        inputClass: 'form-control form-control-lg',
	        showOnFocus:true,
	        headerText:_headerText,
	        cssClass:'mbsc-outline',
	        buttons:['set'],
	        height:50,
	        width:_width,
	        showScrollArrows:true,
	        placeholder:_placeholder,
			responsive: {
			    xsmall: {
			        display: 'bottom',
			        rows:_row,
			        touchUi:true,
			    },
			    medium:{
			    	display: 'center',
			        closeOnOverlayTap:true,
			        width:300,
			    },
			    large: {
			    	scrollLock:false,
			        display: 'bubble',
			        buttons:[],
			        headerText: false,
	        		width:_width,
	        		closeOnOverlayTap:true,
	        		touchUi:false,
	        		rows:_largerow,
			    }
			},
			onInit:function(event, inst){

				_anchor.addClass('initialized')

				let values = Object.values(inst._tempSelected[0])
				////console.log('init:',inst._value)
				handleResult(values,_datatype,_defaul_value)

			},
			onShow: function(event, inst){

				_anchor.addClass('active')

			},
			onChange:function (event, inst) {

				console.log("selector on change!")


				console.log(inst._tempValue,"inst_value=",inst)

				let values = Object.values(inst._tempSelected[0])

				console.log('values=',values)

				if( values == "" ){

					inst.setVal([""],true)

				}else{

					values = values.filter(item => item != "");
					handleResult(values,_datatype,_defaul_value)

				}

				//if calendar has val
				let calendarIns = $('input#EVENT_DATE').mobiscroll('getInst');
				if( calendarIns._value != null ){
					calendarIns.clear()
				}

				let hasgrouped = eventlist.hasClass('events-grouped');
				//console.log("hasgrouped=",hasgrouped)
				if(hasgrouped){
					ungroupEvents()
				}

				console.log('values=',values)

				

			},
		    onClose: function (event, inst) {

		    	_anchor.removeClass('active')

		    }
		})

	})

	//calendar settings
    date.mobiscroll().range({
        controls: ['calendar'],
        tabs:false,
        showSelector:false,
        headerText:false,
        yearChange:false,
        buttons:['clear','set'],
        clearText:'Reset',
		responsive: {
		    xsmall: {
		        display: 'bottom'
		    },
		    medium:{
		    	display: 'center'
		    },
		    large: {
		        display: 'bubble',
		        maxWidth:_width
		    }
		},
	    onInit: function (event, inst) {

	    	$(this).closest(formSelect).addClass('initialized')
			//var type = inst.element.name.split('_')[1]
			//handleResult(inst._value,type)
	    }, 
	    onBeforeShow: function(event,inst){

			let typeinst = $('#EVENT_TYPE').mobiscroll('getInst');
			let topicinst = $('#EVENT_TOPIC').mobiscroll('getInst');

			console.log(typeinst,topicinst)

			let noneselected = ( typeinst._wheelArray == [""] && typeinst._wheelArray == [""]) ? true : false
			
			console.log('noneselected=',noneselected)

			if(!noneselected){
				typeinst.setVal([""],true)
				topicinst.setVal([""],true)
			}

	    },
	    onClear(event, inst){

			var type = inst.element.name.split('_')[1]
			
			dateObj.startDate = null
			dateObj.endDate = null

			handleResult(dateObj,type)
	    },
	    onShow(event, inst){

			$(this).closest(formSelect).addClass('active')

	    },
	    onClose: function (event, inst) {

	    	$(this).closest(formSelect).removeClass('active')

	    },
	    onSet: function (event, inst) {
			var type = inst.element.name.split('_')[1]

			dateObj.startDate =  moment(inst._startDate)
			dateObj.endDate =  moment(inst._endDate)

			handleResult(dateObj,type)
	    }
    });


}




function app(){

	setUpItem()
	initInputs()
	formatingDate(card)

}
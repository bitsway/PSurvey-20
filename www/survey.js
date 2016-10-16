

function homePage() {
	
	$.afui.loadContent("#imagePage",true,true,'right');
}
function marketPage() {
	localStorage.click_flag=0;
	$.afui.loadContent("#marketPage",true,true,'right');
}
function page_doctor_campaign(){
	$.afui.loadContent("#page_doctor_campaign",true,true,'right');
}
function page_doctor(){
	$("#item_load").hide();
	localStorage.click_flag=0;
	$.afui.loadContent("#page_doctor",true,true,'right');
}
function page_reports_dcr() {
	//$("#order_load").hide();
	$.afui.loadContent("#page_reports",true,true,'right');
}
function page_imageSingle() {
	//$("#order_load").hide();
	$.afui.loadContent("#imageSinglePage",true,true,'right');
}

//-------GET GEO LOCATION
function getLocation() {
	$("#error_prescription_submit").html("Confirming location. Please wait.");
	$("#btn_prescription_submit").hide();
	//$("#btn_prescription_submit").show();
	//var options = { enableHighAccuracy: false};
	var options = { enableHighAccuracy: false, timeout:15000};
	navigator.geolocation.getCurrentPosition(onSuccess, onError , options);	
	
}

// onSuccess Geolocation
function onSuccess(position) {
	$("#lat").val(position.coords.latitude);
	$("#long").val(position.coords.longitude);
	localStorage.latitude_found=position.coords.latitude;
	localStorage.longitude_found=position.coords.longitude;
	$("#error_prescription_submit").html("Location Confirmed");
	$("#btn_prescription_submit").show();
	//$("#btn_loc_submit").hide();
}

// onError Callback receives a PositionError object
function onError(error) {
   $("#lat").val(0);
   $("#long").val(0);
   
   $("#error_prescription_submit").html("Location can not be confirmed. Last recorded location will be used.");
   $("#btn_prescription_submit").show();
 //  $("#btn_loc_submit").hide();
  // $("#btn_prescription_submit").hide();
  // $("#btn_loc_submit").show();
}



					
//========================= Longin: Check user

function check_user() {
	
	
	var cid=$("#cid").val().toUpperCase();
	cid=$.trim(cid);
	

	
	//Main

	//
//	//var  apipath_base_photo_dm='http://c003.cloudapp.net/mrepacme/syncmobile_prescription/dm_prescription_path?CID='+cid +'&HTTPPASS=e99business321cba'
	//var  apipath_base_photo_dm='http://127.0.0.1:8000/skf/syncmobile_prescription/dm_prescription_path?CID='+cid +'&HTTPPASS=e99business321cba'

	var  apipath_base_photo_dm='http://a002.businesssolutionapps.com/skf/syncmobile_prescription/dm_prescription_path?CID='+cid +'&HTTPPASS=e99business321cba'
	
	
	var user_id=$("#user_id").val();
	var user_pass=$("#user_pass").val();
	
	user_id=$.trim(user_id);
	
	
	//-----
	
	if (user_id=="" || user_id==undefined || user_pass=="" || user_pass==undefined){
		//alert ('NNNN');
		//url = "#login";      
		//$.mobile.navigate(url);
		$("#error_login").html("Required User ID and Password");	
	}else{
		//-----------------
		
		localStorage.base_url='';
	    localStorage.photo_url='';
		localStorage.photo_submit_url='';
		localStorage.visit_client=''
		
		
		localStorage.latitude_found=0;
		localStorage.longitude_found=0;
		
		//alert(apipath_base_photo_dm);
		$("#loginButton").hide();
		$("#wait_image_login").show();
		
		$("#error_login").html('');
		
		$.ajax(apipath_base_photo_dm,{
				type: 'POST',
				timeout: 30000,
				error: function(xhr) {
				//alert ('Error: ' + xhr.status + ' ' + xhr.statusText);
				$("#wait_image_login").hide();
				$("#loginButton").show();
				$("#error_login").html('Network timeout. Please ensure data connectivity and re-submit.');
									},
				success:function(data, status,xhr){
			//	alert (status)
				
		
		//alert (apipath_base_photo_dmStatus)
		//$.post(apipath_base_photo_dm,{},
//    	function(data, status){
			
			if (status=='success'){
				localStorage.base_url='';
				
				var dtaStr=data.replace('<start>','').replace('<end>','')
				var resultArray = dtaStr.split('<fd>');		
					if(resultArray.length==3){
						base_url=resultArray[0];
						photo_url=resultArray[1];
						photo_submit_url=resultArray[2];
						
						//-------------
						if(base_url=='' || photo_url==''){	
							$("#wait_image_login").hide();
							$("#loginButton").show();
							$("#error_login").html('Base URL not available');	
						}else{
							//--------------------------
							
							localStorage.base_url=base_url;
							localStorage.photo_url=photo_url;
							localStorage.photo_submit_url=photo_submit_url;
							
							localStorage.cid=cid;
							localStorage.user_id=user_id;
							localStorage.user_pass=user_pass;   		
							localStorage.synced='NO'
							
							//===================================
							$("#test").val(localStorage.base_url+'check_user?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode);
							//$.post(localStorage.base_url+'check_user?',{cid: localStorage.cid,rep_id:localStorage.user_id,rep_pass:localStorage.user_pass,synccode:localStorage.synccode},
							
							 $.ajax(localStorage.base_url+'check_user?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode,{
								// cid:localStorage.cid,rep_id:localStorage.user_id,rep_pass:localStorage.user_pass,synccode:localStorage.synccode,
								type: 'POST',
								timeout: 30000,
								error: function(xhr) {
								//alert ('Error: ' + xhr.status + ' ' + xhr.statusText);
								$("#wait_image_login").hide();
								$("#loginButton").show();
								$("#error_login").html('Network timeout. Please ensure data connectivity and re-submit.');
													},
								success:function(data, status,xhr){
					
								//alert (localStorage.cid)
							// $.post(localStorage.base_url+'check_user?',{cid: localStorage.cid,rep_id:localStorage.user_id,rep_pass:localStorage.user_pass,synccode:localStorage.synccode},
//    						 
//								
//								 function(data, status){
									 if (status!='success'){
										$("#wait_image_login").hide();
										$("#loginButton").show();
										$("#error_login").html('Sorry Network not available');
									 }
									 else{	
														
										var resultArray = data.replace('</START>','').replace('</END>','').split('<SYNCDATA>');	
										
										if (resultArray[0]=='FAILED'){
											$("#wait_image_login").hide();
											$("#loginButton").show();								
											//$("#error_login").html(resultArray[1]);
											$("#test").val(localStorage.base_url+'check_user?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode);
										}
										else if (resultArray[0]=='SUCCESS'){
											localStorage.synced='YES'		
											localStorage.synccode=resultArray[1];
											localStorage.marketListStr=resultArray[2];
											localStorage.productListStr=resultArray[3];
											region_string=resultArray[10];
											localStorage.user_type=resultArray[16];
											localStorage.market_doctor=resultArray[17];
											//alert (localStorage.menu);

											
											
											var productList=localStorage.productListStr.split('<rd>');
											var productLength=productList.length;
											var product_tbl_doc_campaign=''
											

												for (j=0; j < productLength; j++){
													var productArray = productList[j].split('<fd>');
													var product_id=productArray[0];	
													var product_name=productArray[1];
													product_tbl_doc_campaign=product_tbl_doc_campaign+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin " onClick="check_boxTrue(\''+product_id+'\')"  > '+'<table width="100%" border="0" id="order_tbl" cellpadding="0" cellspacing="0" style="border-radius:5px;">'+'<tr style="border-bottom:1px solid #D2EEE9;"><td width="60px" style="text-align:center; padding-left:5px;"><input class="docCampaign" type="checkbox" onClick="getDocCampaignData_keyup(\''+product_id+'\')" name="doc_camp'+product_id+'" value="checkbox" id="doc_camp'+product_id+'"><label for="doc_camp'+product_id+'"></br></label><input type="hidden" id="doc_camp_id'+product_id+'" value="'+product_id+'" ></td><td  style="text-align:left;">'+'</br><font id="'+ product_id +'" onClick="check_boxTrue(\''+product_id+'\')" class="name" >'+ product_name.toUpperCase()+'</font></td></tr>'+'</table>'+'</li>';
													//$("#error_login").html('Processing Product List....');	
												}
									
											
											$("#campaign_combo_id_lv").empty()
											$("#campaign_combo_id_lv").append(product_tbl_doc_campaign);
											//$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaignHead+localStorage.product_tbl_doc_campaign_1+localStorage.product_tbl_doc_campaign_2+localStorage.product_tbl_doc_campaign_3+localStorage.product_tbl_doc_campaign_4+localStorage.product_tbl_doc_campaign_5+localStorage.product_tbl_doc_campaignEnd);
											
											//================Market
													var planMarketList = localStorage.marketListStr.split('<rd>');
													var planMarketListShowLength=planMarketList.length	
													
													var visitPlanMarketComb=''								
													var profileMarketComb='';								
													var unscheduleMarketComb='';
													alert ('asd')
													for (var k=0; k < planMarketListShowLength; k++){
														var planMarketValueArray = planMarketList[k].split('<fd>');
														planMarketID=planMarketValueArray[0];
														planMarketName=planMarketValueArray[1];
														marketID=planMarketID
														marketName=planMarketName
														var marketNameID=planMarketName+'|'+planMarketID;
														//alert (marketNameID);
														if(planMarketID!=''){
															unscheduleMarketComb+='<li class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-location" style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><a   onClick="marketNext_doc(\''+marketNameID+'\')"><font class="name">'+marketNameID+'</font></a></li>';

															}
													}
																				
													$("#error_login").html('Synced Successfully');	
													$("#wait_image_login").hide();
													$("#loginButton").show();			
													localStorage.unschedule_market_cmb_id=unscheduleMarketComb;
													//alert(localStorage.unschedule_market_cmb_id);
													$('#market_combo_id_lv').empty();
													$('#market_combo_id_lv').append(localStorage.unschedule_market_cmb_id);
													$.afui.loadContent("#imagePage",true,true,'right');	
										}
									 }
									
							
									
								//});
							
							}///////////
            })////////////
							
							
							
						}
					}
			}
			else{
				$("#wait_image_login").hide();
				$("#loginButton").show();
				$("#error_login").html('Base URL not available');
			}
     
   // });

		}///////////
            })////////////
		
		  }//end else	
	}//function


function setProductList() {
	var productList=localStorage.productListStr.split('<rd>');
	var productLength=productList.length;
	var product_tbl_doc_campaign=''
	

		for (j=0; j < productLength; j++){
			
			var productArray = productList[j].split('<fd>');
			var product_id=productArray[0];	
			var product_name=productArray[1];
			product_tbl_doc_campaign=product_tbl_doc_campaign+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin " onClick="check_boxTrue(\''+product_id+'\')"  > '+'<table width="100%" border="0" id="order_tbl" cellpadding="0" cellspacing="0" style="border-radius:5px;">'+'<tr style="border-bottom:1px solid #D2EEE9;"><td width="60px" style="text-align:center; padding-left:5px;"><input class="docCampaign" type="checkbox" onClick="getDocCampaignData_keyup(\''+product_id+'\')" name="doc_camp'+product_id+'" value="checkbox" id="doc_camp'+product_id+'"><label for="doc_camp'+product_id+'"></br></label><input type="hidden" id="doc_camp_id'+product_id+'" value="'+product_id+'" ></td><td  style="text-align:left;">'+'</br><font id="'+ product_id +'" onClick="check_boxTrue(\''+product_id+'\')" class="name" >'+ product_name.toUpperCase()+'</font></td></tr>'+'</table>'+'</li>';
			//$("#error_login").html('Processing Product List....');	
		}

	
	$("#campaign_combo_id_lv").empty()
	$("#campaign_combo_id_lv").append(product_tbl_doc_campaign);
}



function gotoMarket(pic_no) {
	//alert (pic_no)
	if (pic_no!=localStorage.pic_no){
		//$("#campaign_combo_id_lv").empty()
//		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign);
		$('input:checkbox').attr('checked',false);
		$("#itemSearch").val('A')
		searchItem()
	}
	localStorage.pic_no=pic_no
	
	var prescriptionPhoto_1=$("#prescriptionPhoto_1").val();
	var prescriptionPhoto_2=$("#prescriptionPhoto_2").val();
	var prescriptionPhoto_3=$("#prescriptionPhoto_3").val();
	var prescriptionPhoto_4=$("#prescriptionPhoto_4").val();
	var prescriptionPhoto_5=$("#prescriptionPhoto_5").val();
	var prescriptionPhoto_6=$("#prescriptionPhoto_6").val();
	var prescriptionPhoto_7=$("#prescriptionPhoto_7").val();
	var prescriptionPhoto_8=$("#prescriptionPhoto_8").val();
	var prescriptionPhoto_9=$("#prescriptionPhoto_9").val();
	var prescriptionPhoto_10=$("#prescriptionPhoto_10").val();
	var prescriptionPhoto_11=$("#prescriptionPhoto_11").val();
	var prescriptionPhoto_12=$("#prescriptionPhoto_12").val();
	var prescriptionPhoto_13=$("#prescriptionPhoto_13").val();
	var prescriptionPhoto_14=$("#prescriptionPhoto_14").val();
	var prescriptionPhoto_15=$("#prescriptionPhoto_15").val();
	var prescriptionPhoto_16=$("#prescriptionPhoto_16").val();
	var prescriptionPhoto_17=$("#prescriptionPhoto_17").val();
	var prescriptionPhoto_18=$("#prescriptionPhoto_18").val();
	var prescriptionPhoto_19=$("#prescriptionPhoto_19").val();
	var prescriptionPhoto_20=$("#prescriptionPhoto_20").val();
			
	var error_flag=0
	
	if (localStorage.pic_no ==1){
		if (prescriptionPhoto_1==''){
			var error_flag=1
		}
		else{
			var image1 = document.getElementById('myImagePrescription_1');
			image1.src = localStorage.prescriptionPhoto_1;
			$("#myImagePrescription_show").val(localStorage.prescriptionPhoto_1)
		}
	}
	if (localStorage.pic_no ==2){
		if (prescriptionPhoto_2==''){
			var error_flag=1
		}
		else{
			var image2 = document.getElementById('myImagePrescription_2');
			image2.src = localStorage.prescriptionPhoto_2;
			$("#myImagePrescription_show").val(localStorage.prescriptionPhoto_2)
		}
		
	}
	if (localStorage.pic_no ==3){
		if (prescriptionPhoto_3==''){
			var error_flag=1
		}
		else{
			var image3 = document.getElementById('myImagePrescription_3');
			image3.src = localStorage.prescriptionPhoto_3;
			$("#myImagePrescription_show").val(localStorage.prescriptionPhoto_3)
		}
	}
	
	if (localStorage.pic_no ==4){
		if (prescriptionPhoto_4==''){
			var error_flag=1
		}
		else{
			var image4 = document.getElementById('myImagePrescription_4');
			image4.src = localStorage.prescriptionPhoto_4;
			$("#myImagePrescription_show").val(localStorage.prescriptionPhoto_4)
		}
	}if (localStorage.pic_no ==5){
		if (prescriptionPhoto_5==''){
			var error_flag=1
		}
		else{
			var image5 = document.getElementById('myImagePrescription_5');
			image5.src = localStorage.prescriptionPhoto_5;
			$("#myImagePrescription_show").val(localStorage.prescriptionPhoto_5)
		}
	}if (localStorage.pic_no ==6){
		if (prescriptionPhoto_6==''){
			var error_flag=1
		}
		else{
			var image6 = document.getElementById('myImagePrescription_6');
			image6.src = localStorage.prescriptionPhoto_6;
			$("#myImagePrescription_show").val(localStorage.prescriptionPhoto_6)
		}
	}if (localStorage.pic_no ==7){
		if (prescriptionPhoto_7==''){
			var error_flag=1
		}
		else{
			var image7 = document.getElementById('myImagePrescription_7');
			image7.src = localStorage.prescriptionPhoto_7;
			$("#myImagePrescription_show").val(localStorage.prescriptionPhoto_7)
		}
	}if (localStorage.pic_no ==8){
		if (prescriptionPhoto_8==''){
			var error_flag=1
		}
		else{
			var image8 = document.getElementById('myImagePrescription_8');
			image8.src = localStorage.prescriptionPhoto_8;
			$("#myImagePrescription_show").val(localStorage.prescriptionPhoto_8)
		}
	}if (localStorage.pic_no ==9){
		if (prescriptionPhoto_9==''){
			var error_flag=1
		}
		else{
			var image9 = document.getElementById('myImagePrescription_9');
			image9.src = localStorage.prescriptionPhoto_9;
			$("#myImagePrescription_show").val(localStorage.prescriptionPhoto_9)
		}
	}if (localStorage.pic_no ==10){
		if (prescriptionPhoto_10==''){
			var error_flag=1
		}
		else{
			var image10 = document.getElementById('myImagePrescription_10');
			image10.src = localStorage.prescriptionPhoto_10;
			$("#myImagePrescription_show").val(localStorage.prescriptionPhoto_10)
		}
	}if (localStorage.pic_no ==11){
		if (prescriptionPhoto_11==''){
			var error_flag=1
		}
		else{
			var image11 = document.getElementById('myImagePrescription_11');
			image11.src = localStorage.prescriptionPhoto_11;
			$("#myImagePrescription_show").val(localStorage.prescriptionPhoto_11)
		}
	}if (localStorage.pic_no ==12){
		if (prescriptionPhoto_12==''){
			var error_flag=1
		}
		else{
			var image12 = document.getElementById('myImagePrescription_12');
			image12.src = localStorage.prescriptionPhoto_12;
			$("#myImagePrescription_show").val(localStorage.prescriptionPhoto_12)
		}
	}
	if (localStorage.pic_no ==13){
		if (prescriptionPhoto_13==''){
			var error_flag=1
		}
		else{
			var image13 = document.getElementById('myImagePrescription_13');
			image13.src = localStorage.prescriptionPhoto_13;
			$("#myImagePrescription_show").val(localStorage.prescriptionPhoto_13)
		}
	}
	if (localStorage.pic_no ==14){
		if (prescriptionPhoto_14==''){
			var error_flag=1
		}
		else{
			var image14 = document.getElementById('myImagePrescription_14');
			image14.src = localStorage.prescriptionPhoto_14;
			$("#myImagePrescription_show").val(localStorage.prescriptionPhoto_14)
		}
	}
	if (localStorage.pic_no ==15){
		if (prescriptionPhoto_15==''){
			var error_flag=1
		}
		else{
			var image15 = document.getElementById('myImagePrescription_15');
			image15.src = localStorage.prescriptionPhoto_15;
			$("#myImagePrescription_show").val(localStorage.prescriptionPhoto_15)
		}
	}
	if (localStorage.pic_no ==16){
		if (prescriptionPhoto_16==''){
			var error_flag=1
		}
		else{
			var image16 = document.getElementById('myImagePrescription_16');
			image16.src = localStorage.prescriptionPhoto_16;
			$("#myImagePrescription_show").val(localStorage.prescriptionPhoto_16)
		}
	}
	if (localStorage.pic_no ==17){
		if (prescriptionPhoto_17==''){
			var error_flag=1
		}
		else{
			var image17 = document.getElementById('myImagePrescription_17');
			image17.src = localStorage.prescriptionPhoto_17;
			$("#myImagePrescription_show").val(localStorage.prescriptionPhoto_17)
		}
	}
	if (localStorage.pic_no ==18){
		if (prescriptionPhoto_18==''){
			var error_flag=1
		}
		else{
			var image18 = document.getElementById('myImagePrescription_18');
			image18.src = localStorage.prescriptionPhoto_18;
			$("#myImagePrescription_show").val(localStorage.prescriptionPhoto_18)
		}
	}
	if (localStorage.pic_no ==19){
		if (prescriptionPhoto_19==''){
			var error_flag=1
		}
		else{
			var image19 = document.getElementById('myImagePrescription_19');
			image19.src = localStorage.prescriptionPhoto_19;
			$("#myImagePrescription_show").val(localStorage.prescriptionPhoto_19)
		}
	}
	if (localStorage.pic_no ==20){
		if (prescriptionPhoto_20==''){
			var error_flag=1
		}
		else{
			var image20 = document.getElementById('myImagePrescription_20');
			image20.src = localStorage.prescriptionPhoto_20;
			$("#myImagePrescription_show").val(localStorage.prescriptionPhoto_20)
		}
	}
	
	//alert (localStorage.synced)
	if (localStorage.synced='YES'){
		if (error_flag==1  ){
			$.afui.loadContent("#imageSinglePage",true,true,'right');
		}
		else{
			$("#error_image").html('Required picture');
			
		}
	}
	else{
		$("#error_image").html('Please Sync first');
		
	}
	
	
}

function marketNext_doc(marketNameID) {
	alert ('sd')
 if (localStorage.click_flag==0){
	 localStorage.click_flag=1;
			localStorage.visit_market_show=marketNameID
			market_name=localStorage.visit_market_show
			if(market_name=='' || market_name==0){
					$("#err_market_next").text("Market required");
				}else{
					$("#err_market_next").text("");			
					$("#btn_unschedule_market").hide();
					$("#wait_image_unschedule_market").show();		
					
					
					var marketNameId=market_name.split('|');
					var market_Id=marketNameId[1];
					
					var visit_type="Unscheduled";
					var scheduled_date="";
					
					
					result=localStorage.market_doctor
					
					var resultArray = result.split('</'+market_Id+'>');
					var doc_result_list=resultArray[0].split('<'+market_Id+'>')
					var doc_result=doc_result_list[1]
					
					
					//alert (doc_result)
					if (result==''){
						$("#err_market_next").text("Sorry Network not available");	
						$("#wait_image_unschedule_market").hide();		
						$("#btn_unschedule_market").show();
					}else{					
		
						//-----------------------------------
							if ((doc_result== undefined) || (doc_result== 'undefined')){
								$("#err_market_next").text("Doctor not available");	
								$("#wait_image_unschedule_market").hide();		
								$("#btn_unschedule_market").show();
								
							}
							else{
							
								
								var mClientList = doc_result.split('<rd>');
								var mClientListShowLength=mClientList.length	
								
								
								//var unscheduled_m_client_list='<option value="0" > Select Retailer</option>'
								var unscheduled_m_client_list=''
								for ( i=0; i < mClientListShowLength; i++){
									var mClientValueArray = mClientList[i].split('<fd>');
									var mClientID=mClientValueArray[0];
									var mClientName=mClientValueArray[1];
									//alert (mClientID)
									if(mClientID!=''){
			
										unscheduled_m_client_list+='<li class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-location" style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><a onClick="marketRetailerNext_doc(\''+mClientName+'|'+mClientID+'\')" ><font class="name">'+mClientName+'|'+mClientID+'</font></a></li>';
										}								
								}
											
											
								//var unscheduled_m_client_combo_ob=$('#unscheduled_m_client_combo_id');
								
								
								var unscheduled_m_client_combo_ob=$('#doctor_combo_id_lv');
								
								unscheduled_m_client_combo_ob.empty()
								unscheduled_m_client_combo_ob.append(unscheduled_m_client_list);
											
								$(".market").html(market_name);								
								$(".visit_type").html(visit_type);								
								$(".s_date").html(scheduled_date);
								localStorage.visit_type=visit_type
								//localStorage.scheduled_date=scheduled_date
											
											//-----------------------------------
											$("#err_market_next").text("");
											$("#wait_image_unschedule_market").hide();		
											$("#btn_unschedule_market").show();
											
											//------- 
											$("#item_load").hide();
											$.afui.loadContent("#page_doctor",true,true,'right');
		
											localStorage.click_flag=0;
										}
							
							}
				
					
				}	
				
 	}
}



function marketRetailerNext_doc(mClientNameID) {
	$("#item_load").show();
	if (localStorage.click_flag==0){
			localStorage.click_flag==1
			visit_client=mClientNameID;		
			localStorage.visit_client=visit_client
			if(visit_client=='' || visit_client==0){
					$("#err_m_retailer_next").text("Retailer required");
			}else{
				$("#btn_unschedule_market_ret").hide();
				$("#unscheduled_m_client_combo_id_lv").hide();
				
				//alert ('nn');
				$("#wait_image_ret").show();		
				
				
				$(".visit_client").html(localStorage.visit_client);
				
				localStorage.visit_client_show=visit_client
				if (visit_client!=localStorage.visit_client){
					
					localStorage.productGiftStr=''
					localStorage.campaign_doc_str=''
					localStorage.productSampleStr=''
					
					localStorage.productppmStr='';
					
					localStorage.campaign_show_1='';
					localStorage.gift_show_1='';
					localStorage.sample_show_1='';
					localStorage.ppm_show_1='';
					
				}
				
					
				localStorage.visit_client=visit_client
		
				
				
				//--------
				$("#wait_image_unschedule_market_ret").hide();		
				
				$("#unscheduled_m_client_combo_id_lv").show();
				$("#wait_image_ret").hide();
				
				
				//$.afui.loadContent("#page_doctor_campaign",true,true,'right');
				localStorage.click_flag==0;
				$("#err_m_retailer_next").html('Doctor Fixed. <font style=" font-size:16px">'+localStorage.visit_client+'</font>');
				$("#item_load").hide();
				//$("#doctor_campaign_list_tbl").html(localStorage.product_tbl_str_doc_campaign);
		
				//$('#campaign_combo_id_lv').listview();
				//location.reload();
				//alert (localStorage.product_tbl_doc_campaign)
								
				//$("#item_load").hide();	
			
			}
	}
}




function getDocCampaignData(){	
	alert (localStorage.campaign_doc_str.length)
    if  (localStorage.campaign_doc_str.length < 5){
	
	$("#myerror_doctor_campaign").html('Please select minimum one Item');
	//$.afui.loadContent("#page_prescription",true,true,'right');		
	}
	else{
		$.afui.loadContent("#page_prescription",true,true,'right');
	}
}
function check_boxTrue(product_id){	
	alert (product_id);
	var camp_combo="#doc_camp"+product_id
	var camp_combo_val=$(camp_combo).is(":checked")
	if (camp_combo_val==false){
		$(camp_combo).prop('checked', true);
		getDocCampaignData_keyup(product_id)
	}
	else{
		$(camp_combo).prop('checked', false);
		getDocCampaignData_keyup(product_id)
	}
	}

function getDocCampaignData_keyup(product_id){
	alert (product_id)
	var pid=$("#doc_camp_id"+product_id).val();
	var pname=$("#doc_camp_name"+product_id).val();
	var camp_combo="#doc_camp"+product_id
	
	var camp_combo_val=$(camp_combo).is(":checked")
	

	var campaign_doc_str=localStorage.campaign_doc_str
	var campaign_docShowStr='';
	var campaign_doc_strList="";
        var campaign_doc_strListLength=0;
        var campaign_docProductId="";
	
	if (camp_combo_val == true ){
		if (campaign_doc_str.indexOf(pid)==-1){
			if (campaign_doc_str==''){
				campaign_doc_str=pid
				productOrderShowStr=pname
				campaign_doc_str=pid+'<fd>'+pname
			}else{
				campaign_doc_str=campaign_doc_str+'<rd>'+pid+'<fd>'+pname
			}	
		}
		else{
			campaign_doc_strList=localStorage.campaign_doc_str.split('<rd>');
			campaign_doc_strListLength=campaign_doc_strList.length;
			for (j=0; j < orderProductLength; j++){
					campaign_docProductId=campaign_doc_strList[j];

					if (campaign_docProductId==pid){
						campaign_doc_str=campaign_doc_str.replace(campaign_docProductId, "")
						
						
						if (campaign_doc_str==''){
							campaign_doc_str=pid
							//productOrderShowStr=pname+'('+pqty+')'
						}else{
							campaign_doc_str=campaign_doc_str+'<rd>'+pid+'<fd>'+pname
							//productOrderShowStr=productOrderShowStr+', '+pname+'('+orderProductQty+')'
							}		
					}
			}
		}
		localStorage.campaign_doc_str=campaign_doc_str;
		
		
	}
	else{
		campaign_doc_strList=localStorage.campaign_doc_str.split('<rd>');
		campaign_doc_strListLength=campaign_doc_strList.length;
		
		for (j=0; j < campaign_doc_strListLength; j++){
		  campaign_docProductId=campaign_doc_strList[j].split('<fd>')[0]
				//alert (campaign_docProductId)
				product_index=campaign_doc_str.indexOf(campaign_docProductId)
				
				if (campaign_docProductId==pid){
					
					if (campaign_doc_strListLength>1){
						
						if (product_index==0){
							
							campaign_doc_str=campaign_doc_str.replace(campaign_doc_strList[j]+'<rd>', "")
						}
						if (product_index > 0){
							//alert ('2')
							campaign_doc_str=campaign_doc_str.replace('<rd>'+campaign_doc_strList[j], "")
						}
					}
					if (campaign_doc_strListLength==1){
							campaign_doc_str=campaign_doc_str.replace(campaign_doc_strList[j], "")
						
					}
			}
		}
		localStorage.campaign_doc_str=campaign_doc_str;
		//alert (localStorage.campaign_doc_str)
	}
	alert (localStorage.campaign_doc_str)
	}






function addMarketList() {
	$("#unschedule_market_combo_id").val('');
	var unschedule_market_combo_list=localStorage.unschedule_market_cmb_id;

	$('#unschedule_market_combo_id_lv').empty();
	$('#unschedule_market_combo_id_lv').append(unschedule_market_combo_list);
	
	//-------	
	//var url = "#marketPage";
	//$.mobile.navigate(url);
	//unschedule_market_combo_ob.listview("refresh");
}


//============================================================
function prescription_submit(){
	$("#error_prescription_submit").html("")		
	$("#wait_image_prescription").show();
	$("#btn_prescription_submit").hide();
	
	var doctorId=localStorage.visit_client.split('|')[1]	
	var doctor_name=localStorage.visit_client.split('|')[0]
	
	var areaId=localStorage.visit_market_show.split('|')[1]
	
	if (doctor_name==''){		
		$("#error_prescription_submit").text("Required Doctor");
		$("#wait_image_prescription").show();
		$("#btn_prescription_submit").hide();
	}else{
		
		var latitude=$("#lat").val();
		var longitude=$("#long").val();		
		var prescriptionPhoto
		var prescriptionPhoto_1=$("#prescriptionPhoto_1").val();
		var prescriptionPhoto_2=$("#prescriptionPhoto_2").val();
		var prescriptionPhoto_3=$("#prescriptionPhoto_3").val();
		var prescriptionPhoto_4=$("#prescriptionPhoto_4").val();
		var prescriptionPhoto_5=$("#prescriptionPhoto_5").val();
		var prescriptionPhoto_6=$("#prescriptionPhoto_6").val();
		var prescriptionPhoto_7=$("#prescriptionPhoto_7").val();
		var prescriptionPhoto_8=$("#prescriptionPhoto_8").val();
		var prescriptionPhoto_9=$("#prescriptionPhoto_9").val();
		var prescriptionPhoto_10=$("#prescriptionPhoto_10").val();
		var prescriptionPhoto_11=$("#prescriptionPhoto_11").val();
		var prescriptionPhoto_12=$("#prescriptionPhoto_12").val();
		var prescriptionPhoto_13=$("#prescriptionPhoto_13").val();
		var prescriptionPhoto_14=$("#prescriptionPhoto_14").val();
		var prescriptionPhoto_15=$("#prescriptionPhoto_15").val();
		var prescriptionPhoto_16=$("#prescriptionPhoto_16").val();
		var prescriptionPhoto_17=$("#prescriptionPhoto_17").val();
		var prescriptionPhoto_18=$("#prescriptionPhoto_18").val();
		var prescriptionPhoto_19=$("#prescriptionPhoto_19").val();
		var prescriptionPhoto_20=$("#prescriptionPhoto_20").val();
		
		localStorage.prescriptionPhoto_1 = prescriptionPhoto_1;
		localStorage.prescriptionPhoto_2 = prescriptionPhoto_2;
		localStorage.prescriptionPhoto_3 = prescriptionPhoto_3;
		localStorage.prescriptionPhoto_4 = prescriptionPhoto_4;
		localStorage.prescriptionPhoto_5 = prescriptionPhoto_5;
		localStorage.prescriptionPhoto_6 = prescriptionPhoto_6;
		localStorage.prescriptionPhoto_7 = prescriptionPhoto_7;
		localStorage.prescriptionPhoto_8 = prescriptionPhoto_8;
		localStorage.prescriptionPhoto_9 = prescriptionPhoto_9;
		localStorage.prescriptionPhoto_10 = prescriptionPhoto_10;
		localStorage.prescriptionPhoto_11 = prescriptionPhoto_11;
		localStorage.prescriptionPhoto_12 = prescriptionPhoto_12;
		localStorage.prescriptionPhoto_13 = prescriptionPhoto_13;
		localStorage.prescriptionPhoto_14 = prescriptionPhoto_14;
		localStorage.prescriptionPhoto_15 = prescriptionPhoto_15;
		localStorage.prescriptionPhoto_16 = prescriptionPhoto_16;
		localStorage.prescriptionPhoto_17 = prescriptionPhoto_17;
		localStorage.prescriptionPhoto_18 = prescriptionPhoto_18;
		localStorage.prescriptionPhoto_19 = prescriptionPhoto_19;
		localStorage.prescriptionPhoto_20 = prescriptionPhoto_20;
		
		
		if (localStorage.pic_no==1){
			prescriptionPhoto=$("#prescriptionPhoto_1").val();
		}
		else if (localStorage.pic_no==2){
			prescriptionPhoto=$("#prescriptionPhoto_2").val();
		}
		else if (localStorage.pic_no==3){
			prescriptionPhoto=$("#prescriptionPhoto_3").val();
		}
		else if (localStorage.pic_no==4){
			prescriptionPhoto=$("#prescriptionPhoto_4").val();
		}
		else if (localStorage.pic_no==5){
			prescriptionPhoto=$("#prescriptionPhoto_5").val();
		}
		else if (localStorage.pic_no==6){
			prescriptionPhoto=$("#prescriptionPhoto_6").val();
		}
		else if (localStorage.pic_no==7){
			prescriptionPhoto=$("#prescriptionPhoto_7").val();
		}
		else if (localStorage.pic_no==8){
			prescriptionPhoto=$("#prescriptionPhoto_8").val();
		}
		else if (localStorage.pic_no==9){
			prescriptionPhoto=$("#prescriptionPhoto_9").val();
		}
		else if (localStorage.pic_no==10){
			prescriptionPhoto=$("#prescriptionPhoto_10").val();
		}
		else if (localStorage.pic_no==11){
			prescriptionPhoto=$("#prescriptionPhoto_11").val();
		}
		else if (localStorage.pic_no==12){
			prescriptionPhoto=$("#prescriptionPhoto_12").val();
		}
		else if (localStorage.pic_no==13){
			prescriptionPhoto=$("#prescriptionPhoto_13").val();
		}
		else if (localStorage.pic_no==14){
			prescriptionPhoto=$("#prescriptionPhoto_14").val();
		}
		else if (localStorage.pic_no==15){
			prescriptionPhoto=$("#prescriptionPhoto_15").val();
		}
		else if (localStorage.pic_no==16){
			prescriptionPhoto=$("#prescriptionPhoto_16").val();
		}
		else if (localStorage.pic_no==17){
			prescriptionPhoto=$("#prescriptionPhoto_17").val();
		}
		else if (localStorage.pic_no==18){
			prescriptionPhoto=$("#prescriptionPhoto_18").val();
		}
		else if (localStorage.pic_no==19){
			prescriptionPhoto=$("#prescriptionPhoto_19").val();
		}
		else if (localStorage.pic_no==20){
			prescriptionPhoto=$("#prescriptionPhoto_20").val();
		}
		//prescriptionPhoto='dasdfadf'
		//if (prescriptionPhoto==''){
//			$("#error_prescription_submit").html('Required picture');
//			$("#wait_image_prescription").hide();
//			$("#btn_prescription_submit").show();
//		}else{			
			var now = $.now();
			var imageName=localStorage.user_id+'_'+now.toString()+'.jpg';
			//alert (imageName);
				
				
				$("#error_prescription_submittxt").val(localStorage.base_url+'prescription_submit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+encodeURIComponent(localStorage.user_pass)+'&synccode='+localStorage.synccode+'&areaId='+areaId+'&doctor_id='+encodeURIComponent(doctorId)+'&doctor_name='+encodeURIComponent(doctor_name)+'&latitude='+latitude+'&longitude='+longitude+'&pres_photo='+imageName+'&campaign_doc_str='+localStorage.campaign_doc_str)							

				 $.ajax(localStorage.base_url+'prescription_submit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+encodeURIComponent(localStorage.user_pass)+'&synccode='+localStorage.synccode+'&areaId='+areaId+'&doctor_id='+encodeURIComponent(doctorId)+'&doctor_name='+encodeURIComponent(doctor_name)+'&latitude='+latitude+'&longitude='+longitude+'&pres_photo='+imageName+'&campaign_doc_str='+localStorage.campaign_doc_str,{
								// cid:localStorage.cid,rep_id:localStorage.user_id,rep_pass:localStorage.user_pass,synccode:localStorage.synccode,
								type: 'POST',
								timeout: 30000,
								error: function(xhr) {
											var resultArray = data.split('<SYNCDATA>');
											$("#error_prescription_submit").html(resultArray[1]);
											$("#wait_image_prescription").hide();
											$("#btn_prescription_submit").show();
											
								},
							success:function(data, status,xhr){				

								if (status!='success'){
									
									$("#error_prescription_submit").html('Network timeout. Please ensure you have active internet connection.');
									$("#wait_image_prescription").hide();
									$("#btn_prescription_submit").show();
								}
								else{
									   var resultArray = data.split('<SYNCDATA>');	
										if (resultArray[0]=='FAILED'){						
											$("#error_prescription_submit").html(resultArray[1]);
											$("#wait_image_prescription").hide();
											$("#btn_prescription_submit").show();
										}else if (resultArray[0]=='SUCCESS'){									
											var result_string=resultArray[1];
											
											alert ('sfsdfsd');
											
										
											//image upload function									
											//uploadPhoto(prescriptionPhoto, imageName);
											//alert ('0')
											alert (localStorage.pic_no)
											if (localStorage.pic_no==1){								
												var image2 = document.getElementById('myImagePrescription_2');
    											image2.src = localStorage.prescriptionPhoto_2;
												$("#prescriptionPhoto_2").val(localStorage.prescriptionPhoto_2)
												
												var image3 = document.getElementById('myImagePrescription_3');
    											image3.src = localStorage.prescriptionPhoto_3;
												$("#prescriptionPhoto_3").val(localStorage.prescriptionPhoto_3)
												
												var image4 = document.getElementById('myImagePrescription_4');
    											image4.src = localStorage.prescriptionPhoto_4;
												$("#prescriptionPhoto_4").val(localStorage.prescriptionPhoto_4)
												
												var image5 = document.getElementById('myImagePrescription_5');
    											image5.src = localStorage.prescriptionPhoto_5;
												$("#prescriptionPhoto_5").val(localStorage.prescriptionPhoto_5)
												
												var image6 = document.getElementById('myImagePrescription_6');
    											image6.src = localStorage.prescriptionPhoto_6;
												$("#prescriptionPhoto_6").val(localStorage.prescriptionPhoto_6)
												
												var image7 = document.getElementById('myImagePrescription_7');
    											image7.src = localStorage.prescriptionPhoto_7;
												$("#prescriptionPhoto_7").val(localStorage.prescriptionPhoto_7)
												
												var image8 = document.getElementById('myImagePrescription_8');
    											image8.src = localStorage.prescriptionPhoto_8;
												$("#prescriptionPhoto_8").val(localStorage.prescriptionPhoto_8)
												
												var image9 = document.getElementById('myImagePrescription_9');
    											image9.src = localStorage.prescriptionPhoto_9;
												$("#prescriptionPhoto_9").val(localStorage.prescriptionPhoto_9)
												
												var image10 = document.getElementById('myImagePrescription_10');
    											image10.src = localStorage.prescriptionPhoto_10;
												$("#prescriptionPhoto_10").val(localStorage.prescriptionPhoto_10)
												
												var image11 = document.getElementById('myImagePrescription_11');
    											image11.src = localStorage.prescriptionPhoto_11;
												$("#prescriptionPhoto_11").val(localStorage.prescriptionPhoto_11)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image13 = document.getElementById('myImagePrescription_13');
    											image13.src = localStorage.prescriptionPhoto_13;
												$("#prescriptionPhoto_13").val(localStorage.prescriptionPhoto_13)
												
												var image14 = document.getElementById('myImagePrescription_14');
    											image14.src = localStorage.prescriptionPhoto_14;
												$("#prescriptionPhoto_14").val(localStorage.prescriptionPhoto_14)
												
												var image15 = document.getElementById('myImagePrescription_15');
    											image15.src = localStorage.prescriptionPhoto_15;
												$("#prescriptionPhoto_15").val(localStorage.prescriptionPhoto_15)
												
												var image16 = document.getElementById('myImagePrescription_16');
    											image16.src = localStorage.prescriptionPhoto_16;
												$("#prescriptionPhoto_16").val(localStorage.prescriptionPhoto_16)
												
												var image17 = document.getElementById('myImagePrescription_17');
    											image17.src = localStorage.prescriptionPhoto_17;
												$("#prescriptionPhoto_17").val(localStorage.prescriptionPhoto_17)
												
												var image18 = document.getElementById('myImagePrescription_18');
    											image18.src = localStorage.prescriptionPhoto_18;
												$("#prescriptionPhoto_18").val(localStorage.prescriptionPhoto_18)
												
												var image19 = document.getElementById('myImagePrescription_19');
    											image19.src = localStorage.prescriptionPhoto_19;
												$("#prescriptionPhoto_19").val(localStorage.prescriptionPhoto_19)
												
												var image20 = document.getElementById('myImagePrescription_20');
    											image20.src = localStorage.prescriptionPhoto_20;
												$("#prescriptionPhoto_20").val(localStorage.prescriptionPhoto_20)
												
												//alert (localStorage.pic_no)
												$("#prescriptionPhoto_1").val('');
												localStorage.prescriptionPhoto_1=''
												
											}
											else if (localStorage.pic_no==2){
												var image1 = document.getElementById('myImagePrescription_1');
    											image1.src = localStorage.prescriptionPhoto_1;
												$("#prescriptionPhoto_1").val(localStorage.prescriptionPhoto_1)
												
												var image3 = document.getElementById('myImagePrescription_3');
    											image3.src = localStorage.prescriptionPhoto_3;
												$("#prescriptionPhoto_3").val(localStorage.prescriptionPhoto_3)
												
												var image4 = document.getElementById('myImagePrescription_4');
    											image4.src = localStorage.prescriptionPhoto_4;
												$("#prescriptionPhoto_4").val(localStorage.prescriptionPhoto_4)
												
												var image5 = document.getElementById('myImagePrescription_5');
    											image5.src = localStorage.prescriptionPhoto_5;
												$("#prescriptionPhoto_5").val(localStorage.prescriptionPhoto_5)
												
												var image6 = document.getElementById('myImagePrescription_6');
    											image6.src = localStorage.prescriptionPhoto_6;
												$("#prescriptionPhoto_6").val(localStorage.prescriptionPhoto_6)
												
												var image7 = document.getElementById('myImagePrescription_7');
    											image7.src = localStorage.prescriptionPhoto_7;
												$("#prescriptionPhoto_7").val(localStorage.prescriptionPhoto_7)
												
												var image8 = document.getElementById('myImagePrescription_8');
    											image8.src = localStorage.prescriptionPhoto_8;
												$("#prescriptionPhoto_8").val(localStorage.prescriptionPhoto_8)
												
												var image9 = document.getElementById('myImagePrescription_9');
    											image9.src = localStorage.prescriptionPhoto_9;
												$("#prescriptionPhoto_9").val(localStorage.prescriptionPhoto_9)
												
												var image10 = document.getElementById('myImagePrescription_10');
    											image10.src = localStorage.prescriptionPhoto_10;
												$("#prescriptionPhoto_10").val(localStorage.prescriptionPhoto_10)
												
												var image11 = document.getElementById('myImagePrescription_11');
    											image11.src = localStorage.prescriptionPhoto_11;
												$("#prescriptionPhoto_11").val(localStorage.prescriptionPhoto_11)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image13 = document.getElementById('myImagePrescription_13');
    											image13.src = localStorage.prescriptionPhoto_13;
												$("#prescriptionPhoto_13").val(localStorage.prescriptionPhoto_13)
												
												var image14 = document.getElementById('myImagePrescription_14');
    											image14.src = localStorage.prescriptionPhoto_14;
												$("#prescriptionPhoto_14").val(localStorage.prescriptionPhoto_14)
												
												var image15 = document.getElementById('myImagePrescription_15');
    											image15.src = localStorage.prescriptionPhoto_15;
												$("#prescriptionPhoto_15").val(localStorage.prescriptionPhoto_15)
												
												var image16 = document.getElementById('myImagePrescription_16');
    											image16.src = localStorage.prescriptionPhoto_16;
												$("#prescriptionPhoto_16").val(localStorage.prescriptionPhoto_16)
												
												var image17 = document.getElementById('myImagePrescription_17');
    											image17.src = localStorage.prescriptionPhoto_17;
												$("#prescriptionPhoto_17").val(localStorage.prescriptionPhoto_17)
												
												var image18 = document.getElementById('myImagePrescription_18');
    											image18.src = localStorage.prescriptionPhoto_18;
												$("#prescriptionPhoto_18").val(localStorage.prescriptionPhoto_18)
												
												var image19 = document.getElementById('myImagePrescription_19');
    											image19.src = localStorage.prescriptionPhoto_19;
												$("#prescriptionPhoto_19").val(localStorage.prescriptionPhoto_19)
												
												var image20 = document.getElementById('myImagePrescription_20');
    											image20.src = localStorage.prescriptionPhoto_20;
												$("#prescriptionPhoto_20").val(localStorage.prescriptionPhoto_20)
												
												$("#prescriptionPhoto_2").val('');
												localStorage.prescriptionPhoto_2=''
											}
											else if (localStorage.pic_no==2){
												var image1 = document.getElementById('myImagePrescription_1');
    											image1.src = localStorage.prescriptionPhoto_1;
												$("#prescriptionPhoto_1").val(localStorage.prescriptionPhoto_1)
												
												var image3 = document.getElementById('myImagePrescription_3');
    											image3.src = localStorage.prescriptionPhoto_3;
												$("#prescriptionPhoto_3").val(localStorage.prescriptionPhoto_3)
												
												var image4 = document.getElementById('myImagePrescription_4');
    											image4.src = localStorage.prescriptionPhoto_4;
												$("#prescriptionPhoto_4").val(localStorage.prescriptionPhoto_4)
												
												var image5 = document.getElementById('myImagePrescription_5');
    											image5.src = localStorage.prescriptionPhoto_5;
												$("#prescriptionPhoto_5").val(localStorage.prescriptionPhoto_5)
												
												var image6 = document.getElementById('myImagePrescription_6');
    											image6.src = localStorage.prescriptionPhoto_6;
												$("#prescriptionPhoto_6").val(localStorage.prescriptionPhoto_6)
												
												var image7 = document.getElementById('myImagePrescription_7');
    											image7.src = localStorage.prescriptionPhoto_7;
												$("#prescriptionPhoto_7").val(localStorage.prescriptionPhoto_7)
												
												var image8 = document.getElementById('myImagePrescription_8');
    											image8.src = localStorage.prescriptionPhoto_8;
												$("#prescriptionPhoto_8").val(localStorage.prescriptionPhoto_8)
												
												var image9 = document.getElementById('myImagePrescription_9');
    											image9.src = localStorage.prescriptionPhoto_9;
												$("#prescriptionPhoto_9").val(localStorage.prescriptionPhoto_9)
												
												var image10 = document.getElementById('myImagePrescription_10');
    											image10.src = localStorage.prescriptionPhoto_10;
												$("#prescriptionPhoto_10").val(localStorage.prescriptionPhoto_10)
												
												var image11 = document.getElementById('myImagePrescription_11');
    											image11.src = localStorage.prescriptionPhoto_11;
												$("#prescriptionPhoto_11").val(localStorage.prescriptionPhoto_11)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image13 = document.getElementById('myImagePrescription_13');
    											image13.src = localStorage.prescriptionPhoto_13;
												$("#prescriptionPhoto_13").val(localStorage.prescriptionPhoto_13)
												
												var image14 = document.getElementById('myImagePrescription_14');
    											image14.src = localStorage.prescriptionPhoto_14;
												$("#prescriptionPhoto_14").val(localStorage.prescriptionPhoto_14)
												
												var image15 = document.getElementById('myImagePrescription_15');
    											image15.src = localStorage.prescriptionPhoto_15;
												$("#prescriptionPhoto_15").val(localStorage.prescriptionPhoto_15)
												
												var image16 = document.getElementById('myImagePrescription_16');
    											image16.src = localStorage.prescriptionPhoto_16;
												$("#prescriptionPhoto_16").val(localStorage.prescriptionPhoto_16)
												
												var image17 = document.getElementById('myImagePrescription_17');
    											image17.src = localStorage.prescriptionPhoto_17;
												$("#prescriptionPhoto_17").val(localStorage.prescriptionPhoto_17)
												
												var image18 = document.getElementById('myImagePrescription_18');
    											image18.src = localStorage.prescriptionPhoto_18;
												$("#prescriptionPhoto_18").val(localStorage.prescriptionPhoto_18)
												
												var image19 = document.getElementById('myImagePrescription_19');
    											image19.src = localStorage.prescriptionPhoto_19;
												$("#prescriptionPhoto_19").val(localStorage.prescriptionPhoto_19)
												
												var image20 = document.getElementById('myImagePrescription_20');
    											image20.src = localStorage.prescriptionPhoto_20;
												$("#prescriptionPhoto_20").val(localStorage.prescriptionPhoto_20)
												
												$("#prescriptionPhoto_2").val('');
												localStorage.prescriptionPhoto_2=''
											}
											else if (localStorage.pic_no==3){
												var image1 = document.getElementById('myImagePrescription_1');
    											image1.src = localStorage.prescriptionPhoto_1;
												$("#prescriptionPhoto_1").val(localStorage.prescriptionPhoto_1)
												
												var image2 = document.getElementById('myImagePrescription_2');
    											image2.src = localStorage.prescriptionPhoto_2;
												$("#prescriptionPhoto_2").val(localStorage.prescriptionPhoto_2)
												
												var image4 = document.getElementById('myImagePrescription_4');
    											image4.src = localStorage.prescriptionPhoto_4;
												$("#prescriptionPhoto_4").val(localStorage.prescriptionPhoto_4)
												
												var image5 = document.getElementById('myImagePrescription_5');
    											image5.src = localStorage.prescriptionPhoto_5;
												$("#prescriptionPhoto_5").val(localStorage.prescriptionPhoto_5)
												
												var image6 = document.getElementById('myImagePrescription_6');
    											image6.src = localStorage.prescriptionPhoto_6;
												$("#prescriptionPhoto_6").val(localStorage.prescriptionPhoto_6)
												
												var image7 = document.getElementById('myImagePrescription_7');
    											image7.src = localStorage.prescriptionPhoto_7;
												$("#prescriptionPhoto_7").val(localStorage.prescriptionPhoto_7)
												
												var image8 = document.getElementById('myImagePrescription_8');
    											image8.src = localStorage.prescriptionPhoto_8;
												$("#prescriptionPhoto_8").val(localStorage.prescriptionPhoto_8)
												
												var image9 = document.getElementById('myImagePrescription_9');
    											image9.src = localStorage.prescriptionPhoto_9;
												$("#prescriptionPhoto_9").val(localStorage.prescriptionPhoto_9)
												
												var image10 = document.getElementById('myImagePrescription_10');
    											image10.src = localStorage.prescriptionPhoto_10;
												$("#prescriptionPhoto_10").val(localStorage.prescriptionPhoto_10)
												
												var image11 = document.getElementById('myImagePrescription_11');
    											image11.src = localStorage.prescriptionPhoto_11;
												$("#prescriptionPhoto_11").val(localStorage.prescriptionPhoto_11)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image13 = document.getElementById('myImagePrescription_13');
    											image13.src = localStorage.prescriptionPhoto_13;
												$("#prescriptionPhoto_13").val(localStorage.prescriptionPhoto_13)
												
												var image14 = document.getElementById('myImagePrescription_14');
    											image14.src = localStorage.prescriptionPhoto_14;
												$("#prescriptionPhoto_14").val(localStorage.prescriptionPhoto_14)
												
												var image15 = document.getElementById('myImagePrescription_15');
    											image15.src = localStorage.prescriptionPhoto_15;
												$("#prescriptionPhoto_15").val(localStorage.prescriptionPhoto_15)
												
												var image16 = document.getElementById('myImagePrescription_16');
    											image16.src = localStorage.prescriptionPhoto_16;
												$("#prescriptionPhoto_16").val(localStorage.prescriptionPhoto_16)
												
												var image17 = document.getElementById('myImagePrescription_17');
    											image17.src = localStorage.prescriptionPhoto_17;
												$("#prescriptionPhoto_17").val(localStorage.prescriptionPhoto_17)
												
												var image18 = document.getElementById('myImagePrescription_18');
    											image18.src = localStorage.prescriptionPhoto_18;
												$("#prescriptionPhoto_18").val(localStorage.prescriptionPhoto_18)
												
												var image19 = document.getElementById('myImagePrescription_19');
    											image19.src = localStorage.prescriptionPhoto_19;
												$("#prescriptionPhoto_19").val(localStorage.prescriptionPhoto_19)
												
												var image20 = document.getElementById('myImagePrescription_20');
    											image20.src = localStorage.prescriptionPhoto_20;
												$("#prescriptionPhoto_20").val(localStorage.prescriptionPhoto_20)
												
												$("#prescriptionPhoto_3").val('');
												localStorage.prescriptionPhoto_3=''
											}
											else if (localStorage.pic_no==4){
												var image1 = document.getElementById('myImagePrescription_1');
    											image1.src = localStorage.prescriptionPhoto_1;
												$("#prescriptionPhoto_1").val(localStorage.prescriptionPhoto_1)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image3 = document.getElementById('myImagePrescription_3');
    											image3.src = localStorage.prescriptionPhoto_3;
												$("#prescriptionPhoto_3").val(localStorage.prescriptionPhoto_3)
												
												//var image4 = document.getElementById('myImagePrescription_4');
//    											image4.src = localStorage.prescriptionPhoto_4;
//												$("#prescriptionPhoto_4").val(localStorage.prescriptionPhoto_4)
												
												var image5 = document.getElementById('myImagePrescription_5');
    											image5.src = localStorage.prescriptionPhoto_5;
												$("#prescriptionPhoto_5").val(localStorage.prescriptionPhoto_5)
												
												var image6 = document.getElementById('myImagePrescription_6');
    											image6.src = localStorage.prescriptionPhoto_6;
												$("#prescriptionPhoto_6").val(localStorage.prescriptionPhoto_6)
												
												var image7 = document.getElementById('myImagePrescription_7');
    											image7.src = localStorage.prescriptionPhoto_7;
												$("#prescriptionPhoto_7").val(localStorage.prescriptionPhoto_7)
												
												var image8 = document.getElementById('myImagePrescription_8');
    											image8.src = localStorage.prescriptionPhoto_8;
												$("#prescriptionPhoto_8").val(localStorage.prescriptionPhoto_8)
												
												var image9 = document.getElementById('myImagePrescription_9');
    											image9.src = localStorage.prescriptionPhoto_9;
												$("#prescriptionPhoto_9").val(localStorage.prescriptionPhoto_9)
												
												var image10 = document.getElementById('myImagePrescription_10');
    											image10.src = localStorage.prescriptionPhoto_10;
												$("#prescriptionPhoto_10").val(localStorage.prescriptionPhoto_10)
												
												var image11 = document.getElementById('myImagePrescription_11');
    											image11.src = localStorage.prescriptionPhoto_11;
												$("#prescriptionPhoto_11").val(localStorage.prescriptionPhoto_11)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image13 = document.getElementById('myImagePrescription_13');
    											image13.src = localStorage.prescriptionPhoto_13;
												$("#prescriptionPhoto_13").val(localStorage.prescriptionPhoto_13)
												
												var image14 = document.getElementById('myImagePrescription_14');
    											image14.src = localStorage.prescriptionPhoto_14;
												$("#prescriptionPhoto_14").val(localStorage.prescriptionPhoto_14)
												
												var image15 = document.getElementById('myImagePrescription_15');
    											image15.src = localStorage.prescriptionPhoto_15;
												$("#prescriptionPhoto_15").val(localStorage.prescriptionPhoto_15)
												
												var image16 = document.getElementById('myImagePrescription_16');
    											image16.src = localStorage.prescriptionPhoto_16;
												$("#prescriptionPhoto_16").val(localStorage.prescriptionPhoto_16)
												
												var image17 = document.getElementById('myImagePrescription_17');
    											image17.src = localStorage.prescriptionPhoto_17;
												$("#prescriptionPhoto_17").val(localStorage.prescriptionPhoto_17)
												
												var image18 = document.getElementById('myImagePrescription_18');
    											image18.src = localStorage.prescriptionPhoto_18;
												$("#prescriptionPhoto_18").val(localStorage.prescriptionPhoto_18)
												
												var image19 = document.getElementById('myImagePrescription_19');
    											image19.src = localStorage.prescriptionPhoto_19;
												$("#prescriptionPhoto_19").val(localStorage.prescriptionPhoto_19)
												
												var image20 = document.getElementById('myImagePrescription_20');
    											image20.src = localStorage.prescriptionPhoto_20;
												$("#prescriptionPhoto_20").val(localStorage.prescriptionPhoto_20)
												
												$("#prescriptionPhoto_4").val('');
												localStorage.prescriptionPhoto_4=''
											}
											else if (localStorage.pic_no==5){
												var image1 = document.getElementById('myImagePrescription_1');
    											image1.src = localStorage.prescriptionPhoto_1;
												$("#prescriptionPhoto_1").val(localStorage.prescriptionPhoto_1)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image3 = document.getElementById('myImagePrescription_3');
    											image3.src = localStorage.prescriptionPhoto_3;
												$("#prescriptionPhoto_3").val(localStorage.prescriptionPhoto_3)
												
												var image4 = document.getElementById('myImagePrescription_4');
    											image4.src = localStorage.prescriptionPhoto_4;
												$("#prescriptionPhoto_4").val(localStorage.prescriptionPhoto_4)
												
												//var image5 = document.getElementById('myImagePrescription_5');
//    											image5.src = localStorage.prescriptionPhoto_5;
//												$("#prescriptionPhoto_5").val(localStorage.prescriptionPhoto_5)
												
												var image6 = document.getElementById('myImagePrescription_6');
    											image6.src = localStorage.prescriptionPhoto_6;
												$("#prescriptionPhoto_6").val(localStorage.prescriptionPhoto_6)
												
												var image7 = document.getElementById('myImagePrescription_7');
    											image7.src = localStorage.prescriptionPhoto_7;
												$("#prescriptionPhoto_7").val(localStorage.prescriptionPhoto_7)
												
												var image8 = document.getElementById('myImagePrescription_8');
    											image8.src = localStorage.prescriptionPhoto_8;
												$("#prescriptionPhoto_8").val(localStorage.prescriptionPhoto_8)
												
												var image9 = document.getElementById('myImagePrescription_9');
    											image9.src = localStorage.prescriptionPhoto_9;
												$("#prescriptionPhoto_9").val(localStorage.prescriptionPhoto_9)
												
												var image10 = document.getElementById('myImagePrescription_10');
    											image10.src = localStorage.prescriptionPhoto_10;
												$("#prescriptionPhoto_10").val(localStorage.prescriptionPhoto_10)
												
												var image11 = document.getElementById('myImagePrescription_11');
    											image11.src = localStorage.prescriptionPhoto_11;
												$("#prescriptionPhoto_11").val(localStorage.prescriptionPhoto_11)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image13 = document.getElementById('myImagePrescription_13');
    											image13.src = localStorage.prescriptionPhoto_13;
												$("#prescriptionPhoto_13").val(localStorage.prescriptionPhoto_13)
												
												var image14 = document.getElementById('myImagePrescription_14');
    											image14.src = localStorage.prescriptionPhoto_14;
												$("#prescriptionPhoto_14").val(localStorage.prescriptionPhoto_14)
												
												var image15 = document.getElementById('myImagePrescription_15');
    											image15.src = localStorage.prescriptionPhoto_15;
												$("#prescriptionPhoto_15").val(localStorage.prescriptionPhoto_15)
												
												var image16 = document.getElementById('myImagePrescription_16');
    											image16.src = localStorage.prescriptionPhoto_16;
												$("#prescriptionPhoto_16").val(localStorage.prescriptionPhoto_16)
												
												var image17 = document.getElementById('myImagePrescription_17');
    											image17.src = localStorage.prescriptionPhoto_17;
												$("#prescriptionPhoto_17").val(localStorage.prescriptionPhoto_17)
												
												var image18 = document.getElementById('myImagePrescription_18');
    											image18.src = localStorage.prescriptionPhoto_18;
												$("#prescriptionPhoto_18").val(localStorage.prescriptionPhoto_18)
												
												var image19 = document.getElementById('myImagePrescription_19');
    											image19.src = localStorage.prescriptionPhoto_19;
												$("#prescriptionPhoto_19").val(localStorage.prescriptionPhoto_19)
												
												var image20 = document.getElementById('myImagePrescription_20');
    											image20.src = localStorage.prescriptionPhoto_20;
												$("#prescriptionPhoto_20").val(localStorage.prescriptionPhoto_20)
												
												$("#prescriptionPhoto_5").val('');
												localStorage.prescriptionPhoto_5=''
											}
											else if (localStorage.pic_no==6){
												
												var image1 = document.getElementById('myImagePrescription_1');
    											image1.src = localStorage.prescriptionPhoto_1;
												$("#prescriptionPhoto_1").val(localStorage.prescriptionPhoto_1)
												
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												
												var image3 = document.getElementById('myImagePrescription_3');
    											image3.src = localStorage.prescriptionPhoto_3;
												$("#prescriptionPhoto_3").val(localStorage.prescriptionPhoto_3)
												
												
												var image4 = document.getElementById('myImagePrescription_4');
    											image4.src = localStorage.prescriptionPhoto_4;
												$("#prescriptionPhoto_4").val(localStorage.prescriptionPhoto_4)
												
												
												var image5 = document.getElementById('myImagePrescription_5');
    											image5.src = localStorage.prescriptionPhoto_5;
												$("#prescriptionPhoto_5").val(localStorage.prescriptionPhoto_5)
												
												//var image6 = document.getElementById('myImagePrescription_6');
//    											image6.src = localStorage.prescriptionPhoto_6;
//												$("#prescriptionPhoto_6").val(localStorage.prescriptionPhoto_6)
												
												
												var image7 = document.getElementById('myImagePrescription_7');
    											image7.src = localStorage.prescriptionPhoto_7;
												$("#prescriptionPhoto_7").val(localStorage.prescriptionPhoto_7)
												
												
												var image8 = document.getElementById('myImagePrescription_8');
    											image8.src = localStorage.prescriptionPhoto_8;
												$("#prescriptionPhoto_8").val(localStorage.prescriptionPhoto_8)
												
												
												var image9 = document.getElementById('myImagePrescription_9');
    											image9.src = localStorage.prescriptionPhoto_9;
												$("#prescriptionPhoto_9").val(localStorage.prescriptionPhoto_9)
												
												
												var image10 = document.getElementById('myImagePrescription_10');
    											image10.src = localStorage.prescriptionPhoto_10;
												$("#prescriptionPhoto_10").val(localStorage.prescriptionPhoto_10)
												
												
												var image11 = document.getElementById('myImagePrescription_11');
    											image11.src = localStorage.prescriptionPhoto_11;
												$("#prescriptionPhoto_11").val(localStorage.prescriptionPhoto_11)
												
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												
												var image13 = document.getElementById('myImagePrescription_13');
    											image13.src = localStorage.prescriptionPhoto_13;
												$("#prescriptionPhoto_13").val(localStorage.prescriptionPhoto_13)
												
												
												var image14 = document.getElementById('myImagePrescription_14');
    											image14.src = localStorage.prescriptionPhoto_14;
												$("#prescriptionPhoto_14").val(localStorage.prescriptionPhoto_14)
												
												
												var image15 = document.getElementById('myImagePrescription_15');
    											image15.src = localStorage.prescriptionPhoto_15;
												$("#prescriptionPhoto_15").val(localStorage.prescriptionPhoto_15)
												
												
												var image16 = document.getElementById('myImagePrescription_16');
    											image16.src = localStorage.prescriptionPhoto_16;
												$("#prescriptionPhoto_16").val(localStorage.prescriptionPhoto_16)
												
												
												var image17 = document.getElementById('myImagePrescription_17');
    											image17.src = localStorage.prescriptionPhoto_17;
												$("#prescriptionPhoto_17").val(localStorage.prescriptionPhoto_17)
												
												
												var image18 = document.getElementById('myImagePrescription_18');
    											image18.src = localStorage.prescriptionPhoto_18;
												$("#prescriptionPhoto_18").val(localStorage.prescriptionPhoto_18)
												
												
												var image19 = document.getElementById('myImagePrescription_19');
    											image19.src = localStorage.prescriptionPhoto_19;
												$("#prescriptionPhoto_19").val(localStorage.prescriptionPhoto_19)
												
												
												var image20 = document.getElementById('myImagePrescription_20');
    											image20.src = localStorage.prescriptionPhoto_20;
												$("#prescriptionPhoto_20").val(localStorage.prescriptionPhoto_20)
												
												$("#prescriptionPhoto_6").val('');
												localStorage.prescriptionPhoto_6=''
											}
											else if (localStorage.pic_no==7){
												var image1 = document.getElementById('myImagePrescription_1');
    											image1.src = localStorage.prescriptionPhoto_1;
												$("#prescriptionPhoto_1").val(localStorage.prescriptionPhoto_1)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image3 = document.getElementById('myImagePrescription_3');
    											image3.src = localStorage.prescriptionPhoto_3;
												$("#prescriptionPhoto_3").val(localStorage.prescriptionPhoto_3)
												
												var image4 = document.getElementById('myImagePrescription_4');
    											image4.src = localStorage.prescriptionPhoto_4;
												$("#prescriptionPhoto_4").val(localStorage.prescriptionPhoto_4)
												
												var image5 = document.getElementById('myImagePrescription_5');
    											image5.src = localStorage.prescriptionPhoto_5;
												$("#prescriptionPhoto_5").val(localStorage.prescriptionPhoto_5)
												
												var image6 = document.getElementById('myImagePrescription_6');
    											image6.src = localStorage.prescriptionPhoto_6;
												$("#prescriptionPhoto_6").val(localStorage.prescriptionPhoto_6)
												
												//var image7 = document.getElementById('myImagePrescription_7');
//    											image7.src = localStorage.prescriptionPhoto_7;
//												$("#prescriptionPhoto_7").val(localStorage.prescriptionPhoto_7)
												
												var image8 = document.getElementById('myImagePrescription_8');
    											image8.src = localStorage.prescriptionPhoto_8;
												$("#prescriptionPhoto_8").val(localStorage.prescriptionPhoto_8)
												
												var image9 = document.getElementById('myImagePrescription_9');
    											image9.src = localStorage.prescriptionPhoto_9;
												$("#prescriptionPhoto_9").val(localStorage.prescriptionPhoto_9)
												
												var image10 = document.getElementById('myImagePrescription_10');
    											image10.src = localStorage.prescriptionPhoto_10;
												$("#prescriptionPhoto_10").val(localStorage.prescriptionPhoto_10)
												
												var image11 = document.getElementById('myImagePrescription_11');
    											image11.src = localStorage.prescriptionPhoto_11;
												$("#prescriptionPhoto_11").val(localStorage.prescriptionPhoto_11)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image13 = document.getElementById('myImagePrescription_13');
    											image13.src = localStorage.prescriptionPhoto_13;
												$("#prescriptionPhoto_13").val(localStorage.prescriptionPhoto_13)
												
												var image14 = document.getElementById('myImagePrescription_14');
    											image14.src = localStorage.prescriptionPhoto_14;
												$("#prescriptionPhoto_14").val(localStorage.prescriptionPhoto_14)
												
												var image15 = document.getElementById('myImagePrescription_15');
    											image15.src = localStorage.prescriptionPhoto_15;
												$("#prescriptionPhoto_15").val(localStorage.prescriptionPhoto_15)
												
												var image16 = document.getElementById('myImagePrescription_16');
    											image16.src = localStorage.prescriptionPhoto_16;
												$("#prescriptionPhoto_16").val(localStorage.prescriptionPhoto_16)
												
												var image17 = document.getElementById('myImagePrescription_17');
    											image17.src = localStorage.prescriptionPhoto_17;
												$("#prescriptionPhoto_17").val(localStorage.prescriptionPhoto_17)
												
												var image18 = document.getElementById('myImagePrescription_18');
    											image18.src = localStorage.prescriptionPhoto_18;
												$("#prescriptionPhoto_18").val(localStorage.prescriptionPhoto_18)
												
												var image19 = document.getElementById('myImagePrescription_19');
    											image19.src = localStorage.prescriptionPhoto_19;
												$("#prescriptionPhoto_19").val(localStorage.prescriptionPhoto_19)
												
												var image20 = document.getElementById('myImagePrescription_20');
    											image20.src = localStorage.prescriptionPhoto_20;
												$("#prescriptionPhoto_20").val(localStorage.prescriptionPhoto_20)
												
												$("#prescriptionPhoto_7").val('');
												localStorage.prescriptionPhoto_7=''
											}
											else if (localStorage.pic_no==8){
												var image1 = document.getElementById('myImagePrescription_1');
    											image1.src = localStorage.prescriptionPhoto_1;
												$("#prescriptionPhoto_1").val(localStorage.prescriptionPhoto_1)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image3 = document.getElementById('myImagePrescription_3');
    											image3.src = localStorage.prescriptionPhoto_3;
												$("#prescriptionPhoto_3").val(localStorage.prescriptionPhoto_3)
												
												var image4 = document.getElementById('myImagePrescription_4');
    											image4.src = localStorage.prescriptionPhoto_4;
												$("#prescriptionPhoto_4").val(localStorage.prescriptionPhoto_4)
												
												var image5 = document.getElementById('myImagePrescription_5');
    											image5.src = localStorage.prescriptionPhoto_5;
												$("#prescriptionPhoto_5").val(localStorage.prescriptionPhoto_5)
												
												var image6 = document.getElementById('myImagePrescription_6');
    											image6.src = localStorage.prescriptionPhoto_6;
												$("#prescriptionPhoto_6").val(localStorage.prescriptionPhoto_6)
												
												var image7 = document.getElementById('myImagePrescription_7');
    											image7.src = localStorage.prescriptionPhoto_7;
												$("#prescriptionPhoto_7").val(localStorage.prescriptionPhoto_7)
												
//												var image8 = document.getElementById('myImagePrescription_8');
//    											image8.src = localStorage.prescriptionPhoto_8;
//												$("#prescriptionPhoto_8").val(localStorage.prescriptionPhoto_8)
												
												var image9 = document.getElementById('myImagePrescription_9');
    											image9.src = localStorage.prescriptionPhoto_9;
												$("#prescriptionPhoto_9").val(localStorage.prescriptionPhoto_9)
												
												var image10 = document.getElementById('myImagePrescription_10');
    											image10.src = localStorage.prescriptionPhoto_10;
												$("#prescriptionPhoto_10").val(localStorage.prescriptionPhoto_10)
												
												var image11 = document.getElementById('myImagePrescription_11');
    											image11.src = localStorage.prescriptionPhoto_11;
												$("#prescriptionPhoto_11").val(localStorage.prescriptionPhoto_11)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image13 = document.getElementById('myImagePrescription_13');
    											image13.src = localStorage.prescriptionPhoto_13;
												$("#prescriptionPhoto_13").val(localStorage.prescriptionPhoto_13)
												
												var image14 = document.getElementById('myImagePrescription_14');
    											image14.src = localStorage.prescriptionPhoto_14;
												$("#prescriptionPhoto_14").val(localStorage.prescriptionPhoto_14)
												
												var image15 = document.getElementById('myImagePrescription_15');
    											image15.src = localStorage.prescriptionPhoto_15;
												$("#prescriptionPhoto_15").val(localStorage.prescriptionPhoto_15)
												
												var image16 = document.getElementById('myImagePrescription_16');
    											image16.src = localStorage.prescriptionPhoto_16;
												$("#prescriptionPhoto_16").val(localStorage.prescriptionPhoto_16)
												
												var image17 = document.getElementById('myImagePrescription_17');
    											image17.src = localStorage.prescriptionPhoto_17;
												$("#prescriptionPhoto_17").val(localStorage.prescriptionPhoto_17)
												
												var image18 = document.getElementById('myImagePrescription_18');
    											image18.src = localStorage.prescriptionPhoto_18;
												$("#prescriptionPhoto_18").val(localStorage.prescriptionPhoto_18)
												
												var image19 = document.getElementById('myImagePrescription_19');
    											image19.src = localStorage.prescriptionPhoto_19;
												$("#prescriptionPhoto_19").val(localStorage.prescriptionPhoto_19)
												
												var image20 = document.getElementById('myImagePrescription_20');
    											image20.src = localStorage.prescriptionPhoto_20;
												$("#prescriptionPhoto_20").val(localStorage.prescriptionPhoto_20)
												
												$("#prescriptionPhoto_8").val('');
												localStorage.prescriptionPhoto_8=''
											}
											else if (localStorage.pic_no==9){
												var image1 = document.getElementById('myImagePrescription_1');
    											image1.src = localStorage.prescriptionPhoto_1;
												$("#prescriptionPhoto_1").val(localStorage.prescriptionPhoto_1)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image3 = document.getElementById('myImagePrescription_3');
    											image3.src = localStorage.prescriptionPhoto_3;
												$("#prescriptionPhoto_3").val(localStorage.prescriptionPhoto_3)
												
												var image4 = document.getElementById('myImagePrescription_4');
    											image4.src = localStorage.prescriptionPhoto_4;
												$("#prescriptionPhoto_4").val(localStorage.prescriptionPhoto_4)
												
												var image5 = document.getElementById('myImagePrescription_5');
    											image5.src = localStorage.prescriptionPhoto_5;
												$("#prescriptionPhoto_5").val(localStorage.prescriptionPhoto_5)
												
												var image6 = document.getElementById('myImagePrescription_6');
    											image6.src = localStorage.prescriptionPhoto_6;
												$("#prescriptionPhoto_6").val(localStorage.prescriptionPhoto_6)
												
												var image7 = document.getElementById('myImagePrescription_7');
    											image7.src = localStorage.prescriptionPhoto_7;
												$("#prescriptionPhoto_7").val(localStorage.prescriptionPhoto_7)
												
												var image8 = document.getElementById('myImagePrescription_8');
    											image8.src = localStorage.prescriptionPhoto_8;
												$("#prescriptionPhoto_8").val(localStorage.prescriptionPhoto_8)
												
												//var image9 = document.getElementById('myImagePrescription_9');
//    											image9.src = localStorage.prescriptionPhoto_9;
//												$("#prescriptionPhoto_9").val(localStorage.prescriptionPhoto_9)
												
												var image10 = document.getElementById('myImagePrescription_10');
    											image10.src = localStorage.prescriptionPhoto_10;
												$("#prescriptionPhoto_10").val(localStorage.prescriptionPhoto_10)
												
												var image11 = document.getElementById('myImagePrescription_11');
    											image11.src = localStorage.prescriptionPhoto_11;
												$("#prescriptionPhoto_11").val(localStorage.prescriptionPhoto_11)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image13 = document.getElementById('myImagePrescription_13');
    											image13.src = localStorage.prescriptionPhoto_13;
												$("#prescriptionPhoto_13").val(localStorage.prescriptionPhoto_13)
												
												var image14 = document.getElementById('myImagePrescription_14');
    											image14.src = localStorage.prescriptionPhoto_14;
												$("#prescriptionPhoto_14").val(localStorage.prescriptionPhoto_14)
												
												var image15 = document.getElementById('myImagePrescription_15');
    											image15.src = localStorage.prescriptionPhoto_15;
												$("#prescriptionPhoto_15").val(localStorage.prescriptionPhoto_15)
												
												var image16 = document.getElementById('myImagePrescription_16');
    											image16.src = localStorage.prescriptionPhoto_16;
												$("#prescriptionPhoto_16").val(localStorage.prescriptionPhoto_16)
												
												var image17 = document.getElementById('myImagePrescription_17');
    											image17.src = localStorage.prescriptionPhoto_17;
												$("#prescriptionPhoto_17").val(localStorage.prescriptionPhoto_17)
												
												var image18 = document.getElementById('myImagePrescription_18');
    											image18.src = localStorage.prescriptionPhoto_18;
												$("#prescriptionPhoto_18").val(localStorage.prescriptionPhoto_18)
												
												var image19 = document.getElementById('myImagePrescription_19');
    											image19.src = localStorage.prescriptionPhoto_19;
												$("#prescriptionPhoto_19").val(localStorage.prescriptionPhoto_19)
												
												var image20 = document.getElementById('myImagePrescription_20');
    											image20.src = localStorage.prescriptionPhoto_20;
												$("#prescriptionPhoto_20").val(localStorage.prescriptionPhoto_20)
												
												$("#prescriptionPhoto_9").val('');
												localStorage.prescriptionPhoto_9=''
											}
											else if (localStorage.pic_no==10){
												var image1 = document.getElementById('myImagePrescription_1');
    											image1.src = localStorage.prescriptionPhoto_1;
												$("#prescriptionPhoto_1").val(localStorage.prescriptionPhoto_1)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image3 = document.getElementById('myImagePrescription_3');
    											image3.src = localStorage.prescriptionPhoto_3;
												$("#prescriptionPhoto_3").val(localStorage.prescriptionPhoto_3)
												
												var image4 = document.getElementById('myImagePrescription_4');
    											image4.src = localStorage.prescriptionPhoto_4;
												$("#prescriptionPhoto_4").val(localStorage.prescriptionPhoto_4)
												
												var image5 = document.getElementById('myImagePrescription_5');
    											image5.src = localStorage.prescriptionPhoto_5;
												$("#prescriptionPhoto_5").val(localStorage.prescriptionPhoto_5)
												
												var image6 = document.getElementById('myImagePrescription_6');
    											image6.src = localStorage.prescriptionPhoto_6;
												$("#prescriptionPhoto_6").val(localStorage.prescriptionPhoto_6)
												
												var image7 = document.getElementById('myImagePrescription_7');
    											image7.src = localStorage.prescriptionPhoto_7;
												$("#prescriptionPhoto_7").val(localStorage.prescriptionPhoto_7)
												
												var image8 = document.getElementById('myImagePrescription_8');
    											image8.src = localStorage.prescriptionPhoto_8;
												$("#prescriptionPhoto_8").val(localStorage.prescriptionPhoto_8)
												
												var image9 = document.getElementById('myImagePrescription_9');
    											image9.src = localStorage.prescriptionPhoto_9;
												$("#prescriptionPhoto_9").val(localStorage.prescriptionPhoto_9)
												
												//var image10 = document.getElementById('myImagePrescription_10');
//    											image10.src = localStorage.prescriptionPhoto_10;
//												$("#prescriptionPhoto_10").val(localStorage.prescriptionPhoto_10)
												
												var image11 = document.getElementById('myImagePrescription_11');
    											image11.src = localStorage.prescriptionPhoto_11;
												$("#prescriptionPhoto_11").val(localStorage.prescriptionPhoto_11)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image13 = document.getElementById('myImagePrescription_13');
    											image13.src = localStorage.prescriptionPhoto_13;
												$("#prescriptionPhoto_13").val(localStorage.prescriptionPhoto_13)
												
												var image14 = document.getElementById('myImagePrescription_14');
    											image14.src = localStorage.prescriptionPhoto_14;
												$("#prescriptionPhoto_14").val(localStorage.prescriptionPhoto_14)
												
												var image15 = document.getElementById('myImagePrescription_15');
    											image15.src = localStorage.prescriptionPhoto_15;
												$("#prescriptionPhoto_15").val(localStorage.prescriptionPhoto_15)
												
												var image16 = document.getElementById('myImagePrescription_16');
    											image16.src = localStorage.prescriptionPhoto_16;
												$("#prescriptionPhoto_16").val(localStorage.prescriptionPhoto_16)
												
												var image17 = document.getElementById('myImagePrescription_17');
    											image17.src = localStorage.prescriptionPhoto_17;
												$("#prescriptionPhoto_17").val(localStorage.prescriptionPhoto_17)
												
												var image18 = document.getElementById('myImagePrescription_18');
    											image18.src = localStorage.prescriptionPhoto_18;
												$("#prescriptionPhoto_18").val(localStorage.prescriptionPhoto_18)
												
												var image19 = document.getElementById('myImagePrescription_19');
    											image19.src = localStorage.prescriptionPhoto_19;
												$("#prescriptionPhoto_19").val(localStorage.prescriptionPhoto_19)
												
												var image20 = document.getElementById('myImagePrescription_20');
    											image20.src = localStorage.prescriptionPhoto_20;
												$("#prescriptionPhoto_20").val(localStorage.prescriptionPhoto_20)
												
												$("#prescriptionPhoto_10").val('');
												localStorage.prescriptionPhoto_10=''
											}
											else if (localStorage.pic_no==11){
												var image1 = document.getElementById('myImagePrescription_1');
    											image1.src = localStorage.prescriptionPhoto_1;
												$("#prescriptionPhoto_1").val(localStorage.prescriptionPhoto_1)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image3 = document.getElementById('myImagePrescription_3');
    											image3.src = localStorage.prescriptionPhoto_3;
												$("#prescriptionPhoto_3").val(localStorage.prescriptionPhoto_3)
												
												var image4 = document.getElementById('myImagePrescription_4');
    											image4.src = localStorage.prescriptionPhoto_4;
												$("#prescriptionPhoto_4").val(localStorage.prescriptionPhoto_4)
												
												var image5 = document.getElementById('myImagePrescription_5');
    											image5.src = localStorage.prescriptionPhoto_5;
												$("#prescriptionPhoto_5").val(localStorage.prescriptionPhoto_5)
												
												var image6 = document.getElementById('myImagePrescription_6');
    											image6.src = localStorage.prescriptionPhoto_6;
												$("#prescriptionPhoto_6").val(localStorage.prescriptionPhoto_6)
												
												var image7 = document.getElementById('myImagePrescription_7');
    											image7.src = localStorage.prescriptionPhoto_7;
												$("#prescriptionPhoto_7").val(localStorage.prescriptionPhoto_7)
												
												var image8 = document.getElementById('myImagePrescription_8');
    											image8.src = localStorage.prescriptionPhoto_8;
												$("#prescriptionPhoto_8").val(localStorage.prescriptionPhoto_8)
												
												var image9 = document.getElementById('myImagePrescription_9');
    											image9.src = localStorage.prescriptionPhoto_9;
												$("#prescriptionPhoto_9").val(localStorage.prescriptionPhoto_9)
												
												var image10 = document.getElementById('myImagePrescription_10');
    											image10.src = localStorage.prescriptionPhoto_10;
												$("#prescriptionPhoto_10").val(localStorage.prescriptionPhoto_10)
												
												//var image11 = document.getElementById('myImagePrescription_11');
//    											image11.src = localStorage.prescriptionPhoto_11;
//												$("#prescriptionPhoto_11").val(localStorage.prescriptionPhoto_11)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image13 = document.getElementById('myImagePrescription_13');
    											image13.src = localStorage.prescriptionPhoto_13;
												$("#prescriptionPhoto_13").val(localStorage.prescriptionPhoto_13)
												
												var image14 = document.getElementById('myImagePrescription_14');
    											image14.src = localStorage.prescriptionPhoto_14;
												$("#prescriptionPhoto_14").val(localStorage.prescriptionPhoto_14)
												
												var image15 = document.getElementById('myImagePrescription_15');
    											image15.src = localStorage.prescriptionPhoto_15;
												$("#prescriptionPhoto_15").val(localStorage.prescriptionPhoto_15)
												
												var image16 = document.getElementById('myImagePrescription_16');
    											image16.src = localStorage.prescriptionPhoto_16;
												$("#prescriptionPhoto_16").val(localStorage.prescriptionPhoto_16)
												
												var image17 = document.getElementById('myImagePrescription_17');
    											image17.src = localStorage.prescriptionPhoto_17;
												$("#prescriptionPhoto_17").val(localStorage.prescriptionPhoto_17)
												
												var image18 = document.getElementById('myImagePrescription_18');
    											image18.src = localStorage.prescriptionPhoto_18;
												$("#prescriptionPhoto_18").val(localStorage.prescriptionPhoto_18)
												
												var image19 = document.getElementById('myImagePrescription_19');
    											image19.src = localStorage.prescriptionPhoto_19;
												$("#prescriptionPhoto_19").val(localStorage.prescriptionPhoto_19)
												
												var image20 = document.getElementById('myImagePrescription_20');
    											image20.src = localStorage.prescriptionPhoto_20;
												$("#prescriptionPhoto_20").val(localStorage.prescriptionPhoto_20)
												
												$("#prescriptionPhoto_11").val('');
												localStorage.prescriptionPhoto_11=''
											}
											else if (localStorage.pic_no==12){
												var image1 = document.getElementById('myImagePrescription_1');
    											image1.src = localStorage.prescriptionPhoto_1;
												$("#prescriptionPhoto_1").val(localStorage.prescriptionPhoto_1)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image3 = document.getElementById('myImagePrescription_3');
    											image3.src = localStorage.prescriptionPhoto_3;
												$("#prescriptionPhoto_3").val(localStorage.prescriptionPhoto_3)
												
												var image4 = document.getElementById('myImagePrescription_4');
    											image4.src = localStorage.prescriptionPhoto_4;
												$("#prescriptionPhoto_4").val(localStorage.prescriptionPhoto_4)
												
												var image5 = document.getElementById('myImagePrescription_5');
    											image5.src = localStorage.prescriptionPhoto_5;
												$("#prescriptionPhoto_5").val(localStorage.prescriptionPhoto_5)
												
												var image6 = document.getElementById('myImagePrescription_6');
    											image6.src = localStorage.prescriptionPhoto_6;
												$("#prescriptionPhoto_6").val(localStorage.prescriptionPhoto_6)
												
												var image7 = document.getElementById('myImagePrescription_7');
    											image7.src = localStorage.prescriptionPhoto_7;
												$("#prescriptionPhoto_7").val(localStorage.prescriptionPhoto_7)
												
												var image8 = document.getElementById('myImagePrescription_8');
    											image8.src = localStorage.prescriptionPhoto_8;
												$("#prescriptionPhoto_8").val(localStorage.prescriptionPhoto_8)
												
												var image9 = document.getElementById('myImagePrescription_9');
    											image9.src = localStorage.prescriptionPhoto_9;
												$("#prescriptionPhoto_9").val(localStorage.prescriptionPhoto_9)
												
												var image10 = document.getElementById('myImagePrescription_10');
    											image10.src = localStorage.prescriptionPhoto_10;
												$("#prescriptionPhoto_10").val(localStorage.prescriptionPhoto_10)
												
												var image11 = document.getElementById('myImagePrescription_11');
    											image11.src = localStorage.prescriptionPhoto_11;
												$("#prescriptionPhoto_11").val(localStorage.prescriptionPhoto_11)
												
												//var image12 = document.getElementById('myImagePrescription_12');
//    											image12.src = localStorage.prescriptionPhoto_12;
//												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image13 = document.getElementById('myImagePrescription_13');
    											image13.src = localStorage.prescriptionPhoto_13;
												$("#prescriptionPhoto_13").val(localStorage.prescriptionPhoto_13)
												
												var image14 = document.getElementById('myImagePrescription_14');
    											image14.src = localStorage.prescriptionPhoto_14;
												$("#prescriptionPhoto_14").val(localStorage.prescriptionPhoto_14)
												
												var image15 = document.getElementById('myImagePrescription_15');
    											image15.src = localStorage.prescriptionPhoto_15;
												$("#prescriptionPhoto_15").val(localStorage.prescriptionPhoto_15)
												
												var image16 = document.getElementById('myImagePrescription_16');
    											image16.src = localStorage.prescriptionPhoto_16;
												$("#prescriptionPhoto_16").val(localStorage.prescriptionPhoto_16)
												
												var image17 = document.getElementById('myImagePrescription_17');
    											image17.src = localStorage.prescriptionPhoto_17;
												$("#prescriptionPhoto_17").val(localStorage.prescriptionPhoto_17)
												
												var image18 = document.getElementById('myImagePrescription_18');
    											image18.src = localStorage.prescriptionPhoto_18;
												$("#prescriptionPhoto_18").val(localStorage.prescriptionPhoto_18)
												
												var image19 = document.getElementById('myImagePrescription_19');
    											image19.src = localStorage.prescriptionPhoto_19;
												$("#prescriptionPhoto_19").val(localStorage.prescriptionPhoto_19)
												
												var image20 = document.getElementById('myImagePrescription_20');
    											image20.src = localStorage.prescriptionPhoto_20;
												$("#prescriptionPhoto_20").val(localStorage.prescriptionPhoto_20)
												
												$("#prescriptionPhoto_12").val('');
												localStorage.prescriptionPhoto_12=''
											}
											else if (localStorage.pic_no==13){
												var image1 = document.getElementById('myImagePrescription_1');
    											image1.src = localStorage.prescriptionPhoto_1;
												$("#prescriptionPhoto_1").val(localStorage.prescriptionPhoto_1)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image3 = document.getElementById('myImagePrescription_3');
    											image3.src = localStorage.prescriptionPhoto_3;
												$("#prescriptionPhoto_3").val(localStorage.prescriptionPhoto_3)
												
												var image4 = document.getElementById('myImagePrescription_4');
    											image4.src = localStorage.prescriptionPhoto_4;
												$("#prescriptionPhoto_4").val(localStorage.prescriptionPhoto_4)
												
												var image5 = document.getElementById('myImagePrescription_5');
    											image5.src = localStorage.prescriptionPhoto_5;
												$("#prescriptionPhoto_5").val(localStorage.prescriptionPhoto_5)
												
												var image6 = document.getElementById('myImagePrescription_6');
    											image6.src = localStorage.prescriptionPhoto_6;
												$("#prescriptionPhoto_6").val(localStorage.prescriptionPhoto_6)
												
												var image7 = document.getElementById('myImagePrescription_7');
    											image7.src = localStorage.prescriptionPhoto_7;
												$("#prescriptionPhoto_7").val(localStorage.prescriptionPhoto_7)
												
												var image8 = document.getElementById('myImagePrescription_8');
    											image8.src = localStorage.prescriptionPhoto_8;
												$("#prescriptionPhoto_8").val(localStorage.prescriptionPhoto_8)
												
												var image9 = document.getElementById('myImagePrescription_9');
    											image9.src = localStorage.prescriptionPhoto_9;
												$("#prescriptionPhoto_9").val(localStorage.prescriptionPhoto_9)
												
												var image10 = document.getElementById('myImagePrescription_10');
    											image10.src = localStorage.prescriptionPhoto_10;
												$("#prescriptionPhoto_10").val(localStorage.prescriptionPhoto_10)
												
												var image11 = document.getElementById('myImagePrescription_11');
    											image11.src = localStorage.prescriptionPhoto_11;
												$("#prescriptionPhoto_11").val(localStorage.prescriptionPhoto_11)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												//var image13 = document.getElementById('myImagePrescription_13');
//    											image13.src = localStorage.prescriptionPhoto_13;
//												$("#prescriptionPhoto_13").val(localStorage.prescriptionPhoto_13)
												
												var image14 = document.getElementById('myImagePrescription_14');
    											image14.src = localStorage.prescriptionPhoto_14;
												$("#prescriptionPhoto_14").val(localStorage.prescriptionPhoto_14)
												
												var image15 = document.getElementById('myImagePrescription_15');
    											image15.src = localStorage.prescriptionPhoto_15;
												$("#prescriptionPhoto_15").val(localStorage.prescriptionPhoto_15)
												
												var image16 = document.getElementById('myImagePrescription_16');
    											image16.src = localStorage.prescriptionPhoto_16;
												$("#prescriptionPhoto_16").val(localStorage.prescriptionPhoto_16)
												
												var image17 = document.getElementById('myImagePrescription_17');
    											image17.src = localStorage.prescriptionPhoto_17;
												$("#prescriptionPhoto_17").val(localStorage.prescriptionPhoto_17)
												
												var image18 = document.getElementById('myImagePrescription_18');
    											image18.src = localStorage.prescriptionPhoto_18;
												$("#prescriptionPhoto_18").val(localStorage.prescriptionPhoto_18)
												
												var image19 = document.getElementById('myImagePrescription_19');
    											image19.src = localStorage.prescriptionPhoto_19;
												$("#prescriptionPhoto_19").val(localStorage.prescriptionPhoto_19)
												
												var image20 = document.getElementById('myImagePrescription_20');
    											image20.src = localStorage.prescriptionPhoto_20;
												$("#prescriptionPhoto_20").val(localStorage.prescriptionPhoto_20)
												
												$("#prescriptionPhoto_13").val('');
												localStorage.prescriptionPhoto_13=''
											}
											else if (localStorage.pic_no==14){
												var image1 = document.getElementById('myImagePrescription_1');
    											image1.src = localStorage.prescriptionPhoto_1;
												$("#prescriptionPhoto_1").val(localStorage.prescriptionPhoto_1)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image3 = document.getElementById('myImagePrescription_3');
    											image3.src = localStorage.prescriptionPhoto_3;
												$("#prescriptionPhoto_3").val(localStorage.prescriptionPhoto_3)
												
												var image4 = document.getElementById('myImagePrescription_4');
    											image4.src = localStorage.prescriptionPhoto_4;
												$("#prescriptionPhoto_4").val(localStorage.prescriptionPhoto_4)
												
												var image5 = document.getElementById('myImagePrescription_5');
    											image5.src = localStorage.prescriptionPhoto_5;
												$("#prescriptionPhoto_5").val(localStorage.prescriptionPhoto_5)
												
												var image6 = document.getElementById('myImagePrescription_6');
    											image6.src = localStorage.prescriptionPhoto_6;
												$("#prescriptionPhoto_6").val(localStorage.prescriptionPhoto_6)
												
												var image7 = document.getElementById('myImagePrescription_7');
    											image7.src = localStorage.prescriptionPhoto_7;
												$("#prescriptionPhoto_7").val(localStorage.prescriptionPhoto_7)
												
												var image8 = document.getElementById('myImagePrescription_8');
    											image8.src = localStorage.prescriptionPhoto_8;
												$("#prescriptionPhoto_8").val(localStorage.prescriptionPhoto_8)
												
												var image9 = document.getElementById('myImagePrescription_9');
    											image9.src = localStorage.prescriptionPhoto_9;
												$("#prescriptionPhoto_9").val(localStorage.prescriptionPhoto_9)
												
												var image10 = document.getElementById('myImagePrescription_10');
    											image10.src = localStorage.prescriptionPhoto_10;
												$("#prescriptionPhoto_10").val(localStorage.prescriptionPhoto_10)
												
												var image11 = document.getElementById('myImagePrescription_11');
    											image11.src = localStorage.prescriptionPhoto_11;
												$("#prescriptionPhoto_11").val(localStorage.prescriptionPhoto_11)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image13 = document.getElementById('myImagePrescription_13');
    											image13.src = localStorage.prescriptionPhoto_13;
												$("#prescriptionPhoto_13").val(localStorage.prescriptionPhoto_13)
												
												//var image14 = document.getElementById('myImagePrescription_14');
//    											image14.src = localStorage.prescriptionPhoto_14;
//												$("#prescriptionPhoto_14").val(localStorage.prescriptionPhoto_14)
												
												var image15 = document.getElementById('myImagePrescription_15');
    											image15.src = localStorage.prescriptionPhoto_15;
												$("#prescriptionPhoto_15").val(localStorage.prescriptionPhoto_15)
												
												var image16 = document.getElementById('myImagePrescription_16');
    											image16.src = localStorage.prescriptionPhoto_16;
												$("#prescriptionPhoto_16").val(localStorage.prescriptionPhoto_16)
												
												var image17 = document.getElementById('myImagePrescription_17');
    											image17.src = localStorage.prescriptionPhoto_17;
												$("#prescriptionPhoto_17").val(localStorage.prescriptionPhoto_17)
												
												var image18 = document.getElementById('myImagePrescription_18');
    											image18.src = localStorage.prescriptionPhoto_18;
												$("#prescriptionPhoto_18").val(localStorage.prescriptionPhoto_18)
												
												var image19 = document.getElementById('myImagePrescription_19');
    											image19.src = localStorage.prescriptionPhoto_19;
												$("#prescriptionPhoto_19").val(localStorage.prescriptionPhoto_19)
												
												var image20 = document.getElementById('myImagePrescription_20');
    											image20.src = localStorage.prescriptionPhoto_20;
												$("#prescriptionPhoto_20").val(localStorage.prescriptionPhoto_20)
												
												$("#prescriptionPhoto_14").val('');
												localStorage.prescriptionPhoto_14=''
											}
											else if (localStorage.pic_no==15){
												var image1 = document.getElementById('myImagePrescription_1');
    											image1.src = localStorage.prescriptionPhoto_1;
												$("#prescriptionPhoto_1").val(localStorage.prescriptionPhoto_1)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image3 = document.getElementById('myImagePrescription_3');
    											image3.src = localStorage.prescriptionPhoto_3;
												$("#prescriptionPhoto_3").val(localStorage.prescriptionPhoto_3)
												
												var image4 = document.getElementById('myImagePrescription_4');
    											image4.src = localStorage.prescriptionPhoto_4;
												$("#prescriptionPhoto_4").val(localStorage.prescriptionPhoto_4)
												
												var image5 = document.getElementById('myImagePrescription_5');
    											image5.src = localStorage.prescriptionPhoto_5;
												$("#prescriptionPhoto_5").val(localStorage.prescriptionPhoto_5)
												
												var image6 = document.getElementById('myImagePrescription_6');
    											image6.src = localStorage.prescriptionPhoto_6;
												$("#prescriptionPhoto_6").val(localStorage.prescriptionPhoto_6)
												
												var image7 = document.getElementById('myImagePrescription_7');
    											image7.src = localStorage.prescriptionPhoto_7;
												$("#prescriptionPhoto_7").val(localStorage.prescriptionPhoto_7)
												
												var image8 = document.getElementById('myImagePrescription_8');
    											image8.src = localStorage.prescriptionPhoto_8;
												$("#prescriptionPhoto_8").val(localStorage.prescriptionPhoto_8)
												
												var image9 = document.getElementById('myImagePrescription_9');
    											image9.src = localStorage.prescriptionPhoto_9;
												$("#prescriptionPhoto_9").val(localStorage.prescriptionPhoto_9)
												
												var image10 = document.getElementById('myImagePrescription_10');
    											image10.src = localStorage.prescriptionPhoto_10;
												$("#prescriptionPhoto_10").val(localStorage.prescriptionPhoto_10)
												
												var image11 = document.getElementById('myImagePrescription_11');
    											image11.src = localStorage.prescriptionPhoto_11;
												$("#prescriptionPhoto_11").val(localStorage.prescriptionPhoto_11)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image13 = document.getElementById('myImagePrescription_13');
    											image13.src = localStorage.prescriptionPhoto_13;
												$("#prescriptionPhoto_13").val(localStorage.prescriptionPhoto_13)
												
												var image14 = document.getElementById('myImagePrescription_14');
    											image14.src = localStorage.prescriptionPhoto_14;
												$("#prescriptionPhoto_14").val(localStorage.prescriptionPhoto_14)
												
												//var image15 = document.getElementById('myImagePrescription_15');
//    											image15.src = localStorage.prescriptionPhoto_15;
//												$("#prescriptionPhoto_15").val(localStorage.prescriptionPhoto_15)
												
												var image16 = document.getElementById('myImagePrescription_16');
    											image16.src = localStorage.prescriptionPhoto_16;
												$("#prescriptionPhoto_16").val(localStorage.prescriptionPhoto_16)
												
												var image17 = document.getElementById('myImagePrescription_17');
    											image17.src = localStorage.prescriptionPhoto_17;
												$("#prescriptionPhoto_17").val(localStorage.prescriptionPhoto_17)
												
												var image18 = document.getElementById('myImagePrescription_18');
    											image18.src = localStorage.prescriptionPhoto_18;
												$("#prescriptionPhoto_18").val(localStorage.prescriptionPhoto_18)
												
												var image19 = document.getElementById('myImagePrescription_19');
    											image19.src = localStorage.prescriptionPhoto_19;
												$("#prescriptionPhoto_19").val(localStorage.prescriptionPhoto_19)
												
												var image20 = document.getElementById('myImagePrescription_20');
    											image20.src = localStorage.prescriptionPhoto_20;
												$("#prescriptionPhoto_20").val(localStorage.prescriptionPhoto_20)
												
												$("#prescriptionPhoto_15").val('');
												localStorage.prescriptionPhoto_15=''
											}
											else if (localStorage.pic_no==16){
												var image1 = document.getElementById('myImagePrescription_1');
    											image1.src = localStorage.prescriptionPhoto_1;
												$("#prescriptionPhoto_1").val(localStorage.prescriptionPhoto_1)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image3 = document.getElementById('myImagePrescription_3');
    											image3.src = localStorage.prescriptionPhoto_3;
												$("#prescriptionPhoto_3").val(localStorage.prescriptionPhoto_3)
												
												var image4 = document.getElementById('myImagePrescription_4');
    											image4.src = localStorage.prescriptionPhoto_4;
												$("#prescriptionPhoto_4").val(localStorage.prescriptionPhoto_4)
												
												var image5 = document.getElementById('myImagePrescription_5');
    											image5.src = localStorage.prescriptionPhoto_5;
												$("#prescriptionPhoto_5").val(localStorage.prescriptionPhoto_5)
												
												var image6 = document.getElementById('myImagePrescription_6');
    											image6.src = localStorage.prescriptionPhoto_6;
												$("#prescriptionPhoto_6").val(localStorage.prescriptionPhoto_6)
												
												var image7 = document.getElementById('myImagePrescription_7');
    											image7.src = localStorage.prescriptionPhoto_7;
												$("#prescriptionPhoto_7").val(localStorage.prescriptionPhoto_7)
												
												var image8 = document.getElementById('myImagePrescription_8');
    											image8.src = localStorage.prescriptionPhoto_8;
												$("#prescriptionPhoto_8").val(localStorage.prescriptionPhoto_8)
												
												var image9 = document.getElementById('myImagePrescription_9');
    											image9.src = localStorage.prescriptionPhoto_9;
												$("#prescriptionPhoto_9").val(localStorage.prescriptionPhoto_9)
												
												var image10 = document.getElementById('myImagePrescription_10');
    											image10.src = localStorage.prescriptionPhoto_10;
												$("#prescriptionPhoto_10").val(localStorage.prescriptionPhoto_10)
												
												var image11 = document.getElementById('myImagePrescription_11');
    											image11.src = localStorage.prescriptionPhoto_11;
												$("#prescriptionPhoto_11").val(localStorage.prescriptionPhoto_11)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image13 = document.getElementById('myImagePrescription_13');
    											image13.src = localStorage.prescriptionPhoto_13;
												$("#prescriptionPhoto_13").val(localStorage.prescriptionPhoto_13)
												
												var image14 = document.getElementById('myImagePrescription_14');
    											image14.src = localStorage.prescriptionPhoto_14;
												$("#prescriptionPhoto_14").val(localStorage.prescriptionPhoto_14)
												
												var image15 = document.getElementById('myImagePrescription_15');
    											image15.src = localStorage.prescriptionPhoto_15;
												$("#prescriptionPhoto_15").val(localStorage.prescriptionPhoto_15)
												
												//var image16 = document.getElementById('myImagePrescription_16');
//    											image16.src = localStorage.prescriptionPhoto_16;
//												$("#prescriptionPhoto_16").val(localStorage.prescriptionPhoto_16)
												
												var image17 = document.getElementById('myImagePrescription_17');
    											image17.src = localStorage.prescriptionPhoto_17;
												$("#prescriptionPhoto_17").val(localStorage.prescriptionPhoto_17)
												
												var image18 = document.getElementById('myImagePrescription_18');
    											image18.src = localStorage.prescriptionPhoto_18;
												$("#prescriptionPhoto_18").val(localStorage.prescriptionPhoto_18)
												
												var image19 = document.getElementById('myImagePrescription_19');
    											image19.src = localStorage.prescriptionPhoto_19;
												$("#prescriptionPhoto_19").val(localStorage.prescriptionPhoto_19)
												
												var image20 = document.getElementById('myImagePrescription_20');
    											image20.src = localStorage.prescriptionPhoto_20;
												$("#prescriptionPhoto_20").val(localStorage.prescriptionPhoto_20)
												
												$("#prescriptionPhoto_16").val('');
												localStorage.prescriptionPhoto_16=''
											}
											else if (localStorage.pic_no==17){
												var image1 = document.getElementById('myImagePrescription_1');
    											image1.src = localStorage.prescriptionPhoto_1;
												$("#prescriptionPhoto_1").val(localStorage.prescriptionPhoto_1)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image3 = document.getElementById('myImagePrescription_3');
    											image3.src = localStorage.prescriptionPhoto_3;
												$("#prescriptionPhoto_3").val(localStorage.prescriptionPhoto_3)
												
												var image4 = document.getElementById('myImagePrescription_4');
    											image4.src = localStorage.prescriptionPhoto_4;
												$("#prescriptionPhoto_4").val(localStorage.prescriptionPhoto_4)
												
												var image5 = document.getElementById('myImagePrescription_5');
    											image5.src = localStorage.prescriptionPhoto_5;
												$("#prescriptionPhoto_5").val(localStorage.prescriptionPhoto_5)
												
												var image6 = document.getElementById('myImagePrescription_6');
    											image6.src = localStorage.prescriptionPhoto_6;
												$("#prescriptionPhoto_6").val(localStorage.prescriptionPhoto_6)
												
												var image7 = document.getElementById('myImagePrescription_7');
    											image7.src = localStorage.prescriptionPhoto_7;
												$("#prescriptionPhoto_7").val(localStorage.prescriptionPhoto_7)
												
												var image8 = document.getElementById('myImagePrescription_8');
    											image8.src = localStorage.prescriptionPhoto_8;
												$("#prescriptionPhoto_8").val(localStorage.prescriptionPhoto_8)
												
												var image9 = document.getElementById('myImagePrescription_9');
    											image9.src = localStorage.prescriptionPhoto_9;
												$("#prescriptionPhoto_9").val(localStorage.prescriptionPhoto_9)
												
												var image10 = document.getElementById('myImagePrescription_10');
    											image10.src = localStorage.prescriptionPhoto_10;
												$("#prescriptionPhoto_10").val(localStorage.prescriptionPhoto_10)
												
												var image11 = document.getElementById('myImagePrescription_11');
    											image11.src = localStorage.prescriptionPhoto_11;
												$("#prescriptionPhoto_11").val(localStorage.prescriptionPhoto_11)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image13 = document.getElementById('myImagePrescription_13');
    											image13.src = localStorage.prescriptionPhoto_13;
												$("#prescriptionPhoto_13").val(localStorage.prescriptionPhoto_13)
												
												var image14 = document.getElementById('myImagePrescription_14');
    											image14.src = localStorage.prescriptionPhoto_14;
												$("#prescriptionPhoto_14").val(localStorage.prescriptionPhoto_14)
												
												var image15 = document.getElementById('myImagePrescription_15');
    											image15.src = localStorage.prescriptionPhoto_15;
												$("#prescriptionPhoto_15").val(localStorage.prescriptionPhoto_15)
												
												var image16 = document.getElementById('myImagePrescription_16');
    											image16.src = localStorage.prescriptionPhoto_16;
												$("#prescriptionPhoto_16").val(localStorage.prescriptionPhoto_16)
												
												var image17 = document.getElementById('myImagePrescription_17');
    											image17.src = localStorage.prescriptionPhoto_17;
												$("#prescriptionPhoto_17").val(localStorage.prescriptionPhoto_17)
												
												var image18 = document.getElementById('myImagePrescription_18');
    											image18.src = localStorage.prescriptionPhoto_18;
												$("#prescriptionPhoto_18").val(localStorage.prescriptionPhoto_18)
												
												var image19 = document.getElementById('myImagePrescription_19');
    											image19.src = localStorage.prescriptionPhoto_19;
												$("#prescriptionPhoto_19").val(localStorage.prescriptionPhoto_19)
												
												var image20 = document.getElementById('myImagePrescription_20');
    											image20.src = localStorage.prescriptionPhoto_20;
												$("#prescriptionPhoto_20").val(localStorage.prescriptionPhoto_20)
												
												$("#prescriptionPhoto_17").val('');
												localStorage.prescriptionPhoto_17=''
											}
											else if (localStorage.pic_no==18){
												var image1 = document.getElementById('myImagePrescription_1');
    											image1.src = localStorage.prescriptionPhoto_1;
												$("#prescriptionPhoto_1").val(localStorage.prescriptionPhoto_1)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image3 = document.getElementById('myImagePrescription_3');
    											image3.src = localStorage.prescriptionPhoto_3;
												$("#prescriptionPhoto_3").val(localStorage.prescriptionPhoto_3)
												
												var image4 = document.getElementById('myImagePrescription_4');
    											image4.src = localStorage.prescriptionPhoto_4;
												$("#prescriptionPhoto_4").val(localStorage.prescriptionPhoto_4)
												
												var image5 = document.getElementById('myImagePrescription_5');
    											image5.src = localStorage.prescriptionPhoto_5;
												$("#prescriptionPhoto_5").val(localStorage.prescriptionPhoto_5)
												
												var image6 = document.getElementById('myImagePrescription_6');
    											image6.src = localStorage.prescriptionPhoto_6;
												$("#prescriptionPhoto_6").val(localStorage.prescriptionPhoto_6)
												
												var image7 = document.getElementById('myImagePrescription_7');
    											image7.src = localStorage.prescriptionPhoto_7;
												$("#prescriptionPhoto_7").val(localStorage.prescriptionPhoto_7)
												
												var image8 = document.getElementById('myImagePrescription_8');
    											image8.src = localStorage.prescriptionPhoto_8;
												$("#prescriptionPhoto_8").val(localStorage.prescriptionPhoto_8)
												
												var image9 = document.getElementById('myImagePrescription_9');
    											image9.src = localStorage.prescriptionPhoto_9;
												$("#prescriptionPhoto_9").val(localStorage.prescriptionPhoto_9)
												
												var image10 = document.getElementById('myImagePrescription_10');
    											image10.src = localStorage.prescriptionPhoto_10;
												$("#prescriptionPhoto_10").val(localStorage.prescriptionPhoto_10)
												
												var image11 = document.getElementById('myImagePrescription_11');
    											image11.src = localStorage.prescriptionPhoto_11;
												$("#prescriptionPhoto_11").val(localStorage.prescriptionPhoto_11)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image13 = document.getElementById('myImagePrescription_13');
    											image13.src = localStorage.prescriptionPhoto_13;
												$("#prescriptionPhoto_13").val(localStorage.prescriptionPhoto_13)
												
												var image14 = document.getElementById('myImagePrescription_14');
    											image14.src = localStorage.prescriptionPhoto_14;
												$("#prescriptionPhoto_14").val(localStorage.prescriptionPhoto_14)
												
												var image15 = document.getElementById('myImagePrescription_15');
    											image15.src = localStorage.prescriptionPhoto_15;
												$("#prescriptionPhoto_15").val(localStorage.prescriptionPhoto_15)
												
												var image16 = document.getElementById('myImagePrescription_16');
    											image16.src = localStorage.prescriptionPhoto_16;
												$("#prescriptionPhoto_16").val(localStorage.prescriptionPhoto_16)
												
												var image17 = document.getElementById('myImagePrescription_17');
    											image17.src = localStorage.prescriptionPhoto_17;
												$("#prescriptionPhoto_17").val(localStorage.prescriptionPhoto_17)
												
												//var image18 = document.getElementById('myImagePrescription_18');
//    											image18.src = localStorage.prescriptionPhoto_18;
//												$("#prescriptionPhoto_18").val(localStorage.prescriptionPhoto_18)
												
												var image19 = document.getElementById('myImagePrescription_19');
    											image19.src = localStorage.prescriptionPhoto_19;
												$("#prescriptionPhoto_19").val(localStorage.prescriptionPhoto_19)
												
												var image20 = document.getElementById('myImagePrescription_20');
    											image20.src = localStorage.prescriptionPhoto_20;
												$("#prescriptionPhoto_20").val(localStorage.prescriptionPhoto_20)
												
												$("#prescriptionPhoto_18").val('');
												localStorage.prescriptionPhoto_18=''
											}
											else if (localStorage.pic_no==19){
												var image1 = document.getElementById('myImagePrescription_1');
    											image1.src = localStorage.prescriptionPhoto_1;
												$("#prescriptionPhoto_1").val(localStorage.prescriptionPhoto_1)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image3 = document.getElementById('myImagePrescription_3');
    											image3.src = localStorage.prescriptionPhoto_3;
												$("#prescriptionPhoto_3").val(localStorage.prescriptionPhoto_3)
												
												var image4 = document.getElementById('myImagePrescription_4');
    											image4.src = localStorage.prescriptionPhoto_4;
												$("#prescriptionPhoto_4").val(localStorage.prescriptionPhoto_4)
												
												var image5 = document.getElementById('myImagePrescription_5');
    											image5.src = localStorage.prescriptionPhoto_5;
												$("#prescriptionPhoto_5").val(localStorage.prescriptionPhoto_5)
												
												var image6 = document.getElementById('myImagePrescription_6');
    											image6.src = localStorage.prescriptionPhoto_6;
												$("#prescriptionPhoto_6").val(localStorage.prescriptionPhoto_6)
												
												var image7 = document.getElementById('myImagePrescription_7');
    											image7.src = localStorage.prescriptionPhoto_7;
												$("#prescriptionPhoto_7").val(localStorage.prescriptionPhoto_7)
												
												var image8 = document.getElementById('myImagePrescription_8');
    											image8.src = localStorage.prescriptionPhoto_8;
												$("#prescriptionPhoto_8").val(localStorage.prescriptionPhoto_8)
												
												var image9 = document.getElementById('myImagePrescription_9');
    											image9.src = localStorage.prescriptionPhoto_9;
												$("#prescriptionPhoto_9").val(localStorage.prescriptionPhoto_9)
												
												var image10 = document.getElementById('myImagePrescription_10');
    											image10.src = localStorage.prescriptionPhoto_10;
												$("#prescriptionPhoto_10").val(localStorage.prescriptionPhoto_10)
												
												var image11 = document.getElementById('myImagePrescription_11');
    											image11.src = localStorage.prescriptionPhoto_11;
												$("#prescriptionPhoto_11").val(localStorage.prescriptionPhoto_11)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image13 = document.getElementById('myImagePrescription_13');
    											image13.src = localStorage.prescriptionPhoto_13;
												$("#prescriptionPhoto_13").val(localStorage.prescriptionPhoto_13)
												
												var image14 = document.getElementById('myImagePrescription_14');
    											image14.src = localStorage.prescriptionPhoto_14;
												$("#prescriptionPhoto_14").val(localStorage.prescriptionPhoto_14)
												
												var image15 = document.getElementById('myImagePrescription_15');
    											image15.src = localStorage.prescriptionPhoto_15;
												$("#prescriptionPhoto_15").val(localStorage.prescriptionPhoto_15)
												
												var image16 = document.getElementById('myImagePrescription_16');
    											image16.src = localStorage.prescriptionPhoto_16;
												$("#prescriptionPhoto_16").val(localStorage.prescriptionPhoto_16)
												
												var image17 = document.getElementById('myImagePrescription_17');
    											image17.src = localStorage.prescriptionPhoto_17;
												$("#prescriptionPhoto_17").val(localStorage.prescriptionPhoto_17)
												
												var image18 = document.getElementById('myImagePrescription_18');
    											image18.src = localStorage.prescriptionPhoto_18;
												$("#prescriptionPhoto_18").val(localStorage.prescriptionPhoto_18)
												
												//var image19 = document.getElementById('myImagePrescription_19');
//    											image19.src = localStorage.prescriptionPhoto_19;
//												$("#prescriptionPhoto_19").val(localStorage.prescriptionPhoto_19)
												
												var image20 = document.getElementById('myImagePrescription_20');
    											image20.src = localStorage.prescriptionPhoto_20;
												$("#prescriptionPhoto_20").val(localStorage.prescriptionPhoto_20)
												
												$("#prescriptionPhoto_19").val('');
												localStorage.prescriptionPhoto_19=''
											}
											else if (localStorage.pic_no==20){
												var image1 = document.getElementById('myImagePrescription_1');
    											image1.src = localStorage.prescriptionPhoto_1;
												$("#prescriptionPhoto_1").val(localStorage.prescriptionPhoto_1)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image3 = document.getElementById('myImagePrescription_3');
    											image3.src = localStorage.prescriptionPhoto_3;
												$("#prescriptionPhoto_3").val(localStorage.prescriptionPhoto_3)
												
												var image4 = document.getElementById('myImagePrescription_4');
    											image4.src = localStorage.prescriptionPhoto_4;
												$("#prescriptionPhoto_4").val(localStorage.prescriptionPhoto_4)
												
												var image5 = document.getElementById('myImagePrescription_5');
    											image5.src = localStorage.prescriptionPhoto_5;
												$("#prescriptionPhoto_5").val(localStorage.prescriptionPhoto_5)
												
												var image6 = document.getElementById('myImagePrescription_6');
    											image6.src = localStorage.prescriptionPhoto_6;
												$("#prescriptionPhoto_6").val(localStorage.prescriptionPhoto_6)
												
												var image7 = document.getElementById('myImagePrescription_7');
    											image7.src = localStorage.prescriptionPhoto_7;
												$("#prescriptionPhoto_7").val(localStorage.prescriptionPhoto_7)
												
												var image8 = document.getElementById('myImagePrescription_8');
    											image8.src = localStorage.prescriptionPhoto_8;
												$("#prescriptionPhoto_8").val(localStorage.prescriptionPhoto_8)
												
												var image9 = document.getElementById('myImagePrescription_9');
    											image9.src = localStorage.prescriptionPhoto_9;
												$("#prescriptionPhoto_9").val(localStorage.prescriptionPhoto_9)
												
												var image10 = document.getElementById('myImagePrescription_10');
    											image10.src = localStorage.prescriptionPhoto_10;
												$("#prescriptionPhoto_10").val(localStorage.prescriptionPhoto_10)
												
												var image11 = document.getElementById('myImagePrescription_11');
    											image11.src = localStorage.prescriptionPhoto_11;
												$("#prescriptionPhoto_11").val(localStorage.prescriptionPhoto_11)
												
												var image12 = document.getElementById('myImagePrescription_12');
    											image12.src = localStorage.prescriptionPhoto_12;
												$("#prescriptionPhoto_12").val(localStorage.prescriptionPhoto_12)
												
												var image13 = document.getElementById('myImagePrescription_13');
    											image13.src = localStorage.prescriptionPhoto_13;
												$("#prescriptionPhoto_13").val(localStorage.prescriptionPhoto_13)
												
												var image14 = document.getElementById('myImagePrescription_14');
    											image14.src = localStorage.prescriptionPhoto_14;
												$("#prescriptionPhoto_14").val(localStorage.prescriptionPhoto_14)
												
												var image15 = document.getElementById('myImagePrescription_15');
    											image15.src = localStorage.prescriptionPhoto_15;
												$("#prescriptionPhoto_15").val(localStorage.prescriptionPhoto_15)
												
												var image16 = document.getElementById('myImagePrescription_16');
    											image16.src = localStorage.prescriptionPhoto_16;
												$("#prescriptionPhoto_16").val(localStorage.prescriptionPhoto_16)
												
												var image17 = document.getElementById('myImagePrescription_17');
    											image17.src = localStorage.prescriptionPhoto_17;
												$("#prescriptionPhoto_17").val(localStorage.prescriptionPhoto_17)
												
												var image18 = document.getElementById('myImagePrescription_18');
    											image18.src = localStorage.prescriptionPhoto_18;
												$("#prescriptionPhoto_18").val(localStorage.prescriptionPhoto_18)
												
												var image19 = document.getElementById('myImagePrescription_19');
    											image19.src = localStorage.prescriptionPhoto_19;
												$("#prescriptionPhoto_19").val(localStorage.prescriptionPhoto_19)
												
												//var image20 = document.getElementById('myImagePrescription_20');
//    											image20.src = localStorage.prescriptionPhoto_20;
//												$("#prescriptionPhoto_20").val(localStorage.prescriptionPhoto_20)
												
												$("#prescriptionPhoto_20").val('');
												localStorage.prescriptionPhoto_20=''
											}
											//localStorage.pic_no='';
											//$("#campaign_combo_id_lv").empty()
//											$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign);
											
											setProductList();
											$("#itemSearch").val('A')
											searchItem()
											
											
											//alert (localStorage.pic_no)
											//localStorage.campaign_doc_str=''
											
											$("#lat").val("");
											$("#long").val("");
											//alert ('1')
											//$("#prescriptionPhoto").val("");
											
											$("#wait_image_prescription").hide();
											$("#btn_prescription_submit").show();
											//alert ('2')
											//--------------------------
											//clear_mgs();
											

											$.afui.loadContent("#page_success",true,true,'right');
											
											
										}else{						
											$("#error_prescription_submit").html('Authentication error. Please register and sync to retry.');
											$("#wait_image_prescription").hide();
											$("#btn_prescription_submit").show();
											}
								}
}
						});			 
				
						
//		}pic else
	}
}




function new_ps(){
	$.afui.loadContent("#imagePage",true,true,'right');
//	location.reload();

	
}

function searchItem() {
	//alert ('aaaaaaaaa ')		
	//var filter = input.value.toUpperCase();
	var filter  = $("#itemSearch").val().toUpperCase();
	//alert (filter)
	//var lis = document.getElementsById('mylist');
	 var lis =document.getElementById("campaign_combo_id_lv").getElementsByTagName("li");
	//var lis = document.getElementsByTagName('ul>li');
	//alert(lis.length);
	for (var i = 0; i < lis.length; i++) {
		var name = lis[i].getElementsByClassName('name')[0].innerHTML;
		
		if (name.toUpperCase().indexOf(filter) == 0) 
			lis[i].style.display = 'list-item';
		else
			lis[i].style.display = 'none';
		$("#campaign_combo_id_lv").find(lis[0]).first().focus()
	}
}
function comboSearch() {
	var filter_value=$("#item_combo").val().toUpperCase();
	//alert (filter_value)
	$("#itemSearch").val(filter_value)
	var filter  =filter_value;
	//alert (filter)
	//var lis = document.getElementsById('mylist');
	 var lis =document.getElementById("campaign_combo_id_lv").getElementsByTagName("li");
	//var lis = document.getElementsByTagName('ul>li');
	//alert(lis.length);
	for (var i = 0; i < lis.length; i++) {
		var name = lis[i].getElementsByClassName('name')[0].innerHTML;
		
		if (name.toUpperCase().indexOf(filter) == 0) 
			lis[i].style.display = 'list-item';
		else
			lis[i].style.display = 'none';
		$("#campaign_combo_id_lv").find(lis[0]).first().focus()
	}
}
function searchMarket() {
	var filter  = $("#marketSearch").val().toUpperCase();
	//alert (filter);
	 var lis =document.getElementById("market_combo_id_lv").getElementsByTagName("li");

	for (var i = 0; i < lis.length; i++) {
		var name = lis[i].getElementsByClassName('name')[0].innerHTML;
		//alert (name)
		if (name.toUpperCase().indexOf(filter) == 0) 
			lis[i].style.display = 'list-item';
		else
			lis[i].style.display = 'none';
	}
}
function searchDoctor() {
	var filter  = $("#doctorSearch").val().toUpperCase();
	
	 var lis =document.getElementById("doctor_combo_id_lv").getElementsByTagName("li");

	for (var i = 0; i < lis.length; i++) {
		var name = lis[i].getElementsByClassName('name')[0].innerHTML;
		//alert (name)
		if (name.toUpperCase().indexOf(filter) == 0) 
			lis[i].style.display = 'list-item';
		else
			lis[i].style.display = 'none';
	}
}

function getPrescriptionImage_1() {
	//navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		//destinationType: Camera.DestinationType.FILE_URI });
   navigator.camera.getPicture(onSuccess_1, onFail_1, { quality: 90,
		targetWidth: 400,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
		
}
function onSuccess_1(imageURI) {
	//alert ('Success')
    var image = document.getElementById('myImagePrescription_1');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_1").val(imagePath);
}
function onFail_1(message) {
	//alert ('Fail')
	imagePath="";
    alert('Failed because: ' + message);
}


function getPrescriptionImage_2() {
	//navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		//destinationType: Camera.DestinationType.FILE_URI });
   
   navigator.camera.getPicture(onSuccess_2, onFail_2, { quality: 90,
		targetWidth: 400,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
		
}
function onSuccess_2(imageURI) {
	//alert ('Success')
    var image = document.getElementById('myImagePrescription_2');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_2").val(imagePath);
}
function onFail_2(message) {
	//alert ('Fail')
	imagePath="";
    alert('Failed because: ' + message);
}


function getPrescriptionImage_3() {
	//navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		//destinationType: Camera.DestinationType.FILE_URI });
  
   navigator.camera.getPicture(onSuccess_3, onFail_3, { quality: 90,
		targetWidth: 400,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
		
}
function onSuccess_3(imageURI) {
	//alert ('Success')
    var image = document.getElementById('myImagePrescription_3');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_3").val(imagePath);
}
function onFail_3(message) {
	//alert ('Fail')
	imagePath="";
    alert('Failed because: ' + message);
}

//------------------------------------------



function getPrescriptionImage_4() {
	//navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		//destinationType: Camera.DestinationType.FILE_URI });
   navigator.camera.getPicture(onSuccess_4, onFail_4, { quality: 90,
		targetWidth: 400,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
		
}
function onSuccess_4(imageURI) {
    var image = document.getElementById('myImagePrescription_4');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_4").val(imagePath);
}
function onFail_4(message) {
	imagePath="";
    alert('Failed because: ' + message);
}

function getPrescriptionImage_5() {
	//navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		//destinationType: Camera.DestinationType.FILE_URI });
  
   navigator.camera.getPicture(onSuccess_5, onFail_5, { quality: 90,
		targetWidth: 400,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
		
}
function onSuccess_5(imageURI) {
    var image = document.getElementById('myImagePrescription_5');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_5").val(imagePath);
}
function onFail_5(message) {
	imagePath="";
    alert('Failed because: ' + message);
}

function getPrescriptionImage_6() {
	//navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		//destinationType: Camera.DestinationType.FILE_URI });
   navigator.camera.getPicture(onSuccess_6, onFail_6, { quality: 90,
		targetWidth: 400,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
		
}
function onSuccess_6(imageURI) {
	//alert ('Success')
    var image = document.getElementById('myImagePrescription_6');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_6").val(imagePath);
}
function onFail_6(message) {
	imagePath="";
    alert('Failed because: ' + message);
}

function getPrescriptionImage_7() {
	//navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		//destinationType: Camera.DestinationType.FILE_URI });
  
   navigator.camera.getPicture(onSuccess_7, onFail_7, { quality: 90,
		targetWidth: 400,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
		
}
function onSuccess_7(imageURI) {
    var image = document.getElementById('myImagePrescription_7');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_7").val(imagePath);
}
function onFail_7(message) {
	imagePath="";
    alert('Failed because: ' + message);
}

function getPrescriptionImage_8() {
	//navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		//destinationType: Camera.DestinationType.FILE_URI });
   navigator.camera.getPicture(onSuccess_8, onFail_8, { quality: 90,
		targetWidth: 400,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
		
}
function onSuccess_8(imageURI) {
    var image = document.getElementById('myImagePrescription_8');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_8").val(imagePath);
}
function onFail_8(message) {
	imagePath="";
    alert('Failed because: ' + message);
}

function getPrescriptionImage_9() {
	//navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		//destinationType: Camera.DestinationType.FILE_URI });
  
   navigator.camera.getPicture(onSuccess_9, onFail_9, { quality: 90,
		targetWidth: 400,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
		
}
function onSuccess_9(imageURI) {
    var image = document.getElementById('myImagePrescription_3');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_9").val(imagePath);
}
function onFail_9(message) {
	imagePath="";
    alert('Failed because: ' + message);
}

function getPrescriptionImage_3() {
	//navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		//destinationType: Camera.DestinationType.FILE_URI });
  
   navigator.camera.getPicture(onSuccess_3, onFail_3, { quality: 90,
		targetWidth: 400,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
		
}
function onSuccess_3(imageURI) {
	//alert ('Success')
    var image = document.getElementById('myImagePrescription_3');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_3").val(imagePath);
}
function onFail_3(message) {
	//alert ('Fail')
	imagePath="";
    alert('Failed because: ' + message);
}

function getPrescriptionImage_3() {
	//navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		//destinationType: Camera.DestinationType.FILE_URI });
  
   navigator.camera.getPicture(onSuccess_3, onFail_3, { quality: 90,
		targetWidth: 400,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
		
}
function onSuccess_3(imageURI) {
	//alert ('Success')
    var image = document.getElementById('myImagePrescription_3');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_3").val(imagePath);
}
function onFail_3(message) {
	//alert ('Fail')
	imagePath="";
    alert('Failed because: ' + message);
}

function getPrescriptionImage_3() {
	//navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		//destinationType: Camera.DestinationType.FILE_URI });
  
   navigator.camera.getPicture(onSuccess_3, onFail_3, { quality: 90,
		targetWidth: 400,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
		
}
function onSuccess_3(imageURI) {
	//alert ('Success')
    var image = document.getElementById('myImagePrescription_3');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_3").val(imagePath);
}
function onFail_3(message) {
	//alert ('Fail')
	imagePath="";
    alert('Failed because: ' + message);
}

function getPrescriptionImage_3() {
	//navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		//destinationType: Camera.DestinationType.FILE_URI });
  
   navigator.camera.getPicture(onSuccess_3, onFail_3, { quality: 90,
		targetWidth: 400,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
		
}
function onSuccess_3(imageURI) {
	//alert ('Success')
    var image = document.getElementById('myImagePrescription_3');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_3").val(imagePath);
}
function onFail_3(message) {
	//alert ('Fail')
	imagePath="";
    alert('Failed because: ' + message);
}



//---------------------------------------------












function uploadPhoto(imageURI, imageName) {
   // alert (localStorage.photo_submit_url)
	var options = new FileUploadOptions();
    options.fileKey="upload";
    options.fileName=imageName;
    options.mimeType="image/jpeg";
	
    var params = {};
    params.value1 = "test";
    params.value2 = "param";
	
    options.params = params;
	
    var ft = new FileTransfer();
     ft.upload(imageURI, encodeURI(localStorage.photo_submit_url+"fileUploaderPrescription/"),winProfile,failProfile,options);
	 
}

function winProfile(r) {
}

function failProfile(error) {
	$("#error_prescription_submit").text('Memory Error. Please take new picture and Submit');
}





function search_setfocus(){
	jQuery("#itemSearch").focus()
}


function exit() {	
	navigator.app.exitApp();
}









//============Report
//=====================Report============
//=====================Report============
function set_report_parameter_doctor() {	
	var date_from_doc=$("#date_from_doc").val();
	var date_to_doc=$("#date_to_doc").val();
	var rep_id_report_doc=$("#se_mpo_doc").val();
	var se_item_report_doc=$("#se_item_doc").val();
	var se_market_report_doc=$("#se_market_doc").val();
	
	if (se_market_report_doc==""){
		se_market_report_doc="All"
	}
	
	
	se_item_report="All"
	
	if (date_from_doc.length==0){
		date_from_show_doc="Today"
	}
	else{
		date_from_show_doc=date_from_doc
	}
	if (date_to_doc.length==0){
		date_to_show_doc="Today"
	}
	else{
		date_to_show_doc=date_to_doc
	}
	//alert (se_item_report);
	
	if (rep_id_report_doc.length==0){
		rep_id_report_doc=localStorage.user_id;
	}
	
	localStorage.date_from_doc=date_from_doc
	localStorage.date_to_doc=date_to_doc;
	localStorage.rep_id_report_doc=rep_id_report_doc;
	localStorage.se_item_report_doc=se_item_report_doc;
	localStorage.se_market_report_doc=se_market_report_doc;
	
	
	
	
	$("#report_market_prescription").html("Market :"+localStorage.se_market_report_doc);
	$("#report_mpo_prescription").html("MPO :"+localStorage.rep_id_report_doc);
	$("#date_f_prescription").html("DateFrom :"+date_from_show_doc);
	$("#date_t_prescription").html("DateTo :"+date_to_show_doc);
	
	
	

}
//=====================PRESCRIPTION REPORT======================
function summary_report_prescription() {
	$("#myerror_s_report").html('')
	$("#wait_image_p").show();		
	set_report_parameter_doctor();
	

//Blank all div
		
	$("#visit_count_prescription").html("");	
	$("#rep_detail_doctor").html('');
//$("#myerror_s_report").html('asfdsg');
	// ajax-------	
	    $("#myerror_s_reporttxt").val(localStorage.base_url+'report_summary_prescription?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&rep_id_report='+localStorage.rep_id_report_doc+'&se_item_report='+localStorage.se_item_report_doc+'&se_market_report='+localStorage.se_market_report_doc+'&date_from='+localStorage.date_from_doc+'&date_to='+localStorage.date_to_doc+'&user_type='+localStorage.user_type);
	// ajax-------
	
			$.ajax(localStorage.base_url+'report_summary_prescription?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&rep_id_report='+localStorage.rep_id_report_doc+'&se_item_report='+localStorage.se_item_report_doc+'&se_market_report='+localStorage.se_market_report_doc+'&date_from='+localStorage.date_from_doc+'&date_to='+localStorage.date_to_doc+'&user_type='+localStorage.user_type,{

								type: 'POST',
								timeout: 30000,
								error: function(xhr) {
								$("#wait_image_prescription").hide();
								$("#myerror_s_report").html('Network timeout. Please ensure data connectivity and re-submit.');
													},
								success:function(data, status,xhr){	
									  $("#wait_image_p").hide();
									
									 if (status!='success'){
										 
										$("#myerror_s_report").html('Network timeout. Please ensure data connectivity and re-submit..');
										
									 }
									 else{
										  
									 // alert (status)
							var resultArray = data.replace('</START>','').replace('</END>','').split('<SYNCDATA>');	
										
								if (resultArray[0]=='FAILED'){
									
											$("#myerror_s_report").text(resultArray[0]);	
											
										}
								else if (resultArray[0]=='SUCCESS'){	
	
												
								var result_string=resultArray[1];
								
																
								//----------------
								var resultList = result_string.split('<rd>');
								var visit_count=resultList[0];
								//var visit_areawise=resultList[1];
								//var visit_repwise=resultList[2];
							
								
								//-----------------
							//	$("#err_retailer_date_next").text("");
								
								$("#report_header_prescription").text("Prescription Count");
								$("#visit_count_prescription").html("<font style='font-size:15px; color:#666'>"+"Prescription Count:"+visit_count+"</font>");
								//$("#visit_withAtt_prescription").html("<font style='font-size:15px; color:#666'>"+visit_areawise+"</font>");
								//$("#visit_withoutAtt_prescription").html("<font style='font-size:15px; color:#666'>"+visit_repwise+"</font>");
								
								//-----

								
							}else{	
								$("#wait_image_p").hide();					
								$("#myerror_s_report").html('Network Timeout. Please try again.');
								}
						}
					  }
			 });//end ajax
	
	
	
	
	$.afui.loadContent("#page_report_prescription",true,true,'right');
	
}

//========================Detail Report============
function detail_report_prescription() {	
	$("#myerror_s_report").html('')
	$("#wait_image_p").show();
	set_report_parameter_doctor();

	
	
	localStorage.date_to_doc=localStorage.date_from_doc;
	$("#date_f_doctor").html("Date :"+date_from_show_doc);
	$("#date_t_doctor").html("");
	
	 //Blank all div
	
	$("#visit_count_doctor").html("");
	$("#visit_withAtt_doctor").html("");
	$("#visit_withoutAtt_doctor").html("");
	
	$("#rep_detail_doctor").html('');
//$("#myerror_s_report").html('asfdsg');
	// ajax-------
	//$("#myerror_s_report_prescription").html(localStorage.base_url+'report_detail_prescription?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&rep_id_report='+localStorage.rep_id_report_doc+'&se_item_report='+localStorage.se_item_report_doc+'&se_market_report='+localStorage.se_market_report_doc+'&date_from='+localStorage.date_from_doc+'&date_to='+localStorage.date_to_doc+'&user_type='+localStorage.user_type);
	// ajax-------
	$.ajax(localStorage.base_url+'report_detail_prescription?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&rep_id_report='+localStorage.rep_id_report_doc+'&se_item_report='+localStorage.se_item_report_doc+'&se_market_report='+localStorage.se_market_report_doc+'&date_from='+localStorage.date_from_doc+'&date_to='+localStorage.date_to_doc+'&user_type='+localStorage.user_type,{

								type: 'POST',
								timeout: 30000,
								error: function(xhr) {	
								$("#wait_image_p").hide();
								$("#myerror_s_report").html('Network timeout. Please ensure data connectivity and re-submit.');
													},
								success:function(data, status,xhr){	
									$("#wait_image_p").hide();
									 if (status!='success'){
										$("#myerror_s_report").html('Network timeout. Please ensure data connectivity and re-submit..');
										
									 }
									 else{	
									 	var resultArray = data.replace('</START>','').replace('</END>','').split('<SYNCDATA>');	
										
								if (resultArray[0]=='FAILED'){
											$("#myerror_s_report").text(resultArray[0]);	
											
										}
								else if (resultArray[0]=='SUCCESS'){
														
								var result_string=resultArray[1];
								
																
								//----------------
								var resultList = result_string.split('<rd>');

								var visit_count=resultList[0];
								//var visit_with_attribute=resultList[1];
								//var visit_without_attribute=resultList[2];
								var report_detal =resultList[1];
							
								
								//-----------------
								$("#err_retailer_date_next").text("");
								
								$("#report_header_prescription").text("prescription Detail");
								
								
								
								$("#visit_count_prescription").html("Prescription Count:"+visit_count);
								
//                              if (localStorage.user_type=='sup'){
//									$("#visit_withAtt_prescription").html(visit_with_attribute);
//									$("#visit_withoutAtt_prescription").html(visit_without_attribute);
//								}
								
								$("#rep_detail_prescription").html("<div width='70%'>"+report_detal+"</div>");
								
							}else{	
								$("#wait_image_p").hide();					
								$("#myerror_s_report").html('Network Timeout. Please try again.');
								}
						}
					  }
			 });//end ajax
	
	
	
	
	$.afui.loadContent("#page_report_prescription",true,true,'right');

}

function searchProductChar(char) {
	var filter  = char;
	
	var lis =document.getElementById("campaign_combo_id_lv").getElementsByTagName("li");
	//alert (filter);
	for (var i = 0; i < lis.length; i++) {
		var name = lis[i].getElementsByClassName('name')[0].innerHTML;
		//alert (name)
		if (name.toUpperCase().indexOf(filter) == 0) 
			lis[i].style.display = 'list-item';
		else
			lis[i].style.display = 'none';
		//$("#item_combo_id_lv").find(lis[0]).first().focus()
	}
	$("#item_combo_id").val('');
	$("#item_combo_id").focus();
	
}
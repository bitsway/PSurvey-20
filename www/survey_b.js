

function homePage() {
	
	$.afui.loadContent("#imagePage",true,true,'right');
}
function marketPage() {
	localStorage.click_flag=0;
	$.afui.loadContent("#marketPage",true,true,'right');
}
function page_doctor_campaign(){
	//alert ('assdfsdf')
	
	$.afui.loadContent("#page_doctor_campaign",true,true,'right');
}
function page_doctor(){
	$("#item_load").hide();
	localStorage.click_flag=0;
	$.afui.loadContent("#page_doctor",true,true,'right');
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
	//var  apipath_base_photo_dm='http://127.0.0.1:8000/mrepbiopharma/syncmobile_prescription/dm_prescription_path?CID='+cid +'&HTTPPASS=e99business321cba'
//	
//	

	var apipath_base_photo_dm ='http://e2.businesssolutionapps.com/welcome/dmpath_prescription/get_path?CID='+cid +'&HTTPPASS=e99business321cba';
	
	
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
							//$("#error_login").html(localStorage.base_url+'check_user?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode);
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
											
											//alert (localStorage.productListStr)
											for (j=0; j < productLength; j++){
												
												var productArray2 = productList[j].split('<fd>');
												var product_id2=productArray2[0];	
												var product_name2=productArray2[1];
												var product_price=productArray2[2];
												
												var product_qty='';																		
												
												product_tbl_doc_campaign=product_tbl_doc_campaign+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin" > '+'<table width="100%" border="0" id="order_tbl" cellpadding="0" cellspacing="0" style="border-radius:5px;">'+'<tr style="border-bottom:1px solid #D2EEE9;"><td width="60px" style="text-align:center; padding-left:5px;"><input class="docCampaign" type="checkbox" onClick="getDocCampaignData_keyup(\''+product_id2+'\')" name="doc_camp'+product_id2+'" value="checkbox" id="doc_camp'+product_id2+'"><label for="doc_camp'+product_id2+'"></br></label><input type="hidden" id="doc_camp_id'+product_id2+'" value="'+product_id2+'" ><input type="hidden" id="doc_camp_price'+product_id2+'" value="'+product_price+'" ><input type="hidden" id="doc_camp_name'+product_id2.toUpperCase()+'" value="'+product_name2.toUpperCase()+'" placeholder="qty" ></td><td  style="text-align:left;">'+'</br><font id="'+ product_id2 +'" onClick="check_boxTrue(\''+product_id2+'\')" class="name" >'+ product_name2.toUpperCase()+'</font></td></tr>'+'</table>'+'</li>';
												//$("#error_login").html('Processing Product List....');	
											}
											
											
											localStorage.product_tbl_doc_campaign=product_tbl_doc_campaign
											$("#campaign_combo_id_lv").empty()
											$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign);
											
											//================Market
													var planMarketList = localStorage.marketListStr.split('<rd>');
													var planMarketListShowLength=planMarketList.length	
													
													var visitPlanMarketComb=''								
													var profileMarketComb='';								
													var unscheduleMarketComb='';
													
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

function gotoMarket(pic_no) {
	//alert (pic_no)
	if (pic_no!=localStorage.pic_no){
		$("#campaign_combo_id_lv").empty()
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign); 
	}
	localStorage.pic_no=pic_no
	
	var prescriptionPhoto_1=$("#prescriptionPhoto_1").val();
	var prescriptionPhoto_2=$("#prescriptionPhoto_2").val();
	var prescriptionPhoto_3=$("#prescriptionPhoto_3").val();
			
	var error_flag=0
	
	if (localStorage.pic_no ==1){
		if (prescriptionPhoto_1==''){
			var error_flag=1
		}
	}
	if (localStorage.pic_no ==2){
		if (prescriptionPhoto_2==''){
			var error_flag=1
		}
	}
	if (localStorage.pic_no ==3){
		if (prescriptionPhoto_3==''){
			var error_flag=1
		}
	}
	
	//alert (error_flag)
	if (error_flag==0){
		$.afui.loadContent("#marketPage",true,true,'right');
	}
	else{
		$("#error_image").html('Required picture');
		
	}
	
}

function marketNext_doc(marketNameID) {
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
			
			if(visit_client=='' || visit_client==0){
					$("#err_m_retailer_next").text("Retailer required");
			}else{
				$("#btn_unschedule_market_ret").hide();
				$("#unscheduled_m_client_combo_id_lv").hide();
				
				//alert ('nn');
				$("#wait_image_ret").show();		
				
				$(".visit_client").html(visit_client);
				
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
				
		
				$.afui.loadContent("#page_doctor_campaign",true,true,'right');
				localStorage.click_flag==0;
				//$("#doctor_campaign_list_tbl").html(localStorage.product_tbl_str_doc_campaign);
		
				//$('#campaign_combo_id_lv').listview();
				//location.reload();
				//alert (localStorage.product_tbl_doc_campaign)
								
				//$("#item_load").hide();	
			
			}
	}
}




function getDocCampaignData(){	
	//alert (localStorage.campaign_doc_str.length)
    if  (localStorage.campaign_doc_str.length < 5){
	
	$("#myerror_doctor_campaign").html('Please select minimum one Item');
	//$.afui.loadContent("#page_prescription",true,true,'right');		
	}
	else{
		$.afui.loadContent("#page_prescription",true,true,'right');
	}
}
function check_boxTrue(product_id){	
	//alert (product_id);
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
							//alert ('1')
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
		
		localStorage.prescriptionPhoto_1 = prescriptionPhoto_1;
		localStorage.prescriptionPhoto_2 = prescriptionPhoto_2;
		localStorage.prescriptionPhoto_3 = prescriptionPhoto_3;
		
		
		if (localStorage.pic_no==1){
			prescriptionPhoto=$("#prescriptionPhoto_1").val();
		}
		else if (localStorage.pic_no==2){
			prescriptionPhoto=$("#prescriptionPhoto_2").val();
		}
		else if (localStorage.pic_no==3){
			prescriptionPhoto=$("#prescriptionPhoto_3").val();
		}
		//prescriptionPhoto='dasdfadf'
		if (prescriptionPhoto==''){
			$("#error_prescription_submit").html('Required picture');
			$("#wait_image_prescription").hide();
			$("#btn_prescription_submit").show();
		}else{			
			var now = $.now();
			var imageName=localStorage.user_id+'_'+now.toString()+'.jpg';
			
				$("#wait_image_prescription").show();				
				var medicine_1=$("#medicine_1").val();
				var medicine_2=$("#medicine_2").val();
				var medicine_3=$("#medicine_3").val();
				var medicine_4='';
				var medicine_5='';
				
				//$("#error_prescription_submit").text(localStorage.base_url+'prescription_submit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+encodeURIComponent(localStorage.user_pass)+'&synccode='+localStorage.synccode+'&areaId='+areaId+'&doctor_id='+encodeURIComponent(doctorId)+'&doctor_name='+encodeURIComponent(doctor_name)+'&medicine_1='+encodeURIComponent(medicine_1)+'&medicine_2='+encodeURIComponent(medicine_2)+'&medicine_3='+encodeURIComponent(medicine_3)+'&medicine_4='+encodeURIComponent(medicine_4)+'&medicine_5='+encodeURIComponent(medicine_5)+'&latitude='+latitude+'&longitude='+longitude+'&pres_photo='+imageName+'&campaign_doc_str='+localStorage.campaign_doc_str+'&version=1')							
				//alert (localStorage.campaign_doc_str)
				 $.ajax(localStorage.base_url+'prescription_submit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+encodeURIComponent(localStorage.user_pass)+'&synccode='+localStorage.synccode+'&areaId='+areaId+'&doctor_id='+encodeURIComponent(doctorId)+'&doctor_name='+encodeURIComponent(doctor_name)+'&medicine_1='+encodeURIComponent(medicine_1)+'&medicine_2='+encodeURIComponent(medicine_2)+'&medicine_3='+encodeURIComponent(medicine_3)+'&medicine_4='+encodeURIComponent(medicine_4)+'&medicine_5='+encodeURIComponent(medicine_5)+'&latitude='+latitude+'&longitude='+longitude+'&pres_photo='+imageName+'&campaign_doc_str='+localStorage.campaign_doc_str+'&version=1',{
								// cid:localStorage.cid,rep_id:localStorage.user_id,rep_pass:localStorage.user_pass,synccode:localStorage.synccode,
								type: 'POST',
								timeout: 30000,
								error: function(xhr) {
											$("#error_prescription_submit").html(resultArray[1]);
											$("#wait_image_prescription").hide();
											$("#btn_prescription_submit").show();
											
								},
							success:function(data, status,xhr){				
				//$.post(localStorage.base_url+'prescription_submit?',{
//						cid:localStorage.cid,
//						rep_id:localStorage.user_id,
//						rep_pass:encodeURIComponent(localStorage.user_pass),
//						synccode:localStorage.synccode,
//						areaId:areaId,
//						doctor_id:encodeURIComponent(doctorId),
//						doctor_name:encodeURIComponent(doctor_name),
//						medicine_1:encodeURIComponent(medicine_1),
//						medicine_2:encodeURIComponent(medicine_2),
//						medicine_3:encodeURIComponent(medicine_3),
//						medicine_4:encodeURIComponent(medicine_4),
//						medicine_5:encodeURIComponent(medicine_5),
//						latitude:localStorage.latitude_found,
//						longitude:localStorage.longitude_found,
//						pres_photo:imageName,
//						campaign_doc_str:localStorage.campaign_doc_str,
//						version:'1'},
//						function(data, status){
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
											
											
											document.getElementById('myImagePrescription_1').src = '';
											document.getElementById('myImagePrescription_2').src = '';
											document.getElementById('myImagePrescription_3').src = '';
										
											//image upload function									
											uploadPhoto(prescriptionPhoto, imageName);
											//alert ('0')
											//alert (localStorage.pic_no)
											if (localStorage.pic_no==1){								
												var image2 = document.getElementById('myImagePrescription_2');
    											image2.src = localStorage.prescriptionPhoto_2;
												$("#prescriptionPhoto_2").val(localStorage.prescriptionPhoto_2)
												
												var image3 = document.getElementById('myImagePrescription_3');
    											image3.src = localStorage.prescriptionPhoto_3;
												$("#prescriptionPhoto_3").val(localStorage.prescriptionPhoto_3)
												
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
												
												$("#prescriptionPhoto_3").val('');
												localStorage.prescriptionPhoto_3=''
											}
											
											
											//localStorage.pic_no='';
											$("#campaign_combo_id_lv").empty()
											$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign);
											//$("#doctor_name").val("");
											$("#medicine_1").val("");
											$("#medicine_2").val("");
											$("#medicine_3").val("");
											
											//alert (localStorage.pic_no)
											localStorage.campaign_doc_str=''
											
											$("#lat").val("");
											$("#long").val("");
											//alert ('1')
											$("#prescriptionPhoto").val("");
											
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
				
						
		}
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






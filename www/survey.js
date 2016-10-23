

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
function page_prescription() {
	//$("#order_load").hide();
	$.afui.loadContent("#page_prescription",true,true,'right');
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

	
//	//var  apipath_base_photo_dm='http://c003.cloudapp.net/mrepacme/syncmobile_prescription/dm_prescription_path?CID='+cid +'&HTTPPASS=e99business321cba'
//	var  apipath_base_photo_dm='http://127.0.0.1:8000/skf/syncmobile_prescription/dm_prescription_path?CID='+cid +'&HTTPPASS=e99business321cba'

	var  apipath_base_photo_dm='http://a002.businesssolutionapps.com/gpl/syncmobile_prescription/dm_prescription_path?CID='+cid +'&HTTPPASS=e99business321cba'
	
	
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
											//alert (localStorage.productListStr);
											
											
											localStorage.product_tbl_doc_campaign_A=''
											localStorage.product_tbl_doc_campaign_B=''
											localStorage.product_tbl_doc_campaign_C=''
											localStorage.product_tbl_doc_campaign_D=''
											localStorage.product_tbl_doc_campaign_E=''
											localStorage.product_tbl_doc_campaign_F=''
											localStorage.product_tbl_doc_campaign_G=''
											localStorage.product_tbl_doc_campaign_H=''
											localStorage.product_tbl_doc_campaign_I=''
											localStorage.product_tbl_doc_campaign_J=''
											localStorage.product_tbl_doc_campaign_K=''
											localStorage.product_tbl_doc_campaign_L=''
											localStorage.product_tbl_doc_campaign_M=''
											localStorage.product_tbl_doc_campaign_N=''
											localStorage.product_tbl_doc_campaign_O=''
											localStorage.product_tbl_doc_campaign_P=''
											localStorage.product_tbl_doc_campaign_Q=''
											localStorage.product_tbl_doc_campaign_R=''
											localStorage.product_tbl_doc_campaign_S=''
											localStorage.product_tbl_doc_campaign_T=''
											localStorage.product_tbl_doc_campaign_U=''
											localStorage.product_tbl_doc_campaign_V=''
											localStorage.product_tbl_doc_campaign_W=''
											localStorage.product_tbl_doc_campaign_X=''
											localStorage.product_tbl_doc_campaign_Y=''
											localStorage.product_tbl_doc_campaign_Z=''
											
											localStorage.campaign_doc_str=''
											//alert (localStorage.campaign_doc_str)
											var productList_A=localStorage.productListStr.split('<AEND>')[0].replace('<ASTART>','');
											
											var productListStr_after_A=localStorage.productListStr.split('<AEND>')[1]
										
											var productList_B=productListStr_after_A.split('<BEND>')[0].replace('<BSTART>','');
											var productListStr_after_B=productListStr_after_A.split('<BEND>')[1]
											
											var productList_C=productListStr_after_B.split('<CEND>')[0].replace('<CSTART>','');
											var productListStr_after_C=productListStr_after_B.split('<CEND>')[1]
											
											var productList_D=productListStr_after_C.split('<DEND>')[0].replace('<DSTART>','');
											var productListStr_after_D=productListStr_after_C.split('<DEND>')[1]
											
											var productList_E=productListStr_after_D.split('<EEND>')[0].replace('<ESTART>','');
											var productListStr_after_E=productListStr_after_D.split('<EEND>')[1]
											
											var productList_F=productListStr_after_E.split('<FEND>')[0].replace('<FSTART>','');
											var productListStr_after_F=productListStr_after_E.split('<FEND>')[1]
											
											var productList_G=productListStr_after_F.split('<GEND>')[0].replace('<GSTART>','');
											var productListStr_after_G=productListStr_after_F.split('<GEND>')[1]
											
											var productList_H=productListStr_after_G.split('<HEND>')[0].replace('<HSTART>','');
											var productListStr_after_H=productListStr_after_G.split('<HEND>')[1]
											
											var productList_I=productListStr_after_H.split('<IEND>')[0].replace('<ISTART>','');
											var productListStr_after_I=productListStr_after_H.split('<IEND>')[1]
											
											var productList_J=productListStr_after_I.split('<JEND>')[0].replace('<JSTART>','');
											var productListStr_after_J=productListStr_after_I.split('<JEND>')[1]
											
											var productList_K=productListStr_after_J.split('<KEND>')[0].replace('<KSTART>','');
											var productListStr_after_K=productListStr_after_J.split('<KEND>')[1]
											
											var productList_L=productListStr_after_K.split('<LEND>')[0].replace('<LSTART>','');
											var productListStr_after_L=productListStr_after_K.split('<LEND>')[1]
											
											var productList_M=productListStr_after_L.split('<MEND>')[0].replace('<MSTART>','');
											var productListStr_after_M=productListStr_after_L.split('<MEND>')[1]
											
											var productList_N=productListStr_after_M.split('<NEND>')[0].replace('<NSTART>','');
											var productListStr_after_N=productListStr_after_M.split('<NEND>')[1]
											
											var productList_O=productListStr_after_N.split('<OEND>')[0].replace('<OSTART>','');
											var productListStr_after_O=productListStr_after_N.split('<OEND>')[1]
											
											var productList_P=productListStr_after_O.split('<PEND>')[0].replace('<PSTART>','');
											var productListStr_after_P=productListStr_after_O.split('<PEND>')[1]
											
											var productList_Q=productListStr_after_P.split('<QEND>')[0].replace('<QSTART>','');
											var productListStr_after_Q=productListStr_after_P.split('<QEND>')[1]
											
											var productList_R=productListStr_after_Q.split('<REND>')[0].replace('<RSTART>','');
											var productListStr_after_R=productListStr_after_Q.split('<REND>')[1]
											
											var productList_S=productListStr_after_R.split('<SEND>')[0].replace('<SSTART>','');
											var productListStr_after_S=productListStr_after_R.split('<SEND>')[1]
											
											var productList_T=productListStr_after_S.split('<TEND>')[0].replace('<TSTART>','');
											var productListStr_after_T=productListStr_after_S.split('<TEND>')[1]
											
											var productList_U=productListStr_after_T.split('<UEND>')[0].replace('<USTART>','');
											var productListStr_after_U=productListStr_after_T.split('<UEND>')[1]
											
											var productList_V=productListStr_after_U.split('<VEND>')[0].replace('<VSTART>','');
											var productListStr_after_V=productListStr_after_U.split('<VEND>')[1]
											
											var productList_W=productListStr_after_V.split('<WEND>')[0].replace('<WSTART>','');
											var productListStr_after_W=productListStr_after_V.split('<WEND>')[1]
											
											var productList_X=productListStr_after_W.split('<XEND>')[0].replace('<XSTART>','');
											var productListStr_after_X=productListStr_after_W.split('<XEND>')[1]
											
											var productList_Y=productListStr_after_X.split('<YEND>')[0].replace('<YSTART>','');
											var productListStr_after_Y=productListStr_after_X.split('<YEND>')[1]
											
											var productList_Z=productListStr_after_Y.split('<ZEND>')[0].replace('<ZSTART>','');
											//var productListStr_after_E=productListStr_after_D.split('</Z>')[1]
											//alert (productList_Z)
											
											
											localStorage.productList_A=productList_A
											localStorage.productList_B=productList_B
											localStorage.productList_C=productList_C
											localStorage.productList_D=productList_D
											localStorage.productList_E=productList_E
											localStorage.productList_F=productList_F
											localStorage.productList_G=productList_G
											localStorage.productList_H=productList_H
											localStorage.productList_I=productList_I
											localStorage.productList_J=productList_J
											localStorage.productList_K=productList_K
											localStorage.productList_L=productList_L
											localStorage.productList_M=productList_M
											localStorage.productList_N=productList_N
											localStorage.productList_O=productList_O
											localStorage.productList_P=productList_P
											localStorage.productList_Q=productList_Q
											localStorage.productList_R=productList_R											
											localStorage.productList_S=productList_S
											localStorage.productList_T=productList_T
											localStorage.productList_U=productList_U
											localStorage.productList_V=productList_V
											localStorage.productList_W=productList_W
											localStorage.productList_X=productList_X
											localStorage.productList_Y=productList_Y
											localStorage.productList_Z=productList_Z
											
											
											
											$("#campaign_combo_id_lv").empty()
											setProduct()
											//setProduct('B')
											//setProduct('C')
											
											
											
											
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


function setProduct() {
	
	//if (char=='A') {
		
		if (localStorage.productList_A.length != '') {
			productList_A=localStorage.productList_A
			var productList_A=productList_A.split('<rd>');
			var productLength_A=productList_A.length;
			var product_tbl_doc_campaign_A=''
			for (j=0; j < productLength_A; j++){
				var productArray_A = productList_A[j].split('<fd>');
				var product_id_A=productArray_A[0];	
				var product_name_A=productArray_A[1];
				product_tbl_doc_campaign_A=product_tbl_doc_campaign_A+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin "  onClick="check_boxTrue(\''+product_id_A+'\')"  class="name"><font id="'+ product_id_A +'" class="name" >'+ product_name_A+'</font><input type="hidden" id="doc_camp_id'+product_id_A+'" value="'+product_id_A+'" > '+'</li>';		
				}
		localStorage.product_tbl_doc_campaign_A=product_tbl_doc_campaign_A		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_A);	
		//alert (localStorage.product_tbl_doc_campaign_A)	
//		localStorage.append_A=1
//		}//if localStorage.append_A==0
	}
	//if (char=='B') {
	if (localStorage.productList_B.length != '') {
			productList_B=localStorage.productList_B
			var productList_B=productList_B.split('<rd>');
			var productLength_B=productList_B.length;
			var product_tbl_doc_campaign_B=''
			for (j=0; j < productLength_B; j++){
				var productArray_B = productList_B[j].split('<fd>');
				var product_id_B=productArray_B[0];	
				var product_name_B=productArray_B[1];
				product_tbl_doc_campaign_B=product_tbl_doc_campaign_B+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin " onClick="check_boxTrue(\''+product_id_B+'\')" class="name"><font id="'+ product_id_B +'" class="name" >'+ product_name_B+'</font><input type="hidden" id="doc_camp_id'+product_id_B+'" value="'+product_id_B+'" > '+'</li>';	
												
				}
		localStorage.product_tbl_doc_campaign_B=product_tbl_doc_campaign_B		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_B);			
	//	localStorage.append_B=1
	//	}//if localStorage.append_A==0
	}
	
	//if (char=='C') {
		//alert ('asaf')
	if (localStorage.productList_C.length != '') {
			productList_C=localStorage.productList_C
			var productList_C=productList_C.split('<rd>');
			var productLength_C=productList_C.length;
			var product_tbl_doc_campaign_C=''

			for (j=0; j < productLength_C; j++){
				var productArray_C = productList_C[j].split('<fd>');
				var product_id_C=productArray_C[0];	
				var product_name_C=productArray_C[1];
				
				product_tbl_doc_campaign_C=product_tbl_doc_campaign_C+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin "  onClick="check_boxTrue(\''+product_id_C+'\')" class="name"><font id="'+ product_id_C +'" class="name" >'+ product_name_C+'</font><input type="hidden" id="doc_camp_id'+product_id_C+'" value="'+product_id_C+'" > '+'</li>';	

				}
		
		localStorage.product_tbl_doc_campaign_C=product_tbl_doc_campaign_C		
		//alert (localStorage.product_tbl_doc_campaign_C)
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_C);		
		
		//localStorage.append_C=1
		//}//if localStorage.append_A==0
	}
	
	
	//if (char=='D') {
		//alert ('asaf')
		if (localStorage.productList_D.length != '') {
			productList_D=localStorage.productList_D
			var productList_D=productList_D.split('<rd>');
			var productLength_D=productList_D.length;
			var product_tbl_doc_campaign_D=''

			for (j=0; j < productLength_D; j++){
				var productArray_D = productList_D[j].split('<fd>');
				var product_id_D=productArray_D[0];	
				var product_name_D=productArray_D[1];
				
				product_tbl_doc_campaign_D=product_tbl_doc_campaign_D+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin "  onClick="check_boxTrue(\''+product_id_D+'\')" class="name"><font id="'+ product_id_D +'" class="name" >'+ product_name_D+'</font><input type="hidden" id="doc_camp_id'+product_id_D+'" value="'+product_id_D+'" > '+'</li>';

				}
		//alert (product_tbl_doc_campaign_D)
		localStorage.product_tbl_doc_campaign_D=product_tbl_doc_campaign_D		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_D);		
		//localStorage.append_D=1
		//}//if localStorage.append_A==0
	}
	
	//if (char=='E') {
		//alert ('asaf')
		if (localStorage.productList_E.length != '') {
			productList_E=localStorage.productList_E
			var productList_E=productList_E.split('<rd>');
			var productLength_E=productList_E.length;
			var product_tbl_doc_campaign_E=''

			for (j=0; j < productLength_E; j++){
				var productArray_E = productList_E[j].split('<fd>');
				var product_id_E=productArray_E[0];	
				var product_name_E=productArray_E[1];
				
				product_tbl_doc_campaign_E=product_tbl_doc_campaign_E+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin "  onClick="check_boxTrue(\''+product_id_E+'\')" class="name"><font id="'+ product_id_E +'" class="name" >'+ product_name_E+'</font><input type="hidden" id="doc_camp_id'+product_id_E+'" value="'+product_id_E+'" > '+'</li>';

				}
		//alert (product_tbl_doc_campaign_E)
		localStorage.product_tbl_doc_campaign_E=product_tbl_doc_campaign_E		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_E);			
		//localStorage.append_E=1
		//}//if localStorage.append_A==0
	}
	
	//if (char=='F') {
		//alert ('asaf')
		if (localStorage.productList_F.length != '') {
			productList_F=localStorage.productList_F
			var productList_F=productList_F.split('<rd>');
			var productLength_F=productList_F.length;
			var product_tbl_doc_campaign_F=''

			for (j=0; j < productLength_F; j++){
				var productArray_F = productList_F[j].split('<fd>');
				var product_id_F=productArray_F[0];	
				var product_name_F=productArray_F[1];
				
				product_tbl_doc_campaign_F=product_tbl_doc_campaign_F+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin "  onClick="check_boxTrue(\''+product_id_F+'\')" class="name"><font id="'+ product_id_F +'" class="name" >'+ product_name_F+'</font><input type="hidden" id="doc_camp_id'+product_id_F+'" value="'+product_id_F+'" > '+'</li>';

				}
		//alert (product_tbl_doc_campaign_F)
		localStorage.product_tbl_doc_campaign_F=product_tbl_doc_campaign_F		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_F);			
		//localStorage.append_F=1
		//}//if localStorage.append_A==0
	}
	
	//if (char=='G') {
		//alert ('asaf')
		if (localStorage.productList_G.length != '') {
			productList_G=localStorage.productList_G
			var productList_G=productList_G.split('<rd>');
			var productLength_G=productList_G.length;
			var product_tbl_doc_campaign_G=''

			for (j=0; j < productLength_G; j++){
				var productArray_G = productList_G[j].split('<fd>');
				var product_id_G=productArray_G[0];	
				var product_name_G=productArray_G[1];
				
				product_tbl_doc_campaign_G=product_tbl_doc_campaign_G+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin "  onClick="check_boxTrue(\''+product_id_G+'\')" class="name"><font id="'+ product_id_G +'" class="name" >'+ product_name_G+'</font><input type="hidden" id="doc_camp_id'+product_id_G+'" value="'+product_id_G+'" > '+'</li>';

				}
		//alert (product_tbl_doc_campaign_G)
		localStorage.product_tbl_doc_campaign_G=product_tbl_doc_campaign_G		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_G);		
		//localStorage.append_G=1
//		}//if localStorage.append_A==0
	}
	
	//if (char=='H') {
		//alert ('asaf')
		if (localStorage.productList_H.length != '') {
			productList_H=localStorage.productList_H
			var productList_H=productList_H.split('<rd>');
			var productLength_H=productList_H.length;
			var product_tbl_doc_campaign_H=''

			for (j=0; j < productLength_H; j++){
				var productArray_H = productList_H[j].split('<fd>');
				var product_id_H=productArray_H[0];	
				var product_name_H=productArray_H[1];
				
				product_tbl_doc_campaign_H=product_tbl_doc_campaign_H+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin "  onClick="check_boxTrue(\''+product_id_H+'\')" class="name"><font id="'+ product_id_H +'" class="name" >'+ product_name_H+'</font><input type="hidden" id="doc_camp_id'+product_id_H+'" value="'+product_id_H+'" > '+'</li>';

				}
		//alert (product_tbl_doc_campaign_H)
		localStorage.product_tbl_doc_campaign_H=product_tbl_doc_campaign_H		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_H);			
		//localStorage.append_H=1
//		}//if localStorage.append_A==0
	}
	
	//if (char=='I') {
		//alert ('asaf')
		if (localStorage.productList_I.length != '') {
			productList_I=localStorage.productList_I
			var productList_I=productList_I.split('<rd>');
			var productLength_I=productList_I.length;
			var product_tbl_doc_campaign_I=''

			for (j=0; j < productLength_I; j++){
				var productArray_I = productList_I[j].split('<fd>');
				var product_id_I=productArray_I[0];	
				var product_name_I=productArray_I[1];
				
				product_tbl_doc_campaign_I=product_tbl_doc_campaign_I+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin " onClick="check_boxTrue(\''+product_id_I+'\')" class="name"><font id="'+ product_id_I +'" class="name" >'+ product_name_I+'</font><input type="hidden" id="doc_camp_id'+product_id_I+'" value="'+product_id_I+'" > '+'</li>';

				}
		//alert (product_tbl_doc_campaign_I)
		localStorage.product_tbl_doc_campaign_I=product_tbl_doc_campaign_I		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_I);			
		//localStorage.append_I=1
//		}//if localStorage.append_A==0
	}
	
	//if (char=='J') {
		//alert ('asaf')
		if (localStorage.productList_J.length != '') {
			productList_J=localStorage.productList_J
			var productList_J=productList_J.split('<rd>');
			var productLength_J=productList_J.length;
			var product_tbl_doc_campaign_J=''

			for (j=0; j < productLength_J; j++){
				var productArray_J = productList_J[j].split('<fd>');
				var product_id_J=productArray_J[0];	
				var product_name_J=productArray_J[1];
				
				product_tbl_doc_campaign_J=product_tbl_doc_campaign_J+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin "  onClick="check_boxTrue(\''+product_id_J+'\')" class="name"><font id="'+ product_id_J +'" class="name" >'+ product_name_J+'</font><input type="hidden" id="doc_camp_id'+product_id_J+'" value="'+product_id_J+'" > '+'</li>';

				}
		//alert (product_tbl_doc_campaign_J)
		localStorage.product_tbl_doc_campaign_J=product_tbl_doc_campaign_J		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_J);				
		//localStorage.append_J=1
//		}//if localStorage.append_A==0
	}
	
	//if (char=='K') {
		//alert ('asaf')
		if (localStorage.productList_K.length != '') {
			productList_K=localStorage.productList_K
			var productList_K=productList_K.split('<rd>');
			var productLength_K=productList_K.length;
			var product_tbl_doc_campaign_K=''

			for (j=0; j < productLength_K; j++){
				var productArray_K = productList_K[j].split('<fd>');
				var product_id_K=productArray_K[0];	
				var product_name_K=productArray_K[1];
				
				product_tbl_doc_campaign_K=product_tbl_doc_campaign_K+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin "  onClick="check_boxTrue(\''+product_id_K+'\')" class="name"><font id="'+ product_id_K +'" class="name" >'+ product_name_K+'</font><input type="hidden" id="doc_camp_id'+product_id_K+'" value="'+product_id_K+'" > '+'</li>';

				}
		//alert (product_tbl_doc_campaign_K)
		localStorage.product_tbl_doc_campaign_K=product_tbl_doc_campaign_K		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_K);				
		//localStorage.append_K=1
//		}//if localStorage.append_A==0
	}
	
	//if (char=='L') {
		//alert ('asaf')
		if (localStorage.productList_L.length != '') {
			productList_L=localStorage.productList_L
			var productList_L=productList_L.split('<rd>');
			var productLength_L=productList_L.length;
			var product_tbl_doc_campaign_L=''

			for (j=0; j < productLength_L; j++){
				var productArray_L = productList_L[j].split('<fd>');
				var product_id_L=productArray_L[0];	
				var product_name_L=productArray_L[1];
				
				product_tbl_doc_campaign_L=product_tbl_doc_campaign_L+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin "  onClick="check_boxTrue(\''+product_id_L+'\')" class="name"><font id="'+ product_id_L +'" class="name" >'+ product_name_L+'</font><input type="hidden" id="doc_camp_id'+product_id_L+'" value="'+product_id_L+'" > '+'</li>';

				}
		//alert (product_tbl_doc_campaign_L)
		localStorage.product_tbl_doc_campaign_L=product_tbl_doc_campaign_L		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_L);				
		//localStorage.append_L=1
//		}//if localStorage.append_A==0
	}
	
	//if (char=='M') {
		//alert ('asaf')
		if (localStorage.productList_M.length != '') {
			productList_M=localStorage.productList_M
			var productList_M=productList_M.split('<rd>');
			var productLength_M=productList_M.length;
			var product_tbl_doc_campaign_M=''

			for (j=0; j < productLength_M; j++){
				var productArray_M = productList_M[j].split('<fd>');
				var product_id_M=productArray_M[0];	
				var product_name_M=productArray_M[1];
				
				product_tbl_doc_campaign_M=product_tbl_doc_campaign_M+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin "  onClick="check_boxTrue(\''+product_id_M+'\')" class="name"><font id="'+ product_id_M +'" class="name" >'+ product_name_M+'</font><input type="hidden" id="doc_camp_id'+product_id_M+'" value="'+product_id_M+'" > '+'</li>';

				}
		//alert (product_tbl_doc_campaign_M)
		localStorage.product_tbl_doc_campaign_M=product_tbl_doc_campaign_M		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_M);				
		//localStorage.append_M=1
//		}//if localStorage.append_A==0
	}
	
	//if (char=='N') {
		//alert ('asaf')
		if (localStorage.productList_N.length != '') {
			productList_N=localStorage.productList_N
			var productList_N=productList_N.split('<rd>');
			var productLength_N=productList_N.length;
			var product_tbl_doc_campaign_N=''

			for (j=0; j < productLength_N; j++){
				var productArray_N = productList_N[j].split('<fd>');
				var product_id_N=productArray_N[0];	
				var product_name_N=productArray_N[1];
				
				product_tbl_doc_campaign_N=product_tbl_doc_campaign_N+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin "  onClick="check_boxTrue(\''+product_id_N+'\')" class="name"><font id="'+ product_id_N +'" class="name" >'+ product_name_N+'</font><input type="hidden" id="doc_camp_id'+product_id_N+'" value="'+product_id_N+'" > '+'</li>';

				}
		//alert (product_tbl_doc_campaign_N)
		localStorage.product_tbl_doc_campaign_N=product_tbl_doc_campaign_N		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_N);				
		//localStorage.append_N=1
//		}//if localStorage.append_A==0
	}
	
	//if (char=='O') {
		//alert ('asaf')
		if (localStorage.productList_O.length != '') {
			productList_O=localStorage.productList_O
			var productList_O=productList_O.split('<rd>');
			var productLength_O=productList_O.length;
			var product_tbl_doc_campaign_O=''

			for (j=0; j < productLength_O; j++){
				var productArray_O = productList_O[j].split('<fd>');
				var product_id_O=productArray_O[0];	
				var product_name_O=productArray_O[1];
				
				product_tbl_doc_campaign_O=product_tbl_doc_campaign_O+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin "  onClick="check_boxTrue(\''+product_id_O+'\')" class="name"><font id="'+ product_id_O +'" class="name" >'+ product_name_O+'</font><input type="hidden" id="doc_camp_id'+product_id_O+'" value="'+product_id_O+'" > '+'</li>';
				}
		//alert (product_tbl_doc_campaign_O)
		localStorage.product_tbl_doc_campaign_O=product_tbl_doc_campaign_O		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_O);			
		//localStorage.append_O=1
//		}//if localStorage.append_A==0
	}
	
	//if (char=='P') {
		//alert ('asaf')
		if (localStorage.productList_P.length != '') {
			productList_P=localStorage.productList_P
			var productList_P=productList_P.split('<rd>');
			var productLength_P=productList_P.length;
			var product_tbl_doc_campaign_P=''

			for (j=0; j < productLength_P; j++){
				var productArray_P = productList_P[j].split('<fd>');
				var product_id_P=productArray_P[0];	
				var product_name_P=productArray_P[1];
				
				product_tbl_doc_campaign_P=product_tbl_doc_campaign_P+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin "  onClick="check_boxTrue(\''+product_id_P+'\')" class="name"><font id="'+ product_id_P +'" class="name" >'+ product_name_P+'</font><input type="hidden" id="doc_camp_id'+product_id_P+'" value="'+product_id_P+'" > '+'</li>';

				}
		//alert (product_tbl_doc_campaign_P)
		localStorage.product_tbl_doc_campaign_P=product_tbl_doc_campaign_P		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_P);				
		//localStorage.append_P=1
//		}//if localStorage.append_A==0
	}
	
	//if (char=='Q') {
		//alert ('asaf')
		if (localStorage.productList_Q.length != '') {
			productList_Q=localStorage.productList_Q
			var productList_Q=productList_Q.split('<rd>');
			var productLength_Q=productList_Q.length;
			var product_tbl_doc_campaign_Q=''

			for (j=0; j < productLength_Q; j++){
				var productArray_Q = productList_Q[j].split('<fd>');
				var product_id_Q=productArray_Q[0];	
				var product_name_Q=productArray_Q[1];
				
				product_tbl_doc_campaign_Q=product_tbl_doc_campaign_Q+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin "  onClick="check_boxTrue(\''+product_id_Q+'\')" class="name"><font id="'+ product_id_Q +'" class="name" >'+ product_name_Q+'</font><input type="hidden" id="doc_camp_id'+product_id_Q+'" value="'+product_id_Q+'" > '+'</li>';

				}
		//alert (product_tbl_doc_campaign_Q)
		localStorage.product_tbl_doc_campaign_Q=product_tbl_doc_campaign_Q		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_Q);				
		//localStorage.append_Q=1
//		}//if localStorage.append_A==0
	}
	
	//if (char=='R') {
		//alert ('asaf')
	if (localStorage.productList_R.length != '') {
			productList_R=localStorage.productList_R
			var productList_R=productList_R.split('<rd>');
			var productLength_R=productList_R.length;
			var product_tbl_doc_campaign_R=''

			for (j=0; j < productLength_R; j++){
				var productArray_R = productList_R[j].split('<fd>');
				var product_id_R=productArray_R[0];	
				var product_name_R=productArray_R[1];
				
				product_tbl_doc_campaign_R=product_tbl_doc_campaign_R+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin "  onClick="check_boxTrue(\''+product_id_R+'\')" class="name"><font id="'+ product_id_R +'" class="name" >'+ product_name_R+'</font><input type="hidden" id="doc_camp_id'+product_id_R+'" value="'+product_id_R+'" > '+'</li>';

				}
		//alert (product_tbl_doc_campaign_R)
		localStorage.product_tbl_doc_campaign_R=product_tbl_doc_campaign_R		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_R);				
		//localStorage.append_R=1
//		}//if localStorage.append_A==0
	}
	
	//if (char=='S') {
		//alert ('asaf')
	if (localStorage.productList_S.length != '') {
			productList_S=localStorage.productList_S
			var productList_S=productList_S.split('<rd>');
			var productLength_S=productList_S.length;
			var product_tbl_doc_campaign_S=''

			for (j=0; j < productLength_S; j++){
				var productArray_S = productList_S[j].split('<fd>');
				var product_id_S=productArray_S[0];	
				var product_name_S=productArray_S[1];
				
				product_tbl_doc_campaign_S=product_tbl_doc_campaign_S+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin "  onClick="check_boxTrue(\''+product_id_S+'\')" class="name"><font id="'+ product_id_S +'" class="name" >'+ product_name_S+'</font><input type="hidden" id="doc_camp_id'+product_id_S+'" value="'+product_id_S+'" > '+'</li>';

				}
		//alert (product_tbl_doc_campaign_S)
		localStorage.product_tbl_doc_campaign_S=product_tbl_doc_campaign_S		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_S);				
		//localStorage.append_S=1
//		}//if localStorage.append_A==0
	}
	
	//if (char=='T') {
		//alert ('asaf')
		if (localStorage.productList_T.length != '') {
			productList_T=localStorage.productList_T
			var productList_T=productList_T.split('<rd>');
			var productLength_T=productList_T.length;
			var product_tbl_doc_campaign_T=''

			for (j=0; j < productLength_T; j++){
				var productArray_T = productList_T[j].split('<fd>');
				var product_id_T=productArray_T[0];	
				var product_name_T=productArray_T[1];
				
				product_tbl_doc_campaign_T=product_tbl_doc_campaign_T+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin "  onClick="check_boxTrue(\''+product_id_T+'\')" class="name"><font id="'+ product_id_T +'" class="name" >'+ product_name_T+'</font><input type="hidden" id="doc_camp_id'+product_id_T+'" value="'+product_id_T+'" > '+'</li>';

				}
		//alert (product_tbl_doc_campaign_T)
		localStorage.product_tbl_doc_campaign_T=product_tbl_doc_campaign_T		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_T);				
		//localStorage.append_T=1
//		}//if localStorage.append_A==0
	}
	
	//if (char=='U') {
		//alert ('asaf')
		if (localStorage.productList_U.length != '') {
			productList_U=localStorage.productList_U
			var productList_U=productList_U.split('<rd>');
			var productLength_U=productList_U.length;
			var product_tbl_doc_campaign_U=''

			for (j=0; j < productLength_U; j++){
				var productArray_U = productList_U[j].split('<fd>');
				var product_id_U=productArray_U[0];	
				var product_name_U=productArray_U[1];
				
				product_tbl_doc_campaign_U=product_tbl_doc_campaign_U+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin "  onClick="check_boxTrue(\''+product_id_U+'\')" class="name"><font id="'+ product_id_U +'" class="name" >'+ product_name_U+'</font><input type="hidden" id="doc_camp_id'+product_id_U+'" value="'+product_id_U+'" > '+'</li>';

				}
		//alert (product_tbl_doc_campaign_U)
		localStorage.product_tbl_doc_campaign_U=product_tbl_doc_campaign_U		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_U);				
		//localStorage.append_U=1
//		}//if localStorage.append_A==0
	}
	
	//if (char=='V') {
		//alert ('asaf')
		if (localStorage.productList_V.length != '') {
			productList_V=localStorage.productList_V
			var productList_V=productList_V.split('<rd>');
			var productLength_V=productList_V.length;
			var product_tbl_doc_campaign_V=''

			for (j=0; j < productLength_V; j++){
				var productArray_V = productList_V[j].split('<fd>');
				var product_id_V=productArray_V[0];	
				var product_name_V=productArray_V[1];
				
				product_tbl_doc_campaign_V=product_tbl_doc_campaign_V+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin "  onClick="check_boxTrue(\''+product_id_V+'\')" class="name"><font id="'+ product_id_V +'" class="name" >'+ product_name_V+'</font><input type="hidden" id="doc_camp_id'+product_id_V+'" value="'+product_id_V+'" > '+'</li>';
				}
		//alert (product_tbl_doc_campaign_V)
		localStorage.product_tbl_doc_campaign_V=product_tbl_doc_campaign_V		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_V);				
		//localStorage.append_V=1
//		}//if localStorage.append_A==0
	}
	
	//if (char=='W') {
		//alert (localStorage.append_W.length)
		if (localStorage.productList_W.length != '') {
			productList_W=localStorage.productList_W
			var productList_W=productList_W.split('<rd>');
			var productLength_W=productList_W.length;
			var product_tbl_doc_campaign_W=''
			//alert (localStorage.productList_W)
			for (j=0; j < productLength_W; j++){
				var productArray_W = productList_W[j].split('<fd>');
				var product_id_W=productArray_W[0];	
				var product_name_W=productArray_W[1];
				
				product_tbl_doc_campaign_W=product_tbl_doc_campaign_W+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin "   onClick="check_boxTrue(\''+product_id_W+'\')" class="name"><input type="hidden" id="doc_camp_id'+product_id_W+'" value="'+product_id_W+'" > <font id="'+ product_id_W +'class="name" >'+ product_name_W+'</font>'+'</li>';

				}
		//alert (product_tbl_doc_campaign_W)
		localStorage.product_tbl_doc_campaign_W=product_tbl_doc_campaign_W		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_W);			
		//localStorage.append_W=1
//		}//if localStorage.append_A==0
	}
	
	//if (char=='X') {
		//alert ('asaf')
		if (localStorage.productList_X.length != '') {
			productList_X=localStorage.productList_X
			var productList_X=productList_X.split('<rd>');
			var productLength_X=productList_X.length;
			var product_tbl_doc_campaign_X=''

			for (j=0; j < productLength_X; j++){
				var productArray_X = productList_X[j].split('<fd>');
				var product_id_X=productArray_X[0];	
				var product_name_X=productArray_X[1];
				
				product_tbl_doc_campaign_X=product_tbl_doc_campaign_X+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin "  onClick="check_boxTrue(\''+product_id_X+'\')" class="name"><font id="'+ product_id_X +'" class="name" >'+ product_name_X+'</font><input type="hidden" id="doc_camp_id'+product_id_X+'" value="'+product_id_X+'" > '+'</li>';

				}
		//alert (product_tbl_doc_campaign_X)
		localStorage.product_tbl_doc_campaign_X=product_tbl_doc_campaign_X		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_X);				
		//localStorage.append_X=1
//		}//if localStorage.append_A==0
	}
	
	////if (char=='Y') {
//		//alert (localStorage.append_Y.length)
		if (localStorage.productList_Y.length != '') {
			productList_Y=localStorage.productList_Y
			var productList_Y=productList_Y.split('<rd>');
			var productLength_Y=productList_Y.length;
			var product_tbl_doc_campaign_Y=''

			for (j=0; j < productLength_Y; j++){
				var productArray_Y = productList_Y[j].split('<fd>');
				var product_id_Y=productArray_Y[0];	
				var product_name_Y=productArray_Y[1];
				
				product_tbl_doc_campaign_Y=product_tbl_doc_campaign_Y+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin "  onClick="check_boxTrue(\''+product_id_Y+'\')" class="name"><font id="'+ product_id_Y +'" class="name" >'+ product_name_Y+'</font><input type="hidden" id="doc_camp_id'+product_id_Y+'" value="'+product_id_Y+'" > '+'</li>';

				}
//		//alert (product_tbl_doc_campaign_Y)
		localStorage.product_tbl_doc_campaign_Y=product_tbl_doc_campaign_Y		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_Y);			
//		//localStorage.append_Y=1
////		}//if localStorage.append_A==0
	}
//	
//	//if (char=='Z') {
//		//alert ('asaf')
		if (localStorage.productList_Z.length != '') {
			productList_Z=localStorage.productList_Z
			var productList_Z=productList_Z.split('<rd>');
			var productLength_Z=productList_Z.length;
			var product_tbl_doc_campaign_Z=''

			for (j=0; j < productLength_Z; j++){
				var productArray_Z = productList_Z[j].split('<fd>');
				var product_id_Z=productArray_Z[0];	
				var product_name_Z=productArray_Z[1];
				
				product_tbl_doc_campaign_Z=product_tbl_doc_campaign_Z+'<li  style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin "  onClick="check_boxTrue(\''+product_id_Z+'\')"  class="name"><font id="'+ product_id_Z +'" class="name" >'+ product_name_Z+'</font><input type="hidden" id="doc_camp_id'+product_id_Z+'" value="'+product_id_Z+'" > '+'</li>';		

				}
//		//alert (product_tbl_doc_campaign_Z)
		localStorage.product_tbl_doc_campaign_Z=product_tbl_doc_campaign_Z		
		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign_Z);			
//		//localStorage.append_Z=1
////		}//if localStorage.append_A==0
	}
	
	
	
	
	
	
	
	
}



function gotoMarket(pic_no) {
	//alert (pic_no)
	if (pic_no!=localStorage.pic_no){
		$("#campaign_combo_id_lv").empty()
//		$("#campaign_combo_id_lv").append(localStorage.product_tbl_doc_campaign);
	//	$('input:checkbox').attr('checked',false);
	//	$("#itemSearch").val('A')
		setProduct()
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
			//alert (prescriptionPhoto_1)
			var image_show = document.getElementById('myImagePrescription_show');
			image_show.src = prescriptionPhoto_1;
			$("#myImagePrescription_show").val(prescriptionPhoto_1)
			//alert (prescriptionPhoto_1)
		}
	}
	if (localStorage.pic_no ==2){
		if (prescriptionPhoto_2==''){
			var error_flag=1
		}
		else{
			var image_show = document.getElementById('myImagePrescription_show');
			image_show.src = prescriptionPhoto_2;
			$("#myImagePrescription_show").val(prescriptionPhoto_2)
		}
		
	}
	if (localStorage.pic_no ==3){
		if (prescriptionPhoto_3==''){
			var error_flag=1
		}
		else{
			var image_show = document.getElementById('myImagePrescription_show');
			image_show.src = prescriptionPhoto_3;
			$("#myImagePrescription_show").val(prescriptionPhoto_3)
		}
	}
	
	if (localStorage.pic_no ==4){
		if (prescriptionPhoto_4==''){
			var error_flag=1
		}
		else{
			var image_show = document.getElementById('myImagePrescription_show');
			image_show.src = prescriptionPhoto41;
			$("#myImagePrescription_show").val(prescriptionPhoto_4)
		}
	}if (localStorage.pic_no ==5){
		if (prescriptionPhoto_5==''){
			var error_flag=1
		}
		else{
			var image_show = document.getElementById('myImagePrescription_show');
			image_show.src = prescriptionPhoto_5;
			$("#myImagePrescription_show").val(prescriptionPhoto_5)
		}
	}if (localStorage.pic_no ==6){
		if (prescriptionPhoto_6==''){
			var error_flag=1
		}
		else{
			var image_show = document.getElementById('myImagePrescription_show');
			image_show.src = prescriptionPhoto_6;
			$("#myImagePrescription_show").val(prescriptionPhoto_6)
		}
	}if (localStorage.pic_no ==7){
		if (prescriptionPhoto_7==''){
			var error_flag=1
		}
		else{
			var image_show = document.getElementById('myImagePrescription_show');
			image_show.src = prescriptionPhoto_7;
			$("#myImagePrescription_show").val(prescriptionPhoto_7)
		}
	}if (localStorage.pic_no ==8){
		if (prescriptionPhoto_8==''){
			var error_flag=1
		}
		else{
			var image_show = document.getElementById('myImagePrescription_show');
			image_show.src = prescriptionPhoto_8;
			$("#myImagePrescription_show").val(prescriptionPhoto_8)
		}
	}if (localStorage.pic_no ==9){
		if (prescriptionPhoto_9==''){
			var error_flag=1
		}
		else{
			var image_show = document.getElementById('myImagePrescription_show');
			image_show.src = prescriptionPhoto_9;
			$("#myImagePrescription_show").val(prescriptionPhoto_9)
		}
	}if (localStorage.pic_no ==10){
		if (prescriptionPhoto_10==''){
			var error_flag=1
		}
		else{
			var image_show = document.getElementById('myImagePrescription_show');
			image_show.src = prescriptionPhoto_10;
			$("#myImagePrescription_show").val(prescriptionPhoto_10)
		}
	}if (localStorage.pic_no ==11){
		if (prescriptionPhoto_11==''){
			var error_flag=1
		}
		else{
			var image_show = document.getElementById('myImagePrescription_show');
			image_show.src = prescriptionPhoto_11;
			$("#myImagePrescription_show").val(prescriptionPhoto_11)
		}
	}if (localStorage.pic_no ==12){
		if (prescriptionPhoto_12==''){
			var error_flag=1
		}
		else{
			var image_show = document.getElementById('myImagePrescription_show');
			image_show.src = prescriptionPhoto_12;
			$("#myImagePrescription_show").val(prescriptionPhoto_12)
		}
	}
	if (localStorage.pic_no ==13){
		if (prescriptionPhoto_13==''){
			var error_flag=1
		}
		else{
			var image_show = document.getElementById('myImagePrescription_show');
			image_show.src = prescriptionPhoto_13;
			$("#myImagePrescription_show").val(prescriptionPhoto_13)
		}
	}
	if (localStorage.pic_no ==14){
		if (prescriptionPhoto_14==''){
			var error_flag=1
		}
		else{
			var image_show = document.getElementById('myImagePrescription_show');
			image_show.src = prescriptionPhoto_14;
			$("#myImagePrescription_show").val(prescriptionPhoto_14)
		}
	}
	if (localStorage.pic_no ==15){
		if (prescriptionPhoto_15==''){
			var error_flag=1
		}
		else{
			var image_show = document.getElementById('myImagePrescription_show');
			image_show.src = prescriptionPhoto_15;
			$("#myImagePrescription_show").val(prescriptionPhoto_15)
		}
	}
	if (localStorage.pic_no ==16){
		if (prescriptionPhoto_16==''){
			var error_flag=1
		}
		else{
			var image_show = document.getElementById('myImagePrescription_show');
			image_show.src = prescriptionPhoto_16;
			$("#myImagePrescription_show").val(prescriptionPhoto_16)
		}
	}
	if (localStorage.pic_no ==17){
		if (prescriptionPhoto_17==''){
			var error_flag=1
		}
		else{
			var image_show = document.getElementById('myImagePrescription_show');
			image_show.src = prescriptionPhoto_17;
			$("#myImagePrescription_show").val(prescriptionPhoto_17)
		}
	}
	if (localStorage.pic_no ==18){
		if (prescriptionPhoto_18==''){
			var error_flag=1
		}
		else{
			var image_show = document.getElementById('myImagePrescription_show');
			image_show.src = prescriptionPhoto_18;
			$("#myImagePrescription_show").val(prescriptionPhoto_18)
		}
	}
	if (localStorage.pic_no ==19){
		if (prescriptionPhoto_19==''){
			var error_flag=1
		}
		else{
			var image_show = document.getElementById('myImagePrescription_show');
			image_show.src = prescriptionPhoto_19;
			$("#myImagePrescription_show").val(prescriptionPhoto_19)
		}
	}
	if (localStorage.pic_no ==20){
		if (prescriptionPhoto_20==''){
			var error_flag=1
		}
		else{
			var image_show = document.getElementById('myImagePrescription_show');
			image_show.src = prescriptionPhoto_20;
			$("#myImagePrescription_show").val(prescriptionPhoto_20)
		}
	}
	
	//alert (localStorage.synced)
	if (localStorage.synced='YES'){
		if (error_flag==0  ){
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
    if  (localStorage.campaign_doc_str.length < 3){
		$("#myerror_doctor_campaign").html('Please select minimum one Item');
		//$.afui.loadContent("#page_prescription",true,true,'right');		
	}
	else{
		getDocCampaignDataCart();
		$.afui.loadContent("#doctorCampaignCartPage",true,true,'right');
	}
}
function getDocCampaignDataCart(){	
	campaign_doc_str=localStorage.campaign_doc_str
	var campaignList = campaign_doc_str.split('<rd>');
	var campaignListLength=campaignList.length
	cart_list=''
	for ( i=0; i < campaignListLength; i++){
	var pID=campaignList[i];
	$("#campCart").empty();
	//alert (localStorage.campaign_doc_str)
	
	if(pID!=''){
		var pName=$("#"+pID).html();
		//alert (pName)
		cart_list+='<tr id="cart_'+pID+'"><td >'+pName+'</td><td style="background-color:#E7F1FE"  align="center" width="5%" onClick="removeCarItem('+pID+')"> X </td></tr>';
		}	
	}
	$('#campCart').append(cart_list);
}
function removeCarItem(product_id){	
	campaign_doc_str=localStorage.campaign_doc_str
	cartLength=campaign_doc_str.split('<rd>').length
	$('#cart_'+product_id).remove();
	//alert (cartLength)
	
	if (campaign_doc_str.indexOf(product_id)==0 & cartLength == 1){
		campaign_doc_str=campaign_doc_str.replace(product_id,'')
	}
	else if (campaign_doc_str.indexOf(product_id)==0 & cartLength > 1){
		campaign_doc_str=campaign_doc_str.replace(product_id+"<rd>",'')
	}
	else if (campaign_doc_str.indexOf(product_id)>0 & cartLength > 1){
		campaign_doc_str=campaign_doc_str.replace("<rd>"+product_id,'')
	}
		
	localStorage.campaign_doc_str=campaign_doc_str
}
function check_boxTrue(product_id){	
	//alert ('adasd');
	var camp_combo="#doc_camp"+product_id
	//var camp_combo_val=$(camp_combo).is(":checked")
	//if (camp_combo_val==false){
	//	$(camp_combo).prop('checked', true);
		getDocCampaignData_keyup(product_id,'true')
		$('li').click(function(){
			$(this).css('color','red');	
		});
		//$('li').dblclick(function(){
		//	$(this).css('color','black');
		//	getDocCampaignData_keyup(product_id,'false')
		//});
	//}
//	else{
//		$(camp_combo).prop('checked', false);
//		getDocCampaignData_keyup(product_id)
//	}
	//alert (localStorage.campaign_doc_str)
	}

function getDocCampaignData_keyup(product_id,status){
	//alert (status)
	var pid=$("#doc_camp_id"+product_id).val();
	var camp_combo_val=status
//	alert (pid)

	var campaign_doc_str=localStorage.campaign_doc_str
	var campaign_docShowStr='';
	var campaign_doc_strList="";
        var campaign_doc_strListLength=0;
        var campaign_docProductId="";
	//alert (camp_combo_val)
	if (camp_combo_val == 'true' ){
	//	alert (campaign_doc_str.indexOf(pid))
		if (campaign_doc_str.indexOf(pid)==-1){
			if (campaign_doc_str==''){
				campaign_doc_str=pid
			}else{
				campaign_doc_str=campaign_doc_str+'<rd>'+pid
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
						}else{
							campaign_doc_str=campaign_doc_str+'<rd>'+pid
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
	//alert (localStorage.campaign_doc_str)
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
			var medicine_1=$("#medicine_1").val();
			var medicine_2=$("#medicine_2").val();
			var medicine_3=$("#medicine_3").val();
			var medicine_4=$("#medicine_4").val();
			var medicine_5=$("#medicine_5").val();	
			var now = $.now();
			var imageName=localStorage.user_id+'_'+now.toString()+'.jpg';
			//alert (imageName);
				
				
				$("#error_prescription_submittxt").val(localStorage.base_url+'prescription_submit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+encodeURIComponent(localStorage.user_pass)+'&synccode='+localStorage.synccode+'&areaId='+areaId+'&doctor_id='+encodeURIComponent(doctorId)+'&doctor_name='+encodeURIComponent(doctor_name)+'&latitude='+latitude+'&longitude='+longitude+'&pres_photo='+imageName+'&campaign_doc_str='+localStorage.campaign_doc_str+'&medicine_1='+medicine_1+'&medicine_2='+medicine_2+'&medicine_3='+medicine_3+'&medicine_4='+medicine_4+'&medicine_5='+medicine_5)							

				 $.ajax(localStorage.base_url+'prescription_submit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+encodeURIComponent(localStorage.user_pass)+'&synccode='+localStorage.synccode+'&areaId='+areaId+'&doctor_id='+encodeURIComponent(doctorId)+'&doctor_name='+encodeURIComponent(doctor_name)+'&latitude='+latitude+'&longitude='+longitude+'&pres_photo='+imageName+'&campaign_doc_str='+localStorage.campaign_doc_str+'&medicine_1='+medicine_1+'&medicine_2='+medicine_2+'&medicine_3='+medicine_3+'&medicine_4='+medicine_4+'&medicine_5='+medicine_5,{
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
											//var result_string=resultArray[1];
											
											
											//alert (result_string)
										
											//image upload function									
											//uploadPhoto(prescriptionPhoto, imageName);
											//alert ('0')
											//alert (localStorage.pic_no)
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
											
											//setProductList();
											//alert ('aaaa')
											$('#market_combo_id_lv').empty();
											$('#market_combo_id_lv').append(localStorage.unschedule_market_cmb_id);
											$("#itemSearch").val('A')
											setProduct();
											//searchItem()
											
											
											//alert (localStorage.pic_no)
											//localStorage.campaign_doc_str=''
											
											//alert ('aaaa')
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
		$("#item_combo_id_lv").find(lis[0]).first().focus()
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
	
	var prescriptionPhoto_1=$("#prescriptionPhoto_1").val();
	localStorage.prescriptionPhoto_1 = prescriptionPhoto_1;
		
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

	var prescriptionPhoto_2=$("#prescriptionPhoto_2").val();
	localStorage.prescriptionPhoto_2 = prescriptionPhoto_2;
		
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

	var prescriptionPhoto_3=$("#prescriptionPhoto_3").val();
	localStorage.prescriptionPhoto_3 = prescriptionPhoto_3;
		
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
	var prescriptionPhoto_4=$("#prescriptionPhoto_4").val();
	localStorage.prescriptionPhoto_4 = prescriptionPhoto_4;
		
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

	var prescriptionPhoto_5=$("#prescriptionPhoto_5").val();
	localStorage.prescriptionPhoto_5 = prescriptionPhoto_5;
		
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

	var prescriptionPhoto_6=$("#prescriptionPhoto_6").val();
	localStorage.prescriptionPhoto_6 = prescriptionPhoto_6;
		
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

	var prescriptionPhoto_7=$("#prescriptionPhoto_7").val();
	localStorage.prescriptionPhoto_7 = prescriptionPhoto_7;
		
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
	var prescriptionPhoto_8=$("#prescriptionPhoto_8").val();
	localStorage.prescriptionPhoto_8 = prescriptionPhoto_8;
		
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
    var image = document.getElementById('myImagePrescription_9');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_9").val(imagePath);
	
	var prescriptionPhoto_9=$("#prescriptionPhoto_9").val();
	localStorage.prescriptionPhoto_9 = prescriptionPhoto_9;
		
}
function onFail_9(message) {
	imagePath="";
    alert('Failed because: ' + message);
}

function getPrescriptionImage_10() {
	//navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		//destinationType: Camera.DestinationType.FILE_URI });
  
   navigator.camera.getPicture(onSuccess_10, onFail_10, { quality: 90,
		targetWidth: 400,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
		
}
function onSuccess_10(imageURI) {
	//alert ('Success')
    var image = document.getElementById('myImagePrescription_10');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_10").val(imagePath);

	var prescriptionPhoto_10=$("#prescriptionPhoto_10").val();
	localStorage.prescriptionPhoto_10 = prescriptionPhoto_10;
		
}
function onFail_10(message) {
	//alert ('Fail')
	imagePath="";
    alert('Failed because: ' + message);
}

function getPrescriptionImage_11() {
	//navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		//destinationType: Camera.DestinationType.FILE_URI });
  
   navigator.camera.getPicture(onSuccess_11, onFail_11, { quality: 90,
		targetWidth: 400,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
		
}
function onSuccess_11(imageURI) {
	//alert ('Success')
    var image = document.getElementById('myImagePrescription_11');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_11").val(imagePath);

	var prescriptionPhoto_11=$("#prescriptionPhoto_11").val();
	localStorage.prescriptionPhoto_11 = prescriptionPhoto_11;
		
}
function onFail_11(message) {
	//alert ('Fail')
	imagePath="";
    alert('Failed because: ' + message);
}

function getPrescriptionImage_12() {
	//navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		//destinationType: Camera.DestinationType.FILE_URI });
  
   navigator.camera.getPicture(onSuccess_12, onFail_12, { quality: 90,
		targetWidth: 400,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
		
}
function onSuccess_12(imageURI) {
	//alert ('Success')
    var image = document.getElementById('myImagePrescription_12');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_12").val(imagePath);

	var prescriptionPhoto_12=$("#prescriptionPhoto_12").val();
	localStorage.prescriptionPhoto_12 = prescriptionPhoto_12;
		
}
function onFail_12(message) {
	//alert ('Fail')
	imagePath="";
    alert('Failed because: ' + message);
}

function getPrescriptionImage_13() {
	//navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		//destinationType: Camera.DestinationType.FILE_URI });
  
   navigator.camera.getPicture(onSuccess_13, onFail_13, { quality: 90,
		targetWidth: 400,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
		
}
function onSuccess_13(imageURI) {
	//alert ('Success')
    var image = document.getElementById('myImagePrescription_13');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_13").val(imagePath);

	var prescriptionPhoto_13=$("#prescriptionPhoto_13").val();
	localStorage.prescriptionPhoto_13 = prescriptionPhoto_13;
		
}
function onFail_13(message) {
	//alert ('Fail')
	imagePath="";
    alert('Failed because: ' + message);
}
function getPrescriptionImage_14() {
	//navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		//destinationType: Camera.DestinationType.FILE_URI });
  
   navigator.camera.getPicture(onSuccess_14, onFail_14, { quality: 90,
		targetWidth: 400,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
		
}
function onSuccess_14(imageURI) {
	//alert ('Success')
    var image = document.getElementById('myImagePrescription_14');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_14").val(imagePath);
	
	var prescriptionPhoto_14=$("#prescriptionPhoto_14").val();
	localStorage.prescriptionPhoto_14 = prescriptionPhoto_14;
		
}
function onFail_14(message) {
	//alert ('Fail')
	imagePath="";
    alert('Failed because: ' + message);
}

function getPrescriptionImage_15() {
	//navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		//destinationType: Camera.DestinationType.FILE_URI });
  
   navigator.camera.getPicture(onSuccess_15, onFail_15, { quality: 90,
		targetWidth: 400,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
		
}
function onSuccess_15(imageURI) {
	//alert ('Success')
    var image = document.getElementById('myImagePrescription_15');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_15").val(imagePath);
	
	var prescriptionPhoto_15=$("#prescriptionPhoto_15").val();
	localStorage.prescriptionPhoto_15 = prescriptionPhoto_15;
		
}
function onFail_15(message) {
	//alert ('Fail')
	imagePath="";
    alert('Failed because: ' + message);
}

function getPrescriptionImage_16() {
	//navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		//destinationType: Camera.DestinationType.FILE_URI });
  
   navigator.camera.getPicture(onSuccess_16, onFail_16, { quality: 90,
		targetWidth: 400,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
		
}
function onSuccess_16(imageURI) {
	//alert ('Success')
    var image = document.getElementById('myImagePrescription_16');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_16").val(imagePath);

	var prescriptionPhoto_16=$("#prescriptionPhoto_16").val();
	localStorage.prescriptionPhoto_16 = prescriptionPhoto_16;
	
}
function onFail_16(message) {
	//alert ('Fail')
	imagePath="";
    alert('Failed because: ' + message);
}

function getPrescriptionImage_17() {
	//navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		//destinationType: Camera.DestinationType.FILE_URI });
  
   navigator.camera.getPicture(onSuccess_17, onFail_17, { quality: 90,
		targetWidth: 400,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
		
}
function onSuccess_17(imageURI) {
	//alert ('Success')
    var image = document.getElementById('myImagePrescription_17');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_17").val(imagePath);

	var prescriptionPhoto_17=$("#prescriptionPhoto_17").val();
	localStorage.prescriptionPhoto_17 = prescriptionPhoto_17;
		
}
function onFail_17(message) {
	//alert ('Fail')
	imagePath="";
    alert('Failed because: ' + message);
}

function getPrescriptionImage_18() {
	//navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		//destinationType: Camera.DestinationType.FILE_URI });
  
   navigator.camera.getPicture(onSuccess_18, onFail_18, { quality: 90,
		targetWidth: 400,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
		
}
function onSuccess_18(imageURI) {
	//alert ('Success')
    var image = document.getElementById('myImagePrescription_18');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_18").val(imagePath);

	var prescriptionPhoto_18=$("#prescriptionPhoto_18").val();
	localStorage.prescriptionPhoto_18 = prescriptionPhoto_18;
		
}
function onFail_18(message) {
	//alert ('Fail')
	imagePath="";
    alert('Failed because: ' + message);
}

function getPrescriptionImage_19() {
	//navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		//destinationType: Camera.DestinationType.FILE_URI });
  
   navigator.camera.getPicture(onSuccess_19, onFail_19, { quality: 90,
		targetWidth: 400,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
		
}
function onSuccess_19(imageURI) {
	//alert ('Success')
    var image = document.getElementById('myImagePrescription_19');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_19").val(imagePath);
	
	var prescriptionPhoto_19=$("#prescriptionPhoto_19").val();
	localStorage.prescriptionPhoto_19 = prescriptionPhoto_19;
		
}
function onFail_19(message) {
	//alert ('Fail')
	imagePath="";
    alert('Failed because: ' + message);
}

function getPrescriptionImage_20() {
	//navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		//destinationType: Camera.DestinationType.FILE_URI });
  
   navigator.camera.getPicture(onSuccess_20, onFail_20, { quality: 90,
		targetWidth: 400,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
		
}
function onSuccess_20(imageURI) {
	//alert ('Success')
    var image = document.getElementById('myImagePrescription_20');
    image.src = imageURI;
	imagePath = imageURI;
	$("#prescriptionPhoto_20").val(imagePath);

	var prescriptionPhoto_20=$("#prescriptionPhoto_20").val();
	localStorage.prescriptionPhoto_20 = prescriptionPhoto_20;
}
function onFail_20(message) {
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
	//alert (filter)
	for (var i = 0; i < lis.length; i++) {
		var name = lis[i].getElementsByClassName('name')[0].innerHTML;
		if (name.indexOf(filter) == 0) {
			lis[i].style.display = 'list-item';
		}
		else{
			lis[i].style.display = 'none';
		}
		$("#item_combo_id_lv").find(lis[0]).first().focus()
	}
	
}
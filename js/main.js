//preloader
$(window).on('load',()=> { // makes sure the whole site is loaded 
  $('#status').delay(1000).fadeOut(); // will first fade out the loading animation 
  $('#preloader').delay(1500).fadeOut('slow'); // will fade out the white DIV that covers the website. 
})

//press Enter
window.addEventListener('keydown', (e)=>{
	switch(e.keyCode){
  	case 13:// enter
	  	show();
    	break;
	}
});

function show(){
	$("body").css('backgroundImage','url(../img/background.jpg)');
	$("#startBtn").fadeOut();
	$("#discriptionBlock").css("opacity","1");
	$("#progress").css("opacity","1");
	$("#progressBar").css("opacity","1");
	$("#ingredientList").css("left","0%");
	$("#spiceList").css("right","0%");
}

//drag and drop
let stage = new createjs.Stage(canvas);
let repo = new createjs.LoadQueue();
let count = 0;

// automatically update
createjs.Ticker.on("tick", e => stage.update());
createjs.Ticker.setFPS(60);
// load assets
repo.loadManifest([
	{id:'lemon',src:"../img/lemon.png"},
	{id:'bean_sprout',src:"../img/bean_sprout.png"},
	{id:'dried_tofu',src:"../img/dried_tofu.png"},
	{id:'egg',src:"../img/egg.png"},
	{id:'fish_sauce',src:"../img/fish_sauce.png"},
	{id:'garlic',src:"../img/garlic.png"},
	{id:'leek',src:"../img/leek.png"},
	{id:'peanut',src:"../img/peanut.png"},
	{id:'pork',src:"../img/pork.png"},
	{id:'radish',src:"../img/radish.png"},
	{id:'red_onion',src:"../img/red_onion.png"},
	{id:'rice_noodle',src:"../img/rice_noodle.png"},
	{id:'shrimp',src:"../img/shrimp.png"},
	{id:'thai_sauce',src:"../img/thai_sauce.png"},
	{id:'water',src:"../img/water.png"},
	{id:'fructose',src:"../img/fructose.png"},
	{id:'thai_noodle',src:"../img/thai_noodle.png"}
]);
repo.on('complete', drag); // wait until all assets are loaded

function drag(){
	let dragNode = document.querySelectorAll('.listItem');
	let targetNode = document.querySelector('#canvas');
	let progressBar = document.querySelector('#progressBar');
	const ingradientList = 
	[
		{
			"name": "garlic",
			"description": "大蒜味辛性溫，能健胃、殺菌、祛寒，具有溫中行滯、解毒殺蟲、降脂降壓、防癌抗癌等作用。"
		},
		{
			"name": "red_onion",
			"description": "紅蔥頭園藝上的正式名稱為分蔥，和一般炒菜的蒜頭比較，它的外觀型狀就像蒜頭，是水滴型，只是皮是紅色的。其實紅蔥頭是洋蔥家族的一員，長像似蒜頭又似洋蔥，經常被用來做為中菜烹調中增加香氣的材料之一。"
		},
		{
			"name": "radish",
			"description": "菜脯在香港、廣東一帶，以及台灣、泰國等地很常見。它即蘿蔔乾，是白蘿蔔用鹽及糖醃製而成，多被用來煮餸或作佐料，配白粥外，放入蛋漿煎成菜脯蛋餅，切碎後與蛋、免治肉炒米粉或做粿條，是簡單可口的風味小吃。"
		},
		{
			"name": "peanut",
			"description": "花生本身是高能、高蛋白和高脂類的植物性食物，不含膽固醇和反式脂肪酸，而且富含微量營養素，植物固醇、白藜蘆醇、異黃酮、抗氧化劑等物質，有重要的保健作用，更是乳、肉食物的優秀替代品。"
		},
		{
			"name": "thai_sauce",
			"description": "酸子醬又稱羅望子醬， 棕色狀似豆莢，果肉具酸味果香，泰國人常泡成冷熱飲品，幫助消化，並可入菜烹調，提供酸味的呈現。"
		},
		{
			"name": "fish_sauce",
			"description": "魚露，是閩菜和東南亞料理中常用的調味料之一，是用小魚蝦為原料，經醃漬、發酵、熬煉後得到的一種汁液，色澤呈琥珀色，味道帶有鹹味和鮮味。蝦油原產自福建和廣東潮汕等地，由早期僑民傳到越南以及其他東亞國家。魚露聞起來有刺鼻酸臭味，當佐料食用則鮮美提味。"
		},
		{
			"name": "fructose",
			"description": "果糖是一種簡單的糖，極易溶於水，在許多食品中存在。蜂蜜、漿果、瓜類，以及一些根類蔬菜如：甜菜、甜土豆、歐洲蘿蔔、洋蔥等含有果糖；通常與蔗糖與葡萄糖在一起形成化合物。"
		},
		{
			"name": "rice_noodle",
			"description": "泰式炒河粉使用的麵條叫做 chantaburi，這種薄而扁平的麵條在烹煮之後會帶有粘性和嚼勁，在泰國尖竹汶府用研磨米粉製作，之後在陽光下曬乾。"
		},
		{
			"name": "shrimp",
			"description": "蝦仁屬於容易熟的食物，烹調時，必須等水滾或油熱之後才能下鍋，煮到顏色一變就要馬上盛起，如果擔心蝦仁遇熱體積會縮小，可以先用蛋白和太白粉醃過。"
		},
		{
			"name": "egg",
			"description": "雞蛋含豐富的優質蛋白，每百克雞蛋含12.7克蛋白質，兩隻雞蛋所含的蛋白質大致相當於3兩魚或瘦肉的蛋白質。雞蛋蛋白質的消化率在牛奶、豬肉、牛肉和大米中也最高。"
		},
		{
			"name": "pork",
			"description": "只要是去骨的豬肉部位，都可以來做成絞肉。一般來說都是用油脂較少的胛心肉做絞肉。而絞肉的肥瘦比例以 3:7為佳，也可以個人口味喜好調整。"
		},
		{
			"name": "dried_tofu",
			"description": "豆干由豆腐經過脫水、壓縮製成。常見的豆腐乾有五香豆腐乾，和白豆腐乾兩類。料理方法以涼拌、炒、滷、炸較為常見。"
		},
		{
			"name": "bean_sprout",
			"description": "萌生過程中消耗了很多豆子裡的主要營養成分（澱粉、蛋白質、脂肪），因此豆芽含熱量少，但維生素C和食物纖維等微量營養成分則大有增加。在現代被認為是一種健康食品，有助於減肥。"
		},
		{
			"name": "leek",
			"description": "韭菜屬蔥科多年生鱗莖草本，含維生素C、維生素B1、維生素B2、胡蘿蔔素、碳水化合物及礦物質等營養素，所以可以滋腎益肝，活化肝細胞。此外，韭菜含有揮發性的硫化丙烯，因此具有辛辣味，有促進食慾的作用。"
		},
		{
			"name": "lemon",
			"description": "檸檬酸能幫助新陳代謝,促進腸胃蠕動,有利糞便排出,進而預防便祕。在料理中，多用來提味。"
		},
		{
			"name": "water",
			"description": "水在常溫常壓下為無色無味的透明液體，常用來調配醬料做使用。"
		},
	];

	for(var i=0;i<dragNode.length;i++){

		//add drag start listener
	  dragNode[i].addEventListener('dragstart',(e)=>{

	  	//get drag element
	  	dragElement = e.target.id;
	  	dragJudgment = false;

	  	for(obj of ingradientList){
		  	if(obj["name"] === dragElement){
		  		dragJudgment = true;
		  		dragDiscription = obj["description"];
		  	}
			}


	  	//add drag over listener
		 	targetNode.addEventListener('dragover', (e)=>{
				e.preventDefault();
			})

		 	//add drop listener
		 	targetNode.addEventListener('drop',(e)=>{
		 		e.preventDefault();

		 		//change element status
			  	$("#"+dragElement).attr("draggable","false");
			  	$("#"+dragElement).css({
			  		"opacity": "0.6",
			  		"cursor": "not-allowed"
			  	});

			  // conditional judgment
		 		if(dragJudgment) {
		 			//progress bar
		 			console.log(count);
	 				count += 1;
	 				console.log(count);
	 				$("#progressBar").css({
	 				"width": (6.25*count)+"%",
	 				"background": "#f63a0f"
		 			});
		 			if(count === 16){
		 				$("#progressBar").text("恭喜你完成菜色，請按 Enter");
		 				window.addEventListener('keydown',(e)=>{
		 					switch(e.keyCode){
						  	case 13:// enter
							  	finish();
						    	break;
						  }
						})
		 			}else{
		 				$("#progressBar").text((6.25*count)+"%");
		 			}
		 			//canvas add image
		 			stage.removeAllChildren();
					let element = new createjs.Bitmap(repo.getResult(dragElement));
					element.set({scaleX: 0.6, scaleY: 0.6});
					element.set({x: 400, y: 80});
					element.regX = element.image.width/2;

					stage.addChild(element);

					//change description
					$("#discriptionBlock").text(dragDiscription);	
		 		}

		 		else {
		 			//pop up wrong window
		 			stage.removeAllChildren();
		 			$("#discriptionBlock").text("");
		 			$("#wrongWindow").show();
		 			window.addEventListener('keydown', (e)=>{
		 				switch(e.keyCode){
				  	case 13:// enter
					  	$("#wrongWindow").hide();
				    	break;
						}	
		 			});
		 		}
		 		delete dragElement;
		 		delete dragJudgment;
		 	})
	 	})
	}
}

function finish(){
	$("#progress").css("display","none");
	$("#progressBar").css("display","none");
	$("#discriptionBlock").css('bottom','30px');
	$("#discriptionBlock").text("泰式炒河粉是一種泰式炒麵，它用的麵條是米製的，類似米粉，但是比米粉條粗，也就是大家所熟知的”粿條”。 Pad Thai起源於柬埔寨的首都金邊，後傳入泰國及越南，是東南亞一帶常見的麵類食品。後來經過不斷的改良，最後才變成了泰國經典的國家美食之一。泰式炒河粉，酸甜的味道搭配香脆的花生米還有清脆的豆芽，是一大特色也是這道料理的靈魂所在，而酸甜的口感主要來自於一種特殊植物羅望子，以及魚露。");	
	stage.removeAllChildren();
	let meal = new createjs.Bitmap(repo.getResult("thai_noodle"));
	meal.set({scaleX: 0.8, scaleY: 0.8});
	meal.set({x: 400, y: 60});
	meal.regX = meal.image.width/2;
	stage.addChild(meal);
}



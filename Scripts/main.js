var state=0;   
 var ScrWidth
 var ScrHeight
 var AIHolding=false;
 var Leaderboard=[{
	        "name": "Jammy",
	        "points": "100000"
	    }, {
	        "name": "AirLord",
	        "points": "50000"
	    }, {
	        "name": "BigAir2: Grounded Boogaloo",
	        "points": "20000"
	    }, {
	        "name": "NoiseMaker 3000",
	        "points": "10000"
	    }, {
	        "name": "Super Galaxy Shama",
	        "points": "50000"
	    }];
var Rules= {
        "Objective": "Win and score high enough to make it on the Leaderboard and you will be immortalized within the highscores page.",
        "Instructions": "Tap the left or right of the table to move the corresponding flippers, try to aim it into your opponents goal.",
        "Game": "Each bounce off the bumpers give points depending on their colour. Try to score to bank those points but if you concede a goal some of those earned points will be taken away from your total.",
        "Introduction": "A cross between Air hockey and pinball, Air faces you against a computer opponent to see who can best each other in this odd fusion of a game."
    }
 var Title,Background,PlayBut,HighScore,anim, menuG,HSG,GameG,TG,BFlipR, TouchM,MouseMBFlipL, TFlipR,TFlipL,Result,PM,GameOver,Rules;
 var goals,Bgoals,RFlipperR,BFlipperR,BFlipperL,RFlipperL,Flippers,ScoreDis,PotDis,BgoalsDis,goalsDis,BackBut1,BackBut2,Bounds,holding,once;
 var LBTitle,LD1,LD2,LD3,LD4,LD5,HSBackBut,GameBack,Table,BlackOverlay1,BlackOverlay2,MenuText,HelpText,GameOverText,FinalScoreDis,velholdX,velholdY;
 var objt,inst,intro,rule,posit,flippertouched,AIFlipper,check,MenuTheme,HighSTheme,RulesTheme,GameTheme,GoodGoal,BadGoal;
 var once=false;
 var firstgame=true;
 var FVel=0;
 var PotScore=0;
 var PBs=[];
 var BBs=[];
 var held=true;
 var RBs=[];
 var goals=0;
 var Bgoals=0;
 var Score=0;
 var GBs=[];
 var RF=[];
 var BF=[];
 var Leads=[];
 var Bumpers=[];
 var BumpSen=100;
 var config = {width: 900,height: 620,zoom:1,resolution:1,type: Phaser.AUTO,
		 	
		 	parent: "body",
	 		scene:{
	 			preload:preload,
	 			create:create,
	 			update:update,
	 			physics: {
			 impact: {}
		 	}
	 		},title:"AirPinBall",disableContextMenu:true,
	 		input:{
	 			keyboard:false,
	 			mouse:false
	 			},
	 		fps:{min:30,target:60}
	 };
 var game = new Phaser.Game(config); //config end 
 
    function preload() {
       	this.load.spritesheet('BackBut','Assets/Game/BackBut.png',{ frameWidth: 378, frameHeight: 155 },2);
    	this.load.spritesheet('Bumpers','Assets/Game/BumperSheet.png',{ frameWidth:20, frameHeight: 20 },12);
    	this.load.spritesheet('BFlippers','Assets/Game/BlueFlipperSheet110x24.png',{ frameWidth: 111, frameHeight: 25 },3);
    	this.load.spritesheet('RFlippers','Assets/Game/RedFlipperSheet110x24.png',{ frameWidth: 111, frameHeight: 25 },3);
    	this.load.spritesheet('Discs','Assets/Game/DiscsSheet.png',{ frameWidth: 26, frameHeight: 26 },5);
    	this.load.image('Table','Assets/Game/MainTable.png');
    	this.load.spritesheet('PlayBut','Assets/Menu/PlayBut.png',{ frameWidth: 378, frameHeight: 155 },2);
    	this.load.spritesheet('HSBut','Assets/Menu/HSBut.png',{ frameWidth: 378, frameHeight: 155 },2);
    	this.load.image('Title','Assets/Menu/TitleCard.png');
    	this.load.image('Background','Assets/Menu/Space-Background.png');
    	this.load.image('GameBack','Assets/Game/GameBackground.png');
    	this.load.image('HSBack','Assets/Highscore/Blue-Carpet.jpg');//image from: http://molotilo.com/wp-content/uploads/2016/09/blue-carpet.jpg
    	this.load.image('RulesBut','Assets/Menu/Rules.png');
    	this.load.image('Black','Assets/Game/black.png');
    	this.load.image('RBack','Assets/Game/RBackground.png');
    	this.load.audio('GoodGoal',"Assets/Audio/113698__huubjeroen__goalloop.wav");
    	this.load.audio('BadGoal',"Assets/Audio/333393__jayfrosting__boo-5-only-a-couple-people.wav");
    	this.load.audio('MenuTheme',"Assets/Audio/Mega Hyper Ultrastorm.mp3");
    	this.load.audio('OtherTheme',"Assets/Audio/Bit Quest.mp3");
    	this.load.audio('RulesTheme',"Assets/Audio/Bicycle.mp3");
    	this.load.audio('GameTheme',"Assets/Audio/Rhinoceros.mp3");
    }

    function create() {  
    	ScrWidth=game.config.width;
    	ScrHeight=game.config.height;
    	
    	//Audio
    	MenuTheme=this.sound.add('MenuTheme',{Loop:true});
    	GoodGoal=this.sound.add('GoodGoal');
    	BadGoal=this.sound.add('BadGoal');
    	HighSTheme=this.sound.add('OtherTheme',{Loop:true});
    	RulesTheme=this.sound.add('RulesTheme',{Loop:true});
    	GameTheme=this.sound.add('GameTheme',{Loop:true});
    	this.sound.volume=0.11;
    	this.sound.pauseOnBlur = false;
    	
    	//Menu State
    	//Title And Background Creation 
    	Background =this.add.image(ScrWidth/2,ScrHeight/2,'Background');
    	Title = this.add.image(ScrWidth/2,140,'Title');
    	
    	//PlayButton initialization
    	PlayBut = this.add.sprite(450,400,'PlayBut');
    	PlayBut.setInteractive();
    	PlayBut.on('pointerdown',function(){state=2;StartGame();});
    	PlayBut.scaleY=0.6;
    	PlayBut.scaleX=0.6;
    	
    	//Highscore Init
    	HighScore =  this.add.sprite(150,400,'HSBut',0);
    	HighScore.setInteractive();
    	HighScore.on('pointerdown',function(){state=1;ShowHS();});
    	HighScore.scaleY=0.6;
    	HighScore.scaleX=0.6;   	
    	
    	//Rules Init
    	RulesBut=this.add.sprite(750,400,'RulesBut');
    	RulesBut.setInteractive();
    	RulesBut.on('pointerdown',function(){state=5;ShowRules();});
    	RulesBut.scaleY=0.6;
    	RulesBut.scaleX=0.6;
    	
    	//HighScore State
    	HSBack = this.add.image(ScrWidth/2,ScrHeight/2,'HSBack');
    	LBTitle= this.add.text(200,0,'HighScores').setFontSize(100).setFontStyle('normal').setColor('#ffeded').setFontFamily('Impact');
    	LD1= this.add.text(30,130,'').setFontSize(40).setFontStyle('normal').setColor('#ffeded').setFontFamily('Verdana');
    	LD2= this.add.text(30,180,'').setFontSize(40).setFontStyle('normal').setColor('#ffeded').setFontFamily('Verdana');
    	LD3= this.add.text(30,230,'').setFontSize(40).setFontStyle('normal').setColor('#ffeded').setFontFamily('Verdana');
    	LD4= this.add.text(30,280,'').setFontSize(40).setFontStyle('normal').setColor('#ffeded').setFontFamily('Verdana');
    	LD5= this.add.text(30,330,'').setFontSize(40).setFontStyle('normal').setColor('#ffeded').setFontFamily('Verdana');
    	HSBackBut=this.add.sprite(250,500,'BackBut',0);
    	HSBackBut.setInteractive();
    	HSBackBut.on('pointerdown',function(){state=0;});
    	
    	
    	//Game State 
    	//Background 
    	GameBack=this.add.image(ScrWidth/2,ScrHeight/2,'GameBack');
    	//Table
    	Table = this.add.sprite(ScrWidth/2,ScrHeight/2,'Table');
    	Table.scaleY=0.65;
    	
    	//Blue Flipper
    	BFlipperL= this.add.sprite(270+60,580,'BFlippers');
    	BFlipperR= this.add.sprite(270+310,580,'BFlippers');
    	BFlipperR.setOrigin(1-13/BFlipperR.width,1-13/BFlipperR.height);
    	BFlipperL.setOrigin(13/BFlipperL.width,13/BFlipperL.height);
    	BFlipperL.name="BL";
    	BFlipperR.name="BR";
    	BFlipperL.angle=20;
    	BFlipperR.angle=-20;
    	BFlipperR.flipX=true;
    	BF.push(BFlipperL);
    	BF.push(BFlipperR);
    	
    	//Red Flipper
    	RFlipperL= this.add.sprite(270+60,36,'RFlippers');
    	RFlipperR= this.add.sprite(270+310,36,'RFlippers');
    	RFlipperR.setOrigin(1-13/RFlipperR.width,1-13/RFlipperR.height);
    	RFlipperL.setOrigin(13/RFlipperL.width,13/RFlipperL.height);
    	RFlipperL.name="RL";
    	RFlipperR.name="RR";
    	RFlipperL.angle=-20;
    	RFlipperR.angle=20;
    	RFlipperR.flipX=true;
    	RF.push(RFlipperL);
    	RF.push(RFlipperR);
    	
    	//Flippers Guide text
    	Left=this.add.text(50,300,'Left Flipper').setFontSize(20).setFontStyle('normal').setColor('#32e825').setFontFamily('Arial').setInteractive();
    	Left.setInteractive();
    	Left.on('pointerdown',function(){flippertouched=Left.text;holding=true;});
    	Left.on('pointerup',function(){holding=false;});
    	Right=this.add.text(725,300,'Right Flipper').setFontSize(20).setFontStyle('normal').setColor('#32e825').setFontFamily('Arial').setInteractive();
    	Right.setInteractive();
    	Right.on('pointerdown',function(){flippertouched=Right.text;holding=true;});
    	Right.on('pointerup',function(){holding=false;});
    	
    	// Grouping Flippers
    	Flippers= this.add.group();
    	Flippers.addMultiple(RF);
    	Flippers.addMultiple(BF);
    	
    	//Score Text
    	ScoreDis=this.add.text(0,0,'Score:').setFontFamily('Arial').setFontSize(30).setFontStyle('normal').setColor('#faff05');// Banked Score
    	PotDis=this.add.text(0,35,'Pot:').setFontFamily('Arial').setFontSize(30).setFontStyle('normal').setColor('#faff05');// Score Pot
    	BgoalsDis=this.add.text(170,50,'0').setFontFamily('Arial').setFontSize(30).setFontStyle('normal').setColor('#e81e1e');// Opponent Scored Goals
    	goalsDis=this.add.text(710,50,'0').setFontFamily('Arial').setFontSize(30).setFontStyle('normal').setColor('#184cf7');// Your Scored goals
    	
    	//Disc
    	Disc= this.impact.add.sprite(ScrWidth/2,ScrHeight/2,'Discs',Math.floor(Math.random()*5));
    	
    	//Bumpers
    	var X;
    	for(var i =0;i<4;i++){
    		for(var j=0;j<4;j++){
    			switch (i){
    			case 0:
    				 X=this.impact.add.sprite(240+35+j*125,140,'Bumpers',2).setFixedCollision().setCollideCallback(BumpCollide,this);
    				 X.name="BumpBlue";
    				 BBs.push(X);
    			break;
    			case 1:
    				 X=this.impact.add.sprite(240+35+j*125,260,'Bumpers',5).setFixedCollision().setCollideCallback(BumpCollide,this);
    				 X.name="BumpRed";
    				 RBs.push(X);
    			break;
    			case 2:
    				 X=this.impact.add.sprite(240+35+j*125,370,'Bumpers',8).setFixedCollision().setCollideCallback(BumpCollide,this);
    				 X.name="BumpGreen";
    				 GBs.push(X);
    			break;	
    			case 3:
    				X=this.impact.add.sprite(240+35+j*125,480,'Bumpers',11).setFixedCollision().setCollideCallback(BumpCollide,this);
    				X.name="BumpPurple"; 
    				PBs.push(X);
    			break;
    	}}}
    	Bumpers.push(BBs);
    	Bumpers.push(GBs);
    	Bumpers.push(PBs);
    	Bumpers.push(RBs);
        
    	//Pause Menu
    	BlackOverlay1= this.add.image(ScrWidth/2,ScrHeight/2,'Black');
    	BlackOverlay1.setInteractive();
    	BlackOverlay1.on('pointerdown',function(){Unpause();})
    	MenuText= this.add.text(ScrWidth/2,200,'Pause').setFontFamily('Arial').setFontSize(30).setFontStyle('normal').setColor('#2671e2').setFontFamily('Arial');
    	HelpText=this.add.text(ScrWidth/2,300,'Click Screen To Unpause.').setFontSize(30).setFontStyle('normal').setColor('#2671e2').setFontFamily('Arial');
    	BackBut1=this.add.sprite(ScrWidth/2,500,'BackBut',0);
    	BackBut1.setInteractive();
    	BackBut1.on('pointerdown',function(){state=0;Disc.destroy();});
    	Pause=this.add.text(775,30,'PAUSE').setFontFamily('Arial').setFontSize(30).setFontStyle('normal').setColor('#faff05');
    	Pause.setInteractive();
    	Pause.on('pointerdown',function(){state=3;velholdX=Disc.vel.x;velholdY=Disc.vel.y;
    	Disc.setVelocity(0,0);
		});
    	
    	//Game Over
    	BlackOverlay2= this.add.image(ScrWidth/2,ScrHeight/2,'Black');
    	GameOverText=this.add.text(100,200,'GAME OVER').setFontSize(30).setFontStyle('normal').setColor('#2671e2').setFontFamily('Arial');
    	FinalScoreDis=this.add.text(100,250,'').setFontSize(30).setFontStyle('normal').setColor('#2671e2').setFontFamily('Arial');
    	Result=this.add.text(100,350,'',{wordWrap: { width: 800, useAdvancedWrap: true }}).setFontSize(30).setFontStyle('normal').setColor('#2671e2').setFontFamily('Arial');
    	BackBut2=this.add.sprite(200,500,'BackBut',0);
    	BackBut2.setInteractive();
    	BackBut2.on('pointerdown',function(){state=0;Disc.destroy();});
    	
    	//Rules State
    	RulesBack=this.add.image(ScrWidth/2,ScrHeight/2,'RBack');
    	RTitle=this.add.text(50,25,'Rules').setFontSize(50).setFontStyle('normal').setColor('#ffeded').setFontFamily('Verdana');;
    	objt=this.add.text(50,160,'',{wordWrap: { width: 800, useAdvancedWrap: true }}).setFontSize(20).setFontStyle('normal').setColor('#ffeded').setFontFamily('Verdana');
    	inst=this.add.text(50,220,'',{wordWrap: { width: 800, useAdvancedWrap: true }}).setFontSize(20).setFontStyle('normal').setColor('#ffeded').setFontFamily('Verdana');
    	rule=this.add.text(50,280,'',{wordWrap: { width: 800, useAdvancedWrap: true }}).setFontSize(20).setFontStyle('normal').setColor('#ffeded').setFontFamily('Verdana');
    	intro=this.add.text(50,100,'',{wordWrap: { width: 800, useAdvancedWrap: true }} ).setFontSize(20).setFontStyle('normal').setColor('#ffeded').setFontFamily('Verdana');
    	RBackBut=this.add.sprite(250,500,'BackBut',0);
    	RBackBut.setInteractive();
    	RBackBut.on('pointerdown',function(){state=0;});

    	//Set Bounds
    	Bounds=this.impact.world.setBounds(265-50,0,Table.width-30,ScrHeight,2);
  	
    	//animations 
    	this.anims.create({key:'hitB',frames:this.anims.generateFrameNumbers('Bumpers', { frames: [ 2, 1, 0,0, 1, 2,1, 0,0, 1, 2,1, 0,0, 1, 2 ]})});
    	this.anims.create({key:'hitR',frames:this.anims.generateFrameNumbers('Bumpers', { frames: [5,4,3,3,4,5,4,3,3,4,5,4,3,3,4,5]})});
    	this.anims.create({key:'hitG',frames:this.anims.generateFrameNumbers('Bumpers', { frames: [8,7,6,6,7,8,7,6,6,7,8,7,6,6,7,8]})});
    	this.anims.create({key:'hitP',frames:this.anims.generateFrameNumbers('Bumpers', { frames: [11,10,9,9,10,11,10,9,9,10,11,10,9,9,10,11] })});
    	this.anims.create({key:'BFlipper',frames:this.anims.generateFrameNumbers('BFlippers',{frames:[0,1,2,2,1,0,1,2,2,1,0,1,2,2,1,0,1,2,2,1,0]})});
    	this.anims.create({key:'RFlipper',frames:this.anims.generateFrameNumbers('RFlippers',{frames:[0,1,2,2,1,0,1,2,2,1,0,1,2,2,1,0,1,2,2,1,0]})});
    	
    	//State Machine Setup
    	//Menu Grouping
    	menuG =	this.add.group();
    	menuG.add(Title);
    	menuG.add(Background);
    	menuG.add(PlayBut);
    	menuG.add(HighScore);
    	menuG.add(RulesBut)
    	menuG.toggleVisible();
    	
    	
    	//Game Grouping
    	GameG= this.add.group();
    	GameG.add(GameBack);
    	GameG.add(Table);
    	for(var i=0;i<Bumpers.length;i++){
   		GameG.addMultiple(Bumpers[i]);}
   		for(var i=0;i<Flippers.children.size;i++){GameG.add(Flippers.children.entries[i]);}
   		GameG.add(Left);
   		GameG.add(Right);
   		GameG.add(ScoreDis);
   		GameG.add(PotDis);
   		GameG.add(BgoalsDis);
   		GameG.add(goalsDis); 	
   		GameG.add(Pause);
   		GameG.add(Bounds);
   		GameG.add(Disc);
    	GameG.toggleVisible();
    	
    	//HS Grouping
    	HSG= this.add.group();
    	HSG.add(HSBack);
    	HSG.add(LBTitle);
    	HSG.add(LD1);
    	HSG.add(LD2);
    	HSG.add(LD3);
    	HSG.add(LD4);
    	HSG.add(LD5);
    	HSG.add(HSBackBut);
    	HSG.toggleVisible();
    	
    	//PM Grouping
    	PM=this.add.group();
    	PM.add(BlackOverlay1);
    	PM.add(MenuText);
    	PM.add(HelpText);
    	PM.add(BackBut1);
    	PM.toggleVisible();
    	
    	//Game Over Grouping
    	GameOver=this.add.group();
    	GameOver.add(BlackOverlay2);
    	GameOver.add(GameOverText);
    	GameOver.add(FinalScoreDis);
    	GameOver.add(BackBut2);
    	GameOver.add(Result);
    	GameOver.toggleVisible();
    	
    	//Rules Grouping
    	RulesG=this.add.group();
    	RulesG.add(RulesBack);
    	RulesG.add(RTitle);
    	RulesG.add(RBackBut);
    	RulesG.add(objt);
    	RulesG.add(intro);
    	RulesG.add(rule);
    	RulesG.add(inst);
    	
    	}
    	
    	
    	

  
    function update() {
    	if (state==0){
    		if(menuG.children.entries[0].visible==false){menuG.toggleVisible();MenuTheme.play();}
    		if(GameG.children.entries[0].visible==true){GameG.toggleVisible();}
    		if(HSG.children.entries[0].visible==true){HSG.toggleVisible();HighSTheme.stop();}
    		if(PM.children.entries[0].visible==true){PM.toggleVisible();}
    		if(GameOver.children.entries[0].visible==true){GameOver.toggleVisible();}
    		if(RulesG.children.entries[0].visible==true){RulesG.toggleVisible();RulesTheme.stop();}}//Menu State
    	else if(state==1){
    		if(menuG.children.entries[0].visible==true){menuG.toggleVisible();MenuTheme.stop();}
    		if(GameG.children.entries[0].visible==true){GameG.toggleVisible();}
    		if(HSG.children.entries[0].visible==false){HSG.toggleVisible();HighSTheme.play();}
    		if(PM.children.entries[0].visible==true){PM.toggleVisible();}
    		if(GameOver.children.entries[0].visible==true){GameOver.toggleVisible();}
    		if(RulesG.children.entries[0].visible==true){RulesG.toggleVisible();RulesTheme.stop();}}//Show Highscores State
    	else if(state==2){
    		if(menuG.children.entries[0].visible==true){menuG.toggleVisible();MenuTheme.stop();}
    		if(GameG.children.entries[0].visible==false){GameG.toggleVisible();GameTheme.resume();}
    		if(HSG.children.entries[0].visible==true){HSG.toggleVisible();}
    		if(PM.children.entries[0].visible==true){PM.toggleVisible();}
    		if(GameOver.children.entries[0].visible==true){GameOver.toggleVisible();}
    		if(RulesG.children.entries[0].visible==true){RulesG.toggleVisible();}
    		CheckFlip();GoalCheck();UpdateText();AI();firstgame=false;
    		if((holding)){MoveFlipperUp(flippertouched);}
    		else if(!(holding)){MoveFlippersDown();}
    		if(AIHolding){AIMoveFlippersUp();}
    		else if(!(AIHolding)){AIMoveFlippersDown();}
	    	if((goals==7)||(Bgoals==7)){state=4;}
	    	if(Disc.vel.x>500){Disc.setVelocity(1000,Disc.vel.y);}
	    	else if(Disc.vel.x<-500){Disc.setVelocity(-1000,Disc.vel.y);}
	    	else if(Disc.vel.x>500){Disc.setVelocity(Disc.vel.x,1000);}
	    	else if(Disc.vel.x<-500){Disc.setVelocity(Disc.vel.x,-1000);}}//Game State
    	else if (state==3){
    		if(menuG.children.entries[0].visible==true){menuG.toggleVisible();}
    		if(GameG.children.entries[0].visible==true){GameG.toggleVisible();}
    		if(HSG.children.entries[0].visible==true){HSG.toggleVisible();}
    		if(PM.children.entries[0].visible==false){PM.toggleVisible();GameTheme.pause();}
    		if(GameOver.children.entries[0].visible==true){GameOver.toggleVisible();}
    		if(RulesG.children.entries[0].visible==true){RulesG.toggleVisible();}
    		}// Pause State
    	else if(state==4){
    		if(menuG.children.entries[0].visible==true){menuG.toggleVisible();}
    		if(GameG.children.entries[0].visible==true){GameG.toggleVisible();}
    		if(HSG.children.entries[0].visible==true){HSG.toggleVisible();}
    		if(PM.children.entries[0].visible==true){PM.toggleVisible();}
    		if(GameOver.children.entries[0].visible==false){GameOver.toggleVisible();}
    		if(RulesG.children.entries[0].visible==true){RulesG.toggleVisible();}
    		Disc.destroy();
    		FinalScoreDis.text='Final Score: '+Score;
    		
	    	if(goals==7){if(!(once)){if(CheckHS(Score)){Result.text='You Win!! Congratulations. You made it onto the leaderboards.';setHS();}else{Result.text='You Win!! Congratulations';}}}
	    	else if(Bgoals==7){Result.text='You Lose, Better Luck Next Time.';}}// Game end state
    	else if(state==5){
    		if(menuG.children.entries[0].visible==true){menuG.toggleVisible();MenuTheme.stop();}
    		if(GameG.children.entries[0].visible==true){GameG.toggleVisible();}
    		if(HSG.children.entries[0].visible==true){HSG.toggleVisible();}
    		if(PM.children.entries[0].visible==true){PM.toggleVisible();}
    		if(GameOver.children.entries[0].visible==true){GameOver.toggleVisible();}
    		if(RulesG.children.entries[0].visible==false){RulesG.toggleVisible();RulesTheme.play();}}//Rules Page state
    	else{console.log("Error: Failed State Machine.");Alert("Error. Reverting to menu.");state=0;}}// Exception correction
   
    
    
    
    
    
    
    //Collider Detection & Execution for flippers and bumpers
    function BumpCollide(a){
    	if (a.parent.name=="BumpBlue"){
    		a.parent.play('hitB');
    		PotScore+=100;
    	}
    	else if(a.parent.name=="BumpRed"){
    		a.parent.play('hitR');
    		PotScore+=250;
    	}
    	else if(a.parent.name=="BumpGreen"){
    		a.parent.play('hitG');
    		PotScore+=500;
      	}
    	else if(a.parent.name=="BumpPurple"){
    		a.parent.play('hitP');
    		PotScore+=1000;
    	}}

    
    function CheckFlip(){
    	var TL,TR,BR,BL,EndLine,FrontLine,CenterPointA,CenterLineA,CenterPointB,CenterLineB,line,DiscTop,DiscBot,DiscR,DiscL,FrontLine;
    	var DL,DR,DT,DB;
    	for(var i=0;i<Flippers.children.size;i++){
    		TL=Flippers.children.entries[i].getTopLeft();
    		TR=Flippers.children.entries[i].getTopRight();
    		BL=Flippers.children.entries[i].getBottomLeft();
    		BR=Flippers.children.entries[i].getBottomRight();
    		EndLine=new Phaser.Geom.Line(BL.x,BL.y,TL.x,TL.y);
    		FrontLine=new Phaser.Geom.Line(BR.x,BR.y,TR.x,TR.y);
    		CenterPointA=Phaser.Geom.Line.GetMidPoint(EndLine);
    		CenterPointB=Phaser.Geom.Line.GetMidPoint(FrontLine);
    		line= new Phaser.Geom.Line(CenterPointA.x,CenterPointA.y,CenterPointB.x,CenterPointB.y);
    		DBL=Disc.getBottomLeft();DBR=Disc.getBottomRight();DTR=Disc.getTopRight();DTL=Disc.getTopLeft();
    		DiscTop= new Phaser.Geom.Line(DTL.x,DTL.y,DTR.x,DTR.y);
    		DiscBot= new Phaser.Geom.Line(DBL.x,DBL.y,DBR.x,DBR.y);
    		DiscL= new Phaser.Geom.Line(DTL.x,DTL.y,DBL.x,DBL.y);
    		DiscR= new Phaser.Geom.Line(DTR.x,DTR.y,DBR.x,DBR.y);
    		DT=Phaser.Geom.Intersects.LineToLine(line,DiscTop);
    		DR=Phaser.Geom.Intersects.LineToLine(line,DiscR);
    		DL=Phaser.Geom.Intersects.LineToLine(line,DiscL);
    		DB=Phaser.Geom.Intersects.LineToLine(line,DiscBot);
    	
    		if(((DT)||(DR)||(DL)||(DB))){FlipCollide(Flippers.children.entries[i],line,CenterPointA,CenterPointB);}}}
    		
    
    function FlipCollide(HitFlipper,line,CA,CB){
    	//Code Modified from: http://board.flashkit.com/board/showthread.php?203967-Bouncing-off-an-angled-wall-easy-collision-calculation
    	Math.toStandardAngle = function (a) {
    		while (a > 360) a -= 360;
    		while (a < 0) a += 360;
    		return a;}
    	var r=2*(Math.toStandardAngle(Math.abs(HitFlipper.angle)))-Math.toStandardAngle(Math.atan2(Disc.vel.x,Disc.vel.y)*180/Math.PI);
    	var v=Math.sqrt(Disc.vel.x*Disc.vel.x + Disc.vel.y*Disc.vel.y);

    	Disc.setVelocity(v*Math.cos(r),v*Math.sin(r));
    	if(HitFlipper.name=="BL"){HitFlipper.play('BFlipper',true);}
    	else if(HitFlipper.name=="BR"){HitFlipper.play('BFlipper',true);}
    	else if(HitFlipper.name=="RL"){HitFlipper.play('RFlipper',true);}
    	else if(HitFlipper.name=="RR"){HitFlipper.play('RFlipper',true);}
    	if(Disc.x>ScrWidth/2){Disc.body.pos.x-=2;}
    	else if(Disc.x<ScrWidth/2){Disc.body.pos.x+=2;}
    	if(Disc.y>ScrHeight/2){Disc.body.pos.y-=2;}
    	else if((Disc.getBounds(),HitFlipper)){Disc.body.pos.y+=2;}
    }

    //Game Functions (Starting, Checking goal, Unpause and Updating text)
    function StartGame(){
    	state=2;
    	goals=0;
    	once=false;
    	Bgoals=0;
    	Score=0;
    	PotScore=0;
    	GameTheme.play();
    	if(!firstgame){
    	Disc= game.scene.scenes[0].impact.add.sprite(ScrWidth/2,ScrHeight/2,'Discs',Math.floor(Math.random()*5));
    	GameG.add(Disc);
    	Disc.visible=false;
    	}
    	setTimeout(function(){Disc.setVelocity(Math.floor(Math.random()*200)+100,Math.floor(Math.random()*200)+100).setBounce(1.06).setActiveCollision().setMaxVelocity(400,400);},3000);
    }
    
    function GoalCheck(){
    	if(((Disc.y-10<=3)||(Disc.y+10>=617))&&(((Disc.x+10>424)&&(Disc.x+10<486))||(Disc.x-10>424)&&(Disc.x-10<486))){
    		var Multi=1;
    		switch(Disc.frame.name){
    			case 0:
    				Multi=1.1;
    			break;	
    			case 1:
    				Multi=1.3;
    			break;
    			case 2:
    				Multi=1.5;
    			break;
    			case 3:
    				Multi=2;
    			break;
    			case 4:
    				Multi=2.5;
    			break;
}
    		if(Disc.y-10<=3){
	    		Score=Score+Math.round(PotScore*Multi);
	    		goals+=1;
	    		GoodGoal.play();
    		}else if(Disc.y+10>=617){
    			Score-=PotScore/10;
    			Bgoals+=1;
    			BadGoal.play();
    		}
    		Disc.destroy();
    		PotScore=0;
    		Disc= game.scene.scenes[0].impact.add.sprite(ScrWidth/2,ScrHeight/2,'Discs',Math.floor(Math.random()*5));
    		GameG.add(Disc);
    		if(!((goals==7)||(Bgoals==7))){
    		setTimeout(function(){Disc.setVelocity((Math.floor(Math.random()*200)+100),(Math.floor(Math.random()*200)+100)).setBounce(1.06).setActiveCollision().setMaxVelocity(400,400);},3000);
    	}}
    	
    }
    function Unpause(){
    	if(PM.children.entries[0].visible==true){
    	Disc.setVelocity(velholdX,velholdY);
    	state=2;}}

    function UpdateText(){
    	ScoreDis.text="Score: "+ Score;
    	PotDis.text="Pot: "+ PotScore;
    	BgoalsDis.text=Bgoals;
    	goalsDis.text=goals;
    } 
    
    //Movement
    function MoveFlipperUp(touch){
    	if(touch.includes("Left")){
	    	if((BFlipperL.angle<=20)&&(BFlipperL.angle>=-30)){BFlipperL.angle-=2;}
	    	else if (BFlipperL.angle<-30){BFlipperL.angle=-30;}
	    	else if (BFlipperL.angle>20){BFlipperL.angle=20;}}// Left tap, Left Move
    	else if(touch.includes("Right")){
	    	if((BFlipperR.angle>=-20)&&(BFlipperR.angle<=30)){BFlipperR.angle+=2;}
	    	else if (BFlipperR.angle>30){BFlipperR.angle=30;}
	    	else if (BFlipperR.angle<-20){BFlipperR.angle=-20;}}//Right tap, Right Move
    	}
   
    function MoveFlippersDown(){
    	if(BFlipperR.angle>-20){BFlipperR.angle-=1;}else if (BFlipperR.angle<-20){BFlipperR.angle=-20;}
    	if(BFlipperL.angle<20){BFlipperL.angle+=1;}else if(BFlipperL.angle>20){BFlipperL.angle=20;}
    }
   
    //AI Detection & Flippers
    function AI(){
    	if(Disc.y<100){AIHolding=true;
    		if((Disc.x>320)&&(Disc.x<451)){AIFlipper="Left";}
    		else if((Disc.x>452)&&(Disc.x<592)){AIFlipper="Right";}
    	}else{AIHolding=false;}
    }
    
   function AIMoveFlippersUp(){
	   if(AIFlipper.includes("Left")){
	    	if((RFlipperL.angle<=30)&&(RFlipperL.angle>=-20)){RFlipperL.angle+=2;}
	    	else if (RFlipperL.angle>30){RFlipperL.angle=30;}
	    	else if (RFlipperL.angle<-20){RFlipperL.angle=-20;}}
   	else if(AIFlipper.includes("Right")){
   		if((RFlipperR.angle<=20)&&(RFlipperR.angle>=-30)){RFlipperR.angle-=2;}
		else if (RFlipperR.angle>20){RFlipperR.angle=20;}
		else if (RFlipperR.angle<-30){RFlipperR.angle=-30;}}
   } 
    
   function AIMoveFlippersDown(){
	   	if(RFlipperL.angle>-20){RFlipperL.angle-=1;}else if(RFlipperL.angle<-20){RFlipperL.angle=-20;}
    	if(RFlipperR.angle<20){RFlipperR.angle+=1;}else if(RFlipperR.angle>20){RFlipperR.angle=20;}
    }
   
    //HighScore Checking and setting
    function ShowHS(){
    	for (var i=0;i<5;i++){
    	var obj=Leaderboard[i];
    		switch(i){
    		case 0:
    		LD1.text="1.  "+obj.name+"  -  "+obj.points;
    		break;
    		case 1:
    			LD2.text="2.  "+obj.name+"  -  "+obj.points;
    		break;
    		case 2:
    			LD3.text="3.  "+obj.name+"  -  "+obj.points;
        	break;
    		case 3:
    			LD4.text="4.  "+obj.name+"  -  "+obj.points;
        	break;
    		case 4:
    			LD5.text="5.  "+obj.name+"  -  "+obj.points;
        	break;
    		}
    	
    	}
    	
    }

function CheckHS(points){
	var obj;
	var check=false;
		for(var i=Leaderboard.length-1;i>=0;i--){
			obj=Leaderboard[i];
			if(points>obj.points){check=true;posit=i;}
		}
		once=true;
		return check;
}

function setHS(){
	var FinalScore=Score;
	var name= window.prompt("PLEASE ENTER YOUR NAME!","Anonymous");
	var obj={"name":name, "points":FinalScore}
	var Data;
	Leaderboard[posit]=obj;

}
//Showing rules
function ShowRules(){

		objt.text="Objective: "+Rules.Objective;
    	inst.text="Instructions: "+Rules.Instructions;
    	rule.text="Aim of the game: "+Rules.Game;
    	intro.text=Rules.Introduction;

	
}
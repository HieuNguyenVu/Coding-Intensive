class ShipController{
  constructor(x, y, spriteName, configs){
      this.sprite = Nakama.playerGroup.create(x,y,'assets', spriteName);
      Nakama.game.physics.arcade.enable(this.sprite);
      this.configs = configs;
      this.sprite.body.collideWorldBounds = true;
      this.timeSinceLastFire = 0;
      this.sprite.anchor = new Phaser.Point(0.5,0.5);
  }
  update(){

    //Di chuyển lên xuống
    if(Nakama.keyboard.isDown(this.configs.up)){
      console.log("UP button pressed");
      this.sprite.body.velocity.y = -ShipController.SHIP_SPEED;
    }else if(Nakama.keyboard.isDown(this.configs.down)){
      this.sprite.body.velocity.y = ShipController.SHIP_SPEED;
    }else{
      this.sprite.body.velocity.y = 0;
    }

    //Di chuyển trái phải
    if(Nakama.keyboard.isDown(this.configs.left)){
      this.sprite.body.velocity.x = -ShipController.SHIP_SPEED;
    }else if(Nakama.keyboard.isDown(this.configs.right)){
      this.sprite.body.velocity.x = ShipController.SHIP_SPEED;
    }else {
      this.sprite.body.velocity.x = 0;
    }

    //Nếu bắn, coi viên đạn như là một con tàu
    this.timeSinceLastFire += Nakama.game.time.physicsElapsed;
    if(Nakama.keyboard.isDown(this.configs.fire)){
      //Kiểm tra xem nếu còn sống thì mới được bắn
      if(this.sprite.alive==true){
        this.tryfire();
      }
    }
  }
  tryfire(){
    if(this.timeSinceLastFire >= this.configs.cooldown){
      this.typeFire3();
      this.timeSinceLastFire = 0;
    }
  }
  //3 tia
  typeFire1(corner){
    this.createBullet1( this.sprite.position.x-20,this.sprite.position.y,-corner);
    this.createBullet1( this.sprite.position.x,this.sprite.position.y,0);
    this.createBullet1( this.sprite.position.x+20,this.sprite.position.y,corner);
  }
  //Đạn zizac
  typeFire2(){
    this.createBullet1( this.sprite.position.x,this.sprite.position.y,11);
  }
  //Đạn dồn
  typeFire3(){
    this.createBullet2( this.sprite.position.x,this.sprite.position.y,12);
  }
  createBullet1(x, y, typeBullet){
    Nakama.players.push(
      new BulletController(
        x,
        y,
        'BulletType1.png',
        typeBullet));
  }
  createBullet2(x, y, typeBullet){
    Nakama.players.push(
      new BulletController(
        x,
        y,
        'BulletType1.png',
        typeBullet));
  }
}
ShipController.SHIP_SPEED = 1000;

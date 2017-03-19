class EnemyShipController{
  constructor(x, y, spriteName, configs) {
    this.sprite = Nakama.enemyGroup.create(x,y,'assets', spriteName);
    Nakama.game.physics.arcade.enable(this.sprite);
    this.configs = configs;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.scale = new Phaser.Point(0.5,0.5);
    this.timeSinceLastFire = 0;
    this.sprite.anchor = new Phaser.Point(0.5,0.5);
    this.sprite.health = this.configs.health;
  }
  update(){
    var tx = Math.floor(Math.random() * 201) - 100;
    var ty = Math.floor(Math.random() * 201) - 100;
    this.move(tx,ty);
    this.fire();
    // console.log(tx);
    // console.log(ty);
  }
   move(tx, ty){
    if(this.sprite.alive==true){
      if(tx>0){
        this.sprite.body.velocity.x = EnemyShipController.SHIP_SPEED;
      }
      else {
        this.sprite.body.velocity.x = -EnemyShipController.SHIP_SPEED;
      }
      if(ty>0){
        this.sprite.body.velocity.y = EnemyShipController.SHIP_SPEED;
      }
      else {
        this.sprite.body.velocity.y = -EnemyShipController.SHIP_SPEED;
      }
      if(this.sprite.position.x==0 || this.sprite.position.x==320){
        // this.sprite.body.velocity.x = 0;//
        //Cái này để bắt khi nó chạm cạnh màn hình :))
        //Nhưng mà e thấy không cần thiết vì nó random đổi hướng liên tục
      }
      if(this.sprite.position.y==0 || this.sprite.position.y==480){
        // this.sprite.body.velocity.y = 0;
      }
    }
  }
    fire(){
      if(this.sprite.alive==true){
        this.timeSinceLastFire += Nakama.game.time.physicsElapsed;
        this.tryfire();
      }
    }
    tryfire(){
        if(this.timeSinceLastFire >= this.configs.cooldown){
          Nakama.players.push(
            new EnemyBulletController(
              this.sprite.position.x,
              this.sprite.position.y,
              'EnemyBulletType1.png',
              1));
              this.timeSinceLastFire = 0;
        }
    }
}
EnemyShipController.SHIP_SPEED = 1000;

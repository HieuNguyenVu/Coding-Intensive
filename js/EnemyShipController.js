class EnemyShipController{
  constructor(x, y, spriteName, configs) {
    this.sprite = Nakama.game.add.sprite(x,y,'assets', spriteName);
    Nakama.game.physics.arcade.enable(this.sprite);
    this.configs = configs;
    this.sprite.body.collideWorldBounds = true;
  }
  update(){
    var tx = Math.floor(Math.random() * 201) - 100;
    var ty = Math.floor(Math.random() * 201) - 100;
    this.move(tx,ty);
    console.log(tx);
    console.log(ty);
  }
   move(tx, ty){
    if(this.moveBool == false){
      this.moveBool = true;
    }
    console.log(this.moveBool);
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
      // this.sprite.body.velocity.x = 0;
      //Cái này để bắt khi nó chạm cạnh màn hình :))
      //Nhưng mà tự nhiên e thấy không cần thiết vì nó random đổi hướng liên tục
    }
    if(this.sprite.position.y==0 || this.sprite.position.y==480){
      // this.sprite.body.velocity.y = 0;
      //Cái này để bắt khi nó chạm cạnh màn hình :))
    }
    // console.log("x:"+x);
    // console.log("y:"+y);
    // console.log("tx:"+tx);
    // console.log("ty:"+ty);
    // console.log(this.moveBool);
  }
}
EnemyShipController.SHIP_SPEED = 1000;

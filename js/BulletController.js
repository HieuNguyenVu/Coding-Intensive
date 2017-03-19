class BulletController{
  constructor(x, y, spriteName, typeBullet) {
    this.sprite = Nakama.bulletGroup.create(x,y,'assets', spriteName);
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = false;
    this.sprite.body.checkWarBounds = true;
    this.sprite.body.outOfBoundsKill = true;
    this.typeBullet = typeBullet;
    this.sprite.anchor = new Phaser.Point(0.5,0.5);
  }
  update(){
            this.ourShipFire();
  }

  ourShipFire(){
            if(this.typeBullet<=10){
              this.Bullet1();
            }else if(this.typeBullet == 11){
              this.Bullet2();
            }else if (this.typeBullet == 12) {
              this.Bullet3();
            }
  }
  //Đạn 3 tia
  Bullet1(){
        this.sprite.body.velocity.y = -BulletController.SHIP_SPEED;
        if(this.typeBullet != 0){
          this.sprite.angle = 180/(this.typeBullet*3);
            this.sprite.body.velocity.x = BulletController.SHIP_SPEED/this.typeBullet;
        }
  }
  //Đạn đổi hướng sau 0.1s
  Bullet2(){
  }
  
  //Đạn dồn
  Bullet3(){
    this.enemySprite = Nakama.enemyGroup.getFirstAlive();
    if(this.enemySprite != null){

      //Phần bắt hướng xoay của đạn
      BulletController.SHIP_SPEED = 150;
      var a = Math.abs(this.sprite.position.y - this.enemySprite.position.y);
      var b = Math.abs(this.sprite.position.x - this.enemySprite.position.x);
      var da = Math.sqrt(b*b+a*a);
      var rad = Math.acos(a/da);
      var corner = rad*180/Math.PI;

      //Vì Hàm update được gọi mỗi 1 frame nên giới hạn góc quay theo mỗi frame.
      if(corner>60){
        corner = 60;
      }
      // console.log(rad);
        var tempx = (this.enemySprite.position.x - this.sprite.position.x);
        var tempy = (this.enemySprite.position.y - this.sprite.position.y);
        if(tempx < 0 ){
          this.sprite.angle = -corner;
          Nakama.game.physics.arcade.velocityFromAngle(this.sprite.angle, -BulletController.SHIP_SPEED, this.sprite.body.velocity);
          this.sprite.body.velocity.x = -BulletController.SHIP_SPEED;
        }else {
          this.sprite.angle = corner;
          this.sprite.body.velocity.x = BulletController.SHIP_SPEED;
          Nakama.game.physics.arcade.velocityFromAngle(this.sprite.angle, BulletController.SHIP_SPEED, this.sprite.body.velocity);
        }
        if(tempy > 0 ){
          this.sprite.body.velocity.y = BulletController.SHIP_SPEED;
          // Nakama.game.physics.arcade.velocityFromAngle(this.sprite.angle, -BulletController.SHIP_SPEED, this.sprite.body.velocity);
        }else {
          this.sprite.body.velocity.y = -BulletController.SHIP_SPEED;
          // Nakama.game.physics.arcade.velocityFromAngle(this.sprite.angle, BulletController.SHIP_SPEED, this.sprite.body.velocity);
        }
        //
    }else{
      //Khi quân địch chết rồi chuyển về bắn thường
      //khi có quân địch mới xuất hiện, hàm này lại được gọi lại, nó lại check getFirstAlive kia có bằng null hay không rồi quyết định
    BulletController.SHIP_SPEED = 1000;
    // this.sprite = Nakama.bulletGroup.create(x,y,'BulletType1.png', spriteName);
    this.sprite.body.velocity.y = -BulletController.SHIP_SPEED;
    }
  }
}
BulletController.SHIP_SPEED = 1000;

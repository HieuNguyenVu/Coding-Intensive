class EnemyBulletController{
  constructor(x, y, spriteName, typeBullet) {
    this.sprite = this.sprite = Nakama.bulletEnemyGroup.create(x,y,'assets', spriteName);
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = false;
    this.sprite.body.checkWarBounds = true;
    this.sprite.body.outOfBoundsKill = true;
    this.typeBullet = typeBullet;
    this.sprite.anchor = new Phaser.Point(0.5,0.5);
  }
  update(){
            this.sprite.scale = new Phaser.Point(0.3,0.3);
            this.enemyFire();
    }
  enemyFire(){
        this.sprite.body.velocity.y = EnemyShipController.SHIP_SPEED;
  }
}
BulletController.BULLET_SPEED = 1000;

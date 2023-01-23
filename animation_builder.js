class AnimationBuilder {
    constructor() {
        ANIMANAGER.addSpriteSheet('background', ASSET_MANAGER.getAsset('background.png'))
        ANIMANAGER.addSpriteSet('backgSet', 'background', [0, 592, 1184], [592, 1184, 1775], 0, 272);

        ANIMANAGER.addSpriteSheet('stones', ASSET_MANAGER.getAsset('stones.png'));
        ANIMANAGER.addSoloSprite('ground', 'stones', 0, 0, 960, 306);

        ANIMANAGER.addSpriteSheet('FULL', ASSET_MANAGER.getAsset('waluigi_sprites.png'));

        ANIMANAGER.addSpriteSet('runSet', 'FULL', 
                        [ 7, 41,  83, 123, 159, 190, 231, 271], // x orig
                        [39, 78, 119, 155, 188, 226, 264, 302], // x ends
                        57, 103); // y orig and height
        ANIMANAGER.addAnimation('runAni', 'runSet', [1, 2, 3, 4, 5, 6, 7, 0], 0.12);

        ANIMANAGER.addSpriteSheet('leftrun', ASSET_MANAGER.getAsset('leftrun.png'));
        ANIMANAGER.addSpriteSet('runLeftSet', 'leftrun', 
                        [ 0, 38,  76, 114, 147, 183, 224, 263], // x orig
                        [31, 71, 112, 143, 179, 219,261, 295], // x ends
                        0, 96); // y orig and height
        ANIMANAGER.addAnimation('runLeftAni', 'runLeftSet', [0,7,6,5,4,3,2,1], 0.12);

        ANIMANAGER.addSpriteSet('smashSet', 'FULL',
                        [  6,  66, 132, 178, 242, 301], // x orig
                        [ 59, 123, 169, 233, 300, 356], // x ends
                        [418, 417, 398, 422, 422, 421], // y orig
                        462, // y ends
                        [0,-4,16,15,15,15], [0,-1,-20,3,3,3]);
        ANIMANAGER.addAnimation('smashAni', 'smashSet',
                        [   0,    1,    2,    3,    4,    5,    4,    5,    2,    1],
                        [0.12, 0.12, 0.10, 0.10, 0.05, 0.05, 0.05, 0.15, 0.12, 0.12], -50);


        ANIMANAGER.addSpriteSet('standSet', 'FULL',
                        [ 3, 33, 65, 99],
                        [31, 62, 95, 129],
                        2, 52,
                        [0, -1, -2, -1])

        ANIMANAGER.addAnimation('standAni', 'standSet', [0,1,2,1], 0.4,2,-12);

    }
}